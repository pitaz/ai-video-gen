import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface PipelineStepProps {
  label: string;
  status: 'completed' | 'processing' | 'pending';
}

export function PipelineStep({ label, status }: PipelineStepProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles[status]]}>
        {status === 'completed' && <Text style={styles.checkmark}>✓</Text>}
        {status === 'processing' && <View style={styles.dot} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {status === 'processing' && (
          <Text style={styles.processingText}>PROCESSING...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  completed: {
    borderColor: theme.colors.teal,
    backgroundColor: theme.colors.teal,
  },
  processing: {
    borderColor: theme.colors.teal,
    backgroundColor: 'transparent',
  },
  pending: {
    borderColor: theme.colors.dark.border,
    backgroundColor: 'transparent',
  },
  checkmark: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.teal,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '500',
  },
  processingText: {
    ...theme.typography.caption,
    color: theme.colors.teal,
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
