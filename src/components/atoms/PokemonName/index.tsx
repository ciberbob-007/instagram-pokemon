// Atom: Nombre del Pokémon
import { ThemedText } from '@/components/atoms/ThemedText';
import { styles } from './styles';

export default function PokemonName({ name }: { name: string }) {
  return <ThemedText style={styles.name} type="title">{name}</ThemedText>;
}

