import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
    URIs,
    addFriend,
    currUser,
    updateUserInfo,
    getUser,
    updateCurrUser,
    changeUsername,
    changeEmail,
    deleteFriend,
    changePassword,
} from "../assets/test data/TestUserData";

const FriendItem = ({ friend, onDelete, onFriendSelect }) => (
  <View key={friend.id} style={styles.friendItem}>
      <Text style={styles.friendName}>{friend.name}</Text>
      <Text style={styles.friendName}>{friend.phone}</Text>
    <TouchableOpacity onPress={() => onDelete(friend.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const EditFriendsScreen = (props) => {
  const [friends, setFriends] = useState(currUser.friendsList);

  const addIdToObjects = (array) => {
    return array.map((obj, index) => {
      return { ...obj, id: index.toString() }; // Convert index to string as keyExtractor expects string
    });
  };

  useEffect(() => {
    setFriends(currUser.friendsList);
    setFriends(addIdToObjects(friends));
  }, []); // Run only once when the component mounts

  const handleDeleteFriend = useCallback((friendId) => {
    deleteFriend(parseInt(friendId));
    Alert.alert('Delete Friend', 'The friend has been removed from your friend list.');

    updateUserInfo();
    //const updatedFriends = friends.filter(friend => friend.id !== friendId);
    setFriends(addIdToObjects(currUser.friendsList));
  }, [friends]);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem
            friend={item}
            onDelete={handleDeleteFriend}
          />
        )}
        ListEmptyComponent={<Text style={styles.noFriendsText}>No Friends To Display.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#FCF9F4',
  },
  friendItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6C3A2C',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendName: {
    fontSize: 18,
    color: '#6C3A2C',
    fontFamily: 'Avenir-Book',
  },
  noFriendsText: {
    fontSize: 18,
    color: '#6C3A2C',
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    marginTop: 20,
  },    
  deleteButton: {
    width: 100, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    backgroundColor: '#6C3A2C',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5, // Padding within the button
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditFriendsScreen;
