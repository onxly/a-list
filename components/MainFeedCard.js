import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";

function MainFeedCard({ img, title }) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.badge}>
        <EvilIcons name="search" size={20} color="white" />
      </View>
      <Image
        style={styles.img}
        resizeMode="stretch"
        width={129}
        height={130}
        source={{
          uri: img,
        }}
      />
      <Divider style={{ width: "100%" }} />
      <View style={styles.info}>
        <Text style={styles.maintitle}>{title}</Text>
      </View>
    </Pressable>
  );
}

export default MainFeedCard;

const styles = StyleSheet.create({
  container: {
    width: 130,
    maxHeight: 250,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 10,
    margin: 5,
  },
  img: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  maintitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  modal: {
    overflow: "hidden",
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "black",
  },
  info: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  badge: {
    zIndex: 999,
    position: "absolute",
    left: 0,
    backgroundColor: "#348feb",
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 5,
    borderWidth: 0.5,
    borderColor: "white",
    padding: 2,
    minWidth: 20,
    alignItems: "center",
  },
});
