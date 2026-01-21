import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { SceneCardEditor } from '../components/SceneCardEditor';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useProjectStore, Scene } from '../store/projectStore';
import { theme } from '../theme';

export default function StoryboardScreen() {
  const { selectedProject, updateProject } = useProjectStore();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (selectedProject) {
      setScenes(selectedProject.scenes);
    } else {
      // If no project selected, go back to home
      router.replace('/');
    }
  }, [selectedProject, router]);

  const totalDuration = scenes.reduce((acc, scene) => {
    const [min, sec] = scene.duration.split(':').map(Number);
    return acc + min * 60 + sec;
  }, 0);
  const minutes = Math.floor(totalDuration / 60);
  const seconds = totalDuration % 60;
  const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const handleAddScene = () => {
    router.push('/create-scene');
  };

  const handlePreview = () => {
    router.push('/preview');
  };

  const handleExport = () => {
    router.push('/export');
  };

  const handleMagicWand = () => {
    router.push('/generating');
  };

  const handleDeleteScene = (sceneId: string) => {
    const updatedScenes = scenes.filter((s) => s.id !== sceneId);
    setScenes(updatedScenes);
    if (selectedProject) {
      updateProject(selectedProject.id, { scenes: updatedScenes });
    }
  };

  const handleVoiceChange = (sceneId: string, voice: string) => {
    const updatedScenes = scenes.map((s) => (s.id === sceneId ? { ...s, voice } : s));
    setScenes(updatedScenes);
    if (selectedProject) {
      updateProject(selectedProject.id, { scenes: updatedScenes });
    }
  };

  const handleAudioChange = (sceneId: string, audioTrack: string) => {
    const updatedScenes = scenes.map((s) => (s.id === sceneId ? { ...s, audioTrack } : s));
    setScenes(updatedScenes);
    if (selectedProject) {
      updateProject(selectedProject.id, { scenes: updatedScenes });
    }
  };

  if (!selectedProject) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedProject.name}</Text>
          <Text style={styles.subtitle}>STORYBOARD EDITOR</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Timeline Header */}
      <View style={styles.timelineHeader}>
        <Text style={styles.timelineTitle}>Timeline</Text>
        <Text style={styles.timelineInfo}>
          {scenes.length} SCENES / {durationText}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Scene Cards */}
        {scenes.map((scene) => (
          <SceneCardEditor
            key={scene.id}
            scene={scene}
            onDelete={() => handleDeleteScene(scene.id)}
            onVoiceChange={(voice) => handleVoiceChange(scene.id, voice)}
            onAudioChange={(audioTrack) => handleAudioChange(scene.id, audioTrack)}
          />
        ))}

        {/* Add New Scene */}
        <TouchableOpacity style={styles.addSceneContainer} onPress={handleAddScene}>
          <View style={styles.addSceneBorder}>
            <View style={styles.addSceneButton}>
              <Text style={styles.addSceneIcon}>+</Text>
            </View>
            <Text style={styles.addSceneText}>Add New Scene</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Action Button - Magic Wand */}
      <TouchableOpacity style={styles.magicButton} onPress={handleMagicWand}>
        <Text style={styles.magicIcon}>✨</Text>
      </TouchableOpacity>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.dark.text.primary,
    fontWeight: '300',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  previewButton: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.dark.surface,
  },
  previewButtonText: {
    ...theme.typography.body2,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  exportButtonText: {
    ...theme.typography.body2,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  timelineTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
  },
  timelineInfo: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 120,
  },
  addSceneContainer: {
    marginTop: theme.spacing.md,
  },
  addSceneBorder: {
    borderWidth: 2,
    borderColor: theme.colors.dark.border,
    borderStyle: 'dashed',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  addSceneButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.dark.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  addSceneIcon: {
    fontSize: 24,
    color: theme.colors.dark.text.primary,
    fontWeight: '300',
  },
  addSceneText: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    fontWeight: '500',
  },
  magicButton: {
    position: 'absolute',
    bottom: 100,
    right: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
    zIndex: 1000,
  },
  magicIcon: {
    fontSize: 28,
  },
});
