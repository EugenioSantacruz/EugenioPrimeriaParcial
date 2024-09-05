import { Button, ListItem, Overlay, SearchBar, Text } from '@rneui/themed';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

const Axios03 = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
    setFilteredData(
      data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const toggleOverlay = (item) => {
    setSelectedItem(item);
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        round
        placeholder="Buscar..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => toggleOverlay(item)}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
      {selectedItem && (
        <Overlay 
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          style={styles.overlay}
        >
          <View>
            <Text style={styles.overlayTitle}>{selectedItem.name}</Text>
            <Text>Email: {selectedItem.email}</Text>
            <Text>Phone: {selectedItem.phone}</Text>
            <Button
              title="Cerrar"
              onPress={() => setVisible(false)}
              buttonStyle={styles.closeButton}
              titleStyle={styles.closeButtonTitle}
            />
          </View>
        </Overlay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8', // Fondo suave
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#3F72AF',
  },
  overlay: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  overlayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F72AF',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#112D4E',
    borderRadius: 10,
    paddingVertical: 12,
  },
  closeButtonTitle: {
    color: 'white',
    fontWeight: '600',
  },
});


export default Axios03;
