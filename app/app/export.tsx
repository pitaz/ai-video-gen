import { View, Text, StyleSheet, Share, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useStoryStore } from '../store/storyStore';
import { getJobStatus } from '../services/api';
import * as FileSystem from 'expo-file-system';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { theme } from '../theme';

export default function ExportScreen() {
  const router = useRouter();
  const { jobId } = useStoryStore();

  const { data: jobStatus } = useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: () => getJobStatus(jobId!),
    enabled: !!jobId,
  });

  const videoUrl = jobStatus?.videoUrl;

  const handleShare = async () => {
    if (!videoUrl) {
      Alert.alert('Error', 'Video URL not available');
      return;
    }

    try {
      await Share.share({
        message: `Check out my AI-generated video story! ${videoUrl}`,
        url: videoUrl,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share video');
    }
  };

  const handleDownload = async () => {
    if (!videoUrl) {
      Alert.alert('Error', 'Video URL not available');
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + `video_${Date.now()}.mp4`;
      const downloadResult = await FileSystem.downloadAsync(videoUrl, fileUri);
      
      Alert.alert('Success', `Video saved to ${downloadResult.uri}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to download video');
    }
  };

  const handleCreateNew = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>Your Video is Ready!</Text>
        <Text style={styles.subtitle}>
          Share it with friends or download it to your device
        </Text>

        <View style={styles.buttonGroup}>
          <Card variant="elevated" onPress={handleShare} style={styles.actionCard}>
            <Text style={styles.buttonIcon}>📤</Text>
            <Text style={styles.actionText}>Share</Text>
          </Card>

          <Card variant="elevated" onPress={handleDownload} style={styles.actionCard}>
            <Text style={styles.buttonIcon}>💾</Text>
            <Text style={styles.actionText}>Download</Text>
          </Card>
        </View>

        <Button
          title="Create Another Story"
          onPress={handleCreateNew}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  icon: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    width: '100%',
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    minHeight: 120,
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 40,
    marginBottom: theme.spacing.sm,
  },
  actionText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
});
