import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface StyleThumbnailProps {
  id: string;
  name: string;
  imageUri?: string;
  isSelected: boolean;
  onPress: () => void;
}

export function StyleThumbnail({ id, name, imageUri, isSelected, onPress }: StyleThumbnailProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.imageContainer, isSelected && styles.selectedBorder]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
        {isSelected && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedText}>SELECTED</Text>
          </View>
        )}
      </View>
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.dark.border,
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  selectedBorder: {
    borderColor: theme.colors.teal,
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.dark.surfaceVariant,
  },
  selectedBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.teal,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  selectedText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  label: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '500',
  },
});
