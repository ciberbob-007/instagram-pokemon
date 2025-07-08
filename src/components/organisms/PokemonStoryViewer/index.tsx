import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import { useRef, useEffect, useState } from 'react';
import ProgressBar from '@/components/atoms/ProgressBar';
import PokemonImage from '@/components/atoms/PokemonImage';
import PokemonName from '@/components/atoms/PokemonName';
import { ThemedText } from '@/components/atoms/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import type { PokemonStory } from '@/types/pokemon';

const STORY_DURATION = 10000; // ms

export default function PokemonStoryViewer({
  stories,
  onClose,
}: {
  stories: PokemonStory[];
  onClose: () => void;
}) {
  const [loadingImage, setLoadingImage] = useState(true);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
  setProgress(0);
  const startTime = Date.now();
  timer.current = setInterval(() => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progressValue = Math.min(elapsed / STORY_DURATION, 1);
    setProgress(progressValue);
    if (progressValue >= 1) {
      if (timer.current) clearInterval(timer.current);
      if (current < stories.length - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        onClose();
      }
    }
  }, 50);
  return () => {
    if (timer.current) clearInterval(timer.current);
  };
}, [current, stories.length, onClose]);

  const handleTap = (evt: any) => {
  const { locationX } = evt.nativeEvent;
  if (locationX < Dimensions.get('window').width / 2) {
    // Tap izquierda
    if (current > 0) {
      ('TAP IZQUIERDA: retrocede');
      setCurrent((prev) => prev - 1);
    }
  } else {
    // Tap derecha
    if (current < stories.length - 1) {
      ('TAP DERECHA: avanza');
      setCurrent((prev) => prev + 1);
    } else {
      ('TAP DERECHA: cerrar');
      onClose();
    }
  }
};

  const story = stories[current];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.container}>
        <View style={styles.progressRow}>
          {stories.map((_, idx) => (
            <ProgressBar
              key={idx + '-' + (idx === current ? progress.toFixed(3) : '')}
              progress={
                idx < current ? 1 : idx === current ? progress : 0
              }
            />
          ))}
        </View>
        <View style={styles.storyArea}>
          {loadingImage && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <PokemonImage
            key={story.id}
            uri={story.image}
            style={[
              styles.imageLarge,
              styles.glow,
              loadingImage ? { opacity: 0 } : { opacity: 1 },
            ]}
            onLoadStart={() => setLoadingImage(true)}
            onLoadEnd={() => setLoadingImage(false)}
          />
          <ThemedText style={styles.pokemonName}>{story.name.toUpperCase()}</ThemedText>
          <View style={styles.infoBlock}>
            <ThemedText style={styles.infoLabel}>Type</ThemedText>
            <View style={styles.badgeRowFull}>
              {story.types.map((type: string) => (
                <View key={type} style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}> 
                  <ThemedText style={styles.badgeText}>{type}</ThemedText>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.infoBlock}>
            <ThemedText style={styles.infoLabel}>Abilities</ThemedText>
            <View style={styles.badgeRowFull}>
              {story.abilities.map((ab: string) => (
                <View key={ab} style={styles.abilityBadge}>
                  <ThemedText style={styles.abilityText}>{ab}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={32} color="#fff" />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
