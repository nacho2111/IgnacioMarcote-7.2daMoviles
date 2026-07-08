import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const handleGuardar = () => {
    if (!nombre || !descripcion || !precio || !categoria) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (isNaN(Number(precio)) || Number(precio) <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido');
      return;
    }

    Alert.alert('Producto creado', `${nombre} - $${precio} (${categoria})`);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setImagen(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>Crear Producto</Text>

      <Text>Nombre:</Text>
      <TextInput
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <Text>Descripción:</Text>
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <Text>Precio:</Text>
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Categoría:</Text>
      <TextInput
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
        style={styles.input}
      />

      <Button title="Seleccionar imagen" onPress={seleccionarImagen} />
      {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}

      <View style={{ height: 20 }} />
      <Button title="Guardar Producto" onPress={handleGuardar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagen: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
