import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function Card({
  id,
  img,
  title,
  badgeColor,
  badgeText,
  badgeIcon,
  cardWidth,
  badgeTextColor,
  search,
  profile,
  review,
  reviewData,
  reviewId,
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        ...styles.container,
        width: cardWidth || 130,
      }}
      onPress={() => {
        search
          ? navigation.navigate("Search Results", {
              searchQuery: title,
              oneResult: true,
            })
          : profile
          ? navigation.navigate("Anime Profile", { id: id })
          : review &&
            navigation.navigate("Review", { data: reviewData, idx: reviewId });
      }}
    >
      <View style={{ ...styles.badge, backgroundColor: badgeColor }}>
        {badgeIcon}
        <Text style={{ fontSize: 10, color: badgeTextColor }}>{badgeText}</Text>
      </View>
      <Image
        style={styles.img}
        resizeMode="stretch"
        width={cardWidth - 1 || 129}
        height={130}
        source={{
          uri: img,
        }}
      />
      <Divider style={{ width: "100%" }} />
      <View style={styles.info}>
        <Text style={styles.maintitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
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
    padding: 5,
  },
  badge: {
    flexDirection: "row",
    zIndex: 999,
    position: "absolute",
    left: 0,
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 5,
    borderWidth: 0.5,
    borderColor: "white",
    padding: 2,
    minWidth: 20,
    alignItems: "center",
    gap: 3,
  },
});
