export enum PALETTE {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  NEUTRAL,
  NEUTRAL_VARIANT,
  ERROR,
}

export const TONE_MAP: Record<string, Record<string, number>> = {
  primary: { palette: PALETTE.PRIMARY, light: 40, dark: 80 },
  onPrimary: { palette: PALETTE.PRIMARY, light: 100, dark: 20 },
  primaryContainer: { palette: PALETTE.PRIMARY, light: 90, dark: 30 },
  onPrimaryContainer: { palette: PALETTE.PRIMARY, light: 10, dark: 90 },

  secondary: { palette: PALETTE.SECONDARY, light: 40, dark: 80 },
  onSecondary: { palette: PALETTE.SECONDARY, light: 100, dark: 20 },
  secondaryContainer: { palette: PALETTE.SECONDARY, light: 90, dark: 30 },
  onSecondaryContainer: { palette: PALETTE.SECONDARY, light: 10, dark: 90 },

  tertiary: { palette: PALETTE.TERTIARY, light: 40, dark: 80 },
  onTertiary: { palette: PALETTE.TERTIARY, light: 100, dark: 20 },
  tertiaryContainer: { palette: PALETTE.TERTIARY, light: 90, dark: 30 },
  onTertiaryContainer: { palette: PALETTE.TERTIARY, light: 10, dark: 90 },

  error: { palette: PALETTE.ERROR, light: 40, dark: 80 },
  onError: { palette: PALETTE.ERROR, light: 100, dark: 20 },
  errorContainer: { palette: PALETTE.ERROR, light: 90, dark: 30 },
  onErrorContainer: { palette: PALETTE.ERROR, light: 10, dark: 90 },

  background: { palette: PALETTE.NEUTRAL, light: 99, dark: 10 },
  onBackground: { palette: PALETTE.NEUTRAL, light: 10, dark: 90 },

  surface: { palette: PALETTE.NEUTRAL, light: 99, dark: 10 },
  onSurface: { palette: PALETTE.NEUTRAL, light: 10, dark: 90 },

  surfaceVariant: { palette: PALETTE.NEUTRAL_VARIANT, light: 90, dark: 30 },
  onSurfaceVariant: { palette: PALETTE.NEUTRAL_VARIANT, light: 30, dark: 80 },

  inverseSurface: { palette: PALETTE.NEUTRAL, light: 20, dark: 90 },
  inverseOnSurface: { palette: PALETTE.NEUTRAL, light: 95, dark: 20 },

  surfaceDim: { palette: PALETTE.NEUTRAL, light: 87, dark: 6 },
  surfaceBright: { palette: PALETTE.NEUTRAL, light: 98, dark: 24 },

  surfaceContainerLowest: { palette: PALETTE.NEUTRAL, light: 100, dark: 4 },
  surfaceContainerLow: { palette: PALETTE.NEUTRAL, light: 96, dark: 10 },
  surfaceContainer: { palette: PALETTE.NEUTRAL, light: 94, dark: 12 },
  surfaceContainerHigh: { palette: PALETTE.NEUTRAL, light: 92, dark: 17 },
  surfaceContainerHighest: { palette: PALETTE.NEUTRAL, light: 90, dark: 22 },

  inversePrimary: { palette: PALETTE.PRIMARY, light: 80, dark: 40 },

  outline: { palette: PALETTE.NEUTRAL_VARIANT, light: 50, dark: 60 },
  outlineVariant: { palette: PALETTE.NEUTRAL_VARIANT, light: 80, dark: 30 },

  scrim: { palette: PALETTE.NEUTRAL, light: 0, dark: 0 },
};
