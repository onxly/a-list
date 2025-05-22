import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Card from "../components/Card";
import GetById from "../Functions/GetById";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Add from "../components/Add";

function AnimeProfile({ route }) {
  const { id } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    async function checkCache() {
      try {
        let update = true;
        const cache = await AsyncStorage.getItem(id.toString());
        const time = await AsyncStorage.getItem(
          "lastCheckedSearchId" + id.toString()
        );
        if (time) {
          update = new Date().getTime() - JSON.parse(time).time >= 3600000 * 24;
        }
        if ((cache !== null) & !update) {
          setData(JSON.parse(cache));
          setIsLoading(false);
        } else {
          const newData = await GetById(id);
          setData(newData);
          await AsyncStorage.setItem(id.toString(), JSON.stringify(newData));
          await AsyncStorage.setItem(
            "lastCheckedSearchId" + id.toString(),
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
        <ActivityIndicator size={80} color="white" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Add
        id={id}
        title={data.title_en || data.title_ov}
        img={data.picture_url}
      />
      <View style={styles.header}>
        <Image
          style={styles.img}
          source={{ uri: data.picture_url }}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <View style={styles.title}>
            <Text style={{ ...styles.text, fontSize: 14 }}>
              {data.title_en}
            </Text>
            <Text
              style={{
                ...styles.text,
                fontSize: 14,
                fontStyle: "italic",
                fontWeight: "300",
              }}
            >
              {" (" + data.title_ov + ")"}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              ...styles.text,
            }}
          >
            {data.alternative_titles.japanese ||
              data.alternative_titles.synonyms ||
              ""}
          </Text>
          <Text style={{ ...styles.text }}>
            {data.information.genres.map((genre, idx) => {
              if (data.information.genres.length - 1 === idx) {
                return genre.name;
              }
              return genre.name + " | ";
            })}
          </Text>
          <Text style={{ ...styles.text }}>
            Status:{" " + data.information.status}
          </Text>
          <Text style={{ ...styles.text }}>{data.information.aired}</Text>
          <Text style={{ ...styles.text }}>{data.information.rating}</Text>
          <Text style={{ ...styles.text }}>{data.information.duration}</Text>
          <View style={styles.chips}>
            <Text style={{ ...styles.chip, backgroundColor: "yellow" }}>
              {"Ranking: " + data.statistics.ranked}
            </Text>
            {data.information.type.map((item, idx) => {
              return (
                <Text
                  key={idx}
                  style={{
                    ...styles.chip,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  {item.name}
                </Text>
              );
            })}
            <Text
              style={{
                ...styles.chip,
                backgroundColor: "purple",
                color: "white",
              }}
            >
              {"EPs: " + data.information.episodes}
            </Text>
            <Text
              style={{
                ...styles.chip,
                backgroundColor: "cyan",
              }}
            >
              {"Score: " + data.statistics.score}
            </Text>
            {data.information.studios.map((item, idx) => {
              return (
                <Text
                  key={idx}
                  style={{
                    ...styles.chip,
                    backgroundColor: "#e834eb",
                    color: "white",
                  }}
                >
                  {item.name}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text
          style={{
            ...styles.text,
            fontSize: 20,
            fontWeight: "400",
            alignSelf: "center",
          }}
        >
          Synopsis
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 13,
            fontWeight: "300",
            alignSelf: "center",
            fontStyle: "italic",
          }}
        >
          {data.synopsis}
        </Text>
        <Text
          style={{
            ...styles.text,
            fontSize: 20,
            fontWeight: "400",
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          {data.characters.length > 0 && "Characters"}
        </Text>
        <ScrollView horizontal={true} contentContainerStyle={styles.characters}>
          {data.characters.map((char, idx) => {
            return (
              <Card
                key={idx}
                img={char.picture_url}
                title={char.name}
                cardWidth={85}
              />
            );
          })}
          <View style={{ margin: 30 }} />
        </ScrollView>
        <View style={{ margin: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AnimeProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    top: Platform.OS === "android" && StatusBar.currentHeight,
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
    marginTop: "auto",
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
    padding: 10,
  },
  characters: {
    marginBottom: "auto",
  },
});
