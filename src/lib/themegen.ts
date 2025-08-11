import { converter, parse, formatHex, wcagContrast, type Oklch } from "culori";
import { type AndroidTheme, type ColorDictionary } from "./types";

const toneMap = {
  primary: { light: 0.4, dark: 0.8 },
  onPrimary: { light: 0.99, dark: 0.2 },
  primaryContainer: { light: 0.9, dark: 0.3 },
  onPrimaryContainer: { light: 0.1, dark: 0.9 },

  secondary: { light: 0.55, dark: 0.75 },
  onSecondary: { light: 0.99, dark: 0.2 },
  secondaryContainer: { light: 0.85, dark: 0.35 },
  onSecondaryContainer: { light: 0.15, dark: 0.85 },

  tertiary: { light: 0.45, dark: 0.8 },
  onTertiary: { light: 0.99, dark: 0.2 },
  tertiaryContainer: { light: 0.85, dark: 0.3 },
  onTertiaryContainer: { light: 0.15, dark: 0.85 },

  background: { light: 0.99, dark: 0.07 },
  onBackground: { light: 0.11, dark: 0.98 },

  surface: { light: 0.98, dark: 0.06 },
  onSurface: { light: 0.1, dark: 0.9 },
  surfaceVariant: { light: 0.95, dark: 0.08 },
  onSurfaceVariant: { light: 0.3, dark: 0.7 },
  inverseSurface: { light: 0.2, dark: 0.9 },
  onInverseSurface: { light: 0.95, dark: 0.1 },

  surfaceDim: { light: 0.93, dark: 0.1 },
  surfaceBright: { light: 0.99, dark: 0.15 },

  surfaceContainerLowest: { light: 0.99, dark: 0.05 },
  surfaceContainerLow: { light: 0.95, dark: 0.1 },
  surfaceContainer: { light: 0.9, dark: 0.15 },
  surfaceContainerHigh: { light: 0.85, dark: 0.2 },
  surfaceContainerHighest: { light: 0.8, dark: 0.25 },

  inversePrimary: { light: 0.8, dark: 0.4 },

  outline: { light: 0.5, dark: 0.6 },
  outlineVariant: { light: 0.7, dark: 0.4 },

  scrim: { light: 0.0, dark: 0.0 },

  error: { light: 0.65, dark: 0.8 },
  onError: { light: 0.99, dark: 0.2 },
  errorContainer: { light: 0.9, dark: 0.3 },
  onErrorContainer: { light: 0.1, dark: 0.9 },
};

function hexToOklch(hex: string): Oklch | undefined {
  const toOklch = converter("oklch");
  const parsed = parse(hex);
  return toOklch(parsed);
}

function oklchToHex(oklch: Oklch): string {
  return formatHex(oklch);
}

function safeChroma(L: number, baseChroma: number): number {
  // Reduce chroma near lightness extremes to avoid gamut issues
  if (L < 0.1) return baseChroma * (L / 0.1);
  if (L > 0.9) return baseChroma * ((1 - L) / 0.1);
  return baseChroma;
}

function ensureContrast(foreground: string, background: string, minRatio: number = 4.5): string {
  let fg: Oklch = hexToOklch(foreground)!;
  const bg: Oklch = hexToOklch(background)!;

  if (bg != undefined) {
    let ratio = wcagContrast(fg, bg);
    const step = fg.l < 0.5 ? -0.01 : 0.01;

    while (ratio < minRatio && fg.l >= 0 && fg.l <= 1) {
      fg = { ...fg, l: fg.l + step };
      ratio = wcagContrast(fg, bg);
    }
  }

  return oklchToHex(fg);
}

function isSurfaceRole(role: string): boolean {
  return [
    "surface",
    "onSurface",
    "surfaceVariant",
    "onSurfaceVariant",
    "inverseSurface",
    "onInverseSurface",
    "surfaceDim",
    "surfaceBright",
    "surfaceContainerLowest",
    "surfaceContainerLow",
    "surfaceContainer",
    "surfaceContainerHigh",
    "surfaceContainerHighest",
    "outline",
  ].includes(role);
}

function hasOnColor(role: string): boolean {
  return ["primary", "primaryContainer", "secondary", "secondaryContainer", "tertiary", "tertiaryContainer", "error", "errorContainer", "surface", "surfaceVariant", "inverseSurface", "background"].includes(role);
}

