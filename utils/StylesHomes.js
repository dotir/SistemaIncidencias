import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  sidebar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarItem: {
    padding: 12,
    marginHorizontal: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeSidebarItem: {
    backgroundColor: '#2196F3',
  },
  sidebarItemText: {
    fontSize: 11,
    color: '#333',
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    opacity: 0.4,
  }
});

export default styles;