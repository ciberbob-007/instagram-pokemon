// Atom: Imagen del Pokémon
import { Image, ImageStyle, StyleProp } from 'react-native';
import { styles } from './styles';

type PokemonImageProps = {
  uri: string;
  style?: StyleProp<ImageStyle>;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
};

export default function PokemonImage({ uri, style, onLoadStart, onLoadEnd }: PokemonImageProps) {
  return (
    <Image
      source={{ uri }}
      style={[styles.image, style]}
      resizeMode="contain"
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
}

