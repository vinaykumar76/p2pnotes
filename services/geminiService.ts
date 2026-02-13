
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateNoteSummary(title: string, description: string, subject: string) {
  try {
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
