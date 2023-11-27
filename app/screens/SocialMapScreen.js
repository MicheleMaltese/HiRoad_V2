import React, { useState, useEffect, useRef, useFocusEffect } from "react";
import MapView, { Marker, UrlTile, Callout, Polyline } from "react-native-maps";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    Image,
    Animated,
    PanResponder,
    Platform,
} from "react-native";
import Modal from "react-native-modal";
import { FAB, Icon, registerCustomIconType } from "react-native-elements";
import {
    currUser,
    addSocialPin,
    addSocialRoute,
    deleteSocialRoute,
    updateUserInfo,
    changePinLatSocial,
    changePinLngSocial,
    URIs,
    Location
} from "../assets/test data/TestUserData.js";
//import * as Location from "expo-location";
import { HeaderBackButton } from "react-navigation-stack";

// Creates the icon and text row for the system help popup
const SystemHelpPopUpRow = (props) => (
    <View
        style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
        }}
    >
        <Icon color="#FCF9F4" type="material" name={props.iconName} />
        <View
            style={{
                flex: 0.7,
                marginLeft: 8,
            }}
        >
            <Text
                style={[
                    styles.systemText,
                    { alignSelf: "flex-start", fontWeight: "bold" },
                ]}
            >
                {props.buttonLabel}
            </Text>
            <Text style={[styles.systemText, { alignSelf: "flex-start" }]}>
                {props.buttonExplainer}
            </Text>
        </View>
    </View>
);

// Creates the system help popup based on edit mode
const SystemPopupWithIconRows = (props) =>
    props.inEditMode ? (
        <View style={[styles.systemMessage, { flex: 0.10, flexGrow: 5 }]}>
            <SystemHelpPopUpRow
                iconName="edit"
                buttonLabel="Edit Button"
                buttonExplainer="Exit edit mode"
            />
            <SystemHelpPopUpRow
                iconName="add-location"
                buttonLabel="Create or Edit a Pin"
                buttonExplainer="Press this button then tap on the map to place a pin."
            />
            <SystemHelpPopUpRow
                iconName="edit-road"
                buttonLabel="Draw a route"
                buttonExplainer="Press this button then draw on the map to create a route."
            />
        </View>
    ) : (
        <View style={[styles.systemMessage, { flex: 0.9 }]}>
            <SystemHelpPopUpRow
                iconName="edit"
                buttonLabel="Edit Button"
                buttonExplainer="Create and edit pins and routes"
            />
            <SystemHelpPopUpRow
                iconName="map"
                buttonLabel="Location"
                buttonExplainer="Centers to the map's starting location"
            />
            
             <SystemHelpPopUpRow
                iconName="warning"
                buttonLabel= "Warning"
                buttonExplainer="Make sure you are fully zoomed in for the most accurate pin placement"
            />
           
        </View>
    );

