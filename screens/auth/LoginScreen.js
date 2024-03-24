import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { loginUser } from '../../services/api/user'; // Import the API call
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import Colors from '../../constants/Colors';


const LoginScreen = ({ navigation }) => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const { setIsLoggedIn, setUser } = useAuth(); 

     

     const handleLogin = async () => {
          setIsLoading(true);
          try {
            const data = await loginUser(email, password);
            await AsyncStorage.setItem('userToken', data.token);
            setUser(data.user);
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
               <Image style={styles.bgImage} source={require('../../assets/bg-auth.png')} />
               <View style={styles.titleContainer} >
                    <Text style={styles.title}>Pub Zone</Text>
               </View>
               <View style={styles.inputContainer}>
                    <TextInput
                         style={styles.inputs}
                         placeholder="Name"
                         value={email}
                         onChangeText={setEmail}
                    />
               </View>
               <View style={styles.inputContainer}>
                    <TextInput
                         style={styles.inputs}
                         placeholder="Password"
                         value={password}
                         secureTextEntry
                         onChangeText={setPassword}
                    />
               </View>
               <Text style={styles.switchScreenText}>email: "Test2" / Password: "test"</Text>
               <TouchableOpacity 
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={handleLogin}
               >
                    { isLoading ? (
                         <ActivityIndicator size="small" color="#fff" />
                    ) : (
                         <Text style={styles.loginText}>
                         Login
                         </Text>
                    ) }
               </TouchableOpacity>

               <Text style={styles.switchScreenText}>Don't have an account?</Text>
               <TouchableOpacity 
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => navigation.navigate('Register')}
               >
                    { isLoading ? (
                         <ActivityIndicator size="small" color="#fff" />
                    ) : (
                         <Text style={styles.loginText}>
                              Register
                         </Text>
                    ) }
               </TouchableOpacity>
          </View>
     );
};


const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#DCDCDC',
  },
  titleContainer: {
     marginBottom: 40,
  },
  title: {
      fontSize: 42,
      color: '#fff',
      fontWeight: 'bold',

      textShadowOffset: {width: 0,height: 1},
      textShadowRadius: 1,
      textShadowColor: 'black',

      textShadowOffset: {width: 1,height: 1},
      textShadowRadius: 1,
      textShadowColor: '#ccc',

      textShadowOffset: {width: 2,height: 2},
      textShadowRadius: 1,
      textShadowColor: 'black',
  },

  errorMsgContainer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginBottom: 15,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: '#D8000C',
      backgroundColor: "#FFBABA" ,
      color: "#D8000C",
      borderRadius: 25,
  },
  successMsgContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginBottom: 15,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: '#4F8A10',
      backgroundColor: "#DFF2BF" ,
      color: "#4F8A10",
      borderRadius: 25,
      
  },
  msgText: {
      fontSize: 15,
  },
  msgIcon: {
      width: 30,
      height: 30,
      // marginLeft: 15,
      justifyContent: 'center'
  },

  inputContainer: {
      // borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      // borderBottomWidth: 1,
      width: 300,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',

      shadowColor: "#808080",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
      width: 30,
      height: 30,
      marginRight: 15,
      justifyContent: 'center'
  },
  buttonContainer: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 300,
      borderRadius: 30,
      backgroundColor: 'transparent'
  },
  btnForgotPassword: {
      height: 15,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 10,
      width: 300,
      backgroundColor: 'transparent'
  },
  loginButton: {
      backgroundColor: "#00b5ec",

      shadowColor: "#808080",
      shadowOffset: {
          width: 0,
          height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
  },
  registerButton: {
      backgroundColor: Colors.lightPrimary,

      shadowColor: "#808080",
      shadowOffset: {
          width: 0,
          height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,

      elevation: 19,
  },
  loginText: {
      color: 'white',
  },
  bgImage: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
  },
  btnText: {
      color: "white",
      fontWeight: 'bold'
  }
}); 


export default LoginScreen;
