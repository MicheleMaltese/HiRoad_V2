import React, {useState, useRef, useEffect } from "react";
//import * as React from "react";

import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Alert,
} from "react-native";
import {
    URIs,
    updateUserInfo,
    getUser,
    updateCurrUser,
} from "../assets/test data/TestUserData";
import axios from "axios";
import validator from "validator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let user = null;
let nameError = "";
let fullNameError = "";
let phoneError = "";
let emailError = "";
let passwordError = "";
let confEmailError = "";
let confPasswordError = "";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const handleRegister = async (
    props,
    name,
    fullName,
    phone,
    email,
    password,
    confEmail,
    confPassword
) => {
    try {
        let nameValid = false;
        let fullNameValid = false;
        let phoneValid = false;
        let emailValid = false;
        let passwordValid = false;
        let emailSame = false;
        let passwordSame = false;
        // Check if someone entered a name
        if (name.length > 0) {
            nameError = "";
            nameValid = true;
        } else {
            nameError = "Please enter a name.";
        }
        if (fullName.length > 0) {
            fullNameError = "";
            fullNameValid = true;
        } else {
            fullNameError = "Please enter a name.";
        }
        // Check if someone entered a phone number
        if (phone.length > 9) {
            phoneError = "";
            phoneValid = true;
        } else {
            phoneError = "Please enter a valid phone number.";
        }
        //Checking if email entered is in a valid format
        if (validator.isEmail(email)) {
            emailError = "";
            emailValid = true;
        } else {
            emailError = "Please enter a valid email.";
        }
        //Checking if password is at least 8 character
        if (password.length < 8) {
            passwordError = "Password must be at least 8 characters.";
        } else {
            passwordError = "";
            passwordValid = true;
        }
        //Checks if the email in both the regular and confirm box are equal
        if (confEmail != email) {
            confEmailError = "Emails don't match.";
        } else {
            confEmailError = "";
            emailSame = true;
        }
        //Checks if the password in both the regular and confirm box are equal
        if (confPassword != password) {
            confPasswordError = "Passwords don't match.";
        } else {
            confPasswordError = "";
            passwordSame = true;
        }
        //If all inputs are valid, the the user is created and added to the database
        if (
            nameValid &&
            fullNameValid &&
            emailSame &&
            phoneValid &&
            passwordSame &&
            passwordValid &&
            emailValid
        ) {
            await axios.post(URIs[0], {
                name: name,
                fullName : fullName,
                email: email,
                password: password,
                phone: phone
            });
            updateCurrUser(await getUser(email, password));
            props.navigation.navigate("Drawer");
        }
    } catch {
        console.log("caught");
        emailError = "This email is already in use.";
    }
};

function validate_password(password) {
  let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (password.match(check)) {
     return true;
  } else {
    return false;
  }
}

