import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { deleteList, getList, isInList, setList } from "../Functions/ListData";
import { useNavigation } from "@react-navigation/native";

function Add({ id, title, img }) {
  const navigation = useNavigation();
  const [isAdded, setIsAdded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    checkList();
  }, []);

  async function checkList() {
    if (await isInList(id)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
    setIsLoading(false);
  }

  async function handleAdd() {
    setIsLoading(true);
    if (!isAdded) {
      await setList(title, id, img);
    } else if (await isInList(id)) {
      await deleteList(id);
    }
    checkList();
  }

  return (
    <>
      <Pressable
        style={{
          ...styles.container,
          backgroundColor: isLoading
            ? "white"
            : isAdded
            ? "#26eb6b"
            : "#eb2650",
        }}
        onPress={() => !isLoading && handleAdd()}
      >
        {isLoading ? (
          <ActivityIndicator size={30} color="black" />
        ) : isAdded ? (
          <AntDesign name="check" size={30} color="white" />
        ) : (
          <AntDesign name="plus" size={30} color="white" />
        )}
      </Pressable>
    </>
  );
}

export default Add;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "10%",
    zIndex: 999,
    right: 0,
    margin: 10,
    padding: 10,
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 0,
  },
});
