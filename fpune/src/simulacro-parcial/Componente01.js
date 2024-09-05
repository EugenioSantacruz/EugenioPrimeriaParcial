import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const items = [
    { key: 'Props02', component: 'Props02' },
    { key: 'Axios03', component: 'Axios03' },
    { key: 'AsyncStorage04', component: 'AsyncStorage04' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un texto"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.component, { inputValue })}
          >
            <Text style={styles.buttonText}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#E3FDFD', // Fondo de color suave
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F72AF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: '#3F72AF',
    padding: 12,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
  },
  button: {
    padding: 15,
    backgroundColor: '#112D4E',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default Componente01;
