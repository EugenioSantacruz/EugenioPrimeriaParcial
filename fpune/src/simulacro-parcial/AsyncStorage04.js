import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed'; // Asegúrate de importar Button desde @rneui/themed

const AsyncStorageCRUD = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [editingCedula, setEditingCedula] = useState(null); // Guardar cédula del alumno en edición

  useEffect(() => {
    loadAlumnos();
  }, []);

  const saveOrUpdateAlumno = async () => {
    if (nombre && cedula) {
      if (editingCedula !== null) {
        // Modo edición
        const updatedAlumnos = alumnos.map(alumno =>
          alumno.cedula === editingCedula ? { nombre, cedula } : alumno
        );
        await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
        setAlumnos(updatedAlumnos);
        setEditingCedula(null); // Salir del modo edición
      } else {
        // Modo agregar nuevo alumno
        const newAlumno = { nombre, cedula };
        const updatedAlumnos = [...alumnos, newAlumno];
        await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
        setAlumnos(updatedAlumnos);
      }
      // Limpiar campos después de guardar o actualizar
      setNombre('');
      setCedula('');
    }
  };

  const loadAlumnos = async () => {
    const storedAlumnos = await AsyncStorage.getItem('alumnos');
    if (storedAlumnos) {
      setAlumnos(JSON.parse(storedAlumnos));
    }
  };

  const deleteAlumno = async (cedulaToDelete) => {
    const updatedAlumnos = alumnos.filter(alumno => alumno.cedula !== cedulaToDelete);
    await AsyncStorage.setItem('alumnos', JSON.stringify(updatedAlumnos));
    setAlumnos(updatedAlumnos);
  };

  const editAlumno = (alumno) => {
    setNombre(alumno.nombre);
    setCedula(alumno.cedula);
    setEditingCedula(alumno.cedula); // Guardar cédula del alumno que se está editando
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Alumno"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <Button
        title={editingCedula !== null ? "Actualizar Alumno" : "Agregar Alumno"}
        onPress={saveOrUpdateAlumno}
        buttonStyle={styles.submitButton}
        titleStyle={styles.buttonText}
      />

      <Text style={styles.title}>Lista de Alumnos:</Text>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.cedula}
        renderItem={({ item }) => (
          <View style={styles.alumnoContainer}>
            <Text>{item.nombre} - {item.cedula}</Text>
            <View style={styles.buttonContainer}>
              <Button
                icon={{ name: 'edit', type: 'font-awesome', size: 15, color: 'white' }}
                buttonStyle={[styles.button, styles.editButton]}
                onPress={() => editAlumno(item)}
              />
              <Button
                icon={{ name: 'trash', type: 'font-awesome', size: 15, color: 'white' }}
                buttonStyle={[styles.button, styles.deleteButton]}
                onPress={() => deleteAlumno(item.cedula)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#EFF9F0',
  },
  input: {
    borderWidth: 2,
    borderColor: '#52B788',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    color: '#40916C',
  },
  alumnoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#40916C',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#52B788',
    paddingVertical: 12,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#2D6A4F',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 10,
  },
});

export default AsyncStorageCRUD;
