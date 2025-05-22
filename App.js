import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Portal, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import AnimeProfile from "./screens/AnimeProfile";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReviewScreen from "./screens/ReviewScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Portal.Host>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Search Results"
                component={SearchResultsScreen}
              />
              <Stack.Screen name="Anime Profile" component={AnimeProfile} />
              <Stack.Screen name="Review" component={ReviewScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Portal.Host>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
