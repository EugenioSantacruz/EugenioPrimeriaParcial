import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card } from '@rneui/themed';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [materia, setMateria] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [registros, setRegistros] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const guardarRegistro = async () => {
    if (codigo && materia && calificacion) {
      const nuevoRegistro = { codigo, materia, calificacion };

      let registrosActualizados = [...registros];
      if (editando !== null) {
        registrosActualizados = registrosActualizados.map((reg) =>
          reg.codigo === editando ? nuevoRegistro : reg
        );
      } else {
        registrosActualizados.push(nuevoRegistro);
      }

      await AsyncStorage.setItem('registros', JSON.stringify(registrosActualizados));
      setRegistros(registrosActualizados);
      limpiarFormulario();
    }
  };

  const cargarRegistros = async () => {
    const registrosGuardados = await AsyncStorage.getItem('registros');
    if (registrosGuardados) {
      setRegistros(JSON.parse(registrosGuardados));
    }
  };

  const eliminarRegistro = async (codigoAEliminar) => {
    const registrosActualizados = registros.filter((reg) => reg.codigo !== codigoAEliminar);
    await AsyncStorage.setItem('registros', JSON.stringify(registrosActualizados));
    setRegistros(registrosActualizados);
  };

  const editarRegistro = (registro) => {
    setCodigo(registro.codigo);
    setMateria(registro.materia);
    setCalificacion(registro.calificacion);
    setEditando(registro.codigo);
  };

  const limpiarFormulario = () => {
    setCodigo('');
    setMateria('');
    setCalificacion('');
    setEditando(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
      />
      <TextInput
        style={styles.input}
        placeholder="Calificación"
        value={calificacion}
        onChangeText={setCalificacion}
        keyboardType="numeric"
      />
      <Button
        title={editando ? 'Actualizar Registro' : 'Agregar Registro'}
        onPress={guardarRegistro}
        buttonStyle={styles.button}
      />

      <Text style={styles.title}>Registros Guardados:</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <Text style={styles.cardText}>
              Código: {item.codigo} - Materia: {item.materia} - Calificación: {item.calificacion}
            </Text>
            <View style={styles.cardButtons}>
              <Button
                title="Editar"
                onPress={() => editarRegistro(item)}
                buttonStyle={styles.editButton}
              />
              <Button
                title="Eliminar"
                onPress={() => eliminarRegistro(item.codigo)}
                buttonStyle={styles.deleteButton}
              />
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#FFA726',
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
});

export default AsyncStorageParcial04;
