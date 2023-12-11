import React from "react";
import { ScrollView, useWindowDimensions, StyleSheet, Image, Text, View } from "react-native";

function AboutScreen() {
    const windowWidth = useWindowDimensions().width;
    // Set logo to be as wide as 95% of the screen
    const logoWidth = Math.round(windowWidth * 0.95);
    const logoHeight = logoWidth / 1.6;

    return (
        <ScrollView style={styles.background}>
            <View style={styles.body}>
                <View style={styles.logoContainer}>
                <Image
                    style={{ width: logoWidth, height: logoHeight }}
                    source={require("../assets/HIROADSOCIAL2023logo.png")}
                />
            </View>
                <Text allowFontScaling={false} style={styles.paragraphText}>
                It’s an exciting way to share real life experiences, locations, events, and private messages. Send and receive friend requests from your contacts, transforming your digital map into a shared experience.
Share your latest discoveries, compare routes, celebrate each other’s adventures as you navigate the world and life together.
Drop pins like breadcrumbs. Each pin tells a story.
                </Text>

                <Text allowFontScaling={false} style={styles.headerText}>Overview</Text>
                <Text allowFontScaling={false} style={styles.paragraphText}>
               <Text allowFontScaling={false} style={styles.paragraphText}>
               {"A new dimension of communication, where messaging becomes real-life experiences — Augmented Reality Messaging (ARM).\nUsing any of your maps, zoom in and\nplace a pin at the exact location, in real time, you want the friend to retrieve it from.\nARMs superimpose on the world of\nyour friend when opened.\nIt’s like a treasure hunt.\nRecipients must go to the location\nto retrieve the message."}
                </Text>
                </Text>

                <Text allowFontScaling={false} style={styles.headerText}>A Different Type Of Social App</Text>
                <Text allowFontScaling={false} style={styles.paragraphText}>
                    Embark on a journey with HiRoad Social, a cutting-edge map-based software application designed to redefine what and how you share. Whether you're an avid explorer, a social butterfly, or simply looking to share your favorite spots: HiRoad Social is your digital companion for mapping memories.
                </Text>

                <Text allowFontScaling={false} style={styles.headerText}>Mapping Beyond Boundaries</Text>
                <Text allowFontScaling={false} style={styles.paragraphText}>
                    Create and customize your routes effortlessly with our drawing tool. HiRoad Social empowers you to map your adventures, charting the course of your experiences with the precision of What3Words. Plan your excursions, mark scenic viewpoints, or outline your daily commute — all within the interactive canvas of HiRoad Social.
                </Text>

                <Text allowFontScaling={false} style={styles.headerText}>Contact Us</Text>
                <Text allowFontScaling={false} style={styles.paragraphText}>
                    If you have any questions, feedback, or need assistance, feel free to reach out to us at <Text style={styles.linkText}>hiroadsocial@gmail.com</Text>
                </Text>

                <Text allowFontScaling={false} style={styles.paragraphText}>
                <Text allowFontScaling={false} style={styles.headerTextSmall}>{"v2 Development"}</Text>{"\n\nConcept and Design (UI / UX):\nMichele Maltese\n\nDeveloped in cooperation with UM-D\n\nTeam Lead / Lead Developer:\nAdam Yassine\n\nDeveloper:\nFade Baza\n\nSoftware Architect:\nBrian Meili\n\nSupport:\nNasim Ahmed"}
<Text allowFontScaling={false} style={styles.paragraphText}>{`\n\n“Thank you” to:
Bruce R. Maxim, PhD
Nattu Natarajan Professor of Engineering
Computer and Information Science
University of Michigan-Dearborn`}</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingHorizontal: "5%",
    },
    body: {
        paddingBottom: 20,
    },
    headerText: {
        fontFamily: "Avenir-Heavy",
        fontSize: 24,
        marginTop: 22,
        color: "#6C3A2C",
        marginBottom: 0,
        textAlign: "center", // Align the text in the center
    },
    headerTextSmall: {
        fontFamily: "Avenir-Heavy",
        fontSize: 20,
        marginTop: 22,
        color: "#6C3A2C",
        marginBottom: 0,
        textAlign: "center", // Align the text in the center
    },
    paragraphText: {
        fontFamily: "Avenir-Roman",
        fontSize: 18,
        color: "#6C3A2C",
        marginBottom: 15,
        marginTop: 16,
        textAlign: "center", // Align the text in the center
    },
    linkText: {
        fontFamily: "Avenir-Heavy",
        color: "#548439",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 0.3,
        marginTop: 18,
        marginRight: 14,
    },
});

export default AboutScreen;
