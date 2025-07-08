import { Animated, View } from 'react-native';
import { styles } from './styles';

export default function ProgressBar({
  progress,
}: {
  progress: number | Animated.Value;
}) {
  const isWeb = typeof document !== 'undefined';
  if (isWeb) {
    const { webProgressBarContainer, webProgressBarFill } = require('./stylesweb');
    const prog = typeof progress === 'number' ? progress : 0;
    return (
      <div style={webProgressBarContainer}>
        <div style={webProgressBarFill(prog)} />
      </div>
    );
  }
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

