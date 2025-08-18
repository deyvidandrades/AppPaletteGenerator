import { Hct, TonalPalette, hexFromArgb, argbFromHex } from "@material/material-color-utilities";
import { converter, formatHex, parse, wcagContrast, type Hsl } from "culori";
import type { AndroidTheme, ColorDictionary } from "./types";
import { PALETTE, TONE_MAP } from "./tonemap";

const TONEVALUES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

/* HELPERS */
function hexToHsl(hex: string): Hsl | undefined {
  const toHsl = converter("hsl");
  const parsed = parse(hex);
  return toHsl(parsed);
}

function hslToHex(hsl: Hsl): string {
  return formatHex(hsl);
}

function ensureContrast(foreground: string, background: string, minRatio: number = 5.5): string {
  let fg: Hsl = hexToHsl(foreground)!;
  const bg: Hsl = hexToHsl(background)!;

  let ratio = wcagContrast(fg, bg);
  const step = fg.l < 0.5 ? -0.01 : 0.01;

  if (ratio > minRatio) return hslToHex(fg);

  while (ratio < minRatio) {
    // && fg.l >= 0 && fg.l <= 1) {
    fg = { ...fg, l: fg.l + step };
    ratio = wcagContrast(fg, bg);
  }
  return hslToHex(fg);
}

/* PALETTE GENERATION */
export function getTheme(color: string): AndroidTheme {
  const baseColor: Hct = Hct.fromInt(argbFromHex(color));

  const baseColorHSL: Hsl = hexToHsl(color)!;

  const errorHue = 10; //baseColor.hue + (25 - baseColor.hue) * 0.9;
  const errorChroma = 52;

  const primaryPalette = TonalPalette.fromHueAndChroma(baseColor.hue, baseColor.chroma);
  const secondaryPalette = TonalPalette.fromHueAndChroma(baseColor.hue, baseColor.chroma * 0.5);
  const tertiaryPalette = TonalPalette.fromHueAndChroma(baseColor.hue, baseColor.chroma * 0.45);

  const neutralPalette = TonalPalette.fromHueAndChroma(baseColor.hue, 4);
  const neutralVariantPalette = TonalPalette.fromHueAndChroma(baseColor.hue, 8);

  const errorPalette = TonalPalette.fromHueAndChroma(errorHue, errorChroma);

  let dictionaryLight: any = {};
  let dictionaryDark: any = {};

  for (const key in TONE_MAP) {
    const role = key as keyof ColorDictionary;
    const { palette, light, dark } = TONE_MAP[role];

    switch (palette) {
      case PALETTE.PRIMARY:
        if (role == "primaryContainer") {
          // dictionaryLight[role] = hslToHex(baseColorHSL);
          // dictionaryDark[role] = hslToHex(baseColorHSL);
          dictionaryLight[role] = hslToHex({ h: baseColorHSL.h, s: baseColorHSL.s, l: baseColorHSL.l, mode: "hsl" });
          dictionaryDark[role] = hslToHex({ h: baseColorHSL.h, s: baseColorHSL.s, l: baseColorHSL.l * 0.2, mode: "hsl" });
        } else if (role == "primary") {
          dictionaryLight[role] = hslToHex({ h: baseColorHSL.h, s: baseColorHSL.s * 0.6, l: 0.3, mode: "hsl" });
          dictionaryDark[role] = hslToHex({ h: baseColorHSL.h, s: baseColorHSL.s * 0.6, l: 0.5, mode: "hsl" });
        } else {
          dictionaryLight[role] = hexFromArgb(primaryPalette.tone(light));
          dictionaryDark[role] = hexFromArgb(primaryPalette.tone(dark));
        }
        break;
      case PALETTE.SECONDARY:
        dictionaryLight[role] = hexFromArgb(secondaryPalette.tone(light));
        dictionaryDark[role] = hexFromArgb(secondaryPalette.tone(dark));
        break;
      case PALETTE.TERTIARY:
        dictionaryLight[role] = hexFromArgb(tertiaryPalette.tone(light));
        dictionaryDark[role] = hexFromArgb(tertiaryPalette.tone(dark));
        break;
      case PALETTE.ERROR:
        dictionaryLight[role] = hexFromArgb(errorPalette.tone(light));
        dictionaryDark[role] = hexFromArgb(errorPalette.tone(dark));
        break;
      case PALETTE.NEUTRAL:
        dictionaryLight[role] = hexFromArgb(neutralPalette.tone(light));
        dictionaryDark[role] = hexFromArgb(neutralPalette.tone(dark));
        break;
      case PALETTE.NEUTRAL_VARIANT:
        dictionaryLight[role] = hexFromArgb(neutralVariantPalette.tone(light));
        dictionaryDark[role] = hexFromArgb(neutralVariantPalette.tone(dark));
        break;
    }
  }
  for (const key in TONE_MAP) {
    const role = key as keyof ColorDictionary;
    const { palette, light, dark } = TONE_MAP[role];

    if (palette == PALETTE.PRIMARY || palette == PALETTE.SECONDARY || palette == PALETTE.TERTIARY) {
      if (!role.startsWith("on")) {
        let onColorKey = `on${role.charAt(0).toUpperCase() + role.slice(1)}` as keyof ColorDictionary;

        let colorLight = dictionaryLight[role];
        let onColorLight = dictionaryLight[onColorKey];

        let colorDark = dictionaryDark[role];
        let onColorDark = dictionaryDark[onColorKey];

        if (colorLight != undefined && onColorLight != undefined && colorDark != undefined && onColorDark != undefined) {
          dictionaryLight[onColorKey] = ensureContrast(onColorLight, colorLight);
          dictionaryDark[onColorKey] = ensureContrast(onColorDark, colorDark);
        }
      }
    }
  }

  return {
    light: dictionaryLight,
    dark: dictionaryDark,
  };
}
