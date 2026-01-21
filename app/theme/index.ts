// Google Material Design inspired theme
export const theme = {
  colors: {
    primary: '#1A73E8', // Google Blue
    primaryDark: '#1557B0',
    primaryLight: '#E8F0FE',
    secondary: '#34A853', // Google Green
    accent: '#FBBC04', // Google Yellow
    error: '#EA4335', // Google Red
    teal: '#14B8A6', // Teal for FAB and accents
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceVariant: '#F1F3F4',
    // Dark theme colors
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      surfaceVariant: '#2C2C2C',
      card: '#252525',
      text: {
        primary: '#FFFFFF',
        secondary: '#B3B3B3',
        disabled: '#666666',
        inverse: '#000000',
      },
      border: '#333333',
      divider: '#2C2C2C',
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368',
      disabled: '#9AA0A6',
      inverse: '#FFFFFF',
    },
    border: '#DADCE0',
    divider: '#E8EAED',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
      letterSpacing: 0.15,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: 0.75,
      textTransform: 'uppercase' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
};

export type Theme = typeof theme;
