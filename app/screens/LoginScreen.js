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
  updateCurrUser,
  currUser,
} from "../assets/test data/TestUserData.js";

// Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const handleLogin = async (props, email, password) => {
  try {
    /* User login attempt, if their info lines up with a user in the database, then they are set to that user info and move to the drawer screen */
    updateCurrUser(await getUser(email, password));
    props.navigation.navigate("Drawer");
  } catch {
    console.log("caught");
    Alert.alert(
      "Login failed!",
      "Please enter a valid email and password."
    );
  }
};

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ref_passwordInput = useRef();

  const handleForgotPassword = () => {
    // Implement the logic for handling the "Forgot Password" action here
    // For example, you can navigate to the "Forgot Password" screen
    props.navigation.navigate("ForgotPassword");
  };

  return (
    <SafeAreaView style={styles.background}>
      <DismissKeyboard>
        <View style={styles.containerView}>
          {/* Page title */}
          <View style={styles.headerContainer}>
            <Text
              style={styles.loginHeader}
              maxFontSizeMultiplier={1.25}
            >
              Login
            </Text>
          </View>
          {/* User enters email address associated with the account in this input */}
          <View style={styles.textInput}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              multiline={false}
              autoComplete="username"
              onChangeText={(text) =>
                setEmail(text.toString().trim())
              }
              value={email}
              autoCapitalize="none"
              textContentType="username"
              returnKeyType="next"
              onSubmitEditing={() => {
                ref_passwordInput.current.focus();
              }}
              maxFontSizeMultiplier={1.75}
            />
          </View>
          {/* User enters password associated with the account in this input */}
          <View style={styles.textInput}>
            <Text
              style={styles.inputLabel}
              maxFontSizeMultiplier={1.75}
            >
              Password
            </Text>
            <TextInput
              style={styles.input}
              ref={ref_passwordInput}
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
            style={styles.loginButton}
            onPress={() => {
              // trim password
              handleLogin(props, email, password);
              setEmail("");
              setPassword("");
            }}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </Pressable>

          {/* "Forgot Password?" button */}
          <Pressable
            style={styles.forgotPasswordButton}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
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
  loginHeader: {
    fontSize: 40,
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
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
    fontSize: 24,
  },
  // Changed: Generalized emailInput and passwordInput to be textInput
  textInput: {
    width: "80%",
    marginBottom: "10%",
  },
  // Changed: Added marginTop of 5% instead of having two text inputs
  loginButton: {
    width: "80%",
    flex: 0.08,
    marginTop: "5%",
    marginBottom: "10%",
    flexBasis: 60,
    // flexGrow: 0.18,
    backgroundColor: "#6C3A2C",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  loginButtonText: {
    alignSelf: "center",
    color: "#FCF9F4",
    fontFamily: "Avenir-Black",
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

export default LoginScreen;
