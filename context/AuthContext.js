import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = async () => {
    console.log('Logging out...');
    await AsyncStorage.removeItem('userToken').then(() => {
      console.log('Token removed');
      setIsLoggedIn(false);
      setUser(null);
    });
  };
  const updateUser = (updates) => {
    console.log('Updating user:', updates);
    setUser((currentUser) => ({
      ...currentUser,
      ...updates,
    }));
  };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
