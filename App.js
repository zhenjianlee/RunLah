import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import cafe from "./assets/ct.jpg";
import mona from "./assets/mn.jpg";

import { PaperProvider } from "react-native-paper";

//components
import HomeScreen from "./components/HomeScreen";
import ChallengeScreen from "./components/ChallengeScreen";
import LoginScreen from "./components/LoginScreen";
import DeviceMotionSettingsScreen from "./components/DeviceMotionSettingsScreen";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Challenge") {
                  iconName = focused ? "walk" : "walk-outline";
                } else if (route.name === "Login") {
                  iconName = focused
                    ? "log-in"
                    : "log-in-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
            />
            <Tab.Screen
              name="Challenge"
              component={ChallengeScreen}
            />
            <Tab.Screen
              name="Login"
              component={LoginScreen}
            />
            <Tab.Screen
              name="Settings"
              component={DeviceMotionSettingsScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
// https://reactnavigation.org/docs/nesting-navigators/
