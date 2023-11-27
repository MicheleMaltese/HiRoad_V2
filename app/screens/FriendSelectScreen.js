import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { currUser, exportMap } from "../assets/test data/TestUserData";

const FriendItem = ({ friend, onTransfer }) => (
  <View key={friend.id} style={styles.friendItem}>
    <Text style={styles.friendName}>{friend.name}</Text>
    <Text style={styles.friendName}>{friend.phone}</Text>
    <TouchableOpacity onPress={() => onTransfer(friend.id)} style={styles.selectButton}>
      <Text style={styles.selectButtonText}>Select</Text>
    </TouchableOpacity>
  </View>
);

const FriendSelectScreen = (props) => {
  const [friends, setFriends] = useState([]);
  const mapIndex = props.route.params.selectedMap;
  console.log(mapIndex);

  useEffect(() => {
    setFriends(addIdToObjects(currUser.friendsList));
  }, []);

  const addIdToObjects = (array) => {
    return array.map((obj, index) => {
      return { ...obj, id: index.toString() };
    });
  };

  const handleSelectFriend = useCallback((friendId) => {
    const selectedFriend = friends.find(friend => friend.id === friendId);
    if (selectedFriend) {
      exportMap(currUser.fullName, mapIndex, selectedFriend.phone);
      Alert.alert('Map Transfer Attempted', `Your map has been attempted to be transferred to ${selectedFriend.name}`);
    }
  }, [friends, props.route.params.selectedMap]);

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <FriendItem
            friend={item}
            onTransfer={handleSelectFriend}
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
  selectButton: {
    width: 100,
    height: 40,
    backgroundColor: '#6C3A2C',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FriendSelectScreen;