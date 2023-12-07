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
} from "react-native";
import { Icon } from "react-native-elements";
import { currUser, exportPin, addMap, acceptFriendRequest, updateUserInfo, updateCurrUser, addFriend, acceptPin } from "../assets/test data/TestUserData.js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const polyline = require("@mapbox/polyline");

function MapViewScreen(props) {
  // useState to indicate whether the screen is in edit mode
  const [editMode, setEditMode] = useState(false);
  // Toggle the ability to edit existing maps
  // FIXME: probably can replace all instances of this function with the one line inside of it
  const showHideEditMode = () => {
    setEditMode(!editMode);
  };
  // Sets up the buttons in the header
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // Toggles edit mode
      headerRight: () => (
        <Icon
          containerStyle={styles.headerIcon}
          color="#FCF9F4"
          type="material"
          name="edit"
          onPress={() => {
            showHideEditMode();
          }}
        />
      ),
    });
  });
  //useState containing the array of user maps
  [maps, setMaps] = useState(currUser.maps);
  [username, setUsername] = useState(currUser.name);
  // Makes sure the maps are updating in accordance to the user data in real time
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      //DO NOT REMOVE
      //For some reason if you don't turn off edit mode, the maps don't update editing changes.
      //But also probably coming back to this screen should turn off edit mode regardless
      setEditMode(false);
      setMaps(currUser.maps);
      setUsername(currUser.name);
    });
    return () => {
      unsubscribe;
    };
  });

  // Function to handle creating a new map by adding it to the screen and the user data
  handleCreateMap = (props) => {
    props.navigation.navigate("Create Map", {
      id: currUser.maps.length - 1,
      mode: "add",
    });
    setMaps((prevMaps) => [...prevMaps, {}]);
  };

  return (
    <>
      <SafeAreaView style={styles.background}>
        {/* Map for decoration, does not serve a function
        FIXME: Any updates to map styles in other portions of the app will need to be made here, if this feature is kept.
               Currently using hardcoded data, can be changed to use information from user maps*/}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 43.436,
            longitude: -83.377,
            latitudeDelta: 23,
            longitudeDelta: 23,
          }}
          zoomEnabled={true}
        >
        </MapView>
        {/* Screen title. Welcomes user, displays their name.*/}
        <Text
          style={styles.mapHeader}
          allowFontScaling={false}
          adjustsFontSizeToFit={true}
        >
          {"Welcome, " + username[0].toUpperCase() + username.slice(1)}
        </Text>

        {/* List of user maps */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {maps.map((item, index) => (
            <View style={{ flexDirection: "row" }} key={index}>
              <Pressable
                style={item.exported === true ? styles.sharedMapButton : styles.mapButton}
                onPress={() =>
                  props.navigation.navigate("TestMap", {
                    id: index,
                  })
                }
              >
                <Text style={styles.mapButtonText}>{item.mapName}</Text>
              </Pressable>
              {/* Edit button, only viewable in edit mode */}
              {editMode ? (
                <Pressable
                  style={styles.editButton}
                  onPress={() => {
                    props.navigation.navigate("Create Map", {
                      id: index,
                      mode: "edit",
                    });
                  }}
                >
                  <Icon name="edit" color="#6C3A2C" />
                </Pressable>
              ) : null}
            </View>
          ))}
        </ScrollView>
        {/* Press this button to create a new map
        FIXME: Button needs to be redesigned, but is otherwise functional */}
        <Pressable
          style={styles.createMapButton}
          onPress={() => handleCreateMap(props)}
        >
          <Text style={styles.createMapButtonText}>CREATE NEW MAP</Text>
        </Pressable>
        <Pressable
          style={styles.socialMapButton}
          onPress={() =>
            props.navigation.navigate("Social Map", {
            })
          }
        >
          <Text style={styles.createMapButtonText}>VIEW SOCIAL MAP</Text>
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
    fontSize: 38,
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
    fontSize: 20,
  },
  mapButton: {
    width: "90%",
    backgroundColor: "#548439",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "2%",
    marginBottom: "2%",
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
    fontSize: 20,
    marginLeft: "5%",
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

export default MapViewScreen;
