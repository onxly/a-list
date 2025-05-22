import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Button, Dialog, Modal, Portal, Text } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { deleteList } from "../Functions/ListData";
import { useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";
import { Feather } from "@expo/vector-icons";

function ListItem({ id, img, title, refresh, loading }) {
  const navigation = useNavigation();
  const [modalVisisble, setModalVisible] = React.useState(false);
  const aRef = useRef();
  const [bColor, setBColor] = React.useState("white");
  const [watched, setWatched] = React.useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <SwipeableItem
      ref={aRef}
      renderUnderlayRight={() => (
        <View style={{ backgroundColor: "red" }}>
          <Text>Hello</Text>
        </View>
      )}
      activationThreshold={50}
      snapPointsRight={[50, 100, 150]}
      onChange={({ snapPoint }) => {
        if (snapPoint === 150) {
          showModal();
          aRef.current.close();
          setBColor("red");
        } else if (snapPoint === 100) {
          setWatched((prev) => !prev);
          aRef.current.close();
        } else {
          aRef.current.close();
        }
      }}
    >
      <Pressable
        style={{ ...styles.container, borderColor: bColor }}
        onPress={() => navigation.navigate("Anime Profile", { id: id })}
      >
        <Portal>
          <Dialog
            visible={modalVisisble}
            dismissable={false}
            style={styles.dialog}
          >
            <Dialog.Content
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text variant="bodyMedium" style={{ color: "white" }}>
                Remove
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  {" " + title + " "}
                </Text>
                from list?
              </Text>
              <EvilIcons name="trash" size={24} color="red" />
            </Dialog.Content>
            <Dialog.Actions style={{ gap: 20 }}>
              <Button
                textColor="white"
                onPress={() => {
                  hideModal();
                  setBColor("white");
                }}
              >
                NO
              </Button>
              <Button
                textColor="red"
                onPress={() => {
                  hideModal();
                  loading();
                  deleteList(id);
                  refresh();
                }}
              >
                YES
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Image
          source={{ uri: img }}
          height={50}
          width={50}
          resizeMode="stretch"
        />
        <View style={styles.title}>
          <View style={{ marginRight: "auto", width: 250 }}>
            <Text numberOfLines={2} style={{ color: "white", fontSize: 15 }}>
              {title}
            </Text>
          </View>
          <Feather
            name={watched ? "eye" : "eye-off"}
            size={24}
            color={watched ? "lime" : "gray"}
          />
        </View>
      </Pressable>
    </SwipeableItem>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    margin: 5,
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center",
    gap: 10,
  },
  title: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  dialog: {
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayLeft: {
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});
