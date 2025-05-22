import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./HomeScreens/SearchScreen";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MyListScreen from "./HomeScreens/MyListScreen";
import FeedScreen from "./HomeScreens/FeedScreen";
import { Portal } from "react-native-paper";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Search") {
            return (
              <View
                style={{
                  backgroundColor: focused && "white",
                  width: 50,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Fontisto
                  name="search"
                  size={24}
                  color={focused ? "black" : "white"}
                />
              </View>
            );
          } else if (route.name === "My List") {
            return (
              <View
                style={{
                  backgroundColor: focused && "white",
                  width: 50,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Feather
                  name="list"
                  size={24}
                  color={focused ? "black" : "white"}
                />
              </View>
            );
          } else if (route.name === "Reviews") {
            return (
              <View
                style={{
                  backgroundColor: focused && "white",
                  width: 50,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <AntDesign
                  name="book"
                  size={24}
                  color={focused ? "black" : "white"}
                />
              </View>
            );
          }
        },
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "black" },
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Reviews" component={FeedScreen} />
      <Tab.Screen name="My List" component={MyListScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
