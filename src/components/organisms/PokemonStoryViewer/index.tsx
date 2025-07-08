import {
  View,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { styles } from './styles';
import {
  webContainerStyle,
  webProgressRowStyle,
  webStoryAreaStyle,
  webImageStyle,
  webLoaderStyle,
  webInfoBlock,
  webBadgeRow,
  webBadge,
  webAbilityBadge,
} from './stylesweb';
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
  const [isSwipingDown, setIsSwipingDown] = useState(false);
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

  const panResponder = typeof document === 'undefined'
    ? PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          if (gestureState.dy > 70 && Math.abs(gestureState.dx) < 50) {
            onClose();
            return;
          }
          if (Math.abs(gestureState.dx) < 10 && Math.abs(gestureState.dy) < 10) {
            const { locationX } = evt.nativeEvent;
            if (locationX < Dimensions.get('window').width / 2) {
              if (current > 0) {
                setCurrent((prev) => prev - 1);
              } else {
                onClose();
              }
            } else {
              if (current < stories.length - 1) {
                setCurrent((prev) => prev + 1);
              } else {
                onClose();
              }
            }
          }
        },
      })
    : null;



  const story = stories[current];

  const handleWebClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const boundingRect = (evt.target as HTMLDivElement).getBoundingClientRect();
    const locationX = evt.clientX - boundingRect.left;
    if (locationX < boundingRect.width / 2) {
      if (current > 0) {
        setCurrent((prev) => prev - 1);
      } else {
        onClose();
      }
    } else {
      if (current < stories.length - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        onClose();
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
      {typeof document !== 'undefined' ? (
        (() => {
          return (
            <div style={webContainerStyle} onClick={handleWebClick}>
              <div style={webProgressRowStyle}>
                {stories.map((_, idx) => (
                  <ProgressBar
                    key={idx + '-' + (idx === current ? progress.toFixed(3) : '')}
                    progress={
                      idx < current ? 1 : idx === current ? progress : 0
                    }
                  />
                ))}
              </div>
              <div style={webStoryAreaStyle}>
                {loadingImage && (
                  <div style={webLoaderStyle}>
                    <ActivityIndicator size="large" color="#fff" />
                  </div>
                )}
                <div style={{ display: loadingImage ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={story.image}
                    alt={story.name}
                    style={{ ...webImageStyle, opacity: loadingImage ? 0 : 1 }}
                    onLoad={() => setLoadingImage(false)}
                  />
                  <div style={{ width: '100%' }}>
                    <PokemonName name={story.name} />
                  </div>
                  <div style={webInfoBlock}>
                    <ThemedText style={styles.infoLabel}>Type</ThemedText>
                    <div style={webBadgeRow}>
                      {story.types.map((type: string) => (
                        <div key={type} style={webBadge}>
                          <ThemedText style={styles.badgeText}>{type}</ThemedText>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={webInfoBlock}>
                    <ThemedText style={styles.infoLabel}>Abilities</ThemedText>
                    <div style={webBadgeRow}>
                      {story.abilities.map((ab: string) => (
                        <div key={ab} style={webAbilityBadge}>
                          <ThemedText style={styles.abilityText}>{ab}</ThemedText>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <View
          style={styles.container}
          {...(panResponder ? panResponder.panHandlers : {})}
        >
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
              containerStyle={{ marginBottom: 16 }}
              onLoadStart={() => setLoadingImage(true)}
              onLoadEnd={() => setLoadingImage(false)}
            />
            <PokemonName name={story.name} />
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
        </View>
      )}
    </SafeAreaView>
  );
}
