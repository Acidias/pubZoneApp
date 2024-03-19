// components/MenuItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuItem = ({ menu }) => {

     console.log("Menu: ", menu)
  return (
    <View style={styles.card}>
      <Text style={styles.pubName}>{menu.category}</Text>
      <Text style={styles.infoText}>{menu.name}</Text>
      <Text style={styles.infoText}>{menu.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  pubName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default MenuItem;
