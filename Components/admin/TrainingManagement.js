import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

const TrainingManagement = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Obtener la lista de documentos desde el backend
    axios.get('/api/documents')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error al obtener documentos:', error);
      });
  }, []);

  const handleAddDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.cancelled) {
        // Enviar el documento al backend
        const formData = new FormData();
        formData.append('document', {
          uri: result.uri,
          type: 'application/pdf',
          name: result.name,
        });

        axios.post('/api/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            console.log('Documento enviado exitosamente');
            // Actualizar la lista de documentos
            setDocuments([...documents, response.data]);
          })
          .catch(error => {
            console.error('Error al enviar el documento:', error);
          });
      }
    } catch (err) {
      console.error('Error al seleccionar el documento:', err);
    }
  };

  const renderDocument = ({ item }) => (
    <TouchableOpacity style={styles.documentItem}>
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Capacitación</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddDocument}>
        <Text style={styles.addButtonText}>Agregar Documento</Text>
      </TouchableOpacity>
      <FlatList
        data={documents}
        renderItem={renderDocument}
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
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  documentItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default TrainingManagement;