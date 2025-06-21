
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const captionCache = {}; // { key: caption }

const generateFunnyCaption = async (tags = []) => {
  const tagKey = tags.sort().join(",");
  if (captionCache[tagKey]) return captionCache[tagKey];

  try {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
    });
    const prompt = `Generate a funny and witty meme caption for these tags: ${tags.join(", ")}, just answer in one string I will direclty paste it as response for my caption`;
    const result = await model.generateContent(prompt);
    const caption = result.response.text().trim();

    // Cache the result
    captionCache[tagKey] = caption;
    return caption;
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "YOLO to the moon!"; 
  }
};

export default generateFunnyCaption;