import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { fetchMenu } from '../../services/api/pub';
import DrinkCard from '../../components/pub/DrinkCard';

const PubMenu = (pubId) => {
  const [menu, setPubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); 

  useEffect(() => {
    const loadPubs = async () => {
        setIsLoading(true);
        try {
            const fetchedPub = await fetchMenu(pubId, searchQuery);
            setPubs(fetchedPub);
        } catch (error) {
            console.error("Failed to load pubs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    loadPubs();
}, []);

const handleDrinkSelect = (drinkId) => {
  console.log("Drink selected: ", drinkId);
}

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.searchInput}
        placeholder="Search drink..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      /> */}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={menu}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <DrinkCard item={item} onPress={() => handleDrinkSelect(item._id)}/>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  pubItem: {
    padding: 10,
    fontSize: 18,
  },
});


export default PubMenu;
