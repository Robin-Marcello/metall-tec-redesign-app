"use client";

import { CompleteShelfLandingPage } from "@designcodeio/threeui";

export default function CompleteShelfScene() {
  return (
    <div className="shader-frame h-screen w-screen bg-[#111313]">
      <CompleteShelfLandingPage
        headingFont="iowan-old-style"
        bodyFont="inter"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#cbd444"
        headingSize={60}
        bodySize={12}
        headingLetterSpacing={-0.055}
        className="h-full w-full"
      />
    </div>
  );
}
