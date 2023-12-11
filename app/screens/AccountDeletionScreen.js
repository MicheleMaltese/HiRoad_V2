import axios from "axios";
import React, { useState, useRef } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native";
import {
  getUser,
  deleteUser,
  updateCurrUser,
  currUser,
} from "../assets/test data/TestUserData.js";

// Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

function DeletionScreen(props) {
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    try {
      await getUser(currUser.email, password);
      await deleteUser(currUser.email);
      updateCurrUser(null);
      Alert.alert(
        "Account Deletion...",
        "Your account has been deleted."
      );
      props.navigation.navigate("Welcome");
    } catch(err) {
      console.log(err);
      Alert.alert(
        "Deletion failed...",
        "Please enter the correct password."
      );
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <DismissKeyboard>
        <View style={styles.containerView}>
          {/* Page title */}
          <View style={styles.headerContainer}>
            <Text
              allowFontScaling={false}
              style={styles.deleteHeader}
              maxFontSizeMultiplier={1.25}
            >
              Are you sure that you want to permanently delete your account?
            </Text>
          </View>
          {/* User enters password associated with the account in this input */}
          <View style={styles.textInput}>
            <Text
              allowFontScaling={false}
              style={styles.inputLabel}
              maxFontSizeMultiplier={1.75}
            >
            Enter Your Password To Confirm
            </Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              multiline={false}
              autoComplete="password"
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
              returnKeyType="done"
              textContentType="password"
            />
          </View>
          {/* User presses this button to login and navigate to their home page
            FIXME: Currently does not validate users, it navigates directly to a test home page for testing purposes */}
          <Pressable
            style={styles.deleteButton}
            onPress={() => {
              // trim password
              handleDelete();
            }}
          >
            <Text style={styles.deleteButtonText}>DELETE ACCOUNT</Text>
          </Pressable>
        </View>
      </DismissKeyboard>
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
  containerView: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 100 : "5%",
  },
  headerContainer: {
    flex: 0.4,
    flexGrow: 0.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "8%",
  },
  deleteHeader: {
    fontSize: 32,
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
    textAlign: "center"
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#6C3A2C",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  inputLabel: {
    fontFamily: "Avenir-Book",
    color: "#6C3A2C",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  // Changed: Generalized emailInput and passwordInput to be textInput
  textInput: {
    width: "80%",
    marginBottom: "10%",
  },
  // Changed: Added marginTop of 5% instead of having two text inputs
  deleteButton: {
    padding: 15,
    width: "80%",
    backgroundColor: "#548439",
    // flex: 0.08,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
},
deleteButtonText: {
    color: "#FCF9F4",
    fontFamily: "Avenir-Black",
    alignSelf: "center",
    fontSize: 24,
},
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: "#6C3A2C",
    fontFamily: "Avenir-Book",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
    fontSize: 12,
    alignSelf: "center",
    marginTop: "5%",
  },
});

export default DeletionScreen;
