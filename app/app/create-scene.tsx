import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { useProjectStore, Scene } from '../store/projectStore';
import { StyleThumbnail } from '../components/StyleThumbnail';
import { Dropdown } from '../components/Dropdown';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { enhanceScene } from '../services/api';

const VISUAL_STYLES = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    imageUri: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
  },
  {
    id: 'anime',
    name: 'Anime',
    imageUri: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200',
  },
  {
    id: '3d-render',
    name: '3D Render',
    imageUri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
  },
];

export default function CreateSceneScreen() {
  const [prompt, setPrompt] = useState('A futuristic nomad wandering through a neon-lit rainforest, bioluminescent plants glowing in the dark...');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [ratio, setRatio] = useState('16:9 Wide');
  const [length, setLength] = useState('10 Seconds');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const router = useRouter();
  const { selectedProject, updateProject } = useProjectStore();

  const handleAIEnhance = async () => {
    if (!prompt.trim() || isEnhancing) return;

    setIsEnhancing(true);
    try {
      const response = await enhanceScene({
        description: prompt.trim(),
        style: selectedStyle,
      });
      setPrompt(response.description);
    } catch (error) {
      console.error('Error enhancing scene:', error);
      // Show error to user (you can add a toast/alert here)
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCreateScene = () => {
    if (!prompt.trim() || !selectedProject) {
      return;
    }

    // Create new scene
    const newScene: Scene = {
      id: Crypto.randomUUID(),
      number: selectedProject.scenes.length + 1,
      imageUri: '', // Will be generated
      duration: length,
      description: prompt.trim(),
      voice: 'British Male',
      audioTrack: 'Cinematic Ambient',
    };

    // Add scene to project
    const updatedScenes = [...selectedProject.scenes, newScene];
    updateProject(selectedProject.id, { scenes: updatedScenes });
    
    // Navigate back to storyboard
    router.replace('/storyboard');
  };

  if (!selectedProject) {
    router.replace('/');
    return null;
  }

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
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>New Scene</Text>
            <Text style={styles.subtitle}>STEP 1/3</Text>
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Story Prompt Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Story Prompt</Text>
            <View style={styles.promptContainer}>
              <TextInput
                style={styles.promptInput}
                value={prompt}
                onChangeText={setPrompt}
                placeholder="Enter your scene description..."
                placeholderTextColor={theme.colors.teal + '80'}
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[styles.aiEnhanceButton, isEnhancing && styles.aiEnhanceButtonDisabled]}
                onPress={handleAIEnhance}
                disabled={isEnhancing || !prompt.trim()}
              >
                {isEnhancing ? (
                  <ActivityIndicator size="small" color={theme.colors.dark.text.primary} />
                ) : (
                  <>
                    <Text style={styles.aiEnhanceIcon}>✨</Text>
                    <Text style={styles.aiEnhanceText}>AI Enhance</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Visual Style Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visual Style</Text>
            <View style={styles.styleContainer}>
              {VISUAL_STYLES.map((style) => (
                <StyleThumbnail
                  key={style.id}
                  id={style.id}
                  name={style.name}
                  imageUri={style.imageUri}
                  isSelected={selectedStyle === style.id}
                  onPress={() => setSelectedStyle(style.id)}
                />
              ))}
            </View>
          </View>

          {/* Configuration Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Configuration</Text>
            <View style={styles.configRow}>
              <View style={styles.configItem}>
                <Dropdown
                  icon="▭"
                  label="RATIO"
                  value={ratio}
                  onPress={() => {
                    // TODO: Open ratio picker
                    console.log('Ratio picker');
                  }}
                />
              </View>
              <View style={styles.configItem}>
                <Dropdown
                  icon="🕐"
                  label="LENGTH"
                  value={length}
                  onPress={() => {
                    // TODO: Open length picker
                    console.log('Length picker');
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Create Button */}
        <View style={styles.footer}>
          <Button
            title="Create Scene"
            onPress={handleCreateScene}
            disabled={!prompt.trim()}
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
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    fontSize: 10,
    letterSpacing: 1,
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  promptContainer: {
    backgroundColor: '#0D4A42', // Dark teal background
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    minHeight: 150,
    position: 'relative',
  },
  promptInput: {
    ...theme.typography.body1,
    color: theme.colors.teal + 'CC', // Lighter teal for text
    minHeight: 120,
    lineHeight: 24,
  },
  aiEnhanceButton: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dark.surfaceVariant,
    borderWidth: 1,
    borderColor: theme.colors.teal,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  aiEnhanceButtonDisabled: {
    opacity: 0.5,
  },
  aiEnhanceIcon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  aiEnhanceText: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  styleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: -theme.spacing.xs,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configItem: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dark.border,
    backgroundColor: theme.colors.dark.surface,
  },
});
