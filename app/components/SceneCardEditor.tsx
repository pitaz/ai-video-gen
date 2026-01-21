import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { VoiceButton } from './VoiceButton';
import { AudioButton } from './AudioButton';
import { Scene } from '../store/projectStore';

interface SceneCardEditorProps {
  scene: Scene;
  onDelete: () => void;
  onVoiceChange: (voice: string) => void;
  onAudioChange: (audioTrack: string) => void;
}

export function SceneCardEditor({ scene, onDelete, onVoiceChange, onAudioChange }: SceneCardEditorProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.gridIcon}>☷</Text>
          <Text style={styles.sceneNumber}>SCENE {scene.number.toString().padStart(2, '0')}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>↻</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
            <Text style={styles.icon}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: scene.imageUri }} style={styles.image} resizeMode="cover" />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{scene.duration}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {scene.description}
      </Text>

      {/* Voice and Audio Buttons */}
      <View style={styles.buttonsRow}>
        <VoiceButton
          voice={scene.voice}
          onPress={() => {
            // TODO: Open voice picker
            console.log('Voice picker');
          }}
        />
        <AudioButton
          audioTrack={scene.audioTrack}
          onPress={() => {
            // TODO: Open audio picker
            console.log('Audio picker');
          }}
        />
      </View>
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
});
