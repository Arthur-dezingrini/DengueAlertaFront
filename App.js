import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Denuncia from './pages/Denuncia.jsx';
import RelatorioDenucias from './pages/RelatorioDenuncias.jsx';
import CadastroUsuario from './pages/CadastroUsuario.jsx';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Denuncia" component={Denuncia} options={{ headerShown: false }} />
        <Stack.Screen name="RelatorioDenuncia" component={RelatorioDenucias} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}