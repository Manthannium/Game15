import { StyleSheet, View} from 'react-native';
import Game from './components/Game';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Game/>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,200,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
