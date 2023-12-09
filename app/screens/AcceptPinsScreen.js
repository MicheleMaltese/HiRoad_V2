import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {
    URIs,
    addFriend,
    currUser,
    updateCurrUser,
    getUpdatedUser,
    acceptFriendRequest,
    deleteFriendRequest,
    updateUserInfo,
    acceptPin,
    deletePinRequest
} from "../assets/test data/TestUserData";

const PinRequestItem = ({ pinRequest, onAccept, onDecline }) => (
  <View key={pinRequest.id} style={styles.pinRequestItem}>
      <Text style={styles.pinRequestName}>{'Pin Name:\n' + pinRequest.label + '\n\nFrom:\n' + pinRequest.fromName}</Text>
    <View style={styles.buttonsContainer}>
    <TouchableOpacity onPress={() => onAccept(pinRequest.id)} style={styles.acceptButton}>
      <Text style={styles.acceptButtonText}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDecline(pinRequest.id)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Decline</Text>
    </TouchableOpacity>
    </View>
  </View>
);

const AcceptPinsScreen = (props) => {
  const [pinRequests, setPinRequests] = useState(currUser.tempObjects.tempPins);

    const addIdToObjects = (array) => {
    return array.map((obj, index) => {
      return { ...obj, id: index.toString() }; // Convert index to string as keyExtractor expects string
    });
  };

  useEffect(() => {
    setPinRequests(addIdToObjects(pinRequests));
    console.log(pinRequests);
  }, []); // Run only once when the component mounts


  const handleDeclinePinRequest = useCallback((pinRequestId) => {
    let name = pinRequests[parseInt(pinRequestId)].fromName;
    deletePinRequest(parseInt(pinRequestId));
    Alert.alert('Pin Request Declined', `You have declined the pin request from ${name}.`);

    updateUserInfo();
    setPinRequests(addIdToObjects(currUser.tempObjects.tempPins));
  }, [pinRequests]);

  const handleAcceptPinRequest = useCallback(async (pinRequestId) => {
    let name = pinRequests[parseInt(pinRequestId)].fromName;
    const res = await acceptPin(currUser.email, parseInt(pinRequestId));
    const pin = res.data;

    let pins = currUser.socialMap.pins;
    pins.push(pin);
  
    console.log(pin);
  
    currUser.socialMap.pins = pins;

    deletePinRequest(parseInt(pinRequestId));
    await updateUserInfo();
    Alert.alert('Pin Request Accepted', `You have accepted the pin request from ${name}.`);

    setPinRequests(addIdToObjects(currUser.tempObjects.tempPins));
    updateCurrUser(await getUpdatedUser(currUser.email));
    props.navigation.goBack();
  }, [pinRequests]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pinRequests}
        renderItem={({ item }) => (
          <PinRequestItem
            pinRequest={item}
            onAccept={handleAcceptPinRequest}
            onDecline={handleDeclinePinRequest}
          />
        )}
        ListEmptyComponent={<Text style={styles.noPinRequestText}>No pin requests.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F4', // Background color from your theme
  },
  pinRequestItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6C3A2C', // Border color from your theme
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinRequestName: {
    fontSize: 13,
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
    marginRight: 5,
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
    noPinRequestText: {
    fontSize: 18,
    color: '#6C3A2C',
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    marginTop: 20,
  },  
});

export default AcceptPinsScreen;
