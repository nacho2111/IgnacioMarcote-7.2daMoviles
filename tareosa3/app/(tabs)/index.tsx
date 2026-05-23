import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.rowContainer}>
        <ThemedView style={[styles.box, styles.boxBlue]} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsActive(prev => !prev)}
          style={[styles.box, isActive ? styles.boxActive : styles.boxGreen]}
        />

        <ThemedView style={[styles.box, styles.boxOrange]} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  box: {
    flex: 1,
    height: 300,
    borderRadius: 12,
  },
  boxBlue:   { backgroundColor: 'blue' },
  boxGreen:  { backgroundColor: 'green' },
  boxOrange: { backgroundColor: 'red' },
  boxActive: { backgroundColor: 'yellow' },
});