import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigationState } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCart } from '../../context/CartContext';

const CartScreen = () => {
  const { state, dispatch } = useCart();

  // Function to recursively find if 'CartScreen' is part of the current routes
  const isCartScreenActive = (state) => {
     const route = state.routes[state.index];
     if (route.state) {
       return isCartScreenActive(route.state); // Dive into nested navigator state
     }
     return route.name === 'Cart'; // Adjust as needed based on your CartScreen's route name
   };
 
   const currentRouteState = useNavigationState(state => state);
   const isCartVisible = !isCartScreenActive(currentRouteState);



  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleQuantityChange = (id, delta) => {
    dispatch({ 
      type: delta > 0 ? 'INCREASE_QUANTITY' : 'DECREASE_QUANTITY', 
      payload: id 
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
            <Icon name="minus-circle-outline" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
            <Icon name="plus-circle-outline" size={24} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Icon name="delete" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: $
          {state.items
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 40,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 10,
  },
  totalText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
