import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useStoryStore } from '../store/storyStore';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';

const STYLES = [
  { id: 'cinematic', name: 'Cinematic', description: 'Hollywood-style dramatic visuals', icon: '🎬' },
  { id: 'anime', name: 'Anime', description: 'Animated Japanese art style', icon: '🎨' },
  { id: 'kids', name: 'Kids', description: 'Colorful and playful', icon: '🌈' },
  { id: 'documentary', name: 'Documentary', description: 'Realistic and informative', icon: '📹' },
];

export default function StylePickerScreen() {
  const router = useRouter();
  const { selectedStyle, setSelectedStyle, storyPrompt } = useStoryStore();

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleGenerate = () => {
    if (!selectedStyle) {
      return;
    }
    router.push('/generating');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Style</Text>
      <Text style={styles.subtitle}>Select a visual style for your story</Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {STYLES.map((style) => (
          <Card
            key={style.id}
            variant="outlined"
            selected={selectedStyle === style.id}
            onPress={() => handleStyleSelect(style.id)}
            style={styles.styleCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.styleIcon}>{style.icon}</Text>
              <View style={styles.styleInfo}>
                <Text style={styles.styleName}>{style.name}</Text>
                <Text style={styles.styleDescription}>{style.description}</Text>
              </View>
              {selectedStyle === style.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          </Card>
        ))}
      </ScrollView>

      <Button
        title="Generate Video"
        onPress={handleGenerate}
        disabled={!selectedStyle}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.md,
  },
  styleCard: {
    marginBottom: theme.spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleIcon: {
    fontSize: 48,
    marginRight: theme.spacing.md,
  },
  styleInfo: {
    flex: 1,
  },
  styleName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  styleDescription: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.md,
  },
  checkmarkText: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
