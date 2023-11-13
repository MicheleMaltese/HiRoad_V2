import React, { useState, useEffect, useRef } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  AppState,
} from "react-native";
import {
  changeName,
  changeLat,
  changeLong,
  changeAddress,
  addMap,
  deleteMap,
  currUser,
  updateUserInfo,
  Location
} from "../assets/test data/TestUserData.js";
//import * as Location from "expo-location";
import { Icon } from "react-native-elements";

//Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function CreateMapScreen(props) {
  // Delete the current map from the user data, then navigate to the home page
  const goBackDeleteMap = (index) => {
    if (props.route.params.mode == "edit") {
      deleteMap(index);
      updateUserInfo();
    }
    props.navigation.goBack();
  };

  // Allows user to confirm deletion of a map
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are you sure?",
      "This will permanently delete your map.",
      [
        // Confirm deletion
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            goBackDeleteMap(props.route.params.id);
          },
        },
        // Cancel deletion
        {
          text: "Cancel",
        },
      ]
    );
  };

  // Sets header buttons
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // FIXME: buttons should be changed back to the usual arrow. Will need to import and use HeaderBackButton (which we don't have yet)
      // Allows user to delete current map, when in edit mode
      headerRight: () =>
        props.route.params.mode == "edit" ? (
          <Icon
            containerStyle={styles.headerIcon}
            color="#FCF9F4"
            type="material"
            name="delete"
            onPress={() => {
              showConfirmDialog();
            }}
          />
        ) : null,
      title: props.route.params.mode == "edit" ? "Edit Map" : "Create Map",
    });
  }, [props.navigation]);

  // Initializes title with existing title
  [title, setTitle] = useState(
    props.route.params.mode == "add" ||
      currUser.maps[props.route.params.id].mapName == " "
      ? null
      : currUser.maps[props.route.params.id].mapName
  );
  // Initializes latitude with existing latitude
  [lat, setLat] = useState(
    currUser.maps[props.route.params.id] == undefined
      ? null
      : currUser.maps[props.route.params.id].startlat
  );
  // Initializes longitude with existing longitude
  [long, setLong] = useState(
    currUser.maps[props.route.params.id] == undefined
      ? null
      : currUser.maps[props.route.params.id].startlng
  );
  [address, setAddress] = useState(
    props.route.params.mode == "add"
      ? null
      : currUser.maps[props.route.params.id].address
  );
  [showErr, setShowErr] = useState(false);
  [mounted, setMounted] = useState(true);

  //Saves the map data to the user's profile
  //Should not change map data before this point, in case user wants to cancel operation
  const updateMapData = async (props) => {
    try {
      const coords = await Location.geocodeAsync(address);
      //If you are adding a new map, create a new map in the array, and then navigate to it
      if (props.route.params.mode == "add") {
        addMap({
          mapName: title == null || title == "" ? " " : title,
          fromName: "foo",
          startlat: coords[0].latitude,
          startlng: coords[0].longitude,
          address: address == "Loading..." ? "" : address,
          exported: false,
          pins: [],
        });
        updateUserInfo();
        props.navigation.replace("TestMap", {
          id: props.route.params.id + 1,
        });
      }
      // If you are editing an existing map, save the data to that map and then navigate back to the home screen
      else if (props.route.params.mode == "edit") {
        changeName(title, props.route.params.id);
        if (address == "Loading...") {
          changeAddress("", props.route.params.id);
        } else {
          changeAddress(address, props.route.params.id);
        }
        changeLat(coords[0].latitude, props.route.params.id);
        changeLong(coords[0].longitude, props.route.params.id);
        updateUserInfo();
        props.navigation.goBack();
      }
    } catch {
      console.log("broke it");
      setShowErr(true);
    }
  };

  let [permissions, setPermissions] = useState();

  async function permissionsFlow() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      Alert.alert(
        "Location permission denied",
        "Would you like to enable it? (Warning: will exit the app)",
        [
          {
            text: "No",
            onPress: () => console.log("cancel pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      if (mounted) {
        setPermissions(false);
      }
    } else {
      console.log("Permission Granted");
      if (mounted) {
        setAddress("Loading...");
        getUserLocation();
        setPermissions(true);
      }
    }
  }

  const getUserLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync();
      if (mounted) {
        setLat(loc.coords.latitude);
        setLong(loc.coords.longitude);
      }
      const addr = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: long,
      });
      console.log(addr);
      if (mounted) {
        setAddress(
          addr[0].streetNumber +
            " " +
            addr[0].street +
            " " +
            addr[0].city +
            " " +
            addr[0].region
        );
      }
      console.log(address);
    } catch {
      if (mounted) {
        setAddress("Couldn't find location");
      }
    }
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <>
      <DismissKeyboard>
        <SafeAreaView style={styles.background}>
          {/* Text field to input the map's name */}
          <View style={styles.textInputContainer}>
            <Text style={styles.inputLabelHeader}>Enter Map Name</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              // If adding a map, be blank. Otherwise, show existing title
              defaultValue={props.route.params.mode == "add" ? "" : title}
              onChangeText={(text) => setTitle(text)}
            ></TextInput>
          </View>
          {/* Text field to input location
        FIXME: Needs to use location services, needs to autofill addresses */}
          <View style={styles.textInputContainer}>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              defaultValue={address}
              onChangeText={(text) => setAddress(text)}
            ></TextInput>
          </View>
          <View>{showErr ? <Text>Invalid Location</Text> : null}</View>
          <Pressable
            style={styles.createMapButton}
            onPress={() => permissionsFlow()}
          >
            <Text style={styles.createMapButtonText}>USE LOCATION</Text>
          </Pressable>
          {/* Press this button to save the map data */}
          <Pressable
            style={styles.createMapButton}
            onPress={() => updateMapData(props)}
          >
            <Text style={styles.createMapButtonText}>SAVE MAP</Text>
          </Pressable>
        </SafeAreaView>
      </DismissKeyboard>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F4",
  },
  headerContainer: {
    flex: 0.2,
    marginBottom: 100,
  },
  createMapHeader: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#6C3A2C",
  },
  inputLabelHeader: {
    fontFamily: "Avenir-Heavy",
    fontSize: 28,
    color: "#6C3A2C",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#6C3A2C",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontSize: 18,
    fontFamily: "Avenir-Book",
    color: "#6C3A2C",
  },
  textInputContainer: {
    width: "80%",
    marginBottom: "10%",
  },
  createMapButton: {
    width: "80%",
    flex: 0.1,
    backgroundColor: "#548439",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: "5%",
  },
  createMapButtonText: {
    color: "#FCF9F4",
    fontFamily: "Avenir-Black",
    alignSelf: "center",
    fontSize: 24,
    marginLeft: "5%",
  },
  inputLabel: {
    fontFamily: "Avenir-Roman",
    color: "#6C3A2C",
    fontSize: 22,
  },
});

export default CreateMapScreen;
