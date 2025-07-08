import { Animated, View } from 'react-native';
import { styles } from './styles';

export default function ProgressBar({
  progress,
}: {
  progress: number | Animated.Value;
}) {
  return (
    <View style={styles.progressBackground}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width:
              progress instanceof Animated.Value
                ? progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  })
                : `${progress * 100}%`,
          },
        ]}
      />
    </View>
  );
}

