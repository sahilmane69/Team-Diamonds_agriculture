"use client";

import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

// Dummy chat history data
const dummyHistory = [
     { id: 1, title: "Corn Blight Issue" },
     { id: 2, title: "Weather Forecast" },
     { id: 3, title: "Soil pH Analysis" },
     { id: 4, title: "Fertilizer Schedule" },
];

export default function Dashboard() {
     const { user } = useUser();
     const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
     const [inputValue, setInputValue] = useState("");

     const handleSend = () => {
          if (!inputValue.trim()) return;

          // Add user message
          const newMessages = [...messages, { role: 'user' as const, content: inputValue }];
          setMessages(newMessages);
          setInputValue("");

          // Simulate AI response (dummy)
          setTimeout(() => {
               setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "This is a simulated AI response. In the real product, this would connect to an LLM."
               }]);
          }, 1000);
     };

     const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' && !e.shiftKey) {
               e.preventDefault();
               handleSend();
          }
     };

     return (
          <div className="flex h-screen bg-[#050605] text-white font-sans overflow-hidden">

               {/* Sidebar */}
               <aside className="w-64 bg-[#111] border-r border-[#222] hidden md:flex md:flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-[#222] flex items-center gap-3">
                         <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
                              <div className="w-4 h-4 bg-black/20" />
                         </div>
                         <span className="font-bold tracking-tight">FARM MINERALS</span>
                    </div>

                    {/* New Chat Button */}
                    <div className="p-4">
                         <button
                              onClick={() => setMessages([])}
                              className="w-full flex items-center gap-2 px-4 py-3 bg-[#222] hover:bg-[#333] transition-colors rounded-lg text-sm font-medium border border-[#333]"
                         >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              New Chat
                         </button>
                    </div>

                    {/* History List */}
                    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
                         <div className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              History
                         </div>
                         {dummyHistory.map((chat) => (
                              <button
                                   key={chat.id}
                                   className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#222] transition-colors truncate"
                              >
                                   {chat.title}
                              </button>
                         ))}
                    </div>

                    {/* User Profile (Bottom) */}
                    <div className="p-4 border-t border-[#222] flex items-center gap-3 bg-[#0a0a0a]">
                         <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-full border border-gray-600" } }} />
                         <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{user?.fullName || "User"}</p>
                              <p className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                         </div>
                    </div>
               </aside>

               {/* Main Content */}
               <main className="flex-1 flex flex-col min-w-0">

                    {/* Mobile Header */}
                    <header className="md:hidden flex items-center justify-between p-4 border-b border-[#222] bg-[#111]">
                         <span className="font-bold tracking-tight">FARM MINERALS</span>
                         <UserButton />
                    </header>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                         <div className="max-w-3xl mx-auto space-y-6">

                              {/* Empty State */}
                              {messages.length === 0 && (
                                   <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                                             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                             </svg>
                                        </div>
                                        <h2 className="text-3xl font-bold">Good morning, Farmer.</h2>
                                        <p className="text-gray-400 max-w-md">
                                             I can analyze your soil reports, identify crop diseases, or forecast weather impacts. How can I help today?
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pt-4">
                                             {["Check my soil pH", "Identify this pest", "Weather for planting", "Corn yield forecast"].map((prompt) => (
                                                  <button
                                                       key={prompt}
                                                       onClick={() => setInputValue(prompt)}
                                                       className="px-4 py-3 bg-[#1a1a1a] border border-[#333] hover:border-emerald-500/50 hover:bg-[#222] rounded-xl text-sm text-left transition-all"
                                                  >
                                                       {prompt}
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                              )}

                              {/* Messages */}
                              {messages.map((msg, idx) => (
                                   <div key={idx} className={`flex gap-4 ${msg.role === 'assistant' ? 'bg-transparent' : 'bg-transparent flex-row-reverse'}`}>

                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-emerald-500 text-black' : 'bg-[#333] text-white'}`}>
                                             {msg.role === 'assistant' ? (
                                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                  </svg>
                                             ) : (
                                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                  </svg>
                                             )}
                                        </div>

                                        {/* Content */}
                                        <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-base leading-relaxed ${msg.role === 'assistant' ? 'bg-[#1a1a1a] border border-[#333] text-gray-200' : 'bg-emerald-600 text-white'}`}>
                                             {msg.content}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-[#222] bg-[#050605]">
                         <div className="max-w-3xl mx-auto relative bg-[#1a1a1a] border border-[#333] focus-within:border-emerald-500/50 rounded-2xl transition-all shadow-lg">
                              <textarea
                                   value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}
                                   onKeyDown={handleKeyDown}
                                   placeholder="Ask anything about your farm..."
                                   className="w-full bg-transparent text-white p-4 pr-12 outline-none resize-none min-h-[60px] max-h-[200px]"
                                   rows={1}
                              />

                              <div className="flex items-center justify-between px-4 pb-3">
                                   <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-[#222] rounded-lg transition-colors" title="Upload Image">
                                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                             </svg>
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-[#222] rounded-lg transition-colors" title="Voice Input">
                                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                             </svg>
                                        </button>
                                   </div>

                                   <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className="p-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                   >
                                        <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                   </button>
                              </div>
                         </div>
                         <p className="text-center text-xs text-gray-600 mt-3">
                              AI can make mistakes. Verify important farming data.
                         </p>
                    </div>
               </main>
          </div>
     );
}
