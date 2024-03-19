import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { fetchMenu } from '../../services/api/pub';
import MenuItem from '../../components/pub/MenuItem'

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search drink..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={menu}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <MenuItem menu={item} />
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


export default PubMenu;
