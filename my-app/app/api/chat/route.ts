import { NextResponse } from "next/server";
import { runGroq } from "@/lib/groq";
import { visionPrompt } from "@/lib/visionPrompt";
import { saveConversation } from "@/lib/db";

const SYSTEM_PROMPT = `
You are KrishiMitraAI, a powerful agentic agricultural assistant.

You can:
- Reason over text, voice, and image analysis
- Explain causes of crop problems
- Suggest crops, fertilizers, irrigation, and budgets
- Estimate costs and risks
- Ask follow-up questions when needed

You must:
- Explain WHY before suggesting WHAT
- Adapt advice to farmer context
- Be practical and clear

You are allowed to answer ANY agriculture-related question.
`;

export async function POST(req: Request) {
     try {
          const body = await req.json();
          const { message, imageCVResult, userContext } = body;

          let messages = [
               { role: "system", content: SYSTEM_PROMPT },
          ];

          if (imageCVResult) {
               // It's a vision task
               messages.push({
                    role: "user",
                    content: visionPrompt(imageCVResult),
               });
          } else if (message) {
               // It's a text task
               messages.push({
                    role: "user",
                    content: message,
               });
          } else {
               return NextResponse.json({ error: "No input provided" }, { status: 400 });
          }

          const aiResponse = await runGroq(messages);

          // Save to DB (Fire and forget, or await)
          await saveConversation({
               userContext,
               input: imageCVResult || message,
               output: aiResponse,
          });

          return NextResponse.json({ reply: aiResponse });
     } catch (error: any) {
          console.error("Orchestrator Error:", error);
          return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
     }
}
