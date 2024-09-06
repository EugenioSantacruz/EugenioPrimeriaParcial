import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  const { nombre, estado } = route.params; // Recibir los parámetros de navegación

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Mi nombre es: <Text style={styles.boldText}>{nombre}</Text>, Actualmente estoy{' '}
        <Text style={styles.boldText}>
          {estado ? 'ACTIVO' : 'INACTIVO'}
        </Text>{' '}
        en el 8 semestre.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF', // Fondo claro y suave
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#007BFF', // Color azul para resaltar
  },
});

export default PropsParcial02;
