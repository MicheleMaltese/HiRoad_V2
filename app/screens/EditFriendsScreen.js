import React, { useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// FriendItem component representing each friend in the list
const FriendItem = ({ friend, onDelete, onFriendSelect }) => (
  <View style={styles.friendItem}>
    <TouchableOpacity onPress={() => onFriendSelect(friend.id)}>
      <Text style={styles.friendName}>{friend.name}</Text>
    </TouchableOpacity>
    <Button title="Delete" onPress={() => onDelete(friend.id)} color="#E77728" />
  </View>
);

// EditFriendsScreen component
const EditFriendsScreen = ({ onFriendSelect }) => {
  const [friends, setFriends] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    // ... more friends
  ]);

  const handleDeleteFriend = useCallback((friendId) => {
    // Call an API to delete the friend from the server or handle it locally
    setFriends(currentFriends => currentFriends.filter(friend => friend.id !== friendId));
    Alert.alert('Delete Friend', 'The friend has been removed from your friend list.');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FriendItem
            friend={item}
            onDelete={handleDeleteFriend}
            onFriendSelect={onFriendSelect}
          />
        )}
        ListEmptyComponent={<Text style={styles.noFriendsText}>No friends to display.</Text>}
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
  
});

export default EditFriendsScreen;
