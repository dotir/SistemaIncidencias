import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

const TrainingMaterials = () => {
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

  const handleViewDocument = async (document) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        uri: document.uri,
        type: 'application/pdf',
      });

      if (!result.cancelled) {
        // Abrir el documento PDF
        console.log('Documento abierto:', result.uri);
      }
    } catch (err) {
      console.error('Error al abrir el documento:', err);
    }
  };

  const renderDocument = ({ item }) => (
    <TouchableOpacity
      style={styles.documentItem}
      onPress={() => handleViewDocument(item)}
    >
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materiales de Capacitación</Text>
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
  documentItem: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default TrainingMaterials;