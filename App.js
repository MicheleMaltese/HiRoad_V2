import "react-native-gesture-handler"; //NOTE: Do NOT put any imports above this one, because it will break for some reason.
import * as React from "react";
import { StyleSheet, Text, View, Font } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import TestMapScreen from "./app/screens/TestMapScreen";
import MapViewScreen from "./app/screens/MapViewScreen";
import LogoutScreen from "./app/screens/LogoutScreen";
import MyDrawer from "./app/screens/drawer/Drawer";
import ForgotPasswordScreen from "./app/screens/ForgotPasswordScreen";
import CreateMapScreen from "./app/screens/CreateMapScreen";
import CreatePinScreen from "./app/screens/CreatePinScreen";
import CreatePinScreenSocial from "./app/screens/CreatePinScreenSocial";
import CreateRouteScreen from "./app/screens/CreateRouteScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectIconScreen from "./app/screens/SelectIconScreen";
import SelectIconScreenSocial from "./app/screens/SelectIconScreenSocial";
import AccountSettingsScreen from "./app/screens/AccountSettingsScreen";
import EnterCodeScreen from "./app/screens/EnterCodeScreen";
import EnterNewPasswordScreen from "./app/screens/EnterNewPasswordScreen";
import SocialMapScreen from "./app/screens/SocialMapScreen";
import ARValidationScreen from "./app/screens/ARValidationScreen";
import FriendSelectScreen from "./app/screens/FriendSelectScreen";
import SelectPinExportScreen from "./app/screens/SelectPinExportScreen";
import FriendSelectScreenPin from "./app/screens/PinForFriendScreen";
import PinTransferFinalizeScreen from "./app/screens/PinTransferFinalizeScreen";
import CreateRouteScreenSocial from "./app/screens/CreateRouteScreenSocial";
import ArScreen from "./app/screens/ArScreen";

const Stack = createNativeStackNavigator();

export default class App extends React.Component {

  render() {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: true }}
            initialRouteName="Welcome"
          >
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: "", headerTransparent: true }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="EnterCode"
              component={EnterCodeScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="EnterNewPassword"
              component={EnterNewPasswordScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerTintColor: "#FDFAF5",
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerTintColor: "#FDFAF5",
              }}
            />
            <Stack.Screen
              name="TestMap"
              component={TestMapScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="MapView"
              component={MapViewScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create Pin Social"
              component={CreatePinScreenSocial}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Create Pin"
              component={CreatePinScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Select Icon"
              component={SelectIconScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Select Icon Social"
              component={SelectIconScreenSocial}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Create Route"
              component={CreateRouteScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Create Route Social"
              component={CreateRouteScreenSocial}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Social Map"
              component={SocialMapScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Augmented Reality Validation"
              component={ARValidationScreen}
              options={{
                title: "AR Addresses",
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="AR View"
              component={ArScreen}
              detachInactiveScreens={false}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Create Map"
              component={CreateMapScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#548439",
                },
                headerTintColor: "#FCF9F4",
              }}
            />
            <Stack.Screen
              name="Drawer"
              component={MyDrawer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="LogoutScreen"
              component={LogoutScreen}
              options={{
                title: "",
                headerTransparent: true,
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="FriendSelect"
              component={FriendSelectScreen}
              options={{
                title: "Select Friend",
                // Adjust these styles to match your app's theme
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="PinSelect"
              component={SelectPinExportScreen}
              options={{
                title: "Select Pin",
                // Adjust these styles to match your app's theme
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="FriendSelectPin"
              component={FriendSelectScreenPin}
              options={{
                title: "Select Friend",
                // Adjust these styles to match your app's theme
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
            <Stack.Screen
              name="PinTransferFinalizeScreen"
              component={PinTransferFinalizeScreen}
              options={{
                title: "Finalize Pin Export",
                // Adjust these styles to match your app's theme
                headerStyle: {
                  backgroundColor: "#FCF9F4",
                },
                headerTintColor: "#6C3A2C",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}
