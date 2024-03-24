import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { logout } = useAuth();


  return (
    <View style={styles.container}>
      <Text>Welcome to the Profile Screen!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
