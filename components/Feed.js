import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetData from "../Functions/GetData";
import { useNavigation } from "@react-navigation/native";

function Feed({ title }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [fullData, setFullData] = React.useState("");
  const [data, setData] = React.useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function checkCache() {
      try {
        let update = false;
        const cache = await AsyncStorage.getItem(title);
        const time = await AsyncStorage.getItem("lastChecked");
        if (time) {
          update = new Date().getTime() - JSON.parse(time).time >= 3600000 * 24;
        }
        if ((cache !== null) & !update) {
          setFullData(JSON.parse(cache));
          setData(JSON.parse(cache).data);
          setIsLoading(false);
        } else {
          const newData = await GetData(title, true, 1);
          await sleep(1000);
          setFullData(newData);
          setData(newData.data);
          await AsyncStorage.setItem(title, JSON.stringify(newData));
          await AsyncStorage.setItem(
            "lastChecked",
            JSON.stringify({ time: new Date().getTime() })
          );
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkCache();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.titleContainer}
        onPress={() => navigation.navigate("Search Results")}
      >
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
      </Pressable>
      {isLoading ? (
        <ActivityIndicator size={50} color="white" />
      ) : (
        <ScrollView horizontal={true} style={styles.cards}>
          {data.map((anime) => {
            return (
              <Card
                key={anime._id}
                img={anime.image}
                title={anime.title}
                altTitles={anime.alternativeTitles}
                ranking={anime.ranking}
                genres={anime.genres}
                synopsis={anime.synopsis}
                type={anime.type}
                status={anime.status}
                episodes={anime.episodes}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

export default Feed;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  cards: {},
});
