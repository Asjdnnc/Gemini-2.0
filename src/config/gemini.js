import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// NEVER expose API keys in frontend code! Use environment variables instead.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenerativeAI("AIzaSyAEsfaj0TX-mZCHHJFF8L5OPUObT4UH0y0");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runchat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt); // Fixed incorrect string usage
  const response = await result.response.text();
  console.log(response);
  return response;
}

export default runchat;
