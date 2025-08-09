export interface Link {
  text: string;
  url: string;
  is_new_tab: boolean;
}
export type Project = {
  author: string;
  faviconURL: string;
  faviconSVG: string;
  url: string;
  banner: string;
  title: string;
  description: string;
  version: string;
  links_nav: Array<Link>;
  keywords: string;
};
export type ColorDictionary = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  inverseSurface: string;
  onInverseSurface: string;

  surfaceDim: string;
  surfaceBright: string;

  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  inversePrimary: string;

  outline: string;
  outlineVariant: string;

  scrim: string;
  shadow: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
};
export type AndroidTheme = {
  light: ColorDictionary;
  dark: ColorDictionary;
};
