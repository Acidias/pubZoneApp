import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './navigation/AuthNavigation';
import AppNavigation from './navigation/AppNavigation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  function AuthenticatedApp() {
    const { isLoggedIn } = useAuth();
  
    return isLoggedIn ? <AppNavigation /> : <AuthNavigation />;
  }
  return (
    <AuthProvider>
      <NavigationContainer>
        <CartProvider>
          <AuthenticatedApp />
        </CartProvider>
      </NavigationContainer>
    </AuthProvider>
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
