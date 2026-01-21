import { Stack, usePathname, useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as React from 'react';
import { theme } from '@/theme';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useNavigationStore } from '@/store/navigationStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const BOTTOM_NAV_ITEMS = [
  { id: 'explore', label: 'EXPLORE', icon: '◈', route: '/explore' },
  { id: 'projects', label: 'PROJECTS', icon: '◉', route: '/projects' },
  { id: 'search', label: 'SEARCH', icon: '🔍', route: '/search' },
  { id: 'profile', label: 'PROFILE', icon: '◯', route: '/profile' },
];

// Screens that should show bottom navigation
const BOTTOM_NAV_SCREENS = ['/', '/explore', '/projects', '/search', '/profile', '/index'];

function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeTab, setActiveTab } = useNavigationStore();

  // Update active tab based on current route
  useEffect(() => {
    const currentRoute = pathname === '/index' || pathname === '/' ? '/explore' : pathname;
    const navItem = BOTTOM_NAV_ITEMS.find((item) => item.route === currentRoute);
    if (navItem) {
      setActiveTab(navItem.id);
    } else if (pathname === '/index' || pathname === '/') {
      // Default to explore if on index
      setActiveTab('explore');
    }
  }, [pathname, setActiveTab]);

  const handleNavPress = (itemId: string) => {
    const navItem = BOTTOM_NAV_ITEMS.find((item) => item.id === itemId);
    if (navItem) {
      const targetRoute = navItem.route === '/' ? '/index' : navItem.route;
      if (targetRoute !== pathname) {
        setActiveTab(itemId);
        router.push(targetRoute as any);
      }
    }
  };

  const normalizedPath = pathname === '/index' ? '/' : pathname;
  const showBottomNav = BOTTOM_NAV_SCREENS.includes(normalizedPath);

  return (
    <View style={styles.container}>
      {children}
      {showBottomNav && (
        <BottomNavigation
          items={BOTTOM_NAV_ITEMS}
          activeItem={activeTab}
          onItemPress={handleNavPress}
        />
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationWrapper>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.teal,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="projects" options={{ headerShown: false }} />
          <Stack.Screen name="explore" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="create-project" options={{ headerShown: false }} />
          <Stack.Screen name="create-scene" options={{ headerShown: false }} />
          <Stack.Screen name="create-story" options={{ headerShown: false }} />
          <Stack.Screen name="storyboard" options={{ headerShown: false }} />
          <Stack.Screen name="style-picker" options={{ title: 'Choose Style' }} />
          <Stack.Screen name="generating" options={{ title: 'Creating Your Story', headerBackVisible: false }} />
          <Stack.Screen name="preview" options={{ title: 'Preview' }} />
          <Stack.Screen name="export" options={{ title: 'Export & Share' }} />
        </Stack>
      </NavigationWrapper>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
