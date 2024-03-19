// navigation/PubsStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PubsScreen from '../screens/pub/PubsScreen';
import PubDetailsScreen from '../screens/pub/PubDetailsScreen';

const Stack = createStackNavigator();

const PubsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PubsList" component={PubsScreen} options={{ title: 'Pubs' }} />
      <Stack.Screen name="PubDetailsScreen" component={PubDetailsScreen} options={({ route }) => ({ title: route.params.pub.pubName })} />
    </Stack.Navigator>
  );
}

export default PubsStackNavigator;
