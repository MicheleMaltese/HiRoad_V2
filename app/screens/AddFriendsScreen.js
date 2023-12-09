import React, { useState } from 'react';
import {
  Alert,
    Dimensions,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";
import {
    URIs,
    addFriend,
    currUser,
    updateUserInfo,
    getUser,
    updateCurrUser,
    changeUsername,
    changeEmail,
    changePassword,
} from "../assets/test data/TestUserData";

const AddFriendsScreen = (props) => {

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendFriendRequest = async() => {
    // Validate phone number format here if needed
    // API call
    console.log(phoneNumber);
    console.log(currUser.phone);
    try {
      await addFriend(currUser.fullName, currUser.phone, phoneNumber);
      setPhoneNumber("");
      Alert.alert("Your friend request has been received!");
      props.navigation.goBack();
    }
    catch {
      Alert.alert("Friend request could not be sent.");
    }
  };

  return (
    <>
    <DismissKeyboard>
    <View style={styles.container}>
    <Text style={styles.Header}>{"Enter A Friend's Phone Number!"}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          // Allow only numbers and limit to 10 characters
          const formattedText = text.replace(/[^0-9]/g, '').slice(0, 10);
          setPhoneNumber(formattedText);
      }}
        value={phoneNumber}
        placeholder="Enter friend's phone number"
        keyboardType="phone-pad"
        returnKeyType="send"
        //onSubmitEditing={handleSendFriendRequest} 
      />
      <Pressable
          onPress={() => {handleSendFriendRequest();}}
          style={styles.submitButton}
      >
          <Text style={styles.submitButtonText}>Add Friend</Text>
      </Pressable>
    </View>
    </DismissKeyboard>
    </>
  );
};

  //Creates a dismissable keyboard to use as tags around text fields
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FCF9F4', 
  },
  Header: {
    fontSize: 28,
    color: "#6C3A2C",
    fontFamily: "Avenir-Black",
    padding: 10,
    textAlign: "center",
    justifyContent: "center"
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#ffffff',
    borderColor: '#6C3A2C',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Avenir-Book', 
    color: '#6C3A2C', 
  },
    submitButton: {
        margin: "10%",
        width: "60%",
        height: "40%",
        flex: 0.15,
        backgroundColor: "#6C3A2C",
        justifyContent: "center",
        borderRadius: 10,
    },
    submitButtonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 16,
    },
});

export default AddFriendsScreen;
