import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ListItem from "../../components/ListItem";
import { getList } from "../../Functions/ListData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

function MyListScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  async function readList() {
    try {
      const ListObj = await getList();
      setData(ListObj.list);
      if (ListObj.list.length > 1) {
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    readList();
  });

  function refresh() {
    readList();
  }

  function handleLoad() {
    setIsLoading(true);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        {isLoading && (
          <View style={{ top: 0, margin: 10, left: 0 }}>
            <ActivityIndicator color="cyan" size={40} />
          </View>
        )}
        {data.length <= 1 ? (
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
              Nothing to see here...
            </Text>
            <MaterialCommunityIcons
              name="robot-confused-outline"
              size={30}
              color="white"
            />
          </View>
        ) : (
          data.map((anime, idx) => {
            if (idx === 0) {
              return;
            }
            return (
              <ListItem
                key={anime.id + idx}
                id={anime.id}
                title={anime.title}
                img={anime.img}
                refresh={refresh}
                loading={handleLoad}
              />
            );
          })
        )}
        <View style={{ margin: 30 }} />
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default MyListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    top: Platform.OS === "android" && StatusBar.currentHeight,
  },
});
