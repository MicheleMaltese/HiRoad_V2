import React, { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { updateCurrUser } from "../assets/test data/TestUserData.js";

const handleLogout = async (props) => {
    try {
        /* User login attempt, if their info lines up with a user in the database, then they are set to that user info and move to the drawer screen */
        updateCurrUser(null);
        props.navigation.navigate("Welcome");
    } catch {
        console.log("caught");
    }
};

function LogoutScreen(props) {
    return (
        <SafeAreaView style={styles.background}>
            {/* Page title */}
            <View style={styles.headerContainer}>
                <Text style={styles.logoutHeader}>Do you wish</Text>
                <Text style={styles.logoutHeader}>to log out?</Text>
            </View>
            {/* User presses this to logout and return to the welcome screen*/}
            <Pressable
                style={styles.logoutButton}
                onPress={() => handleLogout(props)}
            >
                <Text style={styles.logoutButtonText} allowFontScaling={false}>
                    LOG OUT
                </Text>
            </Pressable>
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
    headerContainer: {
        flex: 0.2,
        padding: "10%",
        justifyContent: "center",
    },
    logoutHeader: {
        fontSize: 36,
        color: "#548439",
        fontFamily: "Avenir-Black",
        marginBottom: "-10%",
        textAlign: "center",
        padding: 16,
    },
    //Changed: Added marginTop of 5% instead of having two text inputs
    logoutButton: {
        width: "80%",
        flex: 0.1,
        backgroundColor: "#548439",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: "50%",
    },
    logoutButtonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 24,
    },
});

export default LogoutScreen;
