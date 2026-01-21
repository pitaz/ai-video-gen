import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', selected = false, onPress, style }: CardProps) {
  const cardStyles = [
    styles.card,
    styles[variant],
    selected && styles.selected,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
  },
  default: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  outlined: {
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  elevated: {
    ...theme.shadows.md,
    borderWidth: 0,
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 2,
  },
});
