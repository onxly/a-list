import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import Add from "../components/Add";

function ReviewScreen({ route, navigation }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Add
        id={data.object.mal_id}
        title={data.object.title}
        img={data.object.picture_url}
      />
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={{ uri: data.user.picture_url }}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <View style={styles.title}>
            <Text style={{ ...styles.text, fontSize: 14 }}>
              {data.user.name}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              ...styles.text,
            }}
          >
            {data.date.date_str}
          </Text>
          <Text style={{ ...styles.text }}>{data.date.time_str}</Text>
          <View style={styles.chips}>
            <Text
              style={{
                ...styles.chip,
                color: "white",
                backgroundColor:
                  data.tag === "Recommended"
                    ? "green"
                    : data.tag === "Mixed Feelings"
                    ? "purple"
                    : "red",
              }}
            >
              {data.tag}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() =>
              navigation.navigate("Anime Profile", { id: data.object.mal_id })
            }
          >
            <Image
              style={{ ...styles.img, top: 0 }}
              source={{ uri: data.object.picture_url }}
              resizeMode="contain"
            />
          </Pressable>
          <View
            style={{
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontSize: 20,
                fontWeight: "400",
                alignSelf: "center",
                margin: 10,
              }}
            >
              {"Review for "}
              <Text style={{ fontStyle: "italic", fontWeight: "300" }}>
                {data.object.title}
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              ...styles.text,
              fontSize: 13,
              fontWeight: "300",
              alignSelf: "center",
              fontStyle: "italic",
              padding: 10,
            }}
          >
            {data.text.full}
          </Text>
        </View>
        <View style={{ margin: 60 }} />
      </ScrollView>
    </View>
  );
}

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: Platform.OS === "android" && StatusBar.currentHeight,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  img: {
    width: 130,
    height: 250,
    margin: 10,
  },
  info: {
    minHeight: 200,
    width: "55%",
    padding: 5,
    gap: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 9,
  },
  title: {
    marginBottom: 5,
  },
  chips: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  chip: {
    fontSize: 7,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  content: {
    flex: 1,
  },
  characters: {
    marginBottom: "auto",
  },
});
