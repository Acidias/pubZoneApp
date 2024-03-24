// components/PubCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';

const PubCard = ({ pub, onPress }) => {

  return (
    <View style={styles.shadowContainer}>
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: pub.imagesUrl[0] || 'https://via.placeholder.com/150' }} // Replace with your image fetching logic
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.pubName}>{pub.pubName}</Text>
        <Text style={styles.infoText}>{pub.city}</Text>
        <Text style={styles.infoText}>{pub.email}</Text>
        {/* Display more pub information here as needed */}
      </View>
    </TouchableOpacity>
    </View>
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
    width: '33%',
    height: '100%',
  },
  details: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 2,
  },
  pubName: {
    fontSize: 24, // Larger font size for the pub name
    fontWeight: 'bold',
    color: '#333', // Darker color for better contrast
    marginBottom: 5, // Added some spacing between the title and info
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24, // Increased line height for better readability
  },
});



export default PubCard;
