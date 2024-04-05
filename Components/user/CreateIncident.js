import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CreateIncident = () => {
  const [date, setDate] = useState('');
  const [detail, setDetail] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleDateChange = (text) => {
    setDate(text);
  };

  const handleDetailChange = (text) => {
    setDetail(text);
  };

  const handlePickPhotos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access photos is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setPhotos(result.selected);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('detail', detail);
    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, {
        uri: photo.uri,
        type: 'image/jpeg',
        name: `photo_${index}.jpg`,
      });
    });

    try {
      await axios.post('/api/incidents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Incidencia creada exitosamente');
    } catch (error) {
      console.error('Error al crear la incidencia:', error);
      alert('Error al crear la incidencia');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Incidencia</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={date}
        onChangeText={handleDateChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Detalle"
        value={detail}
        onChangeText={handleDetailChange}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handlePickPhotos}>
        <Text style={styles.buttonText}>Seleccionar Fotos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear Incidencia</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateIncident;