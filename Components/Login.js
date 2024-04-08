import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getStyles from '../utils/getStyles';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const styles = getStyles();
  const navigation = useNavigation();
  const handleLogin = () => {

    if (username === 'admin' && password === 'admin') {
      // Navega a la vista AdminHomeScreen
      navigation.navigate('AdminHome');
    } else if (username === 'user' && password === 'user') {
      // Navega a la vista UserHomeScreen
      navigation.navigate('UserHome');
    }
    else {
      // Implementa la lógica de autenticación para usuarios regulares
      console.log('Username:', username);
      console.log('Password:', password);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;