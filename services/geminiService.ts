
import { GoogleGenAI, Type } from "@google/genai";

// We use a function to initialize to ensure process.env is available
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Check your environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export async function generateNoteSummary(title: string, description: string, subject: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a concise 3-point summary or key learning outcomes for a set of study notes titled "${title}" on the subject "${subject}". 
      Description: ${description}. 
      Format as a professional academic highlight.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 key takeaways from the notes'
            }
          },
          required: ['highlights']
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini summary error:", error);
    return { highlights: ["Comprehensive coverage of topic", "Exam-focused insights", "Clear structural flow"] };
  }
}
