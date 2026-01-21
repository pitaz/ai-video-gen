import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface VoiceButtonProps {
  voice: string;
  onPress: () => void;
}

export function VoiceButton({ voice, onPress }: VoiceButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.icon}>🔊</Text>
      <Text style={styles.text}>{voice}</Text>
      <Text style={styles.arrow}>▼</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark.surfaceVariant,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  text: {
    flex: 1,
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 10,
    color: theme.colors.dark.text.secondary,
    marginLeft: theme.spacing.xs,
  },
});
