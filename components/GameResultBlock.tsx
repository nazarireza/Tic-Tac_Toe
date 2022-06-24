import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type GameResult = { O: number; X: number };

export const GameResultBlock = memo<GameResult>(({ X, O }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        <Text style={styles.boldText}>X</Text> score is{' '}
        <Text style={styles.boldText}>{X}</Text>
      </Text>
      <View style={styles.spacer} />
      <Text style={styles.turnText}>
        <Text style={styles.boldText}>O</Text> score is{' '}
        <Text style={styles.boldText}>{O}</Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  turnText: {
    padding: 15,
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
});
