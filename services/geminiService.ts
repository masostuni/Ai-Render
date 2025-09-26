import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (
  prompt: string,
  image: { data: string; mimeType: string }
): Promise<string | null> => {
  try {
    const model = 'gemini-2.5-flash-image-preview';

    const imagePart = {
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    };

    const textPart = {
      text: `Given the user's image, apply the following changes while preserving the original perspective and overall structure of the room. Changes: "${prompt}"`
    };
    
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate the image. Please check the prompt or try a different image.");
  }
};
