import React, { useState, useEffect } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Button,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    BackHandler,
} from "react-native";
import {
    currUser,
    exportPin
} from "../assets/test data/TestUserData";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

function PinTransferFinalizeScreen(props) {
    const [msg, setMsg] = useState("");

    const mapIndex = props.route.params.selectedMap;
    const pinIndex = props.route.params.selectedPin;
    const friendPhone = props.route.params.friendPhone;
    console.log(mapIndex);
    console.log(mapIndex);
    console.log(friendPhone);

    const handlePinExport = async() => {
        console.log(msg);

        await exportPin(currUser.fullName, mapIndex, pinIndex, msg, friendPhone);
        Alert.alert('Pending...', `Your pin has shared to ${friendPhone}`);
        props.navigation.navigate("Home");
    };    

    return (
        <>
            <DismissKeyboard>
                <SafeAreaView style={styles.background}>
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        {/* Text input for changing pin secret message */}
                        <View style={styles.msgInputContainer}>
                            <Text style={styles.inputLabel}>Leave A Secret Message</Text>
                            {/* FIXME: you can't close the keyboard on iOS, you should be able to close it by tapping off of it */}
                            <TextInput
                                style={styles.msgInput}
                                multiline={true}
                                onChangeText={(text) => setMsg(text)}
                                defaultValue={msg}
                            ></TextInput>
                        </View>
                        {/* User presses this button to save the changes to the pin information */}
                        <View
                            style={[
                                styles.buttonContainer,
                                { marginBottom: "10%" },
                            ]}
                        >
                            <Pressable
                                style={styles.exportPinButton}
                                onPress={() => handlePinExport()}
                            >
                                <Text style={styles.buttonText}>EXPORT PIN</Text>
                            </Pressable>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </DismissKeyboard>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FCF9F4",
    },
    headerText: {
        color: "#FCF9F4",
    },
    modalStyle: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center"
    },
    nameInputContainer: {
        flex: 0.75,
        width: "80%",
        marginTop: "10%",
    },
    dateInputContainer: {
        flex: 1,
        width: "80%",
        marginTop: "7%",
    },
    msgInputContainer: {
        flex: 2,
        width: "80%",
        marginTop: "7%",
    },
    pinSelectionContainer: {
        flex: 1,
        width: "90%",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 0.9,
        width: "80%",
        justifyContent: "center",
        marginTop: "7%",
    },
    inputLabel: {
        fontFamily: "Avenir-Black",
        color: "#6C3A2C",
        fontSize: 20,
    },
    input: {
        backgroundColor: "#ffffff",
        borderColor: "#6C3A2C",
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        fontFamily: "Avenir-Book",
        fontSize: 18,
    },
    dateInputTextContainer: {
        flex: 1,
        marginLeft: 8,
        paddingVertical: 14,
    },
    dateText: {
        fontFamily: "Avenir-Book",
        fontSize: 18,
    },
    datePickerInputBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "#6C3A2C",
        borderWidth: 1,
        borderRadius: 5,
        paddingRight: 6,
    },
    dateTimePickerAligner: {
        width: "100%",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    dateTimePicker: {
        marginLeft: 4,
        marginTop: 2,
        width: "40%",
    },
    calendarIcon: {
        fontSize: 24,
    },
    msgInput: {
        backgroundColor: "#ffffff",
        borderColor: "#6C3A2C",
        borderWidth: 1,
        borderRadius: 5,
        textAlignVertical: "top",
        padding: 8,
        flex: 1,
        marginBottom: "5%",
        fontFamily: "Avenir-Book",
        fontSize: 15,
        height: Dimensions.get("window").height * 0.15,
    },
    pinSelectionHeader: {
        fontFamily: "Avenir-Black",
        color: "#6C3A2C",
        fontSize: 18,
        marginBottom: "2%",
    },
    pinRowContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    pinTouchableOpacity: {
        width: "10%",
    },
    exportPinButton: {
        padding: 15,
        backgroundColor: "#548439",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
    uploadMediaButton: {
        padding: 15,
        backgroundColor: "#009CD3",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
    changePinButton: {
        padding: 15,
        backgroundColor: "#6C3A2C",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#474139",
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
    errorText: {
        color: "#ffffff",
        fontFamily: "Avenir-Black",
        fontSize: 15,
        textAlign: "center",
        backgroundColor: "#E77728",
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default PinTransferFinalizeScreen;
