"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
     const { register } = useAuth();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [name, setName] = useState("");
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError("");
          setLoading(true);

          try {
               await register({ email, password, name });
          } catch (err: any) {
               setError(err.message || "Registration failed");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-[#050605] text-white flex items-center justify-center p-4">
               <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                              Create Account
                         </h1>
                         <p className="text-gray-400 mt-2">Join KrishiMitraAI today</p>
                    </div>

                    {error && (
                         <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
                              {error}
                         </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                              <input
                                   type="text"
                                   required
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder-gray-500"
                                   placeholder="Ram Kumar"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                              <input
                                   type="email"
                                   required
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder-gray-500"
                                   placeholder="farmer@example.com"
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                              <input
                                   type="password"
                                   required
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder-gray-500"
                                   placeholder="••••••••"
                              />
                         </div>

                         <button
                              type="submit"
                              disabled={loading}
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-2"
                         >
                              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
                         </button>
                    </form>

                    <p className="text-center text-gray-400 text-sm mt-6">
                         Already have an account?{" "}
                         <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                              Log In
                         </Link>
                    </p>
               </div>
          </div>
     );
}
