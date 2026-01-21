# Design System - Google Stitch Templates

This app now uses a comprehensive design system inspired by Google Material Design principles, as referenced from the Google Stitch templates.

## Theme System

Located in `app/theme/index.ts`, the theme provides:

### Colors
- **Primary**: Google Blue (#1A73E8)
- **Secondary**: Google Green (#34A853)
- **Accent**: Google Yellow (#FBBC04)
- **Error**: Google Red (#EA4335)
- **Surface colors**: Background, surface, and variant colors
- **Text colors**: Primary, secondary, disabled, and inverse

### Typography
- **H1**: 32px, bold, for main titles
- **H2**: 24px, semi-bold, for section headers
- **H3**: 20px, semi-bold, for subsections
- **Body1**: 16px, regular, for main content
- **Body2**: 14px, regular, for secondary content
- **Caption**: 12px, for small text
- **Button**: 16px, semi-bold, uppercase

### Spacing
Consistent spacing scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), xxl (48px)

### Components

#### Button
- Variants: `primary`, `secondary`, `outline`, `text`
- Supports loading state, disabled state, and full-width option

#### Card
- Variants: `default`, `outlined`, `elevated`
- Supports selection state
- Can be pressable or static

#### ProgressBar
- Customizable height and colors
- Smooth progress animation

## Updated Screens

All screens have been updated to use the theme system:

1. **Home Screen**: Clean input with Material Design styling
2. **Style Picker**: Elevated cards with selection states
3. **Generating**: Material Design progress indicators
4. **Preview**: Modern video player with themed controls
5. **Export**: Elevated action cards with consistent spacing

## Usage

```tsx
import { theme } from '../theme';
import { Button, Card, ProgressBar } from '../components';

// Use theme colors
<View style={{ backgroundColor: theme.colors.primary }} />

// Use theme typography
<Text style={theme.typography.h1}>Title</Text>

// Use components
<Button title="Click me" onPress={handlePress} variant="primary" />
<Card variant="elevated" selected={isSelected}>
  <Text>Content</Text>
</Card>
```

## Design Principles

- **Consistency**: All screens use the same color palette and spacing
- **Accessibility**: High contrast ratios and readable font sizes
- **Material Design**: Follows Google's Material Design guidelines
- **Responsive**: Components adapt to different screen sizes
- **Modern**: Clean, minimal design with proper shadows and elevations
