import React from "react";
import {
    Dimensions,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

// This function creates the welcome screen with the logo, the login button, and the
// register button.
function WelcomeScreen(props) {
    // Get size of screen
    const windowWidth = useWindowDimensions().width;
    // Set logo to be as wide as 95% of the screen
    const logoWidth = Math.round(windowWidth * 0.95);
    const logoHeight = logoWidth / 1.6;

    return (
        <SafeAreaView style={styles.background}>
            {/* Displays the app logo */}
            <View style={styles.logoContainer}>
                <Image
                    style={{ width: logoWidth, height: logoHeight }}
                    source={require("../assets/hiroad-logo-75.png")}
                />
            </View>
            {/* Login Button */}
            <Pressable
                onPress={() => props.navigation.navigate("Login")}
                style={styles.loginButton}
            >
                <Text style={styles.loginButtonText}>LOGIN</Text>
            </Pressable>
            {/* Register button */}
            <Pressable
                onPress={() => props.navigation.navigate("Register")}
                style={styles.registerButton}
            >
                <Text style={styles.registerButtonText}>REGISTER</Text>
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
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.3,
    },
    loginButton: {
        margin: "15%",
        width: "80%",
        flex: 0.1,
        backgroundColor: "#6C3A2C",
        justifyContent: "center",
        borderRadius: 10,
    },
    loginButtonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 24,
    },
    registerButton: {
        width: "80%",
        flex: 0.1,
        backgroundColor: "#548439",
        justifyContent: "center",
        borderRadius: 10,
    },
    registerButtonText: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Black",
        alignSelf: "center",
        fontSize: 24,
    },
});

export default WelcomeScreen;
