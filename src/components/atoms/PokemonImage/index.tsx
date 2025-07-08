// Atom: Imagen del Pokémon
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { styles } from './styles';

type PokemonImageProps = {
  uri: string;
  style?: StyleProp<ImageStyle>;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
};

export default function PokemonImage({ uri, style, onLoadStart, onLoadEnd, containerStyle }: PokemonImageProps & { containerStyle?: any }) {

  if (!uri) {
    return <>
      <div style={{color: 'red', textAlign: 'center'}}>Imagen no disponible</div>
    </>;
  }
  // Web
  const isWeb = typeof document !== 'undefined';
  if (isWeb) {
    return (
      <div style={containerStyle}>
        <img
          src={uri}
          alt="Pokemon"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            ...(Array.isArray(style) ? Object.assign({}, ...style) : style)
          }}
          onLoad={onLoadEnd}
          onError={() => console.error('Error cargando la imagen:', uri)}
        />
      </div>
    );
  }
  if (containerStyle) {
    return (
      <View style={containerStyle}>
        <Image
          source={{ uri }}
          style={[styles.image, style]}
          resizeMode="contain"
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
        />
      </View>
    );
  }
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

