import Groq from "groq-sdk";

export const groq = new Groq({
     apiKey: process.env.GROQ_API_KEY || "missing-key",
});

export async function runGroq(messages: any[]) {
     if (!process.env.GROQ_API_KEY) {
          return "Error: GROQ_API_KEY is missing in environment variables.";
     }

     try {
          const completion = await groq.chat.completions.create({
               model: "llama-3.3-70b-versatile",
               messages,
               temperature: 0.4,
          });

          return completion.choices[0].message.content || "I couldn't generate a response.";
     } catch (error: any) {
          console.error("Groq API Error:", error);
          return `Error interacting with AI: ${error.message}`;
     }
}
