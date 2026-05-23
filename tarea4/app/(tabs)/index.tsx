import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSaludo, setMostrarSaludo] = useState(false);

  const verificarFormulario = () => {
    if (
      nombre.trim() !== '' &&
      password.trim() !== ''
    ) {
      setMostrarSaludo(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu nombre"
        value={nombre}
        onChangeText={setNombre}
        onSubmitEditing={verificarFormulario}
        returnKeyType="next"
      />

      <Text>Contraseña:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        onSubmitEditing={verificarFormulario}
        returnKeyType="done"
      />

      {mostrarSaludo && (
        <Text style={styles.saludo}>
          Hola, {nombre}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },

  saludo: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});