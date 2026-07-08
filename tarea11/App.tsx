import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';

type Producto = {
  id: string;
  nombre: string;
  precio: string;
};

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([
    { id: '1', nombre: 'Camiseta', precio: '20' },
    { id: '2', nombre: 'Pantalón', precio: '35' },
    { id: '3', nombre: 'Zapatos', precio: '50' },
  ]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleGuardar = () => {
    if (!nombre || !precio) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (editId) {
      setProductos((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, nombre, precio } : p))
      );
      setEditId(null);
    } else {
      setProductos((prev) => [
        ...prev,
        { id: Date.now().toString(), nombre, precio },
      ]);
    }

    setNombre('');
    setPrecio('');
  };

  const handleEditar = (item: Producto) => {
    setNombre(item.nombre);
    setPrecio(item.precio);
    setEditId(item.id);
  };

  const confirmarEliminacion = (id: string) => {
    Alert.alert('Confirmar', '¿Deseas eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setProductos((prev) => prev.filter((p) => p.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CRUD Productos</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title={editId ? 'Actualizar' : 'Agregar'} onPress={handleGuardar} />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>
            <View style={styles.acciones}>
              <Button title="Editar" onPress={() => handleEditar(item)} />
              <View style={{ width: 10 }} />
              <Button
                title="Eliminar"
                color="red"
                onPress={() => confirmarEliminacion(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  acciones: { flexDirection: 'row', marginTop: 10 },
});
