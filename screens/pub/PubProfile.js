import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { handleFavoriteApi, updateCheckInStatus } from '../../services/api/pub';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useCart } from '../../context/CartContext';


import { useAuth } from '../../context/AuthContext';
import PubMenu from '../../components/pub/PubMenu';
import PubImgSlider from '../../components/pub/PubImgSlider';

const PubProfile = ({ route }) => {
  const { user, updateUser } = useAuth();
  const [pub, setPub] = useState(route.params.pub);

  const { state } = useCart();

  useEffect(() => {
    console.log('Current cart items:', state.items);
  }, [state.items]);

  // Simulated state for active tab. Default is "Stories"
  const [activeTab, setActiveTab] = useState('People');
  const [isFavorite, setIsFavorite] = useState(user.favorites.includes(pub._id));

  const handleFavoritePress = async () => {
    try {
      const response = await handleFavoriteApi(pub._id);
      updateUser({ favorites: response.userFavorites });
      setPub({ ...pub, favoritedByUsers: response.pubFavoritedBy });
      setIsFavorite(response.isFavorite);
      console.log("Favorite Response:", response);
    } catch (error) {
      console.error("Failed to favorite pub:", error);
    }
  };

   

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Stories':
        return <Text>Stories Content</Text>
      case 'People':
        return <Text>People Content</Text>;
      case 'Menu':
        return <PubMenu pubId={pub._id}/>;
      default:
        return <Text>Stories Content</Text>;
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <PubImgSlider images={pub.imagesUrl} />
        <SafeAreaView>
          <View style={styles.profileSection}>
            <Text style={styles.profileName}>{pub.pubName}</Text>
            <Text style={styles.detailsText}>Favorited By: {pub.favoritedByUsers.length}</Text>
            <Text style={styles.detailsText}>Address: {pub.city}</Text>
            <TouchableOpacity style={styles.checkInButton} onPress={handleFavoritePress}>
            <Icon name={isFavorite ? 'heart' : 'heart-o'} size={20} color="red" />
          </TouchableOpacity>  
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'Stories' && styles.activeTab]} onPress={() => setActiveTab('Stories')}>
              <Text style={styles.tabText}>Stories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'People' && styles.activeTab]} onPress={() => setActiveTab('People')}>
              <Text style={styles.tabText}>People</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'Menu' && styles.activeTab]} onPress={() => setActiveTab('Menu')}>
              <Text style={styles.tabText}>Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>
            {renderTabContent()}
          </View>
        </SafeAreaView>
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({

  profileSection: {
    flexDirection: 'column', // Changed to column for a cleaner vertical layout
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff', // Light background to make it pop
    borderRadius: 15, // Rounded corners
    shadowColor: "#000", // Shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
  },
  detailsSection: {
    marginTop: 10,
    alignItems: 'center', // Center align the details
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5, // Spacing between details
    color: '#333333', // Darker text for better readability
  },
  checkInButton: {
    marginTop: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)', // Grey with opacity
    width: 45, // Set a fixed width
    height: 45, // Set a fixed height to make the shape a circle
    borderRadius: 30, // Half of the width/height to make it perfectly round
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    elevation: 2, // Elevation for Android
    shadowColor: "#000", // Shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

     profileImage: {
       width: 100,
       height: 100,
       borderRadius: 50,
       marginRight: 20,
     },
     profileName: {
       fontSize: 16,
       fontWeight: 'bold',
       marginTop: 8,
     },
     left: {
          marginRight: 20,
     },
     right: {
          flexDirection: 'row',
          flex: 1,
     },
     detailsRow: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 5,
     },
     detailsButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     tabsContainer: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       paddingTop: 10,
     },
     tab: {
       paddingVertical: 10,
     },
     activeTab: {
       borderBottomWidth: 2,
       borderBottomColor: '#007bff',
     },
     tabText: {
       fontSize: 16,
       color: '#666',
     },
     tabContent: {
       padding: 20,
     },
   });
   

export default PubProfile;
