import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
     throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Global cached connection
let cached = (global as any).mongoose;

if (!cached) {
     cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
     if (cached.conn) {
          return cached.conn;
     }

     if (!cached.promise) {
          const opts = {
               bufferCommands: false,
          };

          cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
               return mongoose;
          });
     }
     cached.conn = await cached.promise;
     return cached.conn;
}

// --- Schemas ---

const UserSchema = new mongoose.Schema({
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     name: String,

     // Profile Data
     cropInterest: String, // Stored as JSON string or plain text
     soilType: String,
     budget: String,
     area: String,
     location: String,
     weather: String,
     onboardingCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
     role: String, // "user" | "ai"
     content: String,
     type: { type: String, default: 'text' }, // "text" | "image" | "voice"
     timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema({
     userId: String,
     messages: [MessageSchema],
     timestamp: { type: Date, default: Date.now },
});

const CVResultSchema = new mongoose.Schema({
     userId: String,
     imageUrl: String,
     disease: String,
     confidence: Number,
     aiExplanation: String,
     symptoms: [String],
     timestamp: { type: Date, default: Date.now },
});

// --- Models ---
// Use `mongoose.models` to prevent overwriting models during hot reload
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
export const CVResult = mongoose.models.CVResult || mongoose.model('CVResult', CVResultSchema);

// --- Helpers ---

export async function saveConversation({
     userContext,
     input,
     output,
}: {
     userContext?: any;
     input: string | any;
     output: string;
}) {
     await dbConnect();

     try {
          const userId = userContext?.uid || 'anonymous';
          const inputIsImage = typeof input !== 'string';

          const messages = [
               {
                    role: "user",
                    content: inputIsImage ? "Analyzed Image" : input,
                    type: inputIsImage ? "image" : "text",
               },
               {
                    role: "ai",
                    content: output,
                    type: "text"
               }
          ];

          const conversation = await Conversation.create({
               userId,
               messages
          });

          if (inputIsImage && input.disease) {
               await CVResult.create({
                    userId,
                    disease: input.disease,
                    confidence: input.confidence,
                    symptoms: input.symptoms,
                    aiExplanation: output,
               });
          }

          return conversation;

     } catch (error) {
          console.error("Error saving to MongoDB:", error);
     }
}
