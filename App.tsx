import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Scene } from './components/Scene';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Scene
        sceneSize={350}
        gridSize={3}
        onSelect={(e) => console.log('LEE', e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
