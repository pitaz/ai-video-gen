import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

interface StoryCardProps {
  title: string;
  imageUri?: string;
  duration?: string;
  isGenerating?: boolean;
  onPress?: () => void;
}

export function StoryCard({ title, imageUri, duration, isGenerating = false, onPress }: StoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isGenerating}
    >
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        
        {duration && !isGenerating && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}

        {isGenerating && (
          <View style={styles.generatingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.teal} />
            <Text style={styles.generatingText}>GENERATING...</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.dark.card,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: theme.colors.dark.surfaceVariant,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.dark.surfaceVariant,
  },
  durationBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  durationText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  generatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatingText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    marginTop: theme.spacing.sm,
    fontWeight: '600',
    letterSpacing: 1,
  },
  title: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    padding: theme.spacing.sm,
    fontWeight: '500',
  },
});
