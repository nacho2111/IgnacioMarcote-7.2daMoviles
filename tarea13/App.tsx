import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useProductos, Producto } from './hooks/useProductos';

export default function App() {
  const { productos, loading, crearProducto, actualizarProducto, eliminarProducto } =
    useProductos();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleGuardar = async () => {
    if (!title || !price) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (editId) {
      await actualizarProducto(editId, { title, price: Number(price) });
      setEditId(null);
    } else {
      await crearProducto({ title, price: Number(price) });
    }

    setTitle('');
    setPrice('');
  };

  const handleEditar = (item: Producto) => {
    setTitle(item.title);
    setPrice(String(item.price));
    setEditId(item.id);
  };

  const confirmarEliminacion = (id: number) => {
    Alert.alert('Confirmar', '¿Deseas eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminarProducto(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Productos (API)</Text>

      <TextInput
        placeholder="Nombre"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title={editId ? 'Actualizar' : 'Agregar'} onPress={handleGuardar} />

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.title}</Text>
              <Text>${item.price}</Text>
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
      )}
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
