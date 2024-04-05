import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from '../../utils/StylesHomes';

const AdminHomeScreen = () => {
  const [activeTab, setActiveTab] = useState('userManagement');
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuIconRef = useRef(null);
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión y regresar al inicio de sesión
    navigation.navigate('Sistema Incidencias');
    console.log('Cerrando sesión...');
  };

  useEffect(() => {
    if (menuIconRef.current) {
      menuIconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMenuPosition({ x: pageX - 60, y: pageY + height });
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sistema de Incidencias</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={toggleMenu}
          ref={menuIconRef}
        >
          <Icon name="ellipsis-v" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showMenu && (
        <View style={[styles.menuContainer, { top: menuPosition.y, left: menuPosition.x }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Text style={styles.menuItemText}>Salir</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.tabContent}>
          {activeTab === 'userManagement' && (
            <View>
              <Text>Contenido de Gestión de Usuarios</Text>
            </View>
          )}
          {activeTab === 'incidentManagement' && (
            <View>
              <Text>Contenido de Gestión de Incidencias</Text>
            </View>
          )}
          {activeTab === 'trainingManagement' && (
            <View>
              <Text>Contenido de Gestión de Capacitación</Text>
            </View>
          )}
        </View>
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeTab === 'userManagement' && styles.activeSidebarItem,
            ]}
            onPress={() => handleTabPress('userManagement')}
          >
            <Icon name="users" size={24} color="#333" />
            <Text style={styles.sidebarItemText}>Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeTab === 'incidentManagement' && styles.activeSidebarItem,
            ]}
            onPress={() => handleTabPress('incidentManagement')}
          >
            <Icon name="exclamation-circle" size={24} color="#333" />
            <Text style={styles.sidebarItemText}>Incidencias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sidebarItem,
              activeTab === 'trainingManagement' && styles.activeSidebarItem,
            ]}
            onPress={() => handleTabPress('trainingManagement')}
          >
            <Icon name="book" size={24} color="#333" />
            <Text style={styles.sidebarItemText}>Capacitación</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



export default AdminHomeScreen;