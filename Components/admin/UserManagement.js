import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios'; // Importa la librería axios para hacer solicitudes HTTP

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obtener la lista de usuarios desde el backend
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userItem}>
      <Text>{item.nombre} {item.apellido}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default UserManagement;