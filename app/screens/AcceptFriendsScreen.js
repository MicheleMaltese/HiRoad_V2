import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
    URIs,
    addFriend,
    currUser,
    acceptFriendRequest,
    deleteFriendRequest,
    updateUserInfo,
    getUser,
    updateCurrUser,
    getUpdatedUser,
    changeUsername,
    changeEmail,
    deleteFriend,
    changePassword,
} from "../assets/test data/TestUserData";

// FriendRequestItem component representing each friend request
const FriendRequestItem = ({ friendRequest, onAccept, onDecline }) => (
  <View key={friendRequest.id} style={styles.friendRequestItem}>
      <Text style={styles.friendRequestName}>{friendRequest.name }</Text>
      <Text style={styles.friendRequestName}>{friendRequest.phone}</Text>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity onPress={() => onAccept(friendRequest.id)} style={styles.acceptButton}>
      <Text style={styles.acceptButtonText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDecline(friendRequest.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Decline</Text>
    </TouchableOpacity>
    </View>
  </View>
);

// AcceptFriendsScreen component
const AcceptFriendsScreen = (props) => {
  const [friendRequests, setFriendRequests] = useState(currUser.tempObjects.friendRequests);

    const addIdToObjects = (array) => {
    return array.map((obj, index) => {
      return { ...obj, id: index.toString() }; // Convert index to string as keyExtractor expects string
    });
  };

  useEffect(() => {
    setFriendRequests(addIdToObjects(friendRequests));
  }, []); // Run only once when the component mounts


  const handleDeclineFriendRequest = useCallback((friendRequestId) => {
    let name = friendRequests[parseInt(friendRequestId)].name;
    deleteFriendRequest(parseInt(friendRequestId));
    Alert.alert('Friend Request Declined', `You have declined the friend request from ${name}.`);

    updateUserInfo();
    setFriendRequests(addIdToObjects(currUser.tempObjects.friendRequests));
  }, [friendRequests]);

  const handleAcceptFriendRequest = useCallback(async (friendRequestId) => {
    let name = friendRequests[parseInt(friendRequestId)].name;
    acceptFriendRequest(parseInt(friendRequestId));
    deleteFriendRequest(parseInt(friendRequestId));
    Alert.alert('Friend Request Accepted', `You have accepted the friend request from ${name}.`);

    setFriendRequests(addIdToObjects(currUser.tempObjects.friendRequests));
    await updateUserInfo();
    updateCurrUser(await getUpdatedUser(currUser.email));
    props.navigation.goBack();
  }, [friendRequests]);

  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <FriendRequestItem
            friendRequest={item}
            onAccept={handleAcceptFriendRequest}
            onDecline={handleDeclineFriendRequest}
          />
        )}
        ListEmptyComponent={<Text style={styles.noFriendRequestText}>No Friend Requests.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#FCF9F4', // Background color from your theme
  },
  friendRequestItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6C3A2C', // Border color from your theme
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendRequestName: {
    fontSize: 14,
    color: '#6C3A2C', 
    fontFamily: 'Avenir-Roman',
    marginRight: 8
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 150,
  },
    deleteButton: {
    width: 80, 
    height: 40, 
    backgroundColor: '#6C3A2C',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
    acceptButton: {
    width: 80, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    backgroundColor: "#548439",
    marginRight: 8,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5, // Padding within the button
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
    noFriendRequestText: {
    fontSize: 18,
    color: '#6C3A2C',
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    marginTop: 20,
  },  
});

export default AcceptFriendsScreen;
