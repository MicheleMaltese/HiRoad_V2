import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

// FriendRequestItem component representing each friend request
const FriendRequestItem = ({ friendRequest, onAccept, onDecline }) => (
  <View style={styles.friendRequestItem}>
    <Text style={styles.friendRequestName}>{friendRequest.name}</Text>
    <View style={styles.buttonsContainer}>
      <Button title="Accept" onPress={() => onAccept(friendRequest.id)} color="#548439" />
      <Button title="Decline" onPress={() => onDecline(friendRequest.id)} color="#E77728" />
    </View>
  </View>
);

// AcceptFriendsScreen component
const AcceptFriendsScreen = () => {
  const [friendRequests, setFriendRequests] = useState([
    { id: '3', name: 'Charlie' },
    { id: '4', name: 'Danielle' },
    // ... more friend requests
  ]);

  const handleAcceptFriendRequest = (friendRequestId) => {
    // call an API to accept the friend request
    Alert.alert('Friend Request Accepted', `You are now friends with ${friendRequestId}.`);
    // Filter out the accepted request from the list
    setFriendRequests(currentRequests =>
      currentRequests.filter(request => request.id !== friendRequestId)
    );
  };

  const handleDeclineFriendRequest = (friendRequestId) => {
    // call an API to decline the friend request
    Alert.alert('Friend Request Declined', `You have declined the friend request from ${friendRequestId}.`);
    // Filter out the declined request from the list
    setFriendRequests(currentRequests =>
      currentRequests.filter(request => request.id !== friendRequestId)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FriendRequestItem
            friendRequest={item}
            onAccept={handleAcceptFriendRequest}
            onDecline={handleDeclineFriendRequest}
          />
        )}
        ListEmptyComponent={<Text>No friend requests.</Text>}
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
    fontSize: 18,
    color: '#6C3A2C', // Text color from your theme
    fontFamily: 'Avenir-Roman', // Font from your theme
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 150,
  },
});

export default AcceptFriendsScreen;
