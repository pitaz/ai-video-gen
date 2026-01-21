import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ProjectCard } from '../components/ProjectCard';
import { theme } from '../theme';

// Mock search results
const SEARCH_RESULTS = [
  {
    id: 'search-1',
    name: 'Epic Space Journey',
    description: 'A journey through the cosmos',
    thumbnailUri: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    duration: '2:30',
    sceneCount: 5,
    views: '12.5K',
    likes: '2.3K',
    category: 'sci-fi',
  },
  {
    id: 'search-2',
    name: 'Mystical Forest',
    description: 'Ancient secrets in the woods',
    thumbnailUri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    duration: '1:45',
    sceneCount: 3,
    views: '8.9K',
    likes: '1.8K',
    category: 'fantasy',
  },
  {
    id: 'search-3',
    name: 'Neon City Dreams',
    description: 'Cyberpunk adventure',
    thumbnailUri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
    duration: '3:15',
    sceneCount: 7,
    views: '15.2K',
    likes: '3.1K',
    category: 'sci-fi',
  },
];

const RECENT_SEARCHES = [
  'fantasy adventure',
  'sci-fi space',
  'mystery thriller',
  'romantic story',
];

const TRENDING_SEARCHES = [
  'epic battle',
  'ancient temple',
  'cyberpunk city',
  'magical forest',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof SEARCH_RESULTS>([]);
  const router = useRouter();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      // Filter results based on query
      const filtered = SEARCH_RESULTS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultPress = (result: typeof SEARCH_RESULTS[0]) => {
    // Navigate to project details or preview
    console.log('View result:', result.id);
    // router.push(`/project/${result.id}`);
  };

  const renderSearchResult = ({ item }: { item: typeof SEARCH_RESULTS[0] }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleResultPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.thumbnailUri }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.resultDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.resultMeta}>
          <Text style={styles.resultMetaText}>👁 {item.views}</Text>
          <Text style={styles.resultMetaText}>❤️ {item.likes}</Text>
          <Text style={styles.resultMetaText}>⏱ {item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stories, creators, templates..."
          placeholderTextColor={theme.colors.dark.text.secondary}
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          <>
            {/* Recent Searches */}
            {RECENT_SEARCHES.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <View style={styles.chipsContainer}>
                  {RECENT_SEARCHES.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.chip}
                      onPress={() => handleSearch(search)}
                    >
                      <Text style={styles.chipText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Searches</Text>
              <View style={styles.chipsContainer}>
                {TRENDING_SEARCHES.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.chip}
                    onPress={() => handleSearch(search)}
                  >
                    <Text style={styles.chipText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Search Results */}
            {searchResults.length > 0 ? (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {searchResults.length} Results
                </Text>
                <FlatList
                  data={searchResults}
                  renderItem={renderSearchResult}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.resultsList}
                />
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No results found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try a different search term
                </Text>
              </View>
            )}
          </>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  clearButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    fontSize: 18,
    color: theme.colors.dark.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.dark.surface,
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
  },
  chipText: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
  },
  resultsList: {
    gap: theme.spacing.md,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.dark.border,
    marginBottom: theme.spacing.md,
  },
  resultImage: {
    width: 120,
    height: 90,
  },
  resultContent: {
    flex: 1,
    padding: theme.spacing.md,
  },
  resultTitle: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  resultDescription: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  resultMetaText: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 11,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyStateText: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyStateSubtext: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
  },
});
