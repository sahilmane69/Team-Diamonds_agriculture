// import { prisma } from "@/lib/prisma"; // Removed Prisma

export async function saveConversation({
     userContext,
     input,
     output,
}: {
     userContext?: any;
     input: string | any;
     output: string;
}) {
     try {
          // console.log("Saving conversation (Mock DB):", { userContext, input, output });
          // Prisma persistence removed as per user request.
          // In a real app, you would save to MongoDB or PostgreSQL here.
          return { id: "mock-id", success: true };

     } catch (error) {
          console.error("Error saving conversation:", error);
     }
}
