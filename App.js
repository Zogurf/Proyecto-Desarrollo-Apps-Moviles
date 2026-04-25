import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import AgregarReporte from './src/screens/AgregarReporte';
import Registro from './src/screens/Registro'

export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AgregarReporte" component={AgregarReporte} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
