import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { loginUser } from '../../services/api/user'; // Import the API call
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';


const LoginScreen = ({ navigation }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const { setIsLoggedIn } = useAuth(); 

     const handleLogin = async () => {
          setIsLoading(true);
          try {
            const data = await loginUser(email, password);
            await AsyncStorage.setItem('userToken', data.token);
            // Optionally save other user data here
            setIsLoading(false);
            // Navigate to your app's main screen here
            setIsLoggedIn(true);
          } catch (error) {
            setIsLoading(false);
            // Show user friendly error message
            Alert.alert("Login Failed", error.message || "An error occurred. Please try again.");
          }
        };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
        
      )}
      <Text style={styles.switchScreenText}>Don't have an account?</Text>
          <Button
          title="Register here"
          onPress={() => navigation.navigate('Register')} // Use the correct screen name as per your navigation setup
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});

export default LoginScreen;
