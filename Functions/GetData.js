import axios from "axios";
import Constants from "expo-constants";

export default async function GetData() {
  const {
    GET_REVIEWS_API_KEY,
    GET_REVIEWS_API_URL,
    GET_REVIEWS_RAPID_API_URL,
  } = Constants.expoConfig?.extra || Constants.expoConfig;

  const options = {
    method: "GET",
    url: "https://myanimelist.p.rapidapi.com/v2/anime/reviews",
    params: { p: "1" },
    headers: {
      "X-RapidAPI-Key": GET_REVIEWS_API_KEY,
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
