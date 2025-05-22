import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getList() {
  try {
    const list = await AsyncStorage.getItem("AList");
    if (list) {
      return JSON.parse(list);
    } else {
      const empty = { list: [{}], watched: [{}], favourites: [{}] };
      await AsyncStorage.setItem("AList", JSON.stringify(empty));
      return empty;
    }
  } catch (e) {
    console.error("Failed to get list [" + e + "]");
  }
}

export async function setList(title, id, img, location = "list") {
  try {
    let oldListObj = await getList();
    const anime = { title: title, id: id, img: img };
    location === "list"
      ? oldListObj.list.push(anime)
      : location === "watched"
      ? oldListObj.watched.push({ id: id })
      : oldListObj.favourites.push({ id: id });
    await AsyncStorage.setItem("AList", JSON.stringify(oldListObj));
  } catch (e) {
    console.error("Failed to set item in list with id: " + id + " [" + e + "]");
  }
}

export async function isInList(id) {
  try {
    const listObj = await getList();
    const listArr = listObj.list;
    const result = listArr.some((obj) => obj.id === id);
    return result;
  } catch (e) {
    console.error(
      "Failed to check if item is in list with id: " + id + " [" + e + "]"
    );
  }
}

export async function updateList(listObj) {
  try {
    AsyncStorage.setItem("AList", JSON.stringify(listObj));
  } catch (e) {
    console.error("Failed to update list [" + e + "]");
  }
}

export async function deleteList(id) {
  try {
    if (isInList(id)) {
      let listObj = await getList();
      const listArr = listObj.list;
      listObj.list = listArr.filter((obj) => obj.id !== id);
      await updateList(listObj);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(
      "Failed to delete item in list with id: " + id + " [" + e + "]"
    );
  }
}
