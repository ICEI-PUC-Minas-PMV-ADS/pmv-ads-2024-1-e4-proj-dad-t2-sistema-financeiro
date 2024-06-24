import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

export default function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <TabNavigator />
      ) : (
        <>
          <Login onLogin={() => setIsAuthenticated(true)} />
          <Cadastro />
        </>
      )}
    </NavigationContainer>
  );
}
