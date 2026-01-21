import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface DropdownProps {
  icon: string;
  label: string;
  value: string;
  onPress: () => void;
}

export function Dropdown({ icon, label, value, onPress }: DropdownProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.arrow}>▼</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
    color: theme.colors.dark.text.primary,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 12,
    color: theme.colors.dark.text.secondary,
  },
});
