import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0B0E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Weld accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 4,
            height: "100%",
            background: "linear-gradient(180deg, #c2ce4b 0%, rgba(194,206,75,0) 100%)",
          }}
        />
        {/* Large decorative circle */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "1px solid rgba(194,206,75,0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: "1px solid rgba(194,206,75,0.08)",
          }}
        />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, zIndex: 1 }}>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 14,
              letterSpacing: "0.28em",
              color: "#c2ce4b",
              textTransform: "uppercase",
            }}
          >
            {site.address.city} · {site.address.region}
          </span>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 76,
              fontWeight: 800,
              color: "#E8E9EA",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </span>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 30,
              color: "#9aa3b2",
              fontWeight: 400,
              marginTop: 4,
            }}
          >
            {site.tagline}
          </span>
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 17,
              color: "rgba(154,163,178,0.65)",
              marginTop: 12,
              letterSpacing: "0.04em",
            }}
          >
            Geländer · Stiegen · Tore · Stahlbau · Edelstahl
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
