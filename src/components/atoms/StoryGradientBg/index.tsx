import React from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

const TYPE_COLORS: Record<string, string> = {
  fire: '#FF9800',
  water: '#2196F3',
  grass: '#43A047',
  electric: '#FFD600',
  psychic: '#D500F9',
  ice: '#00E5FF',
  dragon: '#7C4DFF',
  dark: '#263238',
  fairy: '#FF80AB',
  normal: '#BDBDBD',
  fighting: '#F44336',
  flying: '#90CAF9',
  poison: '#8E24AA',
  ground: '#A1887F',
  rock: '#757575',
  bug: '#AEEA00',
  ghost: '#757575',
  steel: '#90A4AE',
};

type StoryGradientBgProps = ViewProps & {
  type: string;
  children: React.ReactNode;
  style?: ViewProps['style'];
};

export default function StoryGradientBg({ type, children, style, ...rest }: StoryGradientBgProps) {
  const color = TYPE_COLORS[type] || '#607D8B';
  return (
    <View style={[styles.absolute, style]} {...rest}>
      <LinearGradient
        colors={[
          color,
          'rgba(0,0,0,0.7)',
        ]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      {children}
    </View>
  );
}

