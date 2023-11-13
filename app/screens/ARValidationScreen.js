import React, { useState, useEffect } from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { currUser, exportPin, addMap, acceptFriendRequest, updateUserInfo, updateCurrUser, addFriend, acceptPin } from "../assets/test data/TestUserData.js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const polyline = require("@mapbox/polyline");

const ARValidationScreen = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [coords, setCoords] = useState([]);
  const [messages, setMessages] = useState([]);

  function distanceInFeet(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d * 3280.84;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

  async function handleArRequest() {
    let coordIndex = -1;
    let minDistance = 1000;

    /*const loc = await Location.getCurrentPositionAsync();
    let lat = loc.coords.latitude;
    let lng = loc.coords.longitude;*/

    let lat = 42.40711433463573;
    let lng = -83.20938882807493;

    for (let i = 0; i < coords.length; i++) {
        let distance = distanceInFeet(lat, lng, coords[i].lat, coords[i].lng);

        if (distance < minDistance) {
            minDistance = distance;
            coordIndex = 1
        }
    }

    if (minDistance <= 50) {
        console.log(messages[coordIndex]);
    }
    else {
        Alert.alert('You must be within 50 feet of a What3Words Address!');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const newAddresses = [];
      const newCoords = [];
      const newMsg = [];

      for (const item of props.route.params.pins) {
        if (item.w3wAddress != null) {
          newAddresses.push(item.w3wAddress);
          newCoords.push({ lat: item.lat, lng: item.lng });
          newMsg.push(item.secretMessage);
        }
      }

      setAddresses(newAddresses);
      setCoords(newCoords);
      setMessages(newMsg);
    };

    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.background}>
        <Text
          style={styles.mapHeader}
          allowFontScaling={false}
          adjustsFontSizeToFit={true}
        >
          {"To view a secret message in augmented reality, make sure you are within 50 feet of any of the following What3Words addresses."}
        </Text>

        {/* List of shared addresses */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {addresses.map((item, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Pressable
                style= {styles.mapButton}
              >
                <Text style={styles.mapButtonText}>{item}</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
        <Pressable
            style={styles.socialMapButton}
            onPress={() => {
                handleArRequest();
            /*props.navigation.navigate("Create Map", {
                id: index,
                mode: "edit",
            });*/
            }}
        >
            <Text style={styles.createMapButtonText}>I am at one of these addresses</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FCF9F4",
  },
  headerIcon: {
    paddingRight: 6,
  },
  scrollView: {
    backgroundColor: "#FCF9F4",
    marginHorizontal: "2%",
    width: Dimensions.get("window").width * 0.9,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapHeader: {
    fontSize: 24,
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
    padding: 10,
    textAlign: "center",
  },
  createMapButton: {
    width: "80%",
    flexDirection: "row",
    flexShrink: 0,
    backgroundColor: "#548439",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: "5%",
  },
    socialMapButton: {
    width: "80%",
    flexDirection: "row",
    flexShrink: 0,
    backgroundColor: "#6C3A2C",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: "5%",
  },
  createMapButtonText: {
    color: "#FCF9F4",
    fontFamily: "Avenir-Heavy",
    alignSelf: "flex-start",
    fontSize: 28,
    textAlign: "center",
  },
  mapButton: {
    width: "90%",
    backgroundColor: "#548439",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "4%",
  },
  sharedMapButton: {
    width: "90%",
    backgroundColor: "#6C3A2C",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "2%",
  },
  mapButtonText: {
    color: "#FCF9F4",
    fontFamily: "Avenir-Light",
    alignSelf: "flex-start",
    fontSize: 22,
    marginLeft: "5%",
    padding: 4
  },
  editButton: {
    justifyContent: "center",
    marginLeft: "1%",
    color: "#6C3A2C",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.25,
  },
});

export default ARValidationScreen;