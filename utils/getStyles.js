import { Dimensions, PixelRatio, Platform, StyleSheet } from 'react-native';

const getStyles = () => {
    const { width, height } = Dimensions.get('window');
    const isWeb = Platform.OS === 'web';
    const isMovil = Platform.OS === 'android' || Platform.OS === 'ios';
    const scaleFactor = isWeb ? (width > 768 ? 1.5 : 1)  : PixelRatio.get();
    const isTablet = isWeb ? width > 768 : (isMovil && (width > 600 || height > 600));

  
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
        marginBottom: 10 * isTablet,
        paddingHorizontal: 10 * isTablet,
        fontSize: 16 * isTablet,
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
    });
  };

export default getStyles;