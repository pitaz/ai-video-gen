import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface FloatingActionButtonProps {
  onPress: () => void;
  position?: 'left' | 'center' | 'right';
}

export function FloatingActionButton({ onPress, position = 'center' }: FloatingActionButtonProps) {
  const positionStyle: ViewStyle = {
    left: position === 'left' ? theme.spacing.lg : undefined,
    right: position === 'right' ? theme.spacing.lg : undefined,
    alignSelf: position === 'center' ? 'center' : undefined,
  };

  return (
    <TouchableOpacity
      style={[styles.fab, positionStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 80,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
    zIndex: 1000,
  },
  fabIcon: {
    fontSize: 32,
    color: theme.colors.text.inverse,
    fontWeight: '300',
    lineHeight: 32,
  },
});
