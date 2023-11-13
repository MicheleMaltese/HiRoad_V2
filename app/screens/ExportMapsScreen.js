import React, { useState, useEffect } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { currUser } from "../assets/test data/TestUserData.js";
import { useNavigation } from "@react-navigation/native";

function ExportMapsScreen() {
  const [editMode, setEditMode] = useState(false);
  const [maps, setMaps] = useState(currUser.maps);
  const navigation = useNavigation();

  useEffect(() => {
    
    setMaps(currUser.maps);
  }, []);

  const handleMapSelect = (selectedMap) => {
    navigation.navigate("FriendSelectScreen", { map: selectedMap });
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.mapHeader}>{"Welcome, " + currUser.name}</Text>
      <ScrollView style={styles.scrollView}>
        {maps.map((map, index) => (
          <View style={styles.mapContainer} key={map.id}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => handleMapSelect(map)}
            >
              <Text style={styles.mapButtonText}>{map.mapName}</Text>
            </TouchableOpacity>
            {editMode && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  navigation.navigate("Create Map", {
                    id: index,
                    mode: "edit",
                  });
                }}
              >
                <Icon name="edit" color="#6C3A2C" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}



export default ExportMapsScreen;
