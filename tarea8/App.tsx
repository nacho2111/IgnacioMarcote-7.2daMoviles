import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { TemaProvider, TemaContext } from './contexts/TemaContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function PantallaLogin() {
  const { login } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');

  return (
    <View style={styles.center}>
      <Text style={styles.titulo}>Iniciar sesión</Text>
      <TextInput
        placeholder="Tu nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <Button
        title="Iniciar sesión"
        onPress={() => login(nombre.trim() || 'Invitado')}
      />
    </View>
  );
}

function PantallaInicio() {
  const { usuario, logout } = useContext(AuthContext);
  const { tema, alternarTema } = useContext(TemaContext);
  const esOscuro = tema === 'oscuro';

  return (
    <View
      style={[styles.center, { backgroundColor: esOscuro ? '#333' : '#fff' }]}
    >
      <Text style={{ color: esOscuro ? '#fff' : '#000', fontSize: 20, marginBottom: 10 }}>
        Bienvenido, {usuario?.nombre}
      </Text>
      <Text style={{ color: esOscuro ? '#fff' : '#000', marginBottom: 20 }}>
        Tema actual: {tema}
      </Text>
      <Button title="Cambiar tema" onPress={alternarTema} />
      <View style={{ height: 10 }} />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}

function AppPrincipal() {
  const { usuario } = useContext(AuthContext);
  return usuario ? <PantallaInicio /> : <PantallaLogin />;
}

export default function App() {
  return (
    <TemaProvider>
      <AuthProvider>
        <AppPrincipal />
      </AuthProvider>
    </TemaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});
