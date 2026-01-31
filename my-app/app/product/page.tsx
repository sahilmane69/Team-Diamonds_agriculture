"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, Image as ImageIcon, Loader2, Leaf, AlertCircle } from "lucide-react";

// Mock CV Analysis function (Simulating the Vision Agent for Demo)
// In a real app, this would send the image to a Python backend/TF.js model
const simulateCVAnalysis = async (imageDataUrl: string) => {
     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

     // Randomly select a "detected" issue for demo variety, or fixed for consistency
     const scenarios = [
          {
               disease: "Nitrogen Deficiency",
               confidence: 0.87,
               symptoms: ["Yellowing of older leaves (chlorosis)", "Stunted growth", "V-shaped yellowing at leaf tips"]
          },
          {
               disease: "Leaf Rust",
               confidence: 0.92,
               symptoms: ["Orange-brown pustules on leaves", "Dusty spores", "Reduced photosynthetic area"]
          },
          {
               disease: "Healthy Crop",
               confidence: 0.98,
               symptoms: ["Vibrant green color", "Uniform growth", "No visible necrotic spots"]
          }
     ];

     return scenarios[0]; // Default to Nitrogen Deficiency as per prompt example
};

interface Message {
     id: string;
     role: "user" | "ai";
     content: string;
     type: "text" | "image" | "cv_result";
     cvData?: any;
}

