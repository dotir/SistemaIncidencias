import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
// vistas admin
import AdminHomeScreen from './Components/admin/AdminHome';
import LoginScreen from './Components/Login';
import TrainingManagement from './Components/admin/TrainingManagement';
import UserManagement from './Components/admin/UserManagement';
import IncidentManagement from './Components/admin/IncidentManagement';
// vistas usuario
import UserHomeScreen from './Components/user/UserHome';
import CreateIncident from './Components/user/CreateIncident';
import ViewIncidents from './Components/user/ViewIncidents';
import TrainingMaterials from './Components/user/TrainingMaterials';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
        {/* login */}
        <Stack.Screen name="Sistema Incidencias" component={LoginScreen} />
        {/* admin */}
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="IncidentManagement" component={IncidentManagement} />
        <Stack.Screen name="TrainingManagement" component={TrainingManagement} />
        {/* user */}
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="CreateIncident" component={CreateIncident} />
        <Stack.Screen name="ViewIncidents" component={ViewIncidents} />
        <Stack.Screen name="TrainingMaterials" component={TrainingMaterials} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
