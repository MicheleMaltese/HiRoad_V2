import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  Button,
  BackHandler,
} from "react-native";
import { currUser } from "../assets/test data/TestUserData";
import { SafeAreaView } from "react-native-safe-area-context";
import { URIs, changeIcon } from "../assets/test data/TestUserData";
import { HeaderBackButton } from "react-navigation-stack";
import axios from "axios";

function SelectIconScreen(props) {
  // Array of icons
  const [icons, setIcons] = useState();
  // Initializes with currently selected icon
  const [selectedIcon, setSelectedIcon] = useState(
    currUser.maps[props.route.params.mapId].pins[props.route.params.id].icon
  );
  // For some reason you need to change a useState or it breaks
  const [test, setTest] = useState(true);

  // Allow user to go back without changing the icon
  const cancelIcon = (props) => {
    changeIcon(selectedIcon, props.route.params.mapId, props.route.params.id);
    props.navigation.goBack();
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // Allows user to cancel operation
      headerLeft: () => (
        <HeaderBackButton onPress={() => cancelIcon(props)} title="Cancel" />
      ),
      //Save Icon
      headerRight: () => (
        <Button onPress={() => props.navigation.goBack()} title="SAVE" />
      ),
    });
  }, [props.navigation]);

  const handleBackPressAndroid = () => {
    cancelIcon(props);
    return true;
  };

  useEffect(() => {
    //Fill up the icon array with the files from the database
    iconObjs = [];
    async function setIconArray() {
      var imgs = await axios.get(URIs[3]);
      for (i = 0; i < imgs.data.length; ++i) {
        iconObjs.push({
          src: { uri: URIs[3] + "/" + imgs.data[i] },
          //Makes the currently selected icon appear selected
          isSelected:
            currUser.maps[props.route.params.mapId].pins[props.route.params.id]
              .icon == imgs.data[i]
              ? true
              : false,
          //FIXME: I don't think id is ever used
          id: i,
          name: imgs.data[i],
        });
      }
      setIcons(iconObjs);
    }

    setIconArray();

    BackHandler.addEventListener("hardwareBackPress", handleBackPressAndroid);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackPressAndroid
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      {/* FlatList is the grid containing all of the icons */}
      <FlatList
        horizontal={false}
        data={icons}
        key={"5"}
        numColumns={5}
        keyExtractor={(item) => item.id}
        // Renders the items on the screen
        renderItem={({ item, index }) => (
          <Pressable
            //FIXME: If you don't call setTest (or some other useState update) here,
            //The buttons can't be pressed. No idea why.
            onPress={(item) => {
              // If the tapped icon is already selected, set to default icon
              // Can change default image here, must also be changed in the user model
              if (icons[index].isSelected) {
                setTest(!test);
                changeIcon(
                  "apingreen.png",
                  props.route.params.mapId,
                  props.route.params.id
                );
                //If the tapped icon is not selected, change the icon to the tapped icon
              } else {
                setTest(!test);
                changeIcon(
                  icons[index].name,
                  props.route.params.mapId,
                  props.route.params.id
                );
              }
              //Toggle the tapped icon's selected state
              icons[index].isSelected = !icons[index].isSelected;
              //Deselect all other icons
              for (i = 0; i < icons.length; ++i) {
                if (i != index) {
                  icons[i].isSelected = false;
                }
              }
            }}
            style={icons[index].isSelected ? styles.pressedIcon : styles.icon}
          >
            <View>
              <Image
                source={item.src}
                style={styles.icon}
                keyExtractor={(item) => item.id}
              />
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F4",
    paddingTop: Dimensions.get("window").height * 0.05,
  },
  icon: {
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    resizeMode: "center",
    margin: 2,
    borderRadius: 5,
  },
  pressedIcon: {
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    resizeMode: "center",
    margin: 2,
    backgroundColor: "#C6B39D",
    borderRadius: 5,
  },
});

export default SelectIconScreen;
