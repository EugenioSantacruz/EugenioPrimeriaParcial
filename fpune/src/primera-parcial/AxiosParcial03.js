import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SearchBar, ListItem } from '@rneui/themed';
import Axios from 'axios';

const AxiosParcial03 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Realizar petición GET a la API para obtener los comentarios
    Axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Inicialmente mostrar todos los datos
      })
      .catch(error => console.error(error));
  }, []);

  // Función para actualizar el estado de búsqueda
  const updateSearch = (search) => {
    setSearch(search);
    const filtered = data.filter(item =>
      item.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered); // Actualizar la lista filtrada
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <SearchBar
        placeholder="Buscar por correo..."
        onChangeText={updateSearch}
        value={search}
        round
        lightTheme
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      {/* Lista de correos */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.email}</ListItem.Title>
              <ListItem.Subtitle>{item.body}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
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
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: '#E0E0E0',
  },
});

export default AxiosParcial03;
