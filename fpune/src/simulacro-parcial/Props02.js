import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Props02 = ({ route }) => {
  const { inputValue } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Detalles:</Text>
        <Text style={styles.infoText}>Nombre: <Text style={styles.value}>{inputValue}</Text></Text>
        <Text style={styles.infoText}>Estado: <Text style={styles.value}>false</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    color: '#6C757D',
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F72AF',
  },
});


export default Props02;
