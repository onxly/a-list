import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Chip, Divider, Portal, Modal } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import FetchData from "../../Functions/FetchData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card";

function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isInputFocused, setIsInputFocused] = React.useState(false);
  const inputRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function checkCache() {
      try {
        let update = true;
        const cache = await AsyncStorage.getItem("Trending");
        const time = await AsyncStorage.getItem("lastCheckedTrending");
        if (time) {
          update = new Date().getTime() - JSON.parse(time).time >= 3600000 * 24;
        }
        if ((JSON.parse(cache) !== null) & !update) {
          setData(JSON.parse(cache));
          setIsLoading(false);
        } else {
          const newData = await FetchData();
          setData(newData);
          await AsyncStorage.setItem("Trending", JSON.stringify(newData));
          await AsyncStorage.setItem(
            "lastCheckedTrending",
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
      <Pressable
        style={styles.searchbar}
        onPress={() => inputRef.current.focus()}
      >
        <Feather name="search" size={24} color="white" />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor="#909190"
          selectionColor="rgba(255,255,255,0.5)"
          cursorColor="white"
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onSubmitEditing={() =>
            navigation.navigate("Search Results", { searchQuery: searchQuery })
          }
        />
        <TouchableOpacity
          style={styles.highlight}
          onPress={() => isInputFocused && inputRef.current.clear()}
        >
          {isInputFocused && (
            <MaterialIcons name="clear" size={24} color="white" />
          )}
        </TouchableOpacity>
      </Pressable>
      <Divider />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Top Animes</Text>
        <Feather name="trending-up" size={24} color="lime" />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
        style={{ flex: 1 }}
        onPress={() => inputRef.current.blur()}
      >
        {isLoading ? (
          <ActivityIndicator size={50} color="white" />
        ) : (
          data.map((anime, idx) => {
            return (
              <Pressable
                key={anime.title + idx}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Card
                  img={anime.picture_url}
                  title={anime.title}
                  badgeColor="#348feb"
                  badgeIcon={
                    <EvilIcons name="search" size={20} color="white" />
                  }
                  search={true}
                />
              </Pressable>
            );
          })
        )}
        <View style={{ margin: 45 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    top: Platform.OS === "android" && StatusBar.currentHeight,
  },
  searchbar: {
    flexDirection: "row",
    backgroundColor: "#454545",
    margin: 10,
    padding: 8,
    borderRadius: 15,
    color: "white",
    gap: 10,
  },
  input: {
    width: 250,
    color: "white",
    marginRight: "auto",
  },
  highlight: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginRight: 10,
  },
});
