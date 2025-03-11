import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY_2;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateGeminiResponse(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  
      console.log("Raw Response:", responseText); // Debugging output
  
      // Ensure response contains valid JSON
      const jsonMatch = responseText.match(/\[.*\]/s);
      if (!jsonMatch) throw new Error("Invalid JSON response from API");
  
      return jsonMatch[0]; // Return only JSON
    } catch (error) {
      console.error("Gemini API Error:", error.message);
      return `{"error": "${error.message}"}`;
    }
  }
  
