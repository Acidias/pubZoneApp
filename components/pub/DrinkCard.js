// components/DrinkCard.js
import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useCart } from '../../context/CartContext';


const DrinkCard = ({ item, onPress }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: {
        id: item._id, // Assuming each item has a unique _id field
        name: item.name,
        price: item.price,
        quantity: 1, // Initial quantity set to 1, adjust as needed
      }
    });
    console.log(item.name + " added to cart");
  };


  return (
    <TouchableOpacity onPress={onPress} style={styles.shadowContainer}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/100' }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.price}>{`$${item.price}`}</Text>
          <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 8,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100, // Fixed width for images
    height: 100, // Fixed height to maintain aspect ratio
    borderRadius: 8, // Optional: if you want rounded corners for your images
  },
  details: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center', // Center content vertically in the detail section
    flex: 1, // Take up remaining space
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default DrinkCard;
