import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode | string;
}

interface BottomNavigationProps {
  items: NavItem[];
  activeItem: string;
  onItemPress: (itemId: string) => void;
}

export function BottomNavigation({ items, activeItem, onItemPress }: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => onItemPress(item.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.activeIcon]}>
              {item.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dark.border,
    paddingVertical: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
    color: theme.colors.dark.text.secondary,
  },
  activeIcon: {
    color: theme.colors.secondary,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 10,
    fontWeight: '500',
  },
  activeLabel: {
    color: theme.colors.secondary,
    fontWeight: '600',
  },
});
