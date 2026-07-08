import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  useColorScheme,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const tema = useColorScheme();
  const esOscuro = tema === 'dark';
  const esPantallaChica = width < 400;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.flex, { backgroundColor: esOscuro ? '#000' : '#fff' }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.titulo, { color: esOscuro ? '#fff' : '#000' }]}>
          Pantalla Responsiva
        </Text>

        <View
          style={[
            styles.box,
            { backgroundColor: esPantallaChica ? '#4caf50' : '#2196f3' },
          ]}
        >
          <Text style={styles.boxText}>
            {esPantallaChica ? 'Pantalla Pequeña' : 'Pantalla Grande'} ({Math.round(width)}px)
          </Text>
        </View>

        <Text
          style={[
            styles.plataforma,
            { color: Platform.OS === 'ios' ? '#007AFF' : '#3DDC84' },
          ]}
        >
          {Platform.OS === 'android' ? 'Usás Android' : 'Usás iOS / Web'}
        </Text>

        <Text style={[styles.label, { color: esOscuro ? '#fff' : '#000' }]}>Nombre:</Text>
        <TextInput
          placeholder="Ingresá tu nombre"
          value={nombre}
          onChangeText={setNombre}
          style={[styles.input, { color: esOscuro ? '#fff' : '#000' }]}
          placeholderTextColor={esOscuro ? '#aaa' : '#888'}
        />

        <Text style={[styles.label, { color: esOscuro ? '#fff' : '#000' }]}>Email:</Text>
        <TextInput
          placeholder="Ingresá tu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { color: esOscuro ? '#fff' : '#000' }]}
          placeholderTextColor={esOscuro ? '#aaa' : '#888'}
        />

        <Button title="Enviar" onPress={() => {}} />

        <Text style={[styles.footer, { color: esOscuro ? '#fff' : '#000' }]}>
          Tema actual: {esOscuro ? 'Oscuro' : 'Claro'}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  box: { padding: 20, borderRadius: 10, marginBottom: 20 },
  boxText: { color: 'white', textAlign: 'center', fontSize: 18 },
  plataforma: { textAlign: 'center', fontSize: 16, marginBottom: 20 },
  label: { marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  footer: { marginTop: 20, textAlign: 'center' },
});
