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
    getUpdatedUser,
    resetPassword,
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
  const [confPasswordError, setConfPasswordError] = useState("");
  const [passwordInputStyle, setPasswordInputStyle] = useState(validInputStyle);
  const [confPasswordInputStyle, setConfPasswordInputStyle] = useState(validInputStyle);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const ref_confirmInput = useRef();

  const invalidInputStyle = {
    color: "#ffffff",
    fontFamily: "Avenir-Black",
    fontSize: 15,
    alignSelf: "center",
    backgroundColor: "#E77728",
    paddingLeft: 10,
    paddingRight: 10,
  };
  // Text Input styling of box with valid input
  const validInputStyle = {
    backgroundColor: "#ffffff",
    borderColor: "#6C3A2C",
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    fontFamily: "Avenir-Roman",
    color: "#6C3A2C",
  };

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
          setConfPasswordError("Passwords don't match.");
        }
        else {
        setPasswordError("");

        //Alert.alert(currUser);
        await (getUpdatedUser(currUser.email))
        Alert.alert(
          "Password Reset",
          "Your password has been successfully reset."
        );

        try {
          console.log(props.email);
          console.log(password);
          await resetPassword(props.route.params.email, password);
          props.navigation.navigate("Login");
        }
        catch (err) {
          console.log(err);
        }
        }
      } else {
        setPasswordError("Password must contain 8 characters, an uppercase letter, lowercase letter, and number.");
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
        onChangeText={(text) => {
          setPassword(text);
          if (!validate_password(text)) {
              setPasswordError(
                  "Password must contain 8 characters, an uppercase letter, lowercase letter, and number."
              );
              setPasswordInputStyle(
                  invalidInputStyle
              );
          } else {
              setPasswordError("");
              setPasswordInputStyle(validInputStyle);
          }
      }}
        value={password}
        secureTextEntry={true}
        returnKeyType="next"
        onSubmitEditing={() => {
            ref_confirmInput.current.focus();
        }}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}   
      <Text
        style={styles.inputLabel}
        maxFontSizeMultiplier={1.75}
        allowFontScaling={false}
      >
        Confirm your password
      </Text>
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
            // Handles conditional formatting of Text Input
            // Reverts to normal once text matches
            setConfirmPassword(text);
            if (text == password) {
                setPasswordsMatch(true);
                // Set style of input to normal text input style
                if (
                    confPasswordInputStyle !=
                    validInputStyle
                ) {
                    setConfPasswordError("");
                    setConfPasswordInputStyle(
                        validInputStyle
                    );
                }
            } else {
                setPasswordsMatch(false);
                setConfPasswordError(
                    "Passwords don't match."
                );
                setConfPasswordInputStyle(
                    invalidInputStyle
                );
            }
        }}
      />   
      {confPasswordError ? (
        <Text style={styles.errorText}>{confPasswordError}</Text>
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
  errorText: {
    color: "#ffffff",
    fontFamily: "Avenir-Black",
    fontSize: 15,
    alignSelf: "center",
    backgroundColor: "#E77728",
    paddingLeft: 12,
    paddingRight: 12,
},
  inputLabel: {
    fontFamily: "Avenir-Heavy",
    color: "#6C3A2C",
    fontSize: 20,
    marginTop: 30,
    textAlign: "left"
},
  title: {
    fontSize: 48, // Updated font size
    color: "#6C3A2C", // Updated text color
    marginBottom: 20,
    fontFamily: "Avenir-Black", // Updated font
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
    marginTop: 30
  },
  submitButtonText: {
    color: "#FCF9F4",
    textAlign: "center",
    fontSize: 20, // Updated font size
    fontFamily: "Avenir-Black", // Updated font
  },
});

export default EnterNewPasswordScreen;
