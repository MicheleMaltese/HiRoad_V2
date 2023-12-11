import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Linking,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import validator from "validator";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook
import {
  getUpdatedUser,
  updateCurrUser,
  currUser,
} from "../assets/test data/TestUserData.js";

function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation(); // Create the navigation hook

  const handleForgotPassword = async () => {
    try {
      await Linking.openURL(
          "mailto:" +
              "hiroadsocial@gmail.com" 
      );
  } catch {}
  };
    /*try {
      if (validator.isEmail(email)) {
        try {
        setEmailError("");
        updateCurrUser(await getUpdatedUser(email));
        // Navigate to the "EnterCodeScreen" when the email is valid
        console.log(email);
        props.navigation.navigate("EnterCode", {
          email: email,
        });
        }
        catch(err) {
          console.log(err);
          setEmailError("Email address not found.");
        }
      } else {
        setEmailError("Please enter a valid email address.");
      }
    } catch (error) {
      Alert.alert(error);
    }
  };*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Admin</Text>
      {/*<TextInput
        style={[styles.input, emailError ? styles.errorInput : null]}
        placeholder="Enter your email here"
        placeholderTextColor="#000" 
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError ? (
        <Text style={styles.invalidInputStyle}>{emailError}</Text>
      ) : null}*/}
      <Pressable
        style={[styles.submitButton, { backgroundColor: "#6C3A2C" }]}
        onPress={handleForgotPassword}
      >
        <Text style={[styles.submitButtonText, { color: "#FCF9F4" }]}>Send An Email With Your Request</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F4", // Updated background color
    padding: 20,
  },
  title: {
    fontSize: 32, // Updated font size
    color: "#6C3A2C", // Updated text color
    marginBottom: 20,
    fontFamily: "Avenir-Black", // Updated font
  },
  invalidInputStyle: {
    color: "#ffffff",
    fontFamily: "Avenir-Black",
    fontSize: 15,
    alignSelf: "center",
    backgroundColor: "#E77728",
    paddingLeft: 10,
    paddingRight: 10,
},
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ffffff", // Updated background color
    borderColor: "#6C3A2C",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: "Avenir-Book", // Updated font
  },
  submitButton: {
    backgroundColor: "#6C3A2C", // Updated background color
    padding: 14, // Updated padding
    borderRadius: 10, // Updated border radius
    marginTop: 6
  },
  submitButtonText: {
    color: "#FCF9F4",
    textAlign: "center",
    fontSize: 20, // Updated font size
    fontFamily: "Avenir-Black", // Updated font
  },
});

export default ForgotPasswordScreen;
