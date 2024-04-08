import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CreateIncident = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [detail, setDetail] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate || date); // Actualizar solo si se selecciona una nueva fecha
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
      <TouchableOpacity style={styles.button} onPress={handleShowDatePicker}>
        <Text style={styles.buttonText}> Seleccionar Fecha</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default" // Mostrar por defecto según la plataforma
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.dateText}>
        {date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Text>
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
    backgroundColor: 'transparent',
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
    borderRadius: 8,
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
  dateText: {
    marginBottom: 12,
  },
});

export default CreateIncident;