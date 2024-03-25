import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/cart/CartScreen';


import PubsStackNavigator from './PubsStackNavigator';

import FloatingCart from '../components/cart/FloatingCart';


const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const routeNames = useNavigationState(state => state.routeNames);
  const currentRouteName = useNavigationState(state => state.routes[state.index]?.name);


  const isCartScreen = currentRouteName === 'Cart';

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Pubs" component={PubsStackNavigator} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
      {!isCartScreen && <FloatingCart />}
    </View>
  );
}

export default AppNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    position: 'relative',
  },
});