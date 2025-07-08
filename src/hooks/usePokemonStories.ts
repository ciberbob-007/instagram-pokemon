// hooks/usePokemonStories.ts
import {useState, useEffect} from 'react';
import { PokemonStory } from '@/types/pokemon';

export const usePokemonStories = (limit = 10) => {
  const [stories, setStories] = useState<PokemonStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await res.json();
        return data.results;
      } catch (e) {
        throw new Error('Error fetching Pokémon list');
      }
    };

    const fetchPokemonDetails = async (url: string): Promise<PokemonStory> => {
      const res = await fetch(url);
      const data = await res.json();
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types.map((t: any) => t.type.name),
        abilities: data.abilities.map((a: any) => a.ability.name),
      };
    };

    const fetchAllStories = async () => {
      try {
        const list = await fetchPokemonList();
        const detailsPromises = list.map((p: any) => fetchPokemonDetails(p.url));
        const allStories = await Promise.all(detailsPromises);
        setStories(allStories);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStories();
  }, [limit]);

  return { stories, loading, error };
};
