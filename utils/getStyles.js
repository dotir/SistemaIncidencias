import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

const getStyles = () => {
  const { width, height } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isMovil = Platform.OS === 'android' || Platform.OS === 'ios';
  const scaleFactor = isWeb ? (width > 768 ? 1.5 : 1) : PixelRatio.get();
  const isTablet = isWeb ? width > 768 : (isMovil && (width > 600 || height > 600));


  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //ponle un fondo de color bonito
      backgroundColor: '#f0f0f0',
    },
    title: {
      fontSize: 24 * isTablet,
      fontWeight: 'bold',
      marginBottom: 20 * isTablet,
    },
    input: {
      width: isTablet ? 300 : '80%',
      height: 40 * isTablet,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10 * isTablet,
      paddingHorizontal: 10 * isTablet,
      fontSize: 16 * isTablet,
      //ponle un color de fondo bonito
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#2196F3',
      paddingVertical: 10 * isTablet,
      paddingHorizontal: 20 * isTablet,
      borderRadius: 5 * isTablet,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16 * isTablet,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 20, // Deja un espacio entre el logo y el título
      alignSelf: 'center'
    }
  });
};

export default getStyles;