import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import { Divider, Portal } from "react-native-paper";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchData from "../Functions/SearchData";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function SearchResultsScreen({ route }) {
  const { searchQuery, oneResult } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function checkCache() {
      try {
        let update = true;
        const cache = await AsyncStorage.getItem(searchQuery);
        const time = await AsyncStorage.getItem(
          "lastCheckedSearch" + searchQuery
        );
        if (time) {
          update = new Date().getTime() - JSON.parse(time).time >= 3600000 * 24;
        }
        if ((cache !== null) & !update) {
          setData(JSON.parse(cache));
          setIsLoading(false);
        } else {
          const newData = await SearchData(searchQuery, oneResult);
          setData(newData);
          await AsyncStorage.setItem(searchQuery, JSON.stringify(newData));
          await AsyncStorage.setItem(
            "lastCheckedSearch" + searchQuery,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Results For:</Text>
        <Text
          style={{ ...styles.title, fontStyle: "italic", fontWeight: "300" }}
        >
          "{searchQuery}"
        </Text>
      </View>
      <Divider />
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        {isLoading ? (
          <View
            style={{
              marginTop: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ActivityIndicator size={80} color="white" />
          </View>
        ) : data.length <= 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>
              Wierd, nothing was found...
            </Text>
            <MaterialCommunityIcons
              name="robot-confused-outline"
              size={30}
              color="white"
            />
          </View>
        ) : (
          data.map((anime) => {
            return (
              <Pressable
                key={anime.myanimelist_id}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Card
                  id={anime.myanimelist_id}
                  img={anime.picture_url}
                  title={anime.title}
                  badgeColor="#38f56b"
                  badgeIcon={
                    <Ionicons name="eye-outline" size={20} color="white" />
                  }
                  cardWidth={110}
                  search={false}
                  profile={true}
                />
              </Pressable>
            );
          })
        )}
      </ScrollView>
      <View style={{ margin: 30 }} />
    </SafeAreaView>
  );
}

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    top: Platform.OS === "android" && StatusBar.currentHeight,
  },
  header: {
    padding: 20,
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
