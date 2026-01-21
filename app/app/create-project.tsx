import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { useProjectStore } from '../store/projectStore';
import { Button } from '../components/Button';
import { theme } from '../theme';

export default function CreateProjectScreen() {
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioDescriptor, setAudioDescriptor] = useState('');
  const router = useRouter();
  const { addProject, setSelectedProject } = useProjectStore();

  const handleCreate = () => {
    if (!projectTitle.trim() || !description.trim()) {
      return;
    }

    // Create new project
    const newProject = {
      id: Crypto.randomUUID(),
      name: projectTitle.trim(),
      description: description.trim(),
      audioDescriptor: audioDescriptor.trim(),
      scenes: [],
    };

    addProject(newProject);
    setSelectedProject(newProject);
    
    // Navigate to scene creation/editing (storyboard)
    router.push('/storyboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Project</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Project Title */}
          <View style={styles.section}>
            <Text style={styles.label}>Project Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter project title..."
              placeholderTextColor={theme.colors.dark.text.secondary}
              value={projectTitle}
              onChangeText={setProjectTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your project..."
              placeholderTextColor={theme.colors.dark.text.secondary}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>

          {/* Audio Descriptor */}
          <View style={styles.section}>
            <Text style={styles.label}>Audio Descriptor</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the audio style (e.g., cinematic, ambient, epic)..."
              placeholderTextColor={theme.colors.dark.text.secondary}
              multiline
              numberOfLines={3}
              value={audioDescriptor}
              onChangeText={setAudioDescriptor}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Create Button */}
        <View style={styles.footer}>
          <Button
            title="Create Project"
            onPress={handleCreate}
            disabled={!projectTitle.trim() || !description.trim()}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
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
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.dark.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dark.border,
    backgroundColor: theme.colors.dark.surface,
  },
});
