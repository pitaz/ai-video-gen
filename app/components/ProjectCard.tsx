import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { Project } from '../store/projectStore';

interface ProjectCardProps {
  project: Project;
  thumbnailUri?: string;
  duration: string;
  sceneCount: number;
  onPress: () => void;
}

export function ProjectCard({ project, thumbnailUri, duration, sceneCount, onPress }: ProjectCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.projectName}>{project.name}</Text>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        {thumbnailUri ? (
          <Image source={{ uri: thumbnailUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {project.description}
      </Text>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.infoText}>{sceneCount} {sceneCount === 1 ? 'Scene' : 'Scenes'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark.card,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.secondary + '40',
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  headerLeft: {
    flex: 1,
  },
  projectName: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
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
  durationBadge: {
    position: 'absolute',
    bottom: theme.spacing.sm,
    right: theme.spacing.sm,
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
  description: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    padding: theme.spacing.md,
    lineHeight: 20,
  },
  info: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  infoText: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontWeight: '500',
  },
});
