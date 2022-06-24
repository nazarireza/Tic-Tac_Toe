import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Scene } from './components/Scene';
import { Position } from './utilities/useGridCalculation';

export type Player = 'X' | 'O';

export type GameStateItem = {
  player: Player;
  move: Position;
};

export default function App() {
  const [turn, setTurn] = useState<Player>('O');
  const [state, setState] = useState<GameStateItem[]>([]);

  const onMove = useCallback(
    (position: Position) => {
      setState((prev) => [...prev, { player: turn, move: position }]);

      const player = turn === 'O' ? 'X' : 'O';
      setTurn(player);
    },
    [turn]
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.turnText}>
        <Text style={styles.boldText}>{turn}</Text> Turn
      </Text>
      <Scene
        sceneSize={350}
        gridSize={3}
        borderSize={3}
        state={state}
        onSelect={onMove}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnText: {
    padding: 15,
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
