import axios from "axios";
import Constants from "expo-constants";

export default async function FetchData() {
  const { API_KEY } = Constants.expoConfig?.extra || Constants.expoConfig;

  const options = {
    method: "GET",
    url: "https://myanimelist.p.rapidapi.com/anime/top/all",
    params: { p: "1" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "myanimelist.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
