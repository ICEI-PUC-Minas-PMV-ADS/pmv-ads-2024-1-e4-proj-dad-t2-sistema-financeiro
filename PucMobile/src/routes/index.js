import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Despesa from '../pages/Despesa';
import Categoria from '../pages/Categoria/categoria';
import Usuario from '../pages/Usuario/usuario';
import formaPagamento from '../pages/formaPagamento/formaPagamento';
import Home from '../pages/Home';
import Login from '../pages/Login/login'; 
import Cadastro from '../pages/Cadastro';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Despesa"
        component={Despesa}
        options={{
          tabBarLabel: 'Despesa',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categoria"
        component={Categoria}
        options={{
          tabBarLabel: 'Categoria',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FormaPagamento"
        component={formaPagamento}
        options={{
          tabBarLabel: 'Pagamento',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="creditcard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={Usuario}
        options={{
          tabBarLabel: 'Usuários',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Cadastro"
        component={Cadastro}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Routes;
