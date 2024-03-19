import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { updateFollow, updateCheckInStatus } from '../../services/api/pub';

import PubMenu from '../../components/pub/PubMenu';

const PubDetailsScreen = ({ route }) => {
  const { pub } = route.params;

  // Simulated state for active tab. Default is "Stories"
  const [activeTab, setActiveTab] = useState('People');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleCheckInPress = async () => {
    try {
      // Toggle the check-in status based on current state
      const checkIn = !isCheckedIn;
      const response = await updateCheckInStatus(pub._id, checkIn);
      console.log("Check-in status updated:", response);
      setIsCheckedIn(response.message === 'Checked in' ? true : false); // Update the local UI state based on the action's success
    } catch (error) {
      console.error("Error updating check-in status:", error);
    }
  };
  const handleFollowPress = async () => {
     try {
       // Toggle the follow status based on current state
       const shouldFollow = !isFollowing;
       const response = await updateFollow(pub._id, shouldFollow);
       console.log("Follow status updated:", response);
       setIsFollowing(response.message === 'Followed' ? true : false);

     } catch (error) {
       console.error("Error updating follow status:", error);
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
     <SafeAreaView>
<ScrollView contentContainerStyle={styles.container}>

     <View style={styles.profileSection}>
          <View stlye={styles.left}>
               <Image
                    style={styles.profileImage}
                    source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your profile image source
               />
               <Text style={styles.profileName}>{pub.pubName}</Text>
          </View>

          <View style={styles.right}>
               <View style={styles.detailsSection}>
                    <View style={styles.detailsRow}>
                         <Text style={styles.detailsText}>Followers: {/* Your followers count here */}</Text>
                         <Text style={styles.detailsText}>Stories: {/* Your stories count here */}</Text>
                    </View>
                    <Text style={styles.detailsText}>Address: {pub.city}</Text>
                    <Text style={styles.detailsText}>Description: {/* Your description here */}</Text>
                    <View style={styles.detailsButtons}>
                    <TouchableOpacity style={styles.checkInButton} onPress={handleFollowPress}>
                         <Text style={styles.checkInButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.checkInButton} onPress={handleCheckInPress}>
                         <Text style={styles.checkInButtonText}>{isCheckedIn ? 'Check-Out' : 'Check-In'}</Text>
                    </TouchableOpacity>

                    </View>
               </View>
          </View>
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
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
     container: {
       padding: 20,
     },
     profileSection: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 20,
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
     detailsSection: {
       marginTop: 10,
       flex: 1,
     },
     detailsRow: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 5,
     },
     detailsText: {
       fontSize: 16,
     },
     detailsButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     checkInButton: {
       marginTop: 20,
       backgroundColor: '#007bff',
       padding: 10,
       borderRadius: 5,
       alignItems: 'center',
       width: 100,
     },
     checkInButtonText: {
       color: '#ffffff',
       fontSize: 12,
       fontWeight: 'bold',
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
   

export default PubDetailsScreen;
