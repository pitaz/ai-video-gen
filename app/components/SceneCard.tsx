import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { VoiceButton } from './VoiceButton';
import { AudioButton } from './AudioButton';

interface Scene {
  id: string;
  number: number;
  imageUri: string;
  duration: string;
  description: string;
  voice: string;
  audioTrack: string;
  projectName: string;
  projectDescription: string;
}

interface SceneCardProps {
  project: Scene;
  onDelete: () => void;
  onVoiceChange: (voice: string) => void;
  onAudioChange: (audioTrack: string) => void;
}

export function SceneCard({ project, onDelete, onVoiceChange, onAudioChange }: SceneCardProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Project Name */}
          <Text style={styles.projectName}>{project.projectName}</Text>
  
        </View>
   
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: project.imageUri }} style={styles.image} resizeMode="cover" />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{project.duration}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {project.description}
      </Text>


    </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 18,
    color: theme.colors.dark.text.secondary,
    marginRight: theme.spacing.sm,
  },
  sceneNumber: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: theme.colors.dark.text.secondary,
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
  buttonsRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  projectName: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  projectDescription: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
  },
});
