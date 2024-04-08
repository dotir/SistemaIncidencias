import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ViewIncidents = () => {
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

  const handleCancelIncident = (incidentId) => {
    // Lógica para anular la incidencia
    console.log('Anular incidencia:', incidentId);
  };

  const renderIncident = ({ item }) => (
    <View style={styles.incidentItem}>
      <Text>{item.fecha}</Text>
      <Text>{item.detalle}</Text>
      <Text>Estado: {item.estado}</Text>
      {item.estado === 'Pendiente' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelIncident(item.id)}
        >
          <Text style={styles.cancelButtonText}>Anular</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ver Incidencias</Text>
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
    backgroundColor: 'transparent',
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
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ViewIncidents;