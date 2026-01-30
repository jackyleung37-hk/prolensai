import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CameraSettings } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    iso: {
      type: Type.INTEGER,
      description: "Recommended ISO value (e.g., 100, 400, 1600).",
    },
    aperture: {
      type: Type.STRING,
      description: "Recommended Aperture value (e.g., f/1.8, f/8).",
    },
    shutterSpeed: {
      type: Type.STRING,
      description: "Recommended Shutter Speed (e.g., 1/100s, 2s).",
    },
    whiteBalance: {
      type: Type.STRING,
      description: "Recommended White Balance setting (e.g., Daylight, Tungsten, 5600K).",
    },
    focalLength: {
      type: Type.STRING,
      description: "Recommended Focal Length (e.g., 35mm, 85mm).",
    },
    explanation: {
      type: Type.STRING,
      description: "A short explanation in Traditional Chinese (Cantonese style) of why these settings were chosen based on lighting and subject.",
    },
    tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2-3 short photography tips in Traditional Chinese specific to this scene.",
    },
  },
  required: ["iso", "aperture", "shutterSpeed", "whiteBalance", "explanation", "tips"],
};

export const analyzeImageForSettings = async (base64Image: string): Promise<CameraSettings> => {
  try {
    const mimeType = "image/jpeg"; // Assuming JPEG from camera capture
    
    // Clean base64 string if it contains metadata header
    const cleanBase64 = base64Image.includes('base64,') 
      ? base64Image.split('base64,')[1] 
      : base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: "Analyze this image as a professional photographer. Suggest the optimal camera settings (ISO, Aperture, Shutter Speed, etc.) if I were to take this shot with a professional DSLR or Mirrorless camera to achieve the best quality. Provide the response in Traditional Chinese (Hong Kong/Cantonese style).",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a world-class photography instructor. Analyze scenes for lighting conditions, subject movement, and depth of field requirements. Provide practical, professional advice."
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from Gemini");
    }

    const settings = JSON.parse(jsonText) as CameraSettings;
    return settings;

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
