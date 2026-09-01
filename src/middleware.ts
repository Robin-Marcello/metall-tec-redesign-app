import { NextRequest, NextResponse } from "next/server";

const REALM = "Metall-Tec";
const EXPECTED_CREDENTIALS_HASH =
  "cc76e55f2ecee9bd31faeb8b35d54b8c1972a9e6f57cf1275fef3e621a921870";

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

export async function middleware(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  try {
    const credentials = atob(authorization.slice("Basic ".length));
    const credentialsHash = await sha256(credentials);

    if (credentialsHash === EXPECTED_CREDENTIALS_HASH) {
      return NextResponse.next();
    }
  } catch {
    // Fall through to the generic unauthorized response.
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)",
  ],
};
