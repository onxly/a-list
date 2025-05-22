import axios from "axios";
import Constants from "expo-constants";

export default async function GetById(id) {
  const { API_KEY } = Constants.expoConfig?.extra || Constants.expoConfig;

  const options = {
    method: "GET",
    url: "https://myanimelist.p.rapidapi.com/anime/" + id.toString(),
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
