// Keep the public package installed while avoiding the package root's eager
// import of every demo (some demos use a Webpack 5-incompatible asset rule).
// The landing-page exports themselves remain the authored ThreeUI runtime.
export { CompleteShelfLandingPage } from "../../node_modules/@designcodeio/threeui/lib-dist/shaders/landing-pages/LandingPages.js";
