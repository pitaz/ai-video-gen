import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  icon?: React.ReactNode;
}

export function CircularProgress({ progress, size = 200, strokeWidth = 12, icon }: CircularProgressProps) {
  const radius = size / 2;
  const progressAngle = Math.min(360, (progress / 100) * 360);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: theme.colors.dark.surfaceVariant,
          },
        ]}
      />
      
      {/* Progress overlay using rotation */}
      {progressAngle > 0 && (
        <View
          style={[
            styles.progressOverlay,
            {
              width: size,
              height: size,
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: theme.colors.teal,
              borderRightColor: progressAngle <= 90 ? 'transparent' : theme.colors.teal,
              borderBottomColor: progressAngle <= 180 ? 'transparent' : theme.colors.teal,
              borderLeftColor: progressAngle <= 270 ? 'transparent' : theme.colors.teal,
              borderTopColor: progressAngle <= 360 ? theme.colors.teal : 'transparent',
              transform: [{ rotate: `${-90 + Math.min(180, progressAngle)}deg` }],
            },
          ]}
        />
      )}

      {progressAngle > 180 && (
        <View
          style={[
            styles.progressOverlay,
            {
              width: size,
              height: size,
              borderRadius: radius,
              borderWidth: strokeWidth,
              borderColor: 'transparent',
              borderRightColor: theme.colors.teal,
              borderBottomColor: theme.colors.teal,
              borderLeftColor: 'transparent',
              borderTopColor: 'transparent',
              transform: [{ rotate: `${90 + (progressAngle - 180)}deg` }],
            },
          ]}
        />
      )}

      <View style={styles.content}>
        {icon}
        <Text style={styles.percentage}>{Math.round(progress)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
  },
  progressOverlay: {
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  percentage: {
    ...theme.typography.h2,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginTop: theme.spacing.sm,
  },
});
