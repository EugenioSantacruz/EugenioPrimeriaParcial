import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const ComponenteParcial01 = () => {
  const [nombre, setNombre] = useState('');
  const navigation = useNavigation();

  const opciones = [
    { id: 1, nombre: 'PropsParcial02', ruta: 'PropsParcial02' },
    { id: 2, nombre: 'AxiosParcial03', ruta: 'AxiosParcial03' },
    { id: 3, nombre: 'AsyncStorageParcial04', ruta: 'AsyncStorageParcial04' },
  ];

  const navegarAComponente = (ruta) => {
    if (ruta === 'PropsParcial02') {
      navigation.navigate(ruta, { nombre, estado: false }); // Envía los parámetros a PropsParcial02
    } else {
      navigation.navigate(ruta);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Examen Primera Parcial</Text>

      <Card containerStyle={styles.card}>
        <Card.Image
          style={styles.logo}
          source={require('../assets/Cerro.jpg')} // Cambia esto por la URL de tu logo
        />
      </Card>

      <TextInput
        style={styles.input}
        placeholder="Ingresar nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <FlatList
        data={opciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navegarAComponente(item.ruta)}
          >
            <Text style={styles.botonTexto}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  boton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ComponenteParcial01;
