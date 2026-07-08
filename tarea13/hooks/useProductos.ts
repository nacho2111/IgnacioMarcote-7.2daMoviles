import { useState, useEffect } from 'react';

export type Producto = {
  id: number;
  title: string;
  price: number;
};

const API_URL = 'https://fakestoreapi.com/products';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const crearProducto = async (producto: Omit<Producto, 'id'>) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    const nuevo = await res.json();
    setProductos((prev) => [...prev, { ...producto, id: nuevo.id }]);
  };

  const actualizarProducto = async (id: number, cambios: Partial<Producto>) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    });
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...cambios } : p))
    );
  };

  const eliminarProducto = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  };
}
