import type { Project } from "./types";

export const project: Project = {
  banner: "banner.png",
  faviconURL: "favicon.png",
  faviconSVG: "palette.svg",

  title: "Palette Generator",
  description: "A simple monochrome, material 3, palette generator for android apps.",
  author: "@deyvidandrades",

  url: "https://deyvidandrades.github.io/AppPaletteGenerator/",
  keywords: "color, palette, generator, android, app, design",
  version: "v1.0.1",

  links_nav: [
    { text: "Home", url: "https://deyvidandrades.github.io/", is_new_tab: false },
    { text: "Github", url: "https://github.com/deyvidandrades/AppPaletteGenerator", is_new_tab: true },
  ],
};
