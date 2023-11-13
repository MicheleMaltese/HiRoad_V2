// FriendSelectScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FriendSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { map } = route.params;
  const [friends, setFriends] = useState([]); // Replace with actual data source

  useEffect(() => {
    // Fetch the list of friends from your data source
    // For now, we'll use dummy data
    const fetchedFriends = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      // ... other friends
    ];
    setFriends(fetchedFriends);
  }, []);

  const exportMapToFriend = (friendId) => {
    // Implement the export functionality here
    console.log(`Exporting map "${map.mapName}" to friend with ID: ${friendId}`);
    // After export, navigate back or show confirmation
    Alert.alert("Export Successful", `Map "${map.mapName}" has been exported to the friend.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a friend to export "{map.mapName}" to:</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.friendItem}
            onPress={() => exportMapToFriend(item.id)}
          >
            <Text style={styles.friendName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No friends to display.</Text>}
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
  header: {
    fontSize: 18,
    color: '#6C3A2C',
    padding: 10,
    textAlign: 'center',
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6C3A2C',
  },
  friendName: {
    fontSize: 18,
    color: '#6C3A2C',
  },
  // ... other styles you might need
});

export default FriendSelectScreen;
