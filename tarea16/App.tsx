import React, { useRef, useState } from 'react';
import { Animated, View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Inicio: undefined;
  Detalle: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AnimacionesDemo({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const moveAnim = useRef(new Animated.Value(0)).current;
  const [abajo, setAbajo] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 800, useNativeDriver: true }).start();
  };

  const mover = () => {
    Animated.timing(moveAnim, {
      toValue: abajo ? 0 : 150,
      duration: 800,
      useNativeDriver: true,
    }).start();
    setAbajo(!abajo);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.texto, { opacity: fadeAnim }]}>
        ¡Hola Mundo!
      </Animated.Text>

      <View style={styles.botones}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>

      <Animated.View
        style={[styles.box, { transform: [{ translateY: moveAnim }] }]}
      />
      <Button title="Mover" onPress={mover} />

      <View style={{ height: 20 }} />
      <Button title="Ir a Detalle" onPress={() => navigation.navigate('Detalle')} />
    </View>
  );
}

function DetalleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pantalla de Detalle</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
        <Stack.Screen name="Inicio" component={AnimacionesDemo} />
        <Stack.Screen name="Detalle" component={DetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  texto: { fontSize: 24, marginBottom: 20 },
  botones: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#6200ee',
    borderRadius: 12,
    marginBottom: 20,
  },
});
