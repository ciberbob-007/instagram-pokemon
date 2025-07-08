// App.tsx
import React, { useState } from 'react';
import { View, ActivityIndicator, Text, Button, Dimensions, SafeAreaView } from 'react-native';
import { usePokemonStories } from '../src/hooks/usePokemonStories';
import PokemonStoryViewer from '@/components/organisms/PokemonStoryViewer';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const { stories, loading, error } = usePokemonStories(10);
  const [showStories, setShowStories] = useState(false);

  if (loading) return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
    </SafeAreaView>
  );
  if (error) return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>{error}</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222' }}>
            {showStories ? (
        <PokemonStoryViewer stories={stories} onClose={() => setShowStories(false)} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title="Ver historias de Pokémon" onPress={() => setShowStories(true)} />
        </View>
      )}
    </SafeAreaView>
  );
}
