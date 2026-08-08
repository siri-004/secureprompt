import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const scanPrompt = async (prompt) => {
  const response = await API.post("/scan", {
    prompt: prompt,
  });

  return response.data;
};