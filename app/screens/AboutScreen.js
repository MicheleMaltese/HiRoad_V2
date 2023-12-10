import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function AboutScreen() {
    return (
        <ScrollView style={styles.background}>
            <View style={styles.body}>
                <Text style={styles.headerText}>Welcome to HiRoad Social</Text>
                <Text style={styles.paragraphText}>
                    Where your journeys are more than just routes—they're
                    experiences to be shared and celebrated.
                </Text>

                <Text style={styles.headerText}>Overview</Text>
                <Text style={styles.paragraphText}>
                    HiRoad Social is a social application designed for individuals who like to travel and want to share their experiences with friends and family. HiRoad Social traces its roots back to the visionary work of Michele Maltese, the mind behind the acclaimed Michigan Mitt Maps project, TripOut, which was a pioneering project that redefined how people explored and shared their journeys. Michele Maltese's experience with TripOut became the catalyst for the birth of HiRoad Social. The success and innovation of TripOut laid the foundation for a new venture that would seamlessly blend the best aspects of mapping, social connectivity, and emerging technologies.
                </Text>

                <Text style={styles.headerText}>Discover Your World, Share Your Path:</Text>
                <Text style={styles.paragraphText}>
                    Embark on a journey with HiRoad Social, a cutting-edge map-based software application designed to redefine the way you navigate and connect. Whether you're an avid explorer, a social butterfly, or simply looking to share your favorite spots, HiRoad Social is your digital companion for mapping memories.
                </Text>

                <Text style={styles.headerText}>Mapping Beyond Boundaries:</Text>
                <Text style={styles.paragraphText}>
                    Create and customize your routes effortlessly with our intuitive drawing tool. HiRoad Social empowers you to map your adventures, charting the course of your experiences with precision. Plan your excursions, mark scenic viewpoints, or outline your daily commute—all within the interactive canvas of HiRoad Social.
                </Text>

                <Text style={styles.headerText}>Pin Your Moments:</Text>
                <Text style={styles.paragraphText}>
                    Drop pins like breadcrumbs to mark significant locations along your journey. Each pin tells a story, be it the hidden gem you stumbled upon, the perfect sunset spot, or the cozy cafe where you found comfort. HiRoad Social turns your map into a canvas of memories, making it a visual diary of your life's travels.
                </Text>

                <Text style={styles.headerText}>Connect, Share, Celebrate:</Text>
                <Text style={styles.paragraphText}>
                    Enhance your social experience by connecting with friends through HiRoad Social. Send and receive friend requests, transforming your digital map into a shared space. Share your latest discoveries, compare routes, and celebrate each other's adventures as you navigate the world together.
                </Text>

                <Text style={styles.headerText}>Augmented Reality Messaging:</Text>
                <Text style={styles.paragraphText}>
                    Experience a new dimension of communication with our augmented reality (AR) feature. Send personalized messages to friends in real-time, superimposed on the world around them. From sharing inside jokes to leaving surprise messages at favorite locations, AR messaging adds a playful and personal touch to your interactions.
                </Text>

                <Text style={styles.headerText}>Share Your Journey:</Text>
                <Text style={styles.paragraphText}>
                    Your map is a story waiting to be told. HiRoad Social allows you to share or export your maps, giving your friends a glimpse into your world. Whether it's a weekend road trip, a city exploration, or a dreamy vacation, let others join in your adventures by sharing your unique map.
                </Text>

                <Text style={styles.headerText}>Continuous Exploration, Constant Connection:</Text>
                <Text style={styles.paragraphText}>
                    HiRoad Social is not just an app; it's a community of explorers and friends. Embrace the spirit of continuous exploration while staying connected with those who matter most. Your map is a reflection of your journey through life, and HiRoad Social is here to make it vibrant, interactive, and shared.
                </Text>

                <Text style={styles.headerText}>Contact Us</Text>
                <Text style={styles.paragraphText}>
                    If you have any questions, feedback, or need assistance, feel free to reach out to us at <Text style={styles.linkText}>hiroadsocial@gmail.com</Text>.
                </Text>

                <Text style={styles.paragraphText}>
                    Join HiRoad Social today and transform your map into a canvas of experiences. Embrace the journey, celebrate connections, and navigate the world with a touch of social flair. Your adventure begins here.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FCF9F4",
        flex: 1,
        paddingHorizontal: "5%",
    },
    body: {
        paddingBottom: 20,
    },
    headerText: {
        fontFamily: "Avenir-Heavy",
        fontSize: 24,
        color: "#6C3A2C",
        marginBottom: 10,
        textAlign: "center", // Align the text in the center
    },
    paragraphText: {
        fontFamily: "Avenir-Roman",
        fontSize: 18,
        color: "#6C3A2C",
        marginBottom: 15,
        textAlign: "center", // Align the text in the center
    },
    linkText: {
        fontFamily: "Avenir-Heavy",
        color: "#548439",
    },
});

export default AboutScreen;
