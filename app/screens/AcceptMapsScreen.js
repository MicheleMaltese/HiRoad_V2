import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

const MapInvitationItem = ({ map, onAccept, onReject }) => (
  <View style={styles.mapInvitationItem}>
    <Text style={styles.mapTitle}>{map.title}</Text>
    <Button title="Accept" onPress={onAccept} />
    <Button title="Reject" onPress={onReject} color="red" />
  </View>
);

const AcceptMapsScreen = () => {
  const [mapInvitations, setMapInvitations] = useState([
    { id: '1', title: 'City Parks' },
    { id: '2', title: 'Mountain Trails' },
    // Add more map invitations here
  ]);

  const handleAcceptInvitation = (mapId) => {
    // Logic to accept the map invitation
    // API call to update the server
    Alert.alert('Accepted map invitation');
    // Here you would probably remove the invitation from the list as well
    setMapInvitations(currentInvitations => currentInvitations.filter(invite => invite.id !== mapId));
  };

  const handleRejectInvitation = (mapId) => {
    // Logic to reject the map invitation
    // API call to update the server
    Alert.alert('Rejected map invitation');
    // Here you would probably remove the invitation from the list as well
    setMapInvitations(currentInvitations => currentInvitations.filter(invite => invite.id !== mapId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mapInvitations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MapInvitationItem
            map={item}
            onAccept={() => handleAcceptInvitation(item.id)}
            onReject={() => handleRejectInvitation(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  mapInvitationItem: {
    padding: 10,
    fontSize: 18,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapTitle: {
    flex: 1,
  },
});

export default AcceptMapsScreen;
