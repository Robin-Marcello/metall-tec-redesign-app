"use client";

import { KageLandingPage } from "@/shaders/landing-pages/LandingPages";

export default function KageScene() {
  return (
    <div className="shader-frame h-screen w-screen bg-black">
      <KageLandingPage
        className="h-full w-full"
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
