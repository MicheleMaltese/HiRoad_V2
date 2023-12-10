import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

function EnterCodeScreen(props) {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleSubmit = () => {
    // Replace this logic with your code verification logic.
    // For example, you can check if the entered code matches the expected code.
    const expectedCode = 'MyJesus-3322!'; // Replace with your expected code
    if (code === expectedCode && code !== '') {
      console.log(props.route.params.email);
      // Correct code, navigate to EnterNewPasswordScreen
      props.navigation.navigate("EnterNewPassword", {
        email: props.route.params.email
      });
    } else {
      // Incorrect code, show an error or handle it as needed
      // You can display an error message to the user
      setCodeError("Incorrect code! Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>Enter Your Admin Password Reset Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the code"
        onChangeText={(text) => setCode(text)}
        value={code}
      />
    {codeError ? (
        <Text style={styles.invalidInputStyle}>{codeError}</Text>
      ) : null}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
    fontSize: 36, // Updated font size
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

export default EnterCodeScreen;