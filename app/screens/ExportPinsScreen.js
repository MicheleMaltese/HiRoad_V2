import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { currUser } from "../assets/test data/TestUserData.js";
import { useNavigation } from "@react-navigation/native";

function ExportPinsScreen() {
  const [maps, setMaps] = useState(currUser.maps);
  const navigation = useNavigation();

  useEffect(() => {
    
    setMaps(currUser.maps);
  }, []);

  const handleMapSelect = (selectedIndex) => {
    console.log(selectedIndex);
    navigation.navigate("PinSelect", { selectedMap: selectedIndex  });
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
      <Text style={styles.mapHeader}>{"Step One:\nSelect Map!"}</Text>
      <ScrollView style={styles.scrollView}>
        {maps.map((map, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => handleMapSelect(index)}
            >
              <Text style={styles.mapButtonText}>{map.mapName}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F4",
  },
  headerIcon: {
    paddingRight: 6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapHeader: {
    fontSize: 32,
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
    padding: 10,
    textAlign: "center",
    justifyContent: "center"
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
  },
mapButton: {
  width: Dimensions.get("window").width * 0.8,
  backgroundColor: "#548439",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  marginVertical: 10,
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
    fontSize: 24,
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


export default ExportPinsScreen;
