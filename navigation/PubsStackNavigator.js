// navigation/PubsStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PubsScreen from '../screens/PubsScreen';
import PubProfile from '../screens/pub/PubProfile';
import CartScreen from '../screens/cart/CartScreen';


const Stack = createStackNavigator();

const PubsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PubsList" component={PubsScreen} options={{ title: 'Pubs' }} />
      <Stack.Screen name="PubProfile" component={PubProfile} options={({ route }) => ({ title: route.params.pub.pubName })} />
    </Stack.Navigator>
  );
}

export default PubsStackNavigator;
