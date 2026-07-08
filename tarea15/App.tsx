import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const nombre = Constants.expoConfig?.name;
  const version = Constants.expoConfig?.version;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.version}>Versión {version}</Text>
      <Text style={styles.info}>
        Lista para probar con Expo Go (npx expo start) o generar una build con EAS.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#6200ee' },
  version: { fontSize: 16, color: '#555', marginTop: 5, marginBottom: 20 },
  info: { textAlign: 'center', color: '#333' },
});
