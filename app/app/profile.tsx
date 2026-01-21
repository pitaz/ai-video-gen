import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../theme';

// Mock user data
const USER_DATA = {
  name: 'John Doe',
  username: '@johndoe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  bio: 'Creative storyteller and video creator',
  stats: {
    projects: 12,
    followers: 1.2,
    following: 234,
    likes: 5.8,
  },
};

const MENU_ITEMS = [
  { id: 'settings', label: 'Settings', icon: '⚙️', route: '/settings' },
  { id: 'help', label: 'Help & Support', icon: '❓', route: '/help' },
  { id: 'about', label: 'About', icon: 'ℹ️', route: '/about' },
  { id: 'logout', label: 'Log Out', icon: '🚪', route: '/logout', danger: true },
];

const RECENT_ACTIVITY = [
  { id: '1', type: 'created', project: 'Epic Space Journey', time: '2 hours ago' },
  { id: '2', type: 'shared', project: 'Mystical Forest', time: '1 day ago' },
  { id: '3', type: 'liked', project: 'Neon City Dreams', time: '3 days ago' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  const handleMenuItemPress = (item: typeof MENU_ITEMS[0]) => {
    if (item.route === '/logout') {
      // Handle logout
      console.log('Logout');
    } else {
      console.log('Navigate to:', item.route);
      // router.push(item.route);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1) {
      return `${num.toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{USER_DATA.name}</Text>
          <Text style={styles.username}>{USER_DATA.username}</Text>
          <Text style={styles.bio}>{USER_DATA.bio}</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{USER_DATA.stats.projects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatNumber(USER_DATA.stats.followers)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{USER_DATA.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatNumber(USER_DATA.stats.likes)}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'activity' && styles.tabActive]}
            onPress={() => setActiveTab('activity')}
          >
            <Text style={[styles.tabText, activeTab === 'activity' && styles.tabTextActive]}>
              Activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'overview' ? (
          <View style={styles.content}>
            {/* Menu Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Text style={styles.menuItemIcon}>{item.icon}</Text>
                    <Text style={[styles.menuItemLabel, item.danger && styles.menuItemLabelDanger]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={styles.menuItemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            {/* Recent Activity */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              {RECENT_ACTIVITY.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Text style={styles.activityIconText}>
                      {activity.type === 'created' ? '✨' : activity.type === 'shared' ? '📤' : '❤️'}
                    </Text>
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityText}>
                      {activity.type === 'created' && 'Created'}
                      {activity.type === 'shared' && 'Shared'}
                      {activity.type === 'liked' && 'Liked'} <Text style={styles.activityProject}>{activity.project}</Text>
                    </Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
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
  editButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  editButtonText: {
    ...theme.typography.body2,
    color: theme.colors.teal,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: theme.spacing.md,
    borderWidth: 3,
    borderColor: theme.colors.teal,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  username: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  bio: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: theme.colors.teal,
  },
  tabText: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.secondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: theme.colors.teal,
  },
  content: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemLabel: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
  },
  menuItemLabelDanger: {
    color: theme.colors.error,
  },
  menuItemArrow: {
    fontSize: 24,
    color: theme.colors.dark.text.secondary,
  },
  activityItem: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.dark.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    marginBottom: theme.spacing.xs,
  },
  activityProject: {
    fontWeight: '600',
    color: theme.colors.teal,
  },
  activityTime: {
    ...theme.typography.caption,
    color: theme.colors.dark.text.secondary,
  },
});
