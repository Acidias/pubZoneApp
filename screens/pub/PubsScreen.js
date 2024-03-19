import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { fetchPubs } from '../../services/api/pub';
import PubCard from '../../components/pub/PubCard';

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
    navigation.navigate('PubDetailsScreen', { pub });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by city..."
        value={searchQuery}
        onChangeText={setSearchQuery} // Update the search query as you type
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={pubs}
          keyExtractor={item => item._id} // Assume each pub has a unique _id
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
    paddingTop: 50, // Add some padding at the top
    paddingHorizontal: 10, // Add some horizontal padding
  },
  searchInput: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  pubItem: {
    padding: 10,
    fontSize: 18,
  },
});


export default PubsScreen;
