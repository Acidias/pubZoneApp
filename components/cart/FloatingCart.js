// components/FloatingCart.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingCart = () => {
     const navigate = useNavigation();
  const { state } = useCart();
  const totalItems = state.items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = state.items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  if (totalItems === 0) return null;
     const handleCartNav = () => {
     // Navigate to the cart screen
     console.log('Navigate to cart screen');
     navigate.navigate('Cart');
     
     }

  return (
     <TouchableOpacity style={styles.container} onPress={handleCartNav}>
     <View style={styles.iconContainer}>
       <Icon name="cart" size={24} color="#FFFFFF" />
     </View>
     <View style={styles.textContainer}>
       <Text style={styles.itemsText}>{totalItems} items</Text>
       <Text style={styles.priceText}>Total: ${totalPrice}</Text>
     </View>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
     container: {
       flexDirection: 'row',
       alignItems: 'center',
       position: 'absolute',
       bottom: 100, // Adjust based on your tab bar's height
       right: 20,
       backgroundColor: '#007bff', // Bootstrap primary color
       borderRadius: 20,
       paddingVertical: 8,
       paddingHorizontal: 12,
       zIndex: 1000, // Ensure it floats above everything else
     },
     iconContainer: {
       marginRight: 8,
     },
     textContainer: {
       flexDirection: 'column',
     },
     itemsText: {
       color: '#FFFFFF',
       fontWeight: 'bold',
       textAlign: 'center',
     },
     priceText: {
       color: '#FFFFFF',
       fontWeight: 'bold',
       fontSize: 12,
       textAlign: 'center',
     },
   });
export default FloatingCart;
