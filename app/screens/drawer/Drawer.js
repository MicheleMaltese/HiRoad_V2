import * as React from "react";
import { Icon } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapViewScreen from "../MapViewScreen";
import LogoutScreen from "../LogoutScreen";
import AccountSettingsScreen from "../AccountSettingsScreen";
import AddFriendsScreen from '../AddFriendsScreen'; 
import EditFriendsScreen from '../EditFriendsScreen'; 
import AcceptFriendsScreen from '../AcceptFriendsScreen'; 
import ExportMapsScreen from '../ExportMapsScreen'; 
import AcceptMapsScreen from '../AcceptMapsScreen'; 
import ExportPinsScreen from '../ExportPinsScreen.js'; 
import AcceptPinsScreen from '../AcceptPinsScreen'; 
const Drawer = createDrawerNavigator();

//FIXME: As of right now, none of the pages in this drawer are necessary in this drawer.
//Drawer should include options to edit user profile, sharing, export map, etc.
export default function MyDrawer() {
    return (
        <Drawer.Navigator
            // Drawer style options
            screenOptions={{
                drawerStyle: {
                    backgroundColor: "#F3E9D9",
                    width: "75%",
                },
                drawerLabelStyle: {
                    fontFamily: "Avenir-Heavy",
                    fontSize: 18,
                    color: "#6C3A2C",
                },
                drawerActiveTintColor: "#6C3A2C",
                headerShown: true,
                headerTintColor: "#FCF9F4",
                headerStyle: {
                    backgroundColor: "#548439",
                },
            }}
            initialRouteName="Map View"
        >
            {/* User home screen */}
            <Drawer.Screen name="Home" component={MapViewScreen} />
            <Drawer.Screen name="Add Friends" component={AddFriendsScreen} />
            <Drawer.Screen name="View Friends List" component={EditFriendsScreen} />
            <Drawer.Screen name="Accept Friends" component={AcceptFriendsScreen} options={{ title: 'Accept Friend Requests' }} />
            <Drawer.Screen name="Send Maps" component={ExportMapsScreen} options={{ title: 'Send Maps' }} />
            <Drawer.Screen name="Accept Maps" component={AcceptMapsScreen} options={{ title: 'Accept Map Requests' }} />
            <Drawer.Screen name="Send Pins" component={ExportPinsScreen} options={{ title: 'Send Pins' }} />
            <Drawer.Screen name="Accept Pins" component={AcceptPinsScreen} options={{ title: 'Accept Pin Requests' }} />
            <Drawer.Screen
                name="Settings"
                component={AccountSettingsScreen}
                // options={{
                //     headerTintColor: "#FCF9F4",
                //     headerStyle: { backgroundColor: "#FCF9F4" },
                // }}
            />
            <Drawer.Screen name="Log Out" component={LogoutScreen} />
        </Drawer.Navigator>
    );
}