export function generatePalette(baseHex: string): AndroidTheme {
  const baseOklch = hexToOklch(baseHex);

  const lightTheme: Partial<ColorDictionary> = {};
  const darkTheme: Partial<ColorDictionary> = {};

  if (baseOklch != undefined) {
    for (const role in toneMap) {
      const { light, dark } = toneMap[role as keyof ColorDictionary];

      let baseChroma = baseOklch.c;

      if (isSurfaceRole(role)) baseChroma = baseChroma * 0.2;

      const cLight = safeChroma(light, baseChroma);
      const cDark = safeChroma(dark, baseChroma);

      let hueLight = baseOklch.h;
      let hueDark = baseOklch.h;

      if ((role.startsWith("secondary") || role.startsWith("onSecondary")) && hueLight && hueDark) {
        hueLight = (hueLight + 10) % 360;
        hueDark = (hueDark + 10) % 360;
      } else if ((role.startsWith("tertiary") || role.startsWith("onTertiary")) && hueLight && hueDark) {
        hueLight = (hueLight + 20) % 360;
        hueDark = (hueDark + 20) % 360;
      } else if ((role.startsWith("error") || role.startsWith("onError")) && hueLight && hueDark) {
        hueLight = 10;
        hueDark = 10;
      }

      lightTheme[role as keyof ColorDictionary] = oklchToHex({ l: light, c: cLight, h: hueLight, mode: "oklch" });
      darkTheme[role as keyof ColorDictionary] = oklchToHex({ l: dark, c: cDark, h: hueDark, mode: "oklch" });
    }
  }

  for (const key in lightTheme) {
    if (Object.prototype.hasOwnProperty.call(lightTheme, key)) {
      const value = lightTheme[key as keyof typeof lightTheme];
      const valueDark = darkTheme[key as keyof typeof darkTheme];

      const onColorKey = `on${key.charAt(0).toUpperCase() + key.slice(1)}`.replace("On", "") as keyof ColorDictionary;
      if (hasOnColor(key)) {
        let onColorLight = lightTheme[onColorKey];
        let onColorDark = darkTheme[onColorKey];

        if (onColorLight != undefined && onColorDark != undefined && value != undefined && valueDark != undefined) {
          lightTheme[onColorKey] = ensureContrast(onColorLight, value);
          darkTheme[onColorKey] = ensureContrast(onColorDark, valueDark);
        }
      }
    }
  }

  return {
    light: lightTheme as ColorDictionary,
    dark: darkTheme as ColorDictionary,
  };
}

function getThemeKt(theme: AndroidTheme): string {
  const lightTheme: ColorDictionary = theme.light;
  const darkTheme: ColorDictionary = theme.dark;

  let kotlinCode = "";
  let kotlinCodeDark = "";
  for (const key in lightTheme) {
    if (Object.prototype.hasOwnProperty.call(lightTheme, key)) {
      const value = lightTheme[key as keyof typeof lightTheme];
      const valueDark = darkTheme[key as keyof typeof darkTheme];

      kotlinCode += `val ${key}Light = Color(0xFF${value.replace("#", "")})\n`;
      kotlinCodeDark += `val ${key}Dark = Color(0xFF${valueDark.replace("#", "")})\n`;
    }
  }
  kotlinCode += "\n";
  kotlinCode += kotlinCodeDark;

  return kotlinCode;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
}

export async function copyColorToClipboard(color: string) {
  copyToClipboard(color);
}

export async function copyThemeToClipboard(theme: AndroidTheme) {
  let code = getThemeKt(theme);
  copyToClipboard(code);
}

export function downloadThemeKt(theme: AndroidTheme) {
  let code = getThemeKt(theme);

  const blob = new Blob([code], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Colors.kt";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getDefaultColor(): string {
  const url = new URL(window.location.href);
  const defaultColor = "#9452ff";

  if (url.searchParams.has("color")) {
    return url.searchParams.get("color")!;
  } else {
    changeDefaultColor(defaultColor);
  }
  return defaultColor;
}

export function changeDefaultColor(color: string) {
  const url = new URL(window.location.href);

  url.searchParams.set("color", color);
  window.history.replaceState({}, "", url);
}
