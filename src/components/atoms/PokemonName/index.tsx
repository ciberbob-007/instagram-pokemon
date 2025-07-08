// Atom: Nombre del Pokémon
import { ThemedText } from '@/components/atoms/ThemedText';
import { styles } from './styles';

export default function PokemonName({ name }: { name: string }) {
  return (
    <ThemedText
      style={[styles.name, { marginBottom: 16, maxWidth: '90%', color: '#fff' }]}
      type="title"
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {name}
    </ThemedText>
  );
}

