import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { useStoryStore } from '../store/storyStore';
import { createStoryJob, getJobStatus } from '../services/api';
import { CircularProgress } from '../components/CircularProgress';
import { ProgressBar } from '../components/ProgressBar';
import { PipelineStep } from '../components/PipelineStep';
import { BottomNavigation } from '../components/BottomNavigation';
import { theme } from '../theme';

const BOTTOM_NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: '⌂' },
  { id: 'create', label: 'CREATE', icon: '+' },
  { id: 'library', label: 'LIBRARY', icon: '▶' },
  { id: 'discover', label: 'DISCOVER', icon: '◈' },
  { id: 'profile', label: 'PROFILE', icon: '◯' },
];

export default function GeneratingScreen() {
  const router = useRouter();
  const { storyPrompt, selectedStyle } = useStoryStore();
  const { setJobId } = useStoryStore();
  const [progress, setProgress] = useState(45);
  const [currentTask, setCurrentTask] = useState('Orchestrating scene transitions...');
  const [estimatedTime, setEstimatedTime] = useState(45);
  const [activeNav, setActiveNav] = useState('create');

  const { data: jobData, isLoading: isCreating } = useQuery({
    queryKey: ['createJob', storyPrompt, selectedStyle],
    queryFn: () => createStoryJob({
      prompt: storyPrompt || '',
      style: selectedStyle || 'cinematic',
    }),
    enabled: !!storyPrompt && !!selectedStyle,
  });

  const jobId = jobData?.jobId;

  const { data: jobStatus } = useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: () => getJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'completed' || status === 'failed' ? false : 3000;
    },
  });

  useEffect(() => {
    if (jobId) {
      setJobId(jobId);
    }
  }, [jobId, setJobId]);

  useEffect(() => {
    if (jobStatus?.progress !== undefined) {
      setProgress(jobStatus.progress);
    }

    if (jobStatus?.currentStep) {
      switch (jobStatus.currentStep) {
        case 'writing_story':
          setCurrentTask('Scripting storyboard...');
          break;
        case 'generating_visuals':
          setCurrentTask('Visualizing cinematic scenes...');
          break;
        case 'creating_narration':
          setCurrentTask('Generating voiceover & score...');
          break;
        case 'rendering_video':
          setCurrentTask('Final video stitching...');
          break;
        default:
          setCurrentTask('Orchestrating scene transitions...');
      }
    }

    if (jobStatus?.status === 'completed' && jobStatus.videoUrl) {
      router.replace('/preview');
    } else if (jobStatus?.status === 'failed') {
      console.error('Job failed:', jobStatus.error);
    }
  }, [jobStatus, router]);

  const getPipelineSteps = () => {
    if (!jobStatus) {
      return [
        { label: 'Scripting Storyboard', status: 'completed' as const },
        { label: 'Generating Voiceover & Score', status: 'processing' as const },
        { label: 'Visualizing Cinematic Scenes', status: 'pending' as const },
        { label: 'Final Video Stitching', status: 'pending' as const },
      ];
    }

    const steps = [
      { label: 'Scripting Storyboard', step: 'writing_story' },
      { label: 'Generating Voiceover & Score', step: 'creating_narration' },
      { label: 'Visualizing Cinematic Scenes', step: 'generating_visuals' },
      { label: 'Final Video Stitching', step: 'rendering_video' },
    ];

    const currentStepIndex = steps.findIndex((s) => s.step === jobStatus.currentStep);

    return steps.map((step, index) => {
      if (index < currentStepIndex) {
        return { label: step.label, status: 'completed' as const };
      } else if (index === currentStepIndex) {
        return { label: step.label, status: 'processing' as const };
      } else {
        return { label: step.label, status: 'pending' as const };
      }
    });
  };

  const handleMinimize = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Creating Story</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Circular Progress */}
        <View style={styles.progressSection}>
          <CircularProgress
            progress={progress}
            size={200}
            icon={
              <View style={styles.iconContainer}>
                <Text style={styles.clapperIcon}>🎬</Text>
                <Text style={styles.sparkleIcon}>✨</Text>
              </View>
            }
          />
        </View>

        {/* Current Task */}
        <View style={styles.taskSection}>
          <Text style={styles.currentTask}>{currentTask}</Text>
          <Text style={styles.estimatedTime}>Estimated time: {estimatedTime}s</Text>
        </View>

        {/* Overall Progress */}
        <View style={styles.overallProgressSection}>
          <View style={styles.overallProgressHeader}>
            <Text style={styles.sectionTitle}>Overall Progress</Text>
            <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
          </View>
          <ProgressBar progress={progress} height={8} />
        </View>

        {/* Real-time Pipeline */}
        <View style={styles.pipelineSection}>
          <Text style={styles.sectionTitle}>REAL-TIME PIPELINE</Text>
          {getPipelineSteps().map((step, index) => (
            <PipelineStep key={index} label={step.label} status={step.status} />
          ))}
        </View>

        {/* Work in Background */}
        <View style={styles.backgroundSection}>
          <View style={styles.backgroundHeader}>
            <Text style={styles.bellIcon}>🔔</Text>
            <Text style={styles.sectionTitle}>Work in Background</Text>
          </View>
          <Text style={styles.backgroundDescription}>
            We'll notify you once your cinematic vision is ready to view.
          </Text>
          <TouchableOpacity style={styles.minimizeButton} onPress={handleMinimize}>
            <Text style={styles.minimizeButtonText}>Minimize & Notify Me</Text>
          </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.dark.border,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
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
    paddingBottom: 100,
  },
  progressSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clapperIcon: {
    fontSize: 48,
  },
  sparkleIcon: {
    fontSize: 24,
    marginTop: -theme.spacing.sm,
  },
  taskSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  currentTask: {
    ...theme.typography.body1,
    color: theme.colors.dark.text.primary,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  estimatedTime: {
    ...theme.typography.body2,
    color: theme.colors.teal,
    fontWeight: '500',
  },
  overallProgressSection: {
    marginBottom: theme.spacing.xl,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  progressPercentage: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.primary,
    fontWeight: '600',
  },
  pipelineSection: {
    marginBottom: theme.spacing.xl,
  },
  backgroundSection: {
    backgroundColor: theme.colors.dark.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  backgroundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  bellIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  backgroundDescription: {
    ...theme.typography.body2,
    color: theme.colors.dark.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  minimizeButton: {
    backgroundColor: theme.colors.teal,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  minimizeButtonText: {
    ...theme.typography.body2,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
});
