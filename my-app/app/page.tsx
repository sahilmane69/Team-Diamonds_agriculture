"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#050605] text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,200,100,0.1),transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            Your Personal <br />
            <span className="text-emerald-500">AI Farming Assistant</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Get instant answers about your soil, crops, and weather.
            Simple, reliable guidance powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-8 py-4 bg-emerald-500 text-black text-lg font-bold rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:scale-105">
                  Start Chatting
                </button>
              </SignUpButton>
              <Link href="/sign-in" className="text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline">
                Already have an account? Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard">
                <button className="px-8 py-4 bg-emerald-500 text-black text-lg font-bold rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:scale-105">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-600 text-sm z-10">
        © {new Date().getFullYear()} Farm Minerals. AI-First Agriculture.
      </footer>
    </div>
  );
}