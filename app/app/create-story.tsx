import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useStoryStore } from '../store/storyStore';
import { StyleThumbnail } from '../components/StyleThumbnail';
import { Dropdown } from '../components/Dropdown';
import { BottomNavigation } from '../components/BottomNavigation';
import { theme } from '../theme';

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

const BOTTOM_NAV_ITEMS = [
  { id: 'create', label: 'Create', icon: '◉' },
  { id: 'discover', label: 'Discover', icon: '◈' },
  { id: 'archive', label: 'Archive', icon: '▶' },
  { id: 'profile', label: 'Profile', icon: '◯' },
];

export default function CreateStoryScreen() {
  const [prompt, setPrompt] = useState('A futuristic nomad wandering through a neon-lit rainforest, bioluminescent plants glowing in the dark...');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [ratio, setRatio] = useState('16:9 Wide');
  const [length, setLength] = useState('10 Seconds');
  const [activeNav, setActiveNav] = useState('create');
  const router = useRouter();
  const { setStoryPrompt, setSelectedStyle: setStoreStyle } = useStoryStore();

  const handleContinue = () => {
    if (prompt.trim().length === 0) {
      return;
    }
    setStoryPrompt(prompt.trim());
    setStoreStyle(selectedStyle);
    router.push('/generating');
  };

  const handleAIEnhance = () => {
    // TODO: Implement AI enhancement
    console.log('AI Enhance clicked');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>New Story</Text>
        <Text style={styles.stepIndicator}>STEP 1/3</Text>
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
              placeholder="Enter your story prompt..."
              placeholderTextColor={theme.colors.teal + '80'}
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.aiEnhanceButton} onPress={handleAIEnhance}>
              <Text style={styles.aiEnhanceIcon}>✨</Text>
              <Text style={styles.aiEnhanceText}>AI Enhance</Text>
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
        {/* Continue Button */}
        <TouchableOpacity  onPress={handleContinue}  style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>

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
  topBarTitle: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  stepIndicator: {
    ...theme.typography.body2,
    color: theme.colors.secondary,
    fontWeight: '600',
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
  continueButton: {
    backgroundColor: theme.colors.teal,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
    ...theme.typography.body1,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  continueButtonText: {
    ...theme.typography.body1,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
});
