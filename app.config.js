import "dotenv/config";

export default {
  expo: {
    name: "a-list",
    slug: "a-list",
    version: "1.0.0",
    extra: {
      API_KEY: process.env.API_KEY,
    },
  },
};
