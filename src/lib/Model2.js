import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY_1;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateGeminiResponse(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return responseText;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return `Error: ${error.message}`;
  }
}
