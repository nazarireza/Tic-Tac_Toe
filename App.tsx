import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { GameResult, GameResultBlock } from './components/GameResultBlock';
import { Scene } from './components/Scene';
import { useGameLogic } from './utilities/useGameLogic';

const GRID_SIZE = 3;

export default function App() {
  const [gameState, setGameState] = useState<GameResult>({
    O: 0,
    X: 0,
  });

  const { turn, state, move } = useGameLogic({
    size: GRID_SIZE,
    onFinish: ({ winner, reset }) => {
      if (winner)
        setGameState((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));

      Alert.alert(winner ? `Winner is ${winner}!` : 'Game Over!', undefined, [
        { text: 'Restart Game', onPress: reset },
      ]);
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.turnText}>
        <Text style={styles.boldText}>{turn}</Text> Turn
      </Text>
      <Scene
        sceneSize={350}
        gridSize={GRID_SIZE}
        borderSize={3}
        state={state}
        onSelect={move}
      />
      <GameResultBlock {...gameState} />
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