function RegisterScreen(props) {
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [confEmail, setConfEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [emailsMatch, setEmailsMatch] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    // Text Input styling of box with invalid input
    const invalidInputStyle = {
        backgroundColor: "#F7D1B6",
        borderColor: "#E77728",
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        fontFamily: "Avenir-Roman",
    };

    // Handle dynamic styling of confirm email & password inputs
    const [confEmailInputStyle, setConfEmailInputStyle] =
        useState(validInputStyle);
    const [passwordInputStyle, setPasswordInputStyle] =
        useState(validInputStyle);
    const [confPasswordInputStyle, setConfPasswordInputStyle] =
        useState(validInputStyle);

    // Use states for errors
    const [nameErrorMsg, setNameErrorMsg] = useState("");
    const [fullNameErrorMsg, setFullNameErrorMsg] = useState("");
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [confEmailErrorMsg, setConfEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [confPasswordErrorMsg, setConfPasswordErrorMsg] = useState("");

    // Refs to handle user flow through text inputs
    const ref_emailInput = useRef();
    const ref_fullNameInput = useRef();
    const ref_phoneInput = useRef();
    const ref_confirmEmailInput = useRef(0);
    const ref_passwordInput = useRef();
    const ref_confirmPasswordInput = useRef(0);

    useEffect(() => {
        // handle conditional formatting of name error
        if (name.length > 0) {
            setNameErrorMsg("");
        }
        if (fullName.length > 0) {
            setNameErrorMsg("");
        }
        // handle conditional formatting of phone number error
        if (phone.length > 0) {
            setPhoneErrorMsg("");
        }
        // Handle conditional formatting of email errors
        if (email.length > 0 && confEmail.length > 0 && email === confEmail) {
            setEmailsMatch(true);
            setConfEmailErrorMsg("");
            setConfEmailInputStyle(validInputStyle);
        } else if (
            email.length > 0 &&
            confEmail.length > 0 &&
            email !== confEmail
        ) {
            setEmailsMatch(false);
            setConfEmailErrorMsg("Emails don't match.");
            setConfEmailInputStyle(invalidInputStyle);
        } else if (confEmail == "") {
            setConfEmailErrorMsg("");
            setConfEmailInputStyle(validInputStyle);
        }
    }, [
        name,
        fullName,
        email,
        confEmail,
        emailsMatch,
        confEmailErrorMsg,
        setConfEmailInputStyle,
    ]);

    return (
        // Keep all content in safe area (specifically for iOS)
        <View style={styles.background}>
            {/* Makes sure keyboard does not cover up text input while user is typing */}
            <KeyboardAwareScrollView
                contentContainerStyle={styles.contentContainer}
                enableAutomaticScroll={true}
            >
                {/* Allows user to tap anywhere outside of text input to dismiss keyboard */}
                <DismissKeyboard>
                    {/* Contains all content on screen */}
                    <View style={styles.containerView}>
                        {/* Page title */}
                        <View style={styles.titleContainer}>
                            <Text
                                style={styles.registerHeader}
                                maxFontSizeMultiplier={1}
                            >
                                Create Account
                            </Text>
                        </View>
                        {/* User enters display name here */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.25}
                            >
                                What should we call you?
                            </Text>
                            <TextInput
                                style={styles.input}
                                multiline={false}
                                onChangeText={setName}
                                value={name}
                                autoCorrect={false}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    ref_fullNameInput.current.focus();
                                }}
                                blurOnSubmit={false}
                            />
                            {/* Show error message below name input if necessary */}
                            {nameError.length > 0 && nameErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {nameError}
                                </Text>
                            ) : null}
                        </View>
                        {/* User enters full name here */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.25}
                            >
                                What's your full name?
                            </Text>
                            <TextInput
                                style={styles.input}
                                ref={ref_fullNameInput}
                                multiline={false}
                                onChangeText={setFullName}
                                value={fullName}
                                autoCorrect={false}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    ref_phoneInput.current.focus();
                                }}
                                blurOnSubmit={false}
                            />
                            {/* Show error message below name input if necessary */}
                            {fullNameError.length > 0 && fullNameErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {fullNameError}
                                </Text>
                            ) : null}
                        </View>
                        {/* User enters phone number here */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.25}
                            >
                                Enter your phone number
                            </Text>
                            <TextInput
                                style={styles.input}
                                multiline={false}
                                ref={ref_phoneInput}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    // Allow only numbers and limit to 10 characters
                                    const formattedText = text.replace(/[^0-9]/g, '').slice(0, 10);
                                    setPhoneNumber(formattedText);
                                }}
                                value={phone}
                                autoCorrect={false}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    console.log(phone)
                                    ref_emailInput.current.focus();
                                }}
                                blurOnSubmit={false}
                            />
                            {/* Show error message below name input if necessary */}
                            {phoneError.length > 0 && phoneErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {phoneError}
                                </Text>
                            ) : null}
                        </View>
                        {/* User enters their email address here */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.75}
                            >
                                Enter your email
                            </Text>
                            <TextInput
                                style={styles.input}
                                ref={ref_emailInput}
                                keyboardType="email-address"
                                multiline={false}
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (emailErrorMsg !== "") {
                                        setEmailErrorMsg("");
                                    }
                                }}
                                onSubmitEditing={() => {
                                    ref_confirmEmailInput.current.focus();
                                }}
                                value={email}
                            />
                            {/* Show error message below email input if necessary */}
                            {emailError.length > 0 &&
                            emailErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {emailErrorMsg}
                                </Text>
                            ) : null}
                        </View>
                        {/* User confirms their email address here (needs to match previous text entry) 
                    FIXME: no checks currently in place to verify*/}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.6}
                            >
                                Confirm your email
                            </Text>
                            <TextInput
                                style={confEmailInputStyle}
                                ref={ref_confirmEmailInput}
                                keyboardType="email-address"
                                returnKeyType="next"
                                value={confEmail}
                                multiline={false}
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    // Force email to be lowercase & trim strings
                                    setConfEmail(
                                        text.toString().toLowerCase().trim()
                                    );
                                }}
                                onSubmitEditing={() =>
                                    ref_passwordInput.current.focus()
                                }
                            />
                            {/* Show error message below confirm email input if necessary */}
                            {confEmailErrorMsg.length > 0 ||
                            confEmailError.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {confEmailErrorMsg}
                                </Text>
                            ) : null}
                        </View>
                        {/* User enters their password here */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.75}
                            >
                                Create a password
                            </Text>
                            <TextInput
                                style={passwordInputStyle}
                                ref={ref_passwordInput}
                                returnKeyType="next"
                                secureTextEntry={true}
                                multiline={false}
                                autoCorrect={false}
                                placeholder="At least 8 characters"
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (!validate_password(text)) {
                                        setPasswordErrorMsg(
                                            "Password must be at least 8 characters, contain an uppercase character, lowercase character, and a number."
                                        );
                                        setPasswordInputStyle(
                                            invalidInputStyle
                                        );
                                    } else {
                                        setPasswordErrorMsg("");
                                        setPasswordInputStyle(validInputStyle);
                                    }
                                }}
                                onSubmitEditing={() => {
                                    ref_confirmPasswordInput.current.focus();
                                }}
                                value={password}
                                textContentType="newPassword"
                            />
                            {/* Show error message below password input if necessary */}
                            {passwordError.length > 0 ||
                            passwordErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {passwordErrorMsg}
                                </Text>
                            ) : null}
                        </View>
                        {/* User confirms their password here (needs to match previous text entry) */}
                        <View style={styles.textInputView}>
                            <Text
                                style={styles.inputLabel}
                                maxFontSizeMultiplier={1.4}
                            >
                                Confirm your password
                            </Text>
                            <TextInput
                                style={confPasswordInputStyle}
                                ref={ref_confirmPasswordInput}
                                value={confPassword}
                                returnKeyType="done"
                                secureTextEntry={true}
                                multiline={false}
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    // Handles conditional formatting of Text Input
                                    // Reverts to normal once text matches
                                    setConfPassword(text);
                                    if (text == password) {
                                        setPasswordsMatch(true);
                                        // Set style of input to normal text input style
                                        if (
                                            confPasswordInputStyle !=
                                            validInputStyle
                                        ) {
                                            setConfPasswordErrorMsg("");
                                            setConfPasswordInputStyle(
                                                validInputStyle
                                            );
                                        }
                                    } else {
                                        setPasswordsMatch(false);
                                        setConfPasswordErrorMsg(
                                            "Passwords don't match."
                                        );
                                        setConfPasswordInputStyle(
                                            invalidInputStyle
                                        );
                                    }
                                }}
                                onSubmitEditing={() => {
                                    if (password === confPassword) {
                                        setConfPasswordErrorMsg("");
                                        setConfPasswordInputStyle(
                                            validInputStyle
                                        );
                                        setPasswordsMatch(true);
                                    } else {
                                        setConfPasswordErrorMsg(
                                            "Passwords don't match."
                                        );
                                        setConfPasswordInputStyle(
                                            invalidInputStyle
                                        );
                                        setPasswordsMatch(false);
                                    }
                                }}
                            />
                            {/* Show error message below confirm password input if necessary */}
                            {confPasswordError.length > 0 ||
                            confPasswordErrorMsg.length > 0 ? (
                                <Text style={styles.errorText}>
                                    {confPasswordErrorMsg}
                                </Text>
                            ) : null}
                        </View>
                        {/* Press this button to create an account with the entered information */}
                        <Pressable
                            style={styles.registerButton}
                            onPress={async () => {
                                await handleRegister(
                                    props,
                                    name,
                                    fullName,
                                    phone,
                                    email,
                                    password,
                                    confEmail,
                                    confPassword
                                );
                                // If all inputs are valid, reset all text inputs and update error messages
                                if (
                                    nameError.length <= 0 &&
                                    fullNameError.length <= 0 &&
                                    phoneError.length <= 0 &&
                                    emailError.length <= 0 &&
                                    confEmailError.length <= 0 &&
                                    passwordError.length <= 0 &&
                                    confPasswordError.length <= 0
                                ) {
                                    setName("");
                                    setFullName("");
                                    setPhoneNumber("");
                                    setEmail("");
                                    setPassword("");
                                    setConfEmail("");
                                    setConfPassword("");
                                }
                                // Only reset the text inputs of invalid inputs
                                if (nameError.length > 0) {
                                    setName("");
                                    setNameErrorMsg("Please enter a name.");
                                } else {
                                    setNameErrorMsg("");
                                }
                                if (fullNameError.length > 0) {
                                    setFullName("");
                                    setFullNameErrorMsg("Please enter a full name.");
                                } else {
                                    setFullNameErrorMsg("");
                                }
                                if (phoneError.length > 0) {
                                    setName("");
                                    setPhoneErrorMsg("Please enter a phone number.");
                                } else {
                                    setPhoneErrorMsg("");
                                }
                                if (emailError.length > 0) {
                                    if (email === "") {
                                        setEmailErrorMsg(
                                            "Please enter an email."
                                        );
                                    } else {
                                        setEmail("");
                                        setConfEmail("");
                                        setEmailErrorMsg(emailError);
                                        setConfEmailErrorMsg(confEmailError);
                                    }
                                } else {
                                    setEmailErrorMsg("");
                                }
                                if (confEmailError.length > 0) {
                                    setConfEmail("");
                                    // Ensure user put any text in as email confirmation
                                    if (confEmail === "") {
                                        setConfEmailErrorMsg(
                                            "Please confirm email."
                                        );
                                    } else {
                                        setConfEmailErrorMsg(confEmailError);
                                    }
                                } else {
                                    setConfEmailErrorMsg("");
                                }
                                if (passwordError.length > 0) {
                                    setPassword("");
                                    setConfPassword("");
                                    setPasswordErrorMsg(
                                        "Password must be at least 8 characters."
                                    );
                                    setConfPasswordErrorMsg(
                                        "Passwords must match."
                                    );
                                } else {
                                    setPasswordErrorMsg("");
                                }
                                if (confPasswordError.length > 0) {
                                    setConfPassword("");
                                    if (confPassword === "") {
                                        setConfPasswordErrorMsg(
                                            "Please confirm password."
                                        );
                                    } else {
                                        confPasswordErrorMsg(confPasswordError);
                                    }
                                } else {
                                    setConfPasswordErrorMsg("");
                                }
                            }}
                        >
                            <Text style={styles.registerButtonText}>
                                REGISTER
                            </Text>
                        </Pressable>
                    </View>
                </DismissKeyboard>
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#548439",
        paddingTop: Platform.OS === "android" ? 100 : 40,
    },
    contentContainer: {
        flexGrow: 1,
    },
    containerView: {
        flexGrow: 1,
        justifyContent: "center",
        alignSelf: "stretch",
        alignItems: "center",
    },
    titleContainer: {
        flex: 0.1,
    },
    registerHeader: {
        fontSize: 40,
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
    },
    input: {
        backgroundColor: "#ffffff",
        borderColor: "#6C3A2C",
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        fontFamily: "Avenir-Roman",
        color: "#6C3A2C",
    },
    inputLabel: {
        fontFamily: "Avenir-Heavy",
        color: "#FCF9F4",
        fontSize: 20,
    },
    textInputView: {
        width: "90%",
        flex: 0.065,
        // marginTop: "3%",
    },
    registerButton: {
        padding: 5,
        width: "90%",
        flex: 0.08,
        backgroundColor: "#FCF9F4",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "5%",
        marginBottom: "10%",
    },
    registerButtonText: {
        color: "#548439",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 24,
    },
    errorText: {
        color: "#ffffff",
        fontFamily: "Avenir-Black",
        fontSize: 15,
        alignSelf: "center",
        backgroundColor: "#E77728",
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default RegisterScreen;
