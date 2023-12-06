import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
    URIs,
    addFriend,
    currUser,
    acceptFriendRequest,
    deleteFriendRequest,
    updateUserInfo,
    acceptMapRequest,
    deleteMapRequest
} from "../assets/test data/TestUserData";

const MapRequestItem = ({ mapRequest, onAccept, onDecline }) => (
  <View key={mapRequest.id} style={styles.mapRequestItem}>
      <Text style={styles.mapRequestName}>{'Map Name: ' + mapRequest.mapName + '\nFrom: ' + mapRequest.fromName}</Text>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity onPress={() => onAccept(mapRequest.id)} style={styles.acceptButton}>
      <Text style={styles.acceptButtonText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDecline(mapRequest.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Decline</Text>
    </TouchableOpacity>
    </View>
  </View>
);

const AcceptMapsScreen = (props) => {
  const [mapRequests, setMapRequests] = useState(currUser.tempObjects.tempMaps);

    const addIdToObjects = (array) => {
    return array.map((obj, index) => {
      return { ...obj, id: index.toString() }; // Convert index to string as keyExtractor expects string
    });
  };

  useEffect(() => {
    setMapRequests(addIdToObjects(mapRequests));
    console.log(mapRequests);
  }, []); // Run only once when the component mounts


  const handleDeclineMapRequest = useCallback((mapRequestId) => {
    let name = mapRequests[parseInt(mapRequestId)].fromName;
    deleteMapRequest(parseInt(mapRequestId));
    Alert.alert('Map Request Declined', `You have declined the map request from ${name}.`);

    updateUserInfo();
    setMapRequests(addIdToObjects(currUser.tempObjects.tempMaps));
  }, [mapRequests]);

  const handleAcceptMapRequest = useCallback(async (mapRequestId) => {
    let name = mapRequests[parseInt(mapRequestId)].fromName;
    acceptMapRequest(parseInt(mapRequestId));
    deleteMapRequest(parseInt(mapRequestId));
    Alert.alert('Map Request Accepted', `You have accepted the map request from ${name}. Log back in to see your updated map list`);

    setMapRequests(addIdToObjects(currUser.tempObjects.tempMaps));
    updateUserInfo();
  }, [mapRequests]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mapRequests}
        renderItem={({ item }) => (
          <MapRequestItem
            mapRequest={item}
            onAccept={handleAcceptMapRequest}
            onDecline={handleDeclineMapRequest}
          />
        )}
        ListEmptyComponent={<Text style={styles.noMapRequestText}>No Map Requests.</Text>}
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
  mapRequestItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6C3A2C', // Border color from your theme
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapRequestName: {
    fontSize: 18,
    color: '#6C3A2C', // Text color from your theme
    fontFamily: 'Avenir-Roman', // Font from your theme
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 150,
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
    acceptButton: {
    width: 100, // Adjust the width as needed
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
    noMapRequestText: {
    fontSize: 18,
    color: '#6C3A2C',
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    marginTop: 20,
  },  
});

export default AcceptMapsScreen;
