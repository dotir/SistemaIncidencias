import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Obtener la lista de incidencias desde el backend
    axios.get('/api/incidents')
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => {
        console.error('Error al obtener incidencias:', error);
      });
  }, []);

  const renderIncident = ({ item }) => (
    <View style={styles.incidentItem}>
      <Text>{item.fecha}</Text>
      <Text>{item.detalle}</Text>
      <Text>Estado: {item.estado}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Incidencias</Text>
      <FlatList
        data={incidents}
        renderItem={renderIncident}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  incidentItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default IncidentManagement;