export default function AgenticChatPage() {
     const [messages, setMessages] = useState<Message[]>([
          {
               id: "1",
               role: "ai",
               content: "Hello! I am KrishiMitraAI. I can analyze crop images or answer your farming questions. Upload a photo to start!",
               type: "text"
          }
     ]);
     const [input, setInput] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [cvScanning, setCvScanning] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);
     const scrollRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          if (scrollRef.current) {
               scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
     }, [messages]);

     const handleSend = async () => {
          if (!input.trim()) return;

          const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, type: "text" };
          setMessages((prev) => [...prev, userMsg]);
          setInput("");
          setIsLoading(true);

          try {
               const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                         message: input,
                         userContext: { uid: "demo-user", name: "Farmer" } // Mock context
                    }),
               });

               const data = await res.json();

               const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "ai",
                    content: data.reply || "Sorry, I couldn't process that.",
                    type: "text"
               };
               setMessages((prev) => [...prev, aiMsg]);
          } catch (error) {
               console.error("Chat Error:", error);
               const errorMsg: Message = { id: Date.now().toString(), role: "ai", content: "Error connecting to AI agent.", type: "text" };
               setMessages((prev) => [...prev, errorMsg]);
          } finally {
               setIsLoading(false);
          }
     };

     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = async (event) => {
               const imageUrl = event.target?.result as string;

               // 1. Show User Image
               const imgMsg: Message = {
                    id: Date.now().toString(),
                    role: "user",
                    content: "Analyzed this crop image.",
                    type: "image",
                    cvData: { imageUrl }
               };
               setMessages((prev) => [...prev, imgMsg]);

               // 2. Simulate Vision Agent Scanning
               setCvScanning(true);
               try {
                    const cvResult = await simulateCVAnalysis(imageUrl);
                    setCvScanning(false);

                    // 3. Send CV Result to Orchestrator
                    setIsLoading(true); // Agent thinking

                    const res = await fetch("/api/chat", {
                         method: "POST",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({
                              imageCVResult: cvResult,
                              userContext: { uid: "demo-user", name: "Farmer" }
                         }),
                    });

                    const data = await res.json();

                    // 4. Show AI Reasoning Response
                    const aiMsg: Message = {
                         id: Date.now().toString(),
                         role: "ai",
                         content: data.reply,
                         type: "cv_result",
                         cvData: cvResult
                    };
                    setMessages((prev) => [...prev, aiMsg]);

               } catch (error) {
                    console.error("CV/Agent Error:", error);
                    setCvScanning(false);
                    setIsLoading(false);
               } finally {
                    setIsLoading(false);
               }
          };
          reader.readAsDataURL(file);
          if (fileInputRef.current) fileInputRef.current.value = "";
     };

     return (
          <div className="flex flex-col h-screen bg-[#050605] text-white font-sans">

               {/* Header */}
               <header className="px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                              <Leaf className="w-6 h-6 text-white" />
                         </div>
                         <div>
                              <h1 className="font-bold text-xl tracking-tight">KrishiMitra<span className="text-emerald-400">AI</span></h1>
                              <p className="text-xs text-gray-400">Agentic Agricultural Assistant</p>
                         </div>
                    </div>
               </header>

               {/* Chat Area */}
               <main className="flex-1 overflow-y-auto pt-24 pb-24 px-4 md:px-0">
                    <div className="max-w-3xl mx-auto space-y-6" ref={scrollRef}>
                         {messages.map((msg) => (
                              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                   <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 md:p-6 ${msg.role === 'user'
                                             ? 'bg-emerald-600 text-white rounded-tr-none'
                                             : 'bg-white/10 border border-white/10 text-gray-100 rounded-tl-none'
                                        }`}>

                                        {/* Image Display */}
                                        {msg.type === 'image' && msg.cvData?.imageUrl && (
                                             <div className="mb-4 rounded-xl overflow-hidden border border-white/20">
                                                  <Image
                                                       src={msg.cvData.imageUrl}
                                                       alt="Uploaded Crop"
                                                       width={400}
                                                       height={300}
                                                       className="w-full h-auto object-cover"
                                                  />
                                             </div>
                                        )}

                                        {/* Text Content / Markdown-ish */}
                                        <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                                             {msg.content}
                                        </div>

                                        {/* CV Result Simulation Display (Inside AI Response for context) */}
                                        {msg.type === 'cv_result' && msg.cvData && (
                                             <div className="mt-4 p-3 bg-black/30 rounded-lg border border-emerald-500/30 text-xs font-mono">
                                                  <div className="flex items-center gap-2 mb-1 text-emerald-400 font-bold uppercase tracking-wider">
                                                       <AlertCircle className="w-3 h-3" /> Vision Agent Detected:
                                                  </div>
                                                  <div className="grid grid-cols-2 gap-2">
                                                       <div>Disease: <span className="text-white">{msg.cvData.disease}</span></div>
                                                       <div>Confidence: <span className="text-white">{(msg.cvData.confidence * 100).toFixed(0)}%</span></div>
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         ))}

                         {cvScanning && (
                              <div className="flex justify-start">
                                   <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                                        <span className="text-sm text-emerald-400 animate-pulse">Vision Agent Analyzing...</span>
                                   </div>
                              </div>
                         )}

                         {isLoading && !cvScanning && (
                              <div className="flex justify-start">
                                   <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                                        <div className="flex space-x-1">
                                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                                        </div>
                                        <span className="text-xs text-gray-500">Reasoning...</span>
                                   </div>
                              </div>
                         )}
                    </div>
               </main>

               {/* Input Area */}
               <footer className="fixed bottom-0 w-full p-4 bg-black/80 backdrop-blur-xl border-t border-white/10">
                    <div className="max-w-3xl mx-auto flex items-center gap-3">
                         <button
                              onClick={() => fileInputRef.current?.click()}
                              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-emerald-400 border border-white/10"
                         >
                              <ImageIcon className="w-6 h-6" />
                         </button>
                         <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageUpload}
                         />

                         <div className="flex-1 relative">
                              <input
                                   type="text"
                                   value={input}
                                   onChange={(e) => setInput(e.target.value)}
                                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                   placeholder="Ask about crops, fertilizers, or upload a photo..."
                                   className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                              />
                              <button
                                   onClick={handleSend}
                                   disabled={!input.trim() && !isLoading}
                                   className="absolute right-2 top-1.5 p-2 bg-emerald-500 rounded-full text-black hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all font-bold"
                              >
                                   <Send className="w-5 h-5" />
                              </button>
                         </div>
                    </div>
               </footer>
          </div>
     );
}
