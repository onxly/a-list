import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import React from "react";

import FetchData from "../Functions/FetchData";

import { Ionicons } from "@expo/vector-icons";
import Card from "./Card";

function MainFeed({ title, icon }) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </Pressable>
      {isLoading ? (
        <ActivityIndicator size={50} color="white" />
      ) : (
        <View style={styles.cards}></View>
      )}
    </View>
  );
}

export default MainFeed;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 15,
  },

  cards: {},
});