function SocialMapScreen(props) {
    // useState to determine whether the app is in Pin Edit Mode
    const [pinState, setPinState] = useState(false);
    // useState to determine whether the app is in Route Edit Mode
    const [routeState, setRouteState] = useState(false);
    // useState to determine whether the app is in Edit Mode. Should turn off all other edit modes, if this one is turned off
    const [editMode, setEditMode] = useState(false);
    // Array of the user's pins, imported data
    // FIXME: currently using a test data file, will need to be modified to call from the database
    const [markers, setMarkers] = useState(
        currUser.socialMap.pins == undefined
            ? []
            : currUser.socialMap.pins
    );
    let [routes, setRoutes] = useState(
        currUser.socialMap.routes == undefined
            ? []
            : currUser.socialMap.routes
    );
    let [coordsArr, setCoordsArr] = useState([]);
    //Use as initial region, and also to reset the camera
    const [region, setRegion] = useState({
        latitude: currUser.socialMap.startlat,
        longitude: currUser.socialMap.startlng,
        // Determines zoom level. Hardcoded for now, could be changed in the future
        latitudeDelta: 1,
        longitudeDelta: 1,
    });
    // Timer to make the screen wait long enough for the user to see their addition before the screen transitions
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    // Sets modal visible, displays route information
    const [modalVisible, setModalVisible] = useState(false);
    // For some reason the map doesn't update right unless you call a function
    const [update, setUpdate] = useState(true);
    // Show help popup
    const [helpPopupVisible, setHelpPopupVisible] = useState(false);

    const [mapName, setMapName] = useState(
        currUser.socialMap.mapName
    );

    const [mounted, setMounted] = useState(true);

    // Display the map name as the header title
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: mapName === "" ? "Map Name" : mapName,
            headerLeft: () => (
                <HeaderBackButton
                    // style={styles.headerText}
                    onPress={() => {
                        setMounted(false), props.navigation.goBack();
                    }}
                    tintColor="#FCF9F4"
                />
            ),
            // Add a help button to the right side of the header
            headerRight: () => (
                <Icon
                    color="#FCF9F4"
                    type="material"
                    size={30}
                    name="help"
                    onPress={() => {
                        setHelpPopupVisible(!helpPopupVisible);
                    }}
                />
            ),
        });
    }, [props.navigation, mapName, helpPopupVisible]);

    // Makes sure the pins are updating in accordance to the user data in real time
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setMarkers(
                currUser.socialMap == undefined ||
                    currUser.socialMap.pins == undefined
                    ? []
                    : currUser.socialMap.pins
            );

            setRoutes(
                currUser.socialMap == undefined ||
                    currUser.socialMap.routes == undefined
                    ? []
                    : currUser.socialMap.routes
            );

            // For some reason, the map doesn't update right unless you call a function
            setUpdate(!update);
        });
        return () => {
            unsubscribe;
        };
    });

    // Turns pin edit mode on and off
    //FIXME: Can probably replace all instances of this function with setPinState(!pinState)
    ShowHideAddPin = () => {
        setPinState(!pinState);
        setRouteState(false);
    };

    // Turns route edit mode on and off and ensures it is the only edit mode on
    ShowHideAddRoute = () => {
        setRouteState(!routeState);
        setPinState(false);
    };

    // Turns edit mode on and off
    showHideEditMode = () => {
        if (editMode === false) {
            setEditMode(true);
        } else {
            // Set all edit modes to false
            setEditMode(false);
            setPinState(false);
            setRouteState(false);
        }
    };

    // Function to add a pin to the user data
    const handleAddPin = async (coordinate, props) => {
        //Only execute the function if both edit modes are true
        if (pinState && editMode) {
            // updates pins live in the app
            setMarkers((prevMarkers) => [
                ...prevMarkers,
                {
                    lat: coordinate.latitude,
                    lng: coordinate.longitude,
                    augmentedRealityEnabled: 0,
                    label: "",
                    date: "",
                    //FIXME: Probably we should have a variable to import, for the default pin image
                    icon: "apingreen.png",
                },
            ]);
            // adds the pins to the file containing the test data.
            // will be changed when database is operational
            // Honestly it looks like we just need this for it to display on the screen long enough for the user to see it.
            // Otherwise we wouldn't add it here
            addSocialPin({
                lat: coordinate.latitude,
                lng: coordinate.longitude,
                augmentedRealityEnabled: 0,
                label: "",
                date: "",
                //FIXME: Probably we should have a variable to import, for the default pin image
                icon: "apingreen.png",
            });
            //Wait long enough to let user view their pin location, then take them to the create pin screen
            await delay(1000);
            //Pass the new marker's place in the array to the pin edit screen
            props.navigation.navigate("Create Pin Social", {
                id: currUser.socialMap.pins.length - 1,
                mode: "add",
            });
        }
    };

    // Function to edit an existing pin
    const handleEditPin = (e, index, props) => {
        // Stops the map from activating its onPress function (adding a pin)
        e.stopPropagation();
        //Only execute if both edit modes are true
        if (pinState && editMode) {
            //Pass the marker's existing data to the pin edit screen
            props.navigation.navigate("Create Pin Social", {
                mapId: props.route.params.id,
                id: index,
                mode: "edit",
            });
        }
    };

    let panResponder;
    let mapRef = useRef();
    let routeRef = useRef();
    let [timer, setTimer] = useState(true);

    let setCoords = async (e) => {
        if (routeState) {
            let coord = await mapRef.current.coordinateForPoint({
                x: e.nativeEvent.pageX,
                y: e.nativeEvent.pageY,
            });
            setCoordsArr((prevCoordsArr) => [...prevCoordsArr, coord]);
            let tempRoutes = routes;
            tempRoutes.pop();
            tempRoutes.push({
                color: "#000",
                coordsArr: coordsArr,
            });
            setRoutes([...tempRoutes]);
        }
    };

    let handleDeleteRoute = (index) => {
        deleteSocialRoute(index);
        let tempRoutes = routes;
        tempRoutes.splice(index, 1);
        setRoutes([...tempRoutes]);
    };

    panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (e, gestureState) => {
            if (routeState) {
                setTimer(true);
                setRoutes((prevCoordsArr) => [...prevCoordsArr, []]);
                setCoordsArr([]);
            }
        },

        onPanResponderMove: async (e, gestureState) => {
            if (routeState) {
                if (timer) {
                    await setCoords(e);
                    setTimer(false);
                    //   await delay(10);
                    setTimer(true);
                }
            }
        },

        onPanResponderRelease: async (e) => {
            if (routeState) {
                addSocialRoute({
                    color: "#000000",
                    label: "",
                    date: "",
                    coordsArr: coordsArr,
                });
                updateUserInfo();
                await delay(500);
                props.navigation.navigate("Create Route", {
                    mapId: props.route.params.id,
                    id: currUser.socialMap.routes.length - 1,
                    mode: "add",
                });
            }
        },
    });

    const showRouteModal = (item) => {
        routeRef.current = item;
        // Load content
        getRouteStartingLocation(routeRef);
        getRouteEndingLocation(routeRef);
        mapRef.current.animateToRegion({
            latitude:
                item.coordsArr[Math.floor(item.coordsArr.length / 2)].latitude,
            longitude:
                item.coordsArr[Math.floor(item.coordsArr.length / 2)].longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
        });
        setModalVisible(true);
    };

    const getRouteStartingLocation = async (routeRef) => {
        const startLat = routeRef.current.coordsArr[0].latitude;
        const startLong = routeRef.current.coordsArr[0].longitude;
        const address = await Location.reverseGeocodeAsync({
            latitude: startLat,
            longitude: startLong,
        });
        if (mounted) {
            let startingLocString =
                "Start: " + address[0].city + ", " + address[0].region + ", ";
            if (address[0].country === "United States") {
                startingLocString += "USA";
            } else {
                startingLocString += address[0].country;
            }
            setRouteModalStartingAddr(startingLocString);
        }
    };

    const getRouteEndingLocation = async (routeRef) => {
        const arrLen = routeRef.current.coordsArr.length;
        const endLat = routeRef.current.coordsArr[arrLen - 1].latitude;
        const endLong = routeRef.current.coordsArr[arrLen - 1].longitude;
        const address = await Location.reverseGeocodeAsync({
            latitude: endLat,
            longitude: endLong,
        });
        console.log("in");
        if (mounted) {
            console.log("mounted");
            let endingLocString =
                "End: " + address[0].city + ", " + address[0].region + ", ";
            if (address[0].country === "United States") {
                endingLocString += "USA";
            } else {
                endingLocString += address[0].country;
            }
            setRouteModalEndingAddr(endingLocString);
        }
    };

    // Function to handle closing route modal
    const handleRouteModalClose = () => {
        console.log("Closing modal");
        setModalVisible(false);
        console.log("Modal closed");
    };

    const [routeModalStartingAddr, setRouteModalStartingAddr] = useState("");
    const [routeModalEndingAddr, setRouteModalEndingAddr] = useState("");

    return (
        <View style={styles.container}>
            {/* User's map */}
            <MapView
                ref={(current) => (mapRef.current = current)}
                style={styles.map}
                initialRegion={region}
                zoomEnabled={!routeState}
                scrollEnabled={!routeState}
                // When the user presses on the map, add a pin in that spot (if the edit modes are true)
                // FIXME: Will also need to handle adding routes in the future
                onPress={(e) => handleAddPin(e.nativeEvent.coordinate, props)}
                {...panResponder.panHandlers}
            >
                {routes.map((item, index) => (
                    <Polyline
                        key={index}
                        coordinates={item.coordsArr}
                        strokeColor={item.color}
                        // strokeColor="#000"
                        strokeWidth={5}
                        tappable={true}
                        onPress={(e) => {
                            e.stopPropagation();
                            if (routeState) {
                                props.navigation.navigate("Create Route", {
                                    mapId: props.route.params.id,
                                    id: index,
                                    mode: "edit",
                                });
                            } else if (!editMode) {
                                showRouteModal(item);
                            }
                        }}
                    />
                ))}
                {/* User's pins. Read in from the array in the user's data.
        FIXME: The pins are always draggable, even out of edit mode. Not sure if fixing is possible */}
                {markers.map((item, index) => (
                    <Marker
                        draggable
                        key={index}
                        coordinate={{ latitude: item.lat, longitude: item.lng }}
                        onDragEnd={(e) => (
                            (item.lat = e.nativeEvent.coordinate.latitude),
                            (item.lng = e.nativeEvent.coordinate.longitude),
                            changePinLatSocial(
                                item.lat,
                                index
                            ),
                            changePinLngSocial(
                                item.lng,
                                index
                            ),
                            updateUserInfo()
                        )}
                        // If the user presses a pin while in edit mode, take that pin's information to the pin edit screen
                        onPress={(e) => {
                            handleEditPin(e, index, props);
                        }}
                    >
                        {/* Pin icon, taken from user data */}
                        <Image
                            //Displays user's selected pin icon
                            //FIXME: Needs a backup plan in case the user disconnects from the server, probably hardcode the default pin
                            source={{ uri: URIs[3] + "/" + item.icon }}
                            style={{
                                height: 35,
                                width: 35,
                                resizeMode: "contain",
                            }}
                            defaultSource={require("../assets/apingreen.png")}
                        />
                        {/* The bubble that pops up when you tap on a pin */}
                        <Callout>
                            <View style={{ alignItems: "center", width: 100 }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        paddingBottom: 2,
                                    }}
                                >
                                    {markers[index].label}
                                </Text>
                                {markers[index].date != "" ? (
                                    <Text>{markers[index].date}</Text>
                                ) : null}
                                <Text>{markers[index].comments}</Text>
                                {/* FIXME: I don't think this will work, because if pinState is true, tapping on the pin (to display the callout) will take you to the edit screen
                Also, if this was for deleting the pin, it may not be necessary either way */}
                                {!pinState ? <Pressable title="X" /> : null}
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {/* Modal that pops up when you tap on a route */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    isVisible={modalVisible}
                    backdropColor="transparent"
                    onBackdropPress={() => handleRouteModalClose()}
                    onRequestClose={() => handleRouteModalClose()}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={[styles.modalHeader, { fontSize: 24 }]}
                            >
                                {routeRef.current == undefined
                                    ? ""
                                    : routeRef.current.label}
                            </Text>
                            <Text
                                style={[styles.modalHeader, { fontSize: 18 }]}
                            >
                                {routeRef.current == undefined
                                    ? ""
                                    : routeRef.current.date}
                            </Text>
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    marginVertical: "3%",
                                }}
                            >
                                <Text
                                    style={[
                                        styles.modalText,
                                        { fontSize: 18, textAlign: "center" },
                                    ]}
                                >
                                    {routeRef.current == undefined
                                        ? ""
                                        : routeModalStartingAddr}
                                </Text>
                                <Text
                                    style={[
                                        styles.modalText,
                                        { fontSize: 18, textAlign: "center" },
                                    ]}
                                >
                                    {routeRef.current == undefined
                                        ? ""
                                        : routeModalEndingAddr}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <Pressable
                                    style={[styles.button, styles.buttonEdit]}
                                    onPress={() => {
                                        props.navigation.navigate(
                                            "Create Route",
                                            {
                                                mapId: props.route.params.id,
                                                id: routes.indexOf(
                                                    routeRef.current
                                                ),
                                                mode: "edit",
                                            }
                                        );
                                        handleRouteModalClose();
                                    }}
                                >
                                    <Text style={styles.modalButtonTextStyle}>
                                        EDIT
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => handleRouteModalClose()}
                                >
                                    <Text style={styles.modalButtonTextStyle}>
                                        CLOSE
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            {/* Container for default floating action buttons when map screen loads */}
            <View style={styles.onTopOfMapContainer}>
                {/* If edit mode is false, show edit toggle and location centering buttons. 
            If edit mode is true, show neither. */}
                {!editMode ? (
                    <View>
                        {/* Edit Mode Button: toggles general edit mode, visually distingused from on mode */}
                        <FAB
                            style={styles.editButton}
                            icon={{ name: "edit", color: "#6C3A2C" }}
                            color="#F3E9D9"
                            onPress={() => showHideEditMode()}
                        />
                        {/* Location Button: recenters the map on the map's default location */}
                        <FAB
                            style={styles.locationButton}
                            icon={{ name: "map", color: "#6C3A2C" }}
                            color="#F3E9D9"
                            onPress={() =>
                                mapRef.current.animateToRegion(region, 500)
                            }
                        />
                    </View>
                ) : null}
            </View>
            <View style={styles.onBottomOfMapContainer}>
                {/* If edit mode is false, show edit toggle and location centering buttons. 
            If edit mode is true, show neither. */}
                {!editMode ? (
                    <View>
                        <FAB
                            style={styles.locationButton}
                            icon={{ name: "camera", color: "#6C3A2C" }}
                            color="#F3E9D9"
                            onPress={() =>
                                props.navigation.navigate("Augmented Reality Validation", {
                                    pins: currUser.socialMap.pins
                                })
                            }
                        />
                    </View>
                ) : null}
            </View>
            {/* Container for floating action buttons when in edit mode */}
            <View style={styles.onTopOfMapContainer}>
                {/* If edit mode is true, show edit toggle (selected version) and both edit buttons (pin and route)
            If edit mode is false, show none of those */}
                {editMode ? (
                    <View>
                        {/* Edit Mode Button (Selected): toggles general edit mode, visually distinguised from off mode */}
                        <FAB
                            style={styles.editButtonSelected}
                            icon={{ name: "edit", color: "#F3E9D9" }}
                            color="#6C3A2C"
                            onPress={() => showHideEditMode()}
                        />
                        {/* Edit Pin Button: toggles pin edit mode */}
                        {!pinState ? (
                            <FAB
                                style={styles.addButton}
                                icon={{
                                    name: "add-location",
                                    color: "#6C3A2C",
                                }}
                                color="#F3E9D9"
                                onPress={() => ShowHideAddPin()}
                            />
                        ) : (
                            <FAB
                                style={styles.addButton}
                                icon={{
                                    name: "add-location",
                                    color: "#F3E9D9",
                                }}
                                color="#6C3A2C"
                                onPress={() => ShowHideAddPin()}
                            />
                        )}
                        {/* Edit Route button: toggles route edit mode */}
                        { Platform.OS == "ios" ? (
                        !routeState? (
                            <FAB
                                style={styles.addButton}
                                icon={{ name: "edit-road", color: "#6C3A2C" }}
                                color="#F3E9D9"
                                onPress={() => ShowHideAddRoute()}
                            />
                        ) : (
                            <FAB
                                style={styles.addButton}
                                icon={{ name: "edit-road", color: "#F3E9D9" }}
                                color="#6C3A2C"
                                onPress={() => ShowHideAddRoute()}
                            />
                        )
                        ): null}
                    </View>
                ) : null}
            </View>
            {/* <View style={[styles.floatBox, { height: 190 }]}>
            </View> */}
            {helpPopupVisible || ((pinState || routeState) && editMode) ? (
                <View
                    style={[
                        styles.floatBox,
                        helpPopupVisible
                            ? { height: "30%" }
                            : { height: "10%" },
                    ]}
                >
                    {/* Text box that appears in Pin Edit Mode, to help explain what it does
        FIXME: Is this text clear enough?*/}
                    {helpPopupVisible ? (
                        <SystemPopupWithIconRows inEditMode={editMode} />
                    ) : null}
                    {pinState && editMode ? (
                        <View style={styles.systemMessage}>
                            <Text style={styles.systemText}>
                                Press anywhere to add a pin to the map.
                            </Text>
                            <Text style={styles.systemText}>
                                Tap on a pin to edit it.
                            </Text>
                        </View>
                    ) : null}
                    {routeState && editMode ? (
                        <View style={styles.systemMessage}>
                            <Text style={styles.systemText}>
                                Draw on the screen to place a route on the map.
                            </Text>
                        </View>
                    ) : null}
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    onTopOfMapContainer: {
        position: "absolute",
        top: "10%",
        alignSelf: "flex-end",
    },
    onBottomOfMapContainer: {
        position: "absolute",
        bottom: "10%",
        alignSelf: "flex-end",
    },
    floatBox: {
        position: "absolute",
        bottom: "10%",
        alignSelf: "center",
        width: "90%",
        height: "10%",
        justifyContent: "flex-end",
    },
    systemMessage: {
        flex: 0.6,
        flexShrink: 0.8,
        // height: "100%",
        backgroundColor: "#6C3A2C",
        borderRadius: 5,
        justifyContent: "center",
    },
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        top: "33%",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FCF9F4",
        borderRadius: 5,
        padding: "5%",
        paddingBottom: "10%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 5,
        padding: "5%",
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonEdit: {
        backgroundColor: "#548439",
    },
    buttonClose: {
        backgroundColor: "#6C3A2C",
    },
    modalButtonTextStyle: {
        color: "#FCF9F4",
        fontFamily: "Avenir-Heavy",
        fontSize: 20,
        textAlign: "center",
    },
    modalHeader: {
        color: "#6C3A2C",
        fontFamily: "Avenir-Black",
        marginTop: "2.5%",
    },
    modalText: {
        textAlign: "center",
        color: "#6C3A2C",
        fontFamily: "Avenir-Roman",
        marginVertical: "2.5%",
    },
    systemText: {
        alignSelf: "center",
        color: "#F3E9D9",
    },
    editButton: {
        padding: 8,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
    editButtonSelected: {
        padding: 8,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
    locationButton: {
        padding: 8,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
    addButton: {
        padding: 8,
        shadowColor: "#474139",
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 30,
    },
});

export default SocialMapScreen;
