import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

interface CardProps {
  titulo: string;
  imagenUrl: string;
  children: React.ReactNode;
}

const Card = ({ titulo, children, imagenUrl }: CardProps) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: imagenUrl }} 
        style={styles.imagen} 
      />
      
      <Text style={styles.titulo}>{titulo}</Text>
      
      <View style={styles.contenido}>
        {children}
      </View>
      
      <Button 
        title="Ver más" 
        onPress={() => alert(`Seleccionaste: ${titulo}`)} 
        color="#4F46E5"
      />
    </View>
  );
};

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gatos jeje</Text>

      <Card 
        titulo="Gato negro" 
        imagenUrl="https://biblicalscienceinstitute.com/wp-content/uploads/2021/06/cat_eyes_free.jpg"
      >
        <Text style={styles.descripcion}>
          Los gatos negros tienen un caracter muy particular.
        </Text>
      </Card>

      <Card 
        titulo="Gato naranja" 
        imagenUrl="https://www.patasencasa.com/sites/default/files/styles/article_detail_desktop/public/2024-05/gato%20naranja_0.jpg.webp?itok=9NIHKX_b"
      >
        <Text style={styles.descripcion}>
          Estos gatos son muy extrovertidos y caoticos. Los quiero mucho.
        </Text>
      </Card>

      <Card 
        titulo="Gato siamés" 
        imagenUrl="https://gatosderaza.com/wp-content/uploads/2025/07/Gato-Siames-980x654.jpg"
      >
        <Text style={styles.descripcion}>
          Gatos con color de piel muy especial. Nunca pude ver a uno con mis propios ojos.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagen: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  contenido: {
    marginBottom: 15,
  },
  descripcion: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
