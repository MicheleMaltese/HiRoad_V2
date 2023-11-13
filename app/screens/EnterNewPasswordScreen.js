import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import {
    URIs,
    currUser,
    updateUserInfo,
    getUser,
    updateCurrUser,
    postUserResetPassword,
    changePassword,
} from "../assets/test data/TestUserData";

function EnterNewPasswordScreen(props) {
  const email = useState(currUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const ref_confirmInput = useRef();

  function validate_password(password) {
  let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (password.match(check)) {
     return true;
  } else {
    return false;
  }
}

  const handleResetPassword = async () => {
    try {
      if (validate_password(password)) {
        if (password !== confirmPassword) {
          setPasswordError("Passwords don't match");
        }
        else {
        setPasswordError("");

        changePassword(password);
        //Alert.alert(currUser);
        await (postUserResetPassword(currUser.email))
        Alert.alert(
          "Password Reset",
          "Your password has been successfully reset."
        );
        // Navigate to the desired screen after resetting the password
        props.navigation.navigate("Login");
        }
      } else {
        setPasswordError("Password must be at least 8 characters, contain an uppercase character, lowercase character, and a number");
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter New Password</Text>
      <TextInput
        style={[styles.input, passwordError ? styles.errorInput : null]}
        placeholder="Enter your new password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        returnKeyType="next"
        onSubmitEditing={() => {
            ref_confirmInput.current.focus();
        }}
      />
      <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          ref={ref_confirmInput}
          placeholder="Confirm your new password"
          value={confirmPassword}
          returnKeyType="done"
          secureTextEntry={true}
          multiline={false}
          autoCorrect={false}
          onChangeText={(text) => {
              setConfirmPassword(text);
              }
          }
      />
      {passwordError ? (
        <Text style={styles.invalidInputStyle}>{passwordError}</Text>
      ) : null}      
      <Pressable
        style={styles.submitButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.submitButtonText}>Reset Password</Text>
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
    fontSize: 48, // Updated font size
    color: "#6C3A2C", // Updated text color
    marginBottom: 20,
    fontFamily: "Avenir-Black", // Updated font
  },
  invalidInputStyle: {
        backgroundColor: "#F7D1B6",
        borderColor: "#E77728",
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        fontFamily: "Avenir-Roman",
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

export default EnterNewPasswordScreen;
