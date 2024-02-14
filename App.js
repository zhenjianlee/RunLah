import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//components
import HomeScreen from "./screen/HomeScreen";
import SettingsScreen from "./screen/SettingsScreen";
import DeviceMotionScreen from "./screen/DeviceMotionScreen";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
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
              component={DeviceMotionScreen}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
    </>
  );
}
// https://reactnavigation.org/docs/nesting-navigators/
