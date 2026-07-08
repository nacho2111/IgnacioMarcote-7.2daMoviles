import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FORMATO_EMAIL = /\S+@\S+\.\S+/;

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [sesion, setSesion] = useState<string | null>(null);
  const [modo, setModo] = useState<'login' | 'registro'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const cargarSesion = async () => {
      const guardada = await AsyncStorage.getItem('sesionActiva');
      if (guardada) setSesion(guardada);
      setCargando(false);
    };
    cargarSesion();
  }, []);

  const validarFormulario = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return false;
    }
    if (!FORMATO_EMAIL.test(email)) {
      Alert.alert('Error', 'El formato del correo no es válido');
      return false;
    }
    if (password.length < 4) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return false;
    }
    return true;
  };

  const handleRegistro = async () => {
    if (!validarFormulario()) return;
    await AsyncStorage.setItem('usuarioRegistrado', JSON.stringify({ email, password }));
    await AsyncStorage.setItem('sesionActiva', email);
    setSesion(email);
  };

  const handleLogin = async () => {
    if (!validarFormulario()) return;
    const guardado = await AsyncStorage.getItem('usuarioRegistrado');
    const usuario = guardado ? JSON.parse(guardado) : null;

    if (usuario && usuario.email === email && usuario.password === password) {
      await AsyncStorage.setItem('sesionActiva', email);
      setSesion(email);
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('sesionActiva');
    setSesion(null);
    setEmail('');
    setPassword('');
  };

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (sesion) {
    return (
      <View style={styles.center}>
        <Text style={styles.titulo}>Bienvenido, {sesion}</Text>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.titulo}>
        {modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={modo === 'login' ? 'Ingresar' : 'Registrarme'}
        onPress={modo === 'login' ? handleLogin : handleRegistro}
      />

      <TouchableOpacity
        onPress={() => setModo(modo === 'login' ? 'registro' : 'login')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: '#2196f3' }}>
          {modo === 'login'
            ? '¿No tenés cuenta? Registrate'
            : '¿Ya tenés cuenta? Iniciá sesión'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titulo: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
});
