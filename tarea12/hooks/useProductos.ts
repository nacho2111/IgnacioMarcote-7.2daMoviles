import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Producto = {
  id: string;
  nombre: string;
  precio: string;
};

export default function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await AsyncStorage.getItem('productos');
      if (datos) setProductos(JSON.parse(datos));
    };
    cargar();
  }, []);

  const guardarProductos = async (lista: Producto[]) => {
    setProductos(lista);
    await AsyncStorage.setItem('productos', JSON.stringify(lista));
  };

  return { productos, guardarProductos };
}
