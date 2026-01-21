import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ProjectCard } from '../components/ProjectCard';
import { theme } from '../theme';

// Mock data for trending/featured content
const TRENDING_STORIES = [
  {
    id: 'trend-1',
    title: 'Epic Space Odyssey',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    views: '12.5K',
    likes: '2.3K',
    creator: 'SpaceCreator',
  },
  {
    id: 'trend-2',
    title: 'Mystical Forest Journey',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    views: '8.9K',
    likes: '1.8K',
    creator: 'NatureTales',
  },
  {
    id: 'trend-3',
    title: 'Neon City Dreams',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    views: '15.2K',
    likes: '3.1K',
    creator: 'CyberVisions',
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🌐' },
  { id: 'fantasy', name: 'Fantasy', icon: '🧙' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: '🚀' },
  { id: 'mystery', name: 'Mystery', icon: '🔍' },
  { id: 'romance', name: 'Romance', icon: '💕' },
  { id: 'horror', name: 'Horror', icon: '👻' },
  { id: 'adventure', name: 'Adventure', icon: '🗺️' },
  { id: 'comedy', name: 'Comedy', icon: '😂' },
];

const TEMPLATE_PRESETS = [
  {
    id: 'template-1',
    name: 'Hero\'s Journey',
    description: 'Classic three-act structure',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
    sceneCount: 5,
  },
  {
    id: 'template-2',
    name: 'Mystery Unfolding',
    description: 'Build suspense and reveal',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=200',
    sceneCount: 4,
  },
  {
    id: 'template-3',
    name: 'Romantic Encounter',
    description: 'Love story template',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200',
    sceneCount: 3,
  },
  {
    id: 'template-4',
    name: 'Epic Battle',
    description: 'High-energy action scenes',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200',
    sceneCount: 6,
  },
];

// Mock discoverable projects (public stories from community)
const DISCOVERABLE_PROJECTS = [
  {
    id: 'disc-1',
    name: 'The Last Guardian',
    description: 'A tale of friendship and sacrifice',
    thumbnailUri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    duration: '2:45',
    sceneCount: 5,
    views: '5.2K',
    likes: '892',
    category: 'fantasy',
  },
  {
    id: 'disc-2',
    name: 'Neon Nights',
    description: 'Cyberpunk cityscape adventure',
    thumbnailUri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    duration: '1:30',
    sceneCount: 3,
    views: '8.1K',
    likes: '1.5K',
    category: 'sci-fi',
  },
  {
    id: 'disc-3',
    name: 'Forest Whispers',
    description: 'Ancient secrets in the woods',
    thumbnailUri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    duration: '3:15',
    sceneCount: 7,
    views: '3.8K',
    likes: '654',
    category: 'mystery',
  },
  {
    id: 'disc-4',
    name: 'Starlight Romance',
    description: 'Love under the stars',
    thumbnailUri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
    duration: '2:00',
    sceneCount: 4,
    views: '6.7K',
    likes: '1.2K',
    category: 'romance',
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNav, setActiveNav] = useState('explore');
  const router = useRouter();

  const filteredProjects = selectedCategory === 'all'
    ? DISCOVERABLE_PROJECTS
    : DISCOVERABLE_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleProjectPress = (project: typeof DISCOVERABLE_PROJECTS[0]) => {
    // Navigate to project details or preview
    console.log('View project:', project.id);
    // router.push(`/project/${project.id}`);
  };

  const handleNavPress = (itemId: string) => {
    setActiveNav(itemId);
    if (itemId === 'home') {
      router.push('/');
    }
    // Add other navigation handlers as needed
  };

  const handleTemplatePress = (template: typeof TEMPLATE_PRESETS[0]) => {
    // Use template to create new project
    console.log('Use template:', template.id);
    router.push('/create-project');
  };

  const renderTrendingItem = ({ item }: { item: typeof TRENDING_STORIES[0] }) => (
    <TouchableOpacity style={styles.trendingCard} activeOpacity={0.8}>
      <Image source={{ uri: item.thumbnail }} style={styles.trendingImage} />
      <View style={styles.trendingOverlay}>
        <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.trendingMeta}>
          <Text style={styles.trendingMetaText}>👁 {item.views}</Text>
          <Text style={styles.trendingMetaText}>❤️ {item.likes}</Text>
        </View>
        <Text style={styles.trendingCreator}>by {item.creator}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderTemplateItem = ({ item }: { item: typeof TEMPLATE_PRESETS[0] }) => (
    <TouchableOpacity
      style={styles.templateCard}
      onPress={() => handleTemplatePress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.templateImage} />
      <View style={styles.templateContent}>
        <Text style={styles.templateName}>{item.name}</Text>
        <Text style={styles.templateDescription} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.templateScenes}>{item.sceneCount} scenes</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProjectCard = ({ item }: { item: typeof DISCOVERABLE_PROJECTS[0] }) => (
    <TouchableOpacity
      style={styles.discoverCard}
      onPress={() => handleProjectPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnailUri }} style={styles.discoverImage} />
      <View style={styles.discoverOverlay}>
        <Text style={styles.discoverTitle} numberOfLines={1}>{item.name}</Text>
        <View style={styles.discoverStats}>
          <Text style={styles.discoverStat}>👁 {item.views}</Text>
          <Text style={styles.discoverStat}>❤️ {item.likes}</Text>
        </View>
      </View>
      <View style={styles.discoverDuration}>
        <Text style={styles.discoverDurationText}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stories, creators, templates..."
            placeholderTextColor={theme.colors.dark.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={TRENDING_STORIES}
            renderItem={renderTrendingItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Templates Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Templates & Presets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={TEMPLATE_PRESETS}
            renderItem={renderTemplateItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.templatesList}
          />
        </View>

        {/* Discover Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>✨ Discover Stories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredProjects}
            renderItem={renderProjectCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.discoverRow}
            scrollEnabled={false}
            contentContainerStyle={styles.discoverList}
          />
        </View>
      </ScrollView>
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
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  headerTitle: {
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
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.dark.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.teal,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
  },
  seeAllText: {
    ...theme.typography.body2,
    color: theme.colors.teal,
    fontWeight: '600',
  },
  trendingList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  trendingCard: {
    width: 280,
    height: 180,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.dark.surfaceVariant,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: theme.spacing.md,
  },
  trendingTitle: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  trendingMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  trendingMetaText: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
  },
  trendingCreator: {
    ...theme.typography.caption,
    color: theme.colors.teal,
    fontSize: 11,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.dark.surface,
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
    gap: theme.spacing.xs,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.teal + '20',
    borderColor: theme.colors.teal,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryText: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: theme.colors.teal,
  },
  templatesList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  templateCard: {
    width: 160,
    backgroundColor: theme.colors.dark.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
  },
  templateImage: {
    width: '100%',
    height: 100,
  },
  templateContent: {
    padding: theme.spacing.sm,
  },
  templateName: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  templateDescription: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  templateScenes: {
    ...theme.typography.caption,
    color: theme.colors.teal,
    fontSize: 11,
  },
  discoverList: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 100,
  },
  discoverRow: {
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  discoverCard: {
    flex: 1,
    maxWidth: '48%',
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.dark.surface,
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
  },
  discoverImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  discoverOverlay: {
    padding: theme.spacing.sm,
  },
  discoverTitle: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  discoverStats: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  discoverStat: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 10,
  },
  discoverDuration: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  discoverDurationText: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.primary,
    fontSize: 10,
    fontWeight: '600',
  },
});
