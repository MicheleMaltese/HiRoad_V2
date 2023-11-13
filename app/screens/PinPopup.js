import React from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function PinPopup({ navigation }) {
// We will need to use the name (or ideally key) associated with the pressed pin to get the
// values to populate this screen. Until then, they are hardcoded. 

  return (
    <View style={styles.background}>
      <View style={styles.pinNameContainer}>
        <Text style={styles.pinName}>Sand Bay</Text>
      </View>
      <View style={styles.pinDateContainer}>
        <Text style={styles.pinDate}>12/14/21</Text>
      </View>
      <View style={styles.pinNoteContainer}>
        <Text style={styles.pinNote}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo purus at metus dapibus dignissim. Nunc dictum, est nec congue sagittis, leo mi dictum neque, vel venenatis leo mauris in est. Curabitur euismod libero in nulla ultricies rutrum. Praesent rutrum, lectus vitae egestas fringilla, sem ex semper eros, ac pharetra mauris libero nec dui. Pellentesque gravida bibendum enim, in gravida lorem suscipit suscipit. Aenean efficitur dui sit amet imperdiet iaculis. Suspendisse accumsan nunc nec laoreet posuere. Nullam vel vestibulum libero. Etiam quis pretium augue.</Text>
      </View>
      <View style={styles.pinButtonsContainer}>
        <Pressable style={styles.viewMediaButton}>
            <Text style={styles.buttonText}>VIEW MEDIA</Text>
        </Pressable>
        <Pressable style={styles.editPinButton}>
            <Text style={styles.buttonText}>EDIT PIN</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 0.5,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FCF9F4",
  },
  pinNameContainer: {
    flex: 0.1,
    width: '80%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinName: {
    fontSize: 22,
    color: "#6C3A2C",
    fontFamily: "Avenir-Heavy",
    textAlign: 'center',
  },
  pinDateContainer: {
    flex: 0.08,
    width: '80%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDate: {
    fontSize: 18,
    color: "#6C3A2C",
    fontFamily: "Avenir-Roman",
    textAlign: 'center',
  },
  pinNoteContainer: {
    flex: 0.5,
    width: '80%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinNote: {
    fontSize: 18,
    color: "#6C3A2C",
    fontFamily: "Avenir-Book",
    textAlign: 'center',
  },
  pinButtonsContainer: {
    flex: 0.4,
    width: '80%',
    marginBottom: 10,
    padding: 4,
    justifyContent: 'center',
  },
  viewMediaButton: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#6C3A2C",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: '#474139',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 30,
  },
  editPinButton: {
    padding: 15,
    backgroundColor: "#548439",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: '#474139',
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 30,
  },
  buttonText: {
    color: "#FCF9F4",
    fontFamily: "Avenir-Black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default PinPopup;