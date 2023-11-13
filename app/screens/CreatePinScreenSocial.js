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
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import DatePicker from "react-native-neat-date-picker";
import {
    currUser,
    changeTitleSocial,
    changeDescSocial,
    changeArFlagSocial,
    changeW3wAddressSocial,
    changeDateSocial,
    deletePinSocial,
    URIs,
    updateUserInfo,
} from "../assets/test data/TestUserData";
import { HeaderBackButton } from "react-navigation-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from "validator";

// Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

function CreatePinScreenSocial(props) {
    // Ensures a pin is not added if the user decides to go back
    const goBackUndoPin = () => {
        if (mode == "add") {
            deletePinSocial(
                currUser.socialMap.pins.length - 1
            );
        }
        props.navigation.goBack();
    };
    // Allows a user to delete an existing pin
    const goBackDeletePin = (index) => {
        if (mode == "edit") {
            deletePinSocial(index);
            updateUserInfo();
        }
        props.navigation.goBack();
    };

    // Allows user to confirm deletion of a pin
    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "This will permanently delete this pin from your map.",
            [
                // Confirm deletion
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        goBackDeletePin(currUser.socialMap.pins.length - 1);
                    },
                },
                // Cancel deletion
                {
                    text: "Cancel",
                },
            ]
        );
    };

    // Sets up & formats header buttons
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title:
                props.route.params.mode == "edit" ? "Edit Pin" : "Create Pin",
            //Ensures a pin is not added if the user decides to go back
            headerLeft: () => (
                <HeaderBackButton
                    // style={styles.headerText}
                    onPress={() => goBackUndoPin()}
                    title="Back"
                    tintColor="#FCF9F4"
                />
            ),
            //Allows a user to delete an existing pin
            headerRight: () =>
                mode == "edit" ? (
                    <Icon
                        containerStyle={styles.headerIcon}
                        color="#FCF9F4"
                        type="material"
                        name="delete"
                        onPress={() => {
                            //goBackDeletePin(props.route.params.id);
                            showConfirmDialog();
                        }}
                    />
                ) : null,
        });
    }, [props.navigation]);

    // useState to store and change the title of the pin.
    // Initialized to pin's existing data
    const [title, setTitle] = useState(
        currUser.socialMap.pins[props.route.params.id]
            .label
    );
    // useState to store and change the notes of the pin.
    // Initialized to pin's existing data
    const [notes, setNotes] = useState(
        currUser.socialMap.pins[props.route.params.id]
            .comments
    );

    // useState to store and change the augmented reality flag of the pin.
    // Initialized to flag's existing data
    const [arEnabled, setArFlag] = useState(
        currUser.socialMap.pins[props.route.params.id]
            .arEnabled
    );

    // useState to store and change the what3words address of the pin.
    // Initialized to address's existing data
    const [w3wAddress, setW3wAddress] = useState(
        currUser.socialMap.pins[props.route.params.id]
            .w3wAddress
    );

    const [fromName, setFromName] = useState("");
    const [secretMessage, setSecretMessage] = useState("");

    // useState to store and change the pin icon.
    // Initialized to the pin's existing data

    const [icon, setIcon] = useState(
        currUser.socialMap.pins[props.route.params.id].icon
    );
    // Required useStates for the date picker to function
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date('01-01-2023'));
    // useState to store and change the date of the pin.
    // Initialized to the pin's existing data
    const [dateText, setDateText] = useState(
        currUser.socialMap.pins[props.route.params.id].date
    );
    // useState that clarifies whether you are adding a new pen or editing one
    // FIXME: we can refactor to get rid of this variable and just replace all instances with props.route.params.mode
    const [mode, setMode] = useState(props.route.params.mode);

    // Show the date picker modal
    const openDatePicker = () => {
        setShowDatePicker(true);
        console.log(date);
    };

    // Function for if user closes the date picker
    const onCancel = () => {
        //You should close the modal in here
        setShowDatePicker(false);
    };

    // Function for when user confirms their selection in the date picker
    const onConfirm = ({ date, dateString }) => {
        //You should close the modal in here
        setShowDatePicker(false);
        //The parameter 'date' is a Date object so that you can use any Date prototype method
        setDate(date);
        setDateText(dateString);
        setUserDateTypedInput(dateString);
    };
    // To be called to save the changes to the pin's data.
    //Should not change pin data before this point, in case user wants to cancel operation
    const updatePinData = (props) => {
        if (dateFormatError.length > 0) {
            Alert.alert("Error!", "Input a valid date for your pin.");
        } else {
            changeTitleSocial(title, props.route.params.id);
            changeDescSocial(notes, props.route.params.id);
            changeW3wAddressSocial(w3wAddress, props.route.params.id);
            changeArFlagSocial(arEnabled, props.route.params.id);
            changeDateSocial(
                dateText,
                props.route.params.id
            );
            updateUserInfo();
            // Automatically reroutes to the map
            props.navigation.goBack();
        }
    };

    // Color settings for date picker
    const colorOptions = {
        headerColor: "#6C3A2C",
        changeYearModalColor: "#7BC153",
        weekDaysColor: "#548439",
        selectedDateBackgroundColor: "#7BC153",
        confirmButtonColor: "#548439",
    };

    useFocusEffect(() => {
        setIcon(
            currUser.socialMap.pins[props.route.params.id]
                .icon
        );
    });

    const [userDateValid, setUserDateValid] = useState(false);
    const [dateFormatError, setDateFormatError] = useState("");
    const [userDateTypedInput, setUserDateTypedInput] = useState(dateText);

    function _isLeapYear(year) {
        console.log("Leap year called");
        if (year % 4 === 0) {
            if (year % 100 === 0 && year % 400 !== 0) {
                return false;
            }
            console.log(year + " is leap year");
            return true;
        } else {
            console.log(year + " is not leap year");
            return false;
        }
    }

    const handleBackPressAndroid = () => {
        goBackUndoPin();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackPressAndroid
        );
        /*if (
            validator.isDate(userDateTypedInput, {
                format: "DD-MM-YYYY",
                strictMode: false,
                delimiters: ["/", "-"],
            })
        ) {*/
            setDateText(userDateTypedInput);
            setUserDateValid(true);
            setDateFormatError("");
        /*} else if (userDateTypedInput.length === 0) {
            setUserDateTypedInput("");
            setDateFormatError("");
        } else {
            setUserDateValid(false);
            setDateFormatError(
                "Make sure date is valid & in MM-DD-YYYY format."
            );
        }*/
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPressAndroid
            );
        };
    }, [
        userDateTypedInput,
        userDateValid,
        setUserDateValid,
        setDateFormatError,
    ]);

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
                        {/* Text input for changing the name of the pin */}
                        <View style={styles.nameInputContainer}>
                            <Text style={styles.inputLabel}>Name</Text>
                            <TextInput
                                style={styles.input}
                                multiline={false}
                                onChangeText={(text) => setTitle(text)}
                                defaultValue={title}
                            ></TextInput>
                        </View>
                        {/* Date picker*/}
                        <View style={styles.dateInputContainer}>
                            <Text style={styles.inputLabel}>Date</Text>
                            {/* Text box that holdes the date */}
                            <View style={styles.datePickerInputBox}>
                                <TextInput
                                    style={styles.dateInputTextContainer}
                                    //Displays "Set Date" if this pin does not have a date set to it yet
                                    placeholder="Press the calendar to set date"
                                    defaultValue={dateText}
                                    // value={dateText}
                                    //Requires user to use the date picker instead of typing in a date
                                    editable={false}
                                    onChangeText={setUserDateTypedInput}
                                />
                                {/* Button to open the map */}
                                <Pressable
                                    style={styles.calendarPressable}
                                    onPress={openDatePicker}
                                >
                                    <Icon
                                        type="material"
                                        name="calendar-today"
                                        color="#6C3A2C"
                                        iconStyle={styles.calendarIcon}
                                    />
                                </Pressable>
                                <DatePicker
                                    isVisible={showDatePicker}
                                    //initialDate={date}
                                    mode={"single"}
                                    onCancel={onCancel}
                                    withoutModal = {false}
                                    onConfirm={onConfirm}
                                    colorOptions={colorOptions}
                                    dateStringFormat="mm-dd-yyyy"
                                />
                            </View>
                            {dateFormatError.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {dateFormatError}
                                </Text>
                            ) : null}
                        </View>
                        {/* Text input for changing pin notes */}
                        <View style={styles.notesInputContainer}>
                            <Text style={styles.inputLabel}>Notes</Text>
                            {/* FIXME: you can't close the keyboard on iOS, you should be able to close it by tapping off of it */}
                            <TextInput
                                style={styles.notesInput}
                                multiline={true}
                                onChangeText={(text) => setNotes(text)}
                                defaultValue={notes}
                            ></TextInput>
                        </View>
                        {/* User selects the pin icon here. Tap on the icon to choose it*/}
                        <View style={styles.pinSelectionContainer}>
                            <Text style={styles.pinSelectionHeader}>
                                Icon Preview
                            </Text>
                            <View style={styles.pinRowContainer}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                    }}
                                    source={{
                                        uri: URIs[3] + "/" + icon,
                                    }}
                                />
                            </View>
                        </View>
                        {/* User selects pin icon here */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.changePinButton}
                                //Navigates user to pin icon selection screen, passes in the current pin's indexes
                                onPress={() =>
                                    props.navigation.navigate("Select Icon", {
                                        mapId: props.route.params.mapId,
                                        id: props.route.params.id,
                                    })
                                }
                            >
                                <Text style={styles.buttonText}>
                                    SELECT AN ICON
                                </Text>
                            </Pressable>
                        </View>
                        {/* User adds media here
        FIXME: Not currently functional */}
                        {/* <View style={styles.buttonContainer}>
                        <Pressable style={styles.uploadMediaButton}>
                            <Text style={styles.buttonText}>UPLOAD MEDIA</Text>
                        </Pressable>
                    </View> */}
                        {/* User presses this button to save the changes to the pin information */}
                        <View
                            style={[
                                styles.buttonContainer,
                                { marginBottom: "10%" },
                            ]}
                        >
                            <Pressable
                                style={styles.createPinButton}
                                onPress={() => updatePinData(props)}
                            >
                                <Text style={styles.buttonText}>SAVE PIN</Text>
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
    notesInputContainer: {
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
    notesInput: {
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
    createPinButton: {
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

export default CreatePinScreenSocial;
