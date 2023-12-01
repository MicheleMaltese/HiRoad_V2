import React, { useState, useEffect } from "react";
import {
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
    Alert,
    FlatList,
    Dimensions,
    BackHandler,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import DatePicker from "react-native-neat-date-picker";
import {
    currUser,
    URIs,
    deleteSocialRoute,
    changeColorSocial,
    changeRouteTitleSocial,
    changeRouteDateSocial,
    updateUserInfo,
} from "../assets/test data/TestUserData";
import { HeaderBackButton } from "react-navigation-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import validator from "validator";

//Creates a dismissable keyboard to use as tags around text fields
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

// Creates the route color components
const RouteColor = (props) => (
    <View style={styles.colorContainer}>
        <Pressable
            style={[
                styles.pressableColor,
                {
                    backgroundColor: props.color,
                    borderColor: props.borderColor,
                },
            ]}
            onPress={props.onPress}
        ></Pressable>
        <Text style={[styles.colorLabelText, { fontFamily: props.labelFont }]}>
            {props.colorName}
        </Text>
    </View>
);

function CreateRouteScreenSocial(props) {
    //Ensures a route is not added if the user decides to go back
    const goBackUndoRoute = () => {
        if (mode == "add") {
            deleteSocialRoute(
                currUser.socialMap.routes.length - 1
            );
        }
        props.navigation.goBack();
    };
    // Allows a user to delete an existing route
    const goBackDeleteRoute = (index) => {
        if (mode == "edit") {
            deleteSocialRoute(index);
            updateUserInfo();
        }
        props.navigation.goBack();
    };
    //Sets up header buttons
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title:
                props.route.params.mode == "edit"
                    ? "Edit Route"
                    : "Create Route",
            //Ensures a pin is not added if the user decides to go back
            headerLeft: () => (
                <HeaderBackButton
                    // style={styles.headerText}
                    onPress={() => goBackUndoRoute()}
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
                            // goBackDeletePin(props.route.params.id);
                            showConfirmDialog();
                        }}
                    />
                ) : null,
        });
    }, [props.navigation]);

    const handleBackPressAndroid = () => {
        goBackUndoRoute();
        return true;
    };

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "This will permanently delete this route from your map.",
            [
                // Confirm deletion
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        goBackDeleteRoute(props.route.params.id);
                    },
                },
                // Cancel deletion
                {
                    text: "Cancel",
                },
            ]
        );
    };

    // useState to store and change the title of the route.
    // Initialized to route's existing data
    const [title, setTitle] = useState(
        currUser.socialMap.routes[props.route.params.id]
            .label
    );
    // useState to store and change the color of the route
    // initialized to the route's existing color, which is black if the user has just drawn
    // the route
    const [color, setColor] = useState(
        currUser.socialMap.routes[props.route.params.id]
            .color
    );

    // Required useStates for the date picker to function
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    // useState to store and change the date of the route.
    // Initialized to the route's existing data
    const [dateText, setDateText] = useState(
        currUser.socialMap.routes[props.route.params.id]
            .date
    );
    // useState that clarifies whether you are adding a new route or editing one
    const [mode, setMode] = useState(props.route.params.mode);

    // Show the date picker modal
    const openDatePicker = () => {
        setShowDatePicker(true);
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
    // To be called to save the changes to the route's data.
    //Should not change route data before this point, in case user wants to cancel operation
    const updateRouteData = (props) => {
        changeColorSocial(color, props.route.params.id);
        changeRouteTitleSocial(
            title,
            props.route.params.id
        );
        changeRouteDateSocial(
            dateText,
            props.route.params.id
        );
        updateUserInfo();
        // Automatically reroutes to the map
        props.navigation.goBack();
    };

    // Color settings for date picker
    const colorOptions = {
        headerColor: "#6C3A2C",
        changeYearModalColor: "#7BC153",
        weekDaysColor: "#548439",
        selectedDateBackgroundColor: "#7BC153",
        confirmButtonColor: "#548439",
    };

    const [userDateValid, setUserDateValid] = useState(false);
    const [dateFormatError, setDateFormatError] = useState("");
    const [userDateTypedInput, setUserDateTypedInput] = useState("");

    useEffect(() => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackPressAndroid
        );
        // Validate user date input
        /*if (
            validator.isDate(userDateTypedInput, {
                format: "MM-DD-YYYY",
                strictMode: false,
                delimiters: ["/", "-"],
            })
        ) {
            setDateText(userDateTypedInput);
            setUserDateValid(true);
            setDateFormatError("");
        } else if (userDateTypedInput.length === 0) {
            setUserDateTypedInput("");
            setDateFormatError("");
        } else {
            setUserDateValid(false);
            setDateFormatError(
                "Make sure date is valid & in MM-DD-YYYY format."
            );
        }*/
        //DATE HANDLING GOES HERE
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPressAndroid
            );
        };
    }, [userDateTypedInput]);

    return (
        <>
            <DismissKeyboard>
                <SafeAreaView style={styles.background}>
                    <KeyboardAwareScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            // justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        {/* Text input for changing the name of the route */}
                        <View style={styles.nameInputContainer}>
                            <Text style={styles.inputLabel}>Name</Text>
                            <TextInput
                                style={styles.input}
                                multiline={false}
                                onChangeText={(text) => setTitle(text)}
                                defaultValue={title}
                            />
                        </View>
            {/* Date picker*/}
            <View style={styles.dateInputContainer}>
              <Text style={styles.inputLabel}>Date</Text>
              {/* Text box that holds the date */}
              <View style={styles.datePickerInputBox}>
                <TextInput
                  style={styles.dateInputTextContainer}
                  placeholder="Press the calendar to set date"
                  value={dateText} // Reflects the selected date
                  editable={false} // Prevent manual editing
                />
                {/* Button to open the map */}
                {/*<Pressable
                  style={styles.calendarPressable}
                  onPress={openDatePicker}
                >
                  <Icon
                    type="material"
                    name="calendar-today"
                    color="#6C3A2C"
                    iconStyle={styles.calendarIcon}
                  />
        </Pressable>*
                <DatePicker
                  isVisible={true}
                  withoutModal={true}
                  //initialDate={date}
                  mode={"single"}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                  colorOptions={colorOptions}
                  dateStringFormat="mm-dd-yyyy"
        />*/}
              </View>
              {dateFormatError.length > 0 ? (
                <Text style={styles.errorText}>{dateFormatError}</Text>
              ) : null}
            </View>
                        {/* Date picker*/}
                        <View style={styles.dateInputContainer}>
                <DatePicker
                  isVisible={true}
                  withoutModal={true}
                  //initialDate={date}
                  mode={"single"}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                  colorOptions={colorOptions}
                  dateStringFormat="mm-dd-yyyy"
                />
              </View>

                        <View style={styles.colorSelectionContainer}>
                            <Text style={styles.colorSelectionHeader}>
                                Select a Color
                            </Text>
                            <View style={styles.colorRow}>
                                <RouteColor
                                    color="#000000"
                                    borderColor={
                                        color === "#000000"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#000000")}
                                    colorName="Black"
                                    labelFont={
                                        color === "#000000"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                                <RouteColor
                                    color="#E77728"
                                    borderColor={
                                        color === "#E77728"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#E77728")}
                                    colorName="Orange"
                                    labelFont={
                                        color === "#E77728"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                                <RouteColor
                                    color="#009CD3"
                                    borderColor={
                                        color === "#009CD3"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#009CD3")}
                                    colorName="Blue"
                                    labelFont={
                                        color === "#009CD3"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                            </View>
                            <View style={styles.colorRow}>
                                <RouteColor
                                    color="#6C3A2C"
                                    borderColor={
                                        color === "#6C3A2C"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#6C3A2C")}
                                    colorName="Brown"
                                    labelFont={
                                        color === "#6C3A2C"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                                <RouteColor
                                    color="#7BC153"
                                    borderColor={
                                        color === "#7BC153"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#7BC153")}
                                    colorName="Light Green"
                                    labelFont={
                                        color === "#7BC153"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                                <RouteColor
                                    color="#548439"
                                    borderColor={
                                        color === "#548439"
                                            ? "#C6B39D"
                                            : "#FCF9F4"
                                    }
                                    onPress={() => setColor("#548439")}
                                    colorName="Dark Green"
                                    labelFont={
                                        color === "#548439"
                                            ? "Avenir-Black"
                                            : "Avenir-Roman"
                                    }
                                />
                            </View>
                        </View>
                        {/* User presses this button to save the changes to the route information */}
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={styles.createRouteButton}
                                onPress={() => updateRouteData(props)}
                            >
                                <Text style={styles.buttonText}>
                                    SAVE ROUTE
                                </Text>
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
        // justifyContent: "center",
        // alignItems: "center",
    },
    nameInputContainer: {
        flex: 0.3,
        width: "80%",
        marginTop: "10%",
    },
    dateInputContainer: {
        flex: 0.3,
        flexShrink: 0.5,
        width: "80%",
        marginVertical: "3%",
    },
    colorSelectionContainer: {
        flex: 1,
        // flexGrow: 1,
        // flexBasis: 200,
        width: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 0.4,
        flexGrow: 0.5,
        width: "80%",
        marginTop: "10%",
        justifyContent: "flex-start",
        marginBottom: "16%",
    },
    inputLabel: {
        fontFamily: "Avenir-Heavy",
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
        // flex: 1,
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
    colorSelectionHeader: {
        fontFamily: "Avenir-Heavy",
        color: "#6C3A2C",
        fontSize: 20,
        marginTop: "4%",
        marginBottom: "2%",
    },
    createRouteButton: {
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
    buttonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 24,
    },
    pressableColor: {
        width: Dimensions.get("window").width * 0.25,
        height: Dimensions.get("window").width * 0.25,
        borderRadius: 15,
        borderWidth: 5,
        margin: 1,
    },
    colorRow: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    colorContainer: {
        marginHorizontal: "2%",
        marginVertical: "1%",
        justifyContent: "center",
        alignItems: "center",
    },
    colorLabelText: {
        marginTop: 4,
        marginBottom: "5%",
        fontSize: 16,
        color: "#6C3A2C",
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

export default CreateRouteScreenSocial;
