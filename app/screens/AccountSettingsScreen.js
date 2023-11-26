import React, { useEffect, useState, useRef } from "react";
import {
    Alert,
    Button,
    Dimensions,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    Linking,
    ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
    URIs,
    currUser,
    updateUserInfo,
    getUser,
    updateCurrUser,
    changeUsername,
    changePhone,
    changeFirstName,
    changeEmail,
    changePassword,
} from "../assets/test data/TestUserData";
import axios from "axios";
import validator from "validator";

function AccountSettingsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [nameEditable, setNameEditable] = useState(false);
    const [emailEditable, setEmailEditable] = useState(false);
    const [phoneEditable, setPhoneEditable] = useState(false);
    const [firstNameEditable, setFirstNameEditable] = useState(false);
    const [passwordEditable, setPasswordEditable] = useState(false);

    const [name, setName] = useState(currUser.name);
    const [firstName, setFirstName] = useState(currUser.firstName);
    const [phone, setPhone] = useState(currUser.phone);
    const [email, setEmail] = useState(currUser.email);
    const [newPassword, setNewPassword] = useState(null);
    const [password, setPassword] = useState(null);

    const HELP_EMAIL = "hiroadsocial@gmail.com";
    const REPORT_EMAIL_SUBJECT_LINE = "Problem Report";
    const IMPROVEMENT_EMAIL_SUBJECT_LINE = "Improvement Idea";
    const QUESTION_EMAIL_SUBJECT_LINE = "Question";

    const ref_nameInput = useRef();
    const ref_firstNameInput = useRef();
    const ref_phoneInput = useRef();
    const ref_emailInput = useRef();
    const ref_newPasswordInput = useRef();
    const ref_currentPasswordInput = useRef();

    const saveChanges = async (oldEmail, password) => {
        let saved = false;
        try {
            await getUser(oldEmail, password);
            if (nameEditable) {
                if (name.length > 0) {
                    changeUsername(name);
                    saved = true;
                } else {
                    Alert.alert("Error!", "Must provide name to change");
                }
            }
            if (firstNameEditable) {
                if (firstName.length > 0) {
                    changeFirstName(firstName);
                    saved = true;
                } else {
                    Alert.alert("Error!", "Must provide first name to change");
                }
            }
            if (phoneEditable) {
                if (phone.length > 9) {
                    changePhone(phone);
                    saved = true;
                } else {
                    Alert.alert("Error!", "Must provide valid phone number");
                }
            }
            if (emailEditable) {
                if (validator.isEmail(email)) {
                    changeEmail(email);
                    saved = true;
                } else {
                    Alert.alert(
                        "Error!",
                        "Email was invalid and was not saved."
                    );
                }
            }
            if (passwordEditable) {
                if (newPassword.length < 8) {
                    Alert.alert(
                        "Error!",
                        "New password must be at least 8 characters and was not saved"
                    );
                } else {
                    changePassword(newPassword);
                    saved = true;
                }
            }
            try {
                await updateUserInfo(oldEmail);
                setNameEditable(false);
                setFirstNameEditable(false);
                setEmailEditable(false);
                setPhoneEditable(false);
                setPasswordEditable(false);
                if (saved) {
                    Alert.alert("Success!", "Changed saved!");
                }
            } catch {
                changeEmail(oldEmail);
                Alert.alert(
                    "Error!",
                    "Email already in use, change was not saved"
                );
            }
        } catch {
            console.log("caught");
            Alert.alert(
                "Error!",
                "Validation failed, please enter a correct password"
            );
        }
        setEditMode(false);
    };

    useEffect(() => {
        if (nameEditable || firstNameEditable || emailEditable || phoneEditable || passwordEditable) {
            setEditMode(true);
        } else {
            setEditMode(false);
        }
    }, [nameEditable, firstNameEditable, emailEditable, phoneEditable, passwordEditable]);
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView contentContainerStyle={styles.backgroundContainerStyle}>
                {/* Modal pops up when user asks for help */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    {/* Anything here will dispaly on Modal */}
                    <View style={styles.centeredView}>
                        <View style={styles.helpModal}>
                            <View style={styles.helpModalHeaderView}>
                                <Text style={styles.helpModalTitle}>
                                    How can we help you?
                                </Text>
                            </View>
                            {/* Button to send email to report a problem */}
                            <Pressable
                                style={styles.helpModalRowPressable}
                                onPress={async () => {
                                    try {
                                        await Linking.openURL(
                                            "mailto:" +
                                                HELP_EMAIL +
                                                "?subject=" +
                                                REPORT_EMAIL_SUBJECT_LINE
                                        );
                                    } catch {}
                                }}
                            >
                                <View style={styles.modalRowLayoutView}>
                                    <Icon
                                        style={{ marginRight: "10%" }}
                                        color="#6C3A2C"
                                        type="material"
                                        name="report-problem"
                                    />
                                    <Text style={styles.helpModalText}>
                                        Report a problem
                                    </Text>
                                </View>
                            </Pressable>
                            {/* Button to send email to suggest an improvement */}
                            <Pressable
                                style={styles.helpModalRowPressable}
                                onPress={async () => {
                                    try {
                                        await Linking.openURL(
                                            "mailto:" +
                                                HELP_EMAIL +
                                                "?subject=" +
                                                IMPROVEMENT_EMAIL_SUBJECT_LINE
                                        );
                                    } catch {}
                                }}
                            >
                                <View style={styles.modalRowLayoutView}>
                                    <Icon
                                        style={{ marginRight: "10%" }}
                                        color="#6C3A2C"
                                        type="material"
                                        name="campaign"
                                    />
                                    <Text style={styles.helpModalText}>
                                        Suggest an improvement
                                    </Text>
                                </View>
                            </Pressable>
                            {/* Button to send email to ask a question */}
                            <Pressable
                                style={styles.helpModalRowPressable}
                                onPress={async () => {
                                    try {
                                        await Linking.openURL(
                                            "mailto:" +
                                                HELP_EMAIL +
                                                "?subject=" +
                                                QUESTION_EMAIL_SUBJECT_LINE
                                        );
                                    } catch {}
                                }}
                            >
                                <View style={styles.modalRowLayoutView}>
                                    <Icon
                                        style={{ marginRight: "10%" }}
                                        color="#6C3A2C"
                                        type="material"
                                        name="help"
                                    />
                                    <Text style={styles.helpModalText}>
                                        Ask a question
                                    </Text>
                                </View>
                            </Pressable>
                            {/* Button to cancel & close modal */}
                            <Pressable
                                style={styles.helpModalCancelPressable}
                                onPress={() => {
                                    console.log("Cancel pressed");
                                    setModalVisible(false);
                                }}
                            >
                                <View style={styles.modalCancelView}>
                                    <Text style={styles.helpModalText}>
                                        Cancel
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.body}>
                    <View style={styles.itemContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.inputLabel}>Name</Text>
                            <Icon
                                style={{ alignSelf: "flex-end" }}
                                color={nameEditable ? "#008EC2" : "#548439"}
                                type="material"
                                name="edit"
                                onPress={() => {
                                    setNameEditable(!nameEditable);
                                    setNameEditable
                                        ? setName(currUser.name)
                                        : setName(name);
                                }}
                            />
                        </View>
                        <TextInput
                            style={
                                nameEditable ? styles.input : styles.hiddenInput
                            }
                            ref={ref_nameInput}
                            defaultValue={name}
                            onChangeText={setName}
                            editable={nameEditable}
                            onSubmitEditing={() => {
                                ref_currentPasswordInput.current.focus();
                            }}
                            returnKeyType="done"
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <Icon
                                style={{ alignSelf: "flex-end" }}
                                color={firstNameEditable ? "#008EC2" : "#548439"}
                                type="material"
                                name="edit"
                                onPress={() => {
                                    setFirstNameEditable(!firstNameEditable);
                                    setFirstNameEditable
                                        ? setFirstName(currUser.firstName)
                                        : setFirstName(firstName);
                                }}
                            />
                        </View>
                        <TextInput
                            style={
                                firstNameEditable ? styles.input : styles.hiddenInput
                            }
                            ref={ref_firstNameInput}
                            defaultValue={firstName}
                            onChangeText={setFirstName}
                            editable={firstNameEditable}
                            onSubmitEditing={() => {
                                ref_currentPasswordInput.current.focus();
                            }}
                            returnKeyType="done"
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.inputLabel}>Phone</Text>
                            <Icon
                                style={{ alignSelf: "flex-end" }}
                                color={phoneEditable ? "#008EC2" : "#548439"}
                                type="material"
                                name="edit"
                                onPress={() => {
                                    setPhoneEditable(!phoneEditable);
                                    setPhoneEditable
                                        ? setPhone(currUser.phone)
                                        : setPhone(phone);
                                }}
                            />
                        </View>
                        <TextInput
                            style={
                                phoneEditable ? styles.input : styles.hiddenInput
                            }
                            ref={ref_phoneInput}
                            defaultValue={phone}
                            onChangeText={setPhone}
                            editable={phoneEditable}
                            onSubmitEditing={() => {
                                ref_currentPasswordInput.current.focus();
                            }}
                            returnKeyType="done"
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <Icon
                                style={{ alignSelf: "flex-end" }}
                                color={emailEditable ? "#008EC2" : "#548439"}
                                type="material"
                                name="edit"
                                onPress={() => {
                                    setEmailEditable(!emailEditable);
                                    emailEditable
                                        ? setEmail(currUser.email)
                                        : setEmail(email);
                                }}
                            />
                        </View>
                        <TextInput
                            style={
                                emailEditable
                                    ? styles.input
                                    : styles.hiddenInput
                            }
                            ref={ref_emailInput}
                            defaultValue={email}
                            onChangeText={setEmail}
                            editable={emailEditable}
                            onSubmitEditing={() => {
                                ref_currentPasswordInput.current.focus();
                            }}
                            returnKeyType="done"
                        />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.inputLabel}>New Password</Text>
                            <Icon
                                style={{ alignSelf: "flex-end" }}
                                color={passwordEditable ? "#008EC2" : "#548439"}
                                type="material"
                                name="edit"
                                onPress={() => {
                                    setPasswordEditable(!passwordEditable);
                                    setNewPassword("");
                                }}
                            />
                        </View>
                        <TextInput
                            style={
                                passwordEditable
                                    ? styles.input
                                    : styles.hiddenInput
                            }
                            ref={ref_newPasswordInput}
                            editable={passwordEditable}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            secureTextEntry={true}
                            autoCompleteType={false}
                            textContentType="newPassword"
                            onSubmitEditing={() => {
                                ref_currentPasswordInput.current.focus();
                            }}
                            returnKeyType="done"
                        />
                        {passwordEditable ? (
                            <Text style={styles.passwordWarning}>
                                Password must be at least 8 characters.
                            </Text>
                        ) : null}
                    </View>
                    {nameEditable || firstNameEditable || phoneEditable || emailEditable || passwordEditable ? (
                        <View style={styles.existingPasswordContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.existingPasswordInputLabel}>
                                    Enter current password to save changes
                                </Text>
                            </View>
                            <TextInput
                                style={
                                    editMode
                                        ? [
                                              styles.input,
                                              { borderColor: "#008EC2" },
                                          ]
                                        : styles.hiddenInput
                                }
                                ref={ref_currentPasswordInput}
                                editable={editMode}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                autoComplete="password"
                                textContentType="password"
                                returnKeyType="done"
                            />
                        </View>
                    ) : null}
                    <View style={styles.itemContainer}>
                        <Pressable
                            style={[
                                styles.saveButton,
                                nameEditable ||
                                emailEditable ||
                                passwordEditable
                                    ? { backgroundColor: "#008EC2" }
                                    : { backgroundColor: "#548439" },
                            ]}
                            onPress={async () => {
                                await saveChanges(currUser.email, password);
                            }}
                        >
                            <Text style={styles.saveButtonText}>SAVE</Text>
                        </Pressable>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexBasis: 300,
                        paddingVertical: "5%",
                    }}
                ></View>
            </ScrollView>
            <View style={styles.pressableContainer}>
                <Pressable
                    style={styles.helpRequestPressable}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.helpRequestText}>Need Help?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FCF9F4",
        flex: 1,
        justifyContent: "flex-start",
    },
    body: {
        flex: 1,
        width: "100%",
        alignSelf: "flex-start",
    },
    itemContainer: {
        flex: 0.5,
        flexShrink: 1,
        paddingVertical: "4%",
        paddingHorizontal: "10%",
    },
    existingPasswordContainer: {
        flex: 0.5,
        flexGrow: 0.5,
        paddingVertical: "4%",
        paddingHorizontal: "10%",
        justifyContent: "center",
    },
    pressableContainer: {
        flex: 0.2,
        flexGrow: 0.4,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "5%",
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#6C3A2C",
    },
    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // width: "100%",
        paddingBottom: "1%",
    },
    inputLabel: {
        fontFamily: "Avenir-Heavy",
        color: "#548439",
        fontSize: 20,
        alignSelf: "flex-start",
    },
    passwordWarning: {
        fontFamily: "Avenir-Heavy",
        fontSize: 15,
        color: "#008EC2",
        textAlign: "center",
        marginTop: "1.5%",
    },
    existingPasswordInputLabel: {
        fontFamily: "Avenir-Roman",
        color: "#008EC2",
        fontSize: 18,
        alignSelf: "flex-start",
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
    hiddenInput: {
        backgroundColor: "#F3E9D9",
        borderColor: "#6C3A2C",
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        fontFamily: "Avenir-Roman",
        color: "#C6B39D",
    },
    helpRequestPressable: {
        justifyContent: "center",
        padding: 10,
    },
    helpRequestText: {
        fontFamily: "Avenir-Heavy",
        fontSize: 20,
        color: "#FCF9F4",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000075",
    },
    helpModal: {
        flexGrow: 0.13,
        width: Dimensions.get("window").width * 0.75,
        height: Dimensions.get("window").height * 0.265,
        borderRadius: 15,
        backgroundColor: "#F3E9D9",
        alignItems: "center",
        paddingTop: "3%",
    },
    helpModalTitle: {
        fontFamily: "Avenir-Heavy",
        fontSize: 20,
        marginBottom: "2%",
        color: "#6C3A2C",
    },
    helpModalText: {
        fontFamily: "Avenir-Roman",
        fontSize: 18,
        color: "#6C3A2C",
    },
    helpModalHeaderView: {
        flexGrow: 1,
        justifyContent: "center",
    },
    helpModalRowPressable: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        borderTopColor: "#C6B39D",
        borderTopWidth: 1,
        paddingVertical: "3%",
    },
    helpModalCancelPressable: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        borderTopColor: "#C6B39D",
        borderTopWidth: 1,
        borderBottomColor: "#C6B39D",
        borderBottomWidth: 1,
        paddingVertical: "3%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    modalRowLayoutView: {
        flexDirection: "row",
        paddingLeft: "3%",
        alignItems: "center",
    },
    modalCancelView: {
        justifyContent: "center",
        flexDirection: "row",
    },
    saveButton: {
        padding: 15,
        width: "100%",
        // flex: 0.08,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    saveButtonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 24,
    },
});

export default AccountSettingsScreen;
