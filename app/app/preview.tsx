import { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useStoryStore } from '../store/storyStore';
import { getJobStatus } from '../services/api';
import { Button } from '../components/Button';
import { theme } from '../theme';

export default function PreviewScreen() {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { jobId } = useStoryStore();

  const { data: jobStatus } = useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: () => getJobStatus(jobId!),
    enabled: !!jobId,
  });

  const videoUrl = jobStatus?.videoUrl;

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleExport = () => {
    router.push('/export');
  };

  if (!videoUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Video not available</Text>
          <Button title="Go Back" onPress={() => router.back()} variant="outline" fullWidth />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
            }
          }}
        />
      </View>

      <View style={styles.controls}>
        <Button
          title="Regenerate"
          onPress={() => router.push('/generating')}
          variant="outline"
          style={styles.regenerateButton}
        />
        <Button
          title="Export & Share"
          onPress={handleExport}
          style={styles.exportButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.text.primary,
    padding: theme.spacing.md,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.lg,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  regenerateButton: {
    flex: 1,
  },
  exportButton: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    ...theme.typography.body1,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
});
