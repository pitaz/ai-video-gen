import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ProjectCard } from '../components/ProjectCard';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { useProjectStore } from '../store/projectStore';
import { theme } from '../theme';

export default function ProjectsScreen() {
  const { projects, setSelectedProject } = useProjectStore();
  const router = useRouter();

  const handleCreateStory = () => {
    router.push('/create-project');
  };

  const handleProjectPress = (project: typeof projects[0]) => {
    setSelectedProject(project);
    router.push('/storyboard');
  };

  const renderProjectCard = ({ item }: { item: typeof projects[0] }) => {
    const firstScene = item.scenes[0];
    const totalDuration = item.scenes.reduce((acc, scene) => {
      const [min, sec] = scene.duration.split(':').map(Number);
      return acc + min * 60 + sec;
    }, 0);
    const minutes = Math.floor(totalDuration / 60);
    const seconds = totalDuration % 60;
    const durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return (
      <ProjectCard
        project={item}
        thumbnailUri={firstScene?.imageUri}
        duration={durationText}
        sceneCount={item.scenes.length}
        onPress={() => handleProjectPress(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>My Projects</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      <FlatList
        data={projects}
        renderItem={renderProjectCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleCreateStory} position="right" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  topBarTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 20,
    color: theme.colors.dark.text.primary,
    fontWeight: 'bold',
  },
  list: {
    padding: theme.spacing.lg,
    paddingBottom: 100, // Space for FAB and bottom nav
  },
});
