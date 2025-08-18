import type { AndroidTheme, ColorDictionary } from "./types";

function getThemeKt(theme: AndroidTheme): string {
  const lightTheme: ColorDictionary = theme.light;
  const darkTheme: ColorDictionary = theme.dark;

  let kotlinCode = "";
  let kotlinCodeDark = "";
  for (const key in lightTheme) {
    if (Object.prototype.hasOwnProperty.call(lightTheme, key)) {
      const value = lightTheme[key as keyof typeof lightTheme]!;
      const valueDark = darkTheme[key as keyof typeof darkTheme]!;

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
