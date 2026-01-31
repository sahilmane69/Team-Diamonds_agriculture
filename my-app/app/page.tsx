"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import { SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";

const FarmScene = dynamic(() => import("@/components/FarmScene"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#050605] text-white selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center relative overflow-hidden pt-24 pb-12">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_30%_10%,rgba(255,255,255,0)_10%,rgba(121,116,134,1)_100%)]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 z-10 flex flex-col items-center">
          {/* Headline */}
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#ffffff_0%,#a8a8a8_50%,#666666_100%)] drop-shadow-sm">
                Intelligent Farm Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Simply ask questions about your crops, soil, or weather using text, voice, or images.
              <span className="text-white"> Krishi Mitra Ai</span> gives you instant, expert guidance.
            </p>
          </div>

          {/* 3D Scene Interactions Container */}
          <div className="w-full relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">

            {/* Center 3D Model */}
            <div className="absolute inset-0 z-10">
              <FarmScene />
            </div>

            {/* Left Features */}
            <div className="hidden md:flex flex-col gap-8 absolute left-0 top-1/2 -translate-y-1/2 z-20 w-80">
              <FeatureCard
                title="Weather Analysis"
                desc="Real-time hyperlocal forecasts and planting windows."
                icon="cloud"
                align="left"
              />
              <FeatureCard
                title="Soil Health"
                desc="Instant analysis of soil reports and nutrient recommendations."
                icon="leaf"
                align="left"
              />
            </div>

            {/* Right Features */}
            <div className="hidden md:flex flex-col gap-8 absolute right-0 top-1/2 -translate-y-1/2 z-20 w-80">
              <FeatureCard
                title="Crop Disease"
                desc="Upload photos to identify pests and diseases instantly."
                icon="scan"
                align="right"
              />
              <FeatureCard
                title="Voice Expert"
                desc="Talk to your assistant naturally in your local language."
                icon="mic"
                align="right"
              />
            </div>

            {/* Mobile Features List */}
            <div className="md:hidden absolute -bottom-10 grid grid-cols-2 gap-4 w-full">
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-emerald-400 font-bold mb-1">Weather</div>
                <div className="text-xs text-gray-400">Hyperlocal Forecasts</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-emerald-400 font-bold mb-1">Disease</div>
                <div className="text-xs text-gray-400">Visual Diagnosis</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 md:mt-12 flex flex-col items-center gap-6 z-30">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Start Your Journey
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <button className="px-8 py-4 bg-emerald-500 text-black text-lg font-bold rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:scale-105">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
            <p className="text-sm text-gray-500">No credit card required • Free for farmers</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black/80 backdrop-blur-xl border-t border-white/10 py-12 px-6 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Krishi Mitra Ai</h2>
            <p className="text-gray-500 text-sm max-w-xs">Empowering farmers with cutting-edge artificial intelligence.</p>
          </div>

          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">Contact</Link>
          </div>

          <div className="text-xs text-gray-600">
            © {new Date().getFullYear()} Krishi Mitra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon, align }: { title: string, desc: string, icon: string, align: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} group`}>
      <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50 transition-colors duration-300`}>
        {icon === 'cloud' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
        {icon === 'leaf' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        {icon === 'scan' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        {icon === 'mic' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}
      </div>
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  )
}