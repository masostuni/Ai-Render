import { GoogleGenAI, Modality } from "@google/genai";

// FIX: Update function to accept an API key, removing reliance on process.env.
export const generateImage = async (
  apiKey: string,
  prompt: string,
  image: { data: string; mimeType: string }
): Promise<string | null> => {
  try {
    // FIX: Instantiate GoogleGenAI with the provided apiKey for each request.
    const ai = new GoogleGenAI({ apiKey });
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
    // FIX: Add specific error handling for invalid API keys.
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error('Your Gemini API key is not valid. Please check it and try again.');
    }
    throw new Error("Failed to generate the image. Please check the prompt or try a different image.");
  }
};
