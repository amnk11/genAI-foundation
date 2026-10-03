import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.BASE_URL;

export const apiKeyChecker = () => {
  if (!API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    process.exit(1);
  }
  return true;
};

export const checkOpenAI = async () => {
  const openai = (await import("openai")).default;
  const client = new openai({
    apiKey: API_KEY,
    baseURL: BASE_URL
  });

  if (!client) {
    console.error("Failed to create OpenAI client");
    process.exit(1);
  }
  console.log("OpenAI client created successfully");
  return client;
};
