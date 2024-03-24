import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import { fetchPubs } from '../services/api/pub';
import PubCard from '../components/pub/PubCard';



const PubsScreen = () => {
  const [pubs, setPubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); 

  useEffect(() => {
    const loadPubs = async () => {
        setIsLoading(true);
        try {
            const fetchedPubs = await fetchPubs(searchQuery);
            setPubs(fetchedPubs);
        } catch (error) {
            console.error("Failed to load pubs:", error);
            // Optionally, handle the error with state or user feedback
        } finally {
            setIsLoading(false);
        }
    };

    loadPubs();
}, [searchQuery]);


  const handlePressPub = (pub) => {
    navigation.navigate('PubProfile', { pub });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by city..."
          placeholderTextColor="#666" // More subtle placeholder text color
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={pubs}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <PubCard pub={item} onPress={() => handlePressPub(item)} />
          )}
        />
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android elevation
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 15,
  },
  clearButton: {
    marginRight: 15,
  },
  // Add styles for your FlatList and ActivityIndicator as needed
});


export default PubsScreen;
