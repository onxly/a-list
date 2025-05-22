import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Card from "../../components/Card";
import { SimpleLineIcons } from "@expo/vector-icons";
import GetData from "../../Functions/GetData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-paper";

function FeedScreen() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function checkCache() {
      try {
        let update = false;
        const cache = await AsyncStorage.getItem("Reviews");
        const time = await AsyncStorage.getItem("lastCheckedReviews");
        if (time) {
          update = new Date().getTime() - JSON.parse(time).time >= 3600000 * 24;
        }
        if ((cache !== null) & !update) {
          setData(JSON.parse(cache).reviews);
          setIsLoading(false);
        } else {
          const newData = await GetData();
          setData(newData.reviews);
          await AsyncStorage.setItem("Reviews", JSON.stringify(newData));
          await AsyncStorage.setItem(
            "lastCheckedReviews",
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

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={100} color="white" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 10 }}>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 23 }}>
          Reviews
        </Text>
      </View>
      <Divider />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.map((review) => {
          return (
            <Pressable
              key={
                review.object.mal_id + review.user.name + review.date.timestamp
              }
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <Card
                img={review.object.picture_url}
                title={review.object.title}
                badgeColor="yellow"
                badgeText={review.user.name}
                badgeTextColor={
                  review.tag === "Recommended"
                    ? "green"
                    : review.tag === "Mixed Feelings"
                    ? "purple"
                    : "red"
                }
                badgeIcon={
                  <SimpleLineIcons name="eyeglass" size={15} color="black" />
                }
                search={false}
                review={true}
                reviewData={review}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <View style={{ margin: 20 }} />
    </SafeAreaView>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    top: Platform.OS === "android" && StatusBar.currentHeight,
  },
});
