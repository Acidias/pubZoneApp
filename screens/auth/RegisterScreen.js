import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { registerUser } from '../../services/api/user';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


     const handleRegister = async () => {
          setError('');
          setIsLoading(true);
     try{
          const userData = await registerUser(name, email, password);
          setIsLoading(false);
          navigation.navigate('Login');
     } catch (e) {
          setError(e.message || 'Failed to register');
          setIsLoading(false);
     }

     
     };

  return (
    <View style={styles.container}>
     <TextInput
        style={styles.input}
        placeholder="name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.switchScreenText}>Already have an account?</Text>
<Button
  title="Login here"
  onPress={() => navigation.navigate('Login')} // Use the correct screen name as per your navigation setup
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

export default RegisterScreen;
