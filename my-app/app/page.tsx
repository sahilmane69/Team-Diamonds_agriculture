"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import AudioTape from "@/components/AudioTape";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FarmScene = dynamic(() => import("@/components/FarmScene"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    // Initial Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Hero Text Stagger
    tl.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
    })
      // 3D Scene Fade In
      .from(".farm-scene-container", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
      }, "-=0.5")
      // Features Stagger from sides
      .from(".feature-card-left", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, "-=0.8")
      .from(".feature-card-right", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      }, "-=0.8")
      // CTA & Audio Tape Fade Up
      .from([".cta-container", ".audio-tape-section"], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      }, "-=0.4");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen font-sans flex flex-col bg-[#050605] text-white selection:bg-emerald-500 selection:text-white">
      <CustomCursor />
      <Navbar />

      <main className="flex-1 flex flex-col items-center relative overflow-hidden pt-24 pb-12">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,rgba(0,0,0,0)_40%,rgba(13,110,87,1)_100%)]" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 z-10 flex flex-col items-center">
          {/* Headline */}
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-12">
            <h1 className="hero-text text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#ffffff_0%,#a8a8a8_50%,#666666_100%)] drop-shadow-sm">
                Intelligent Farm Assistant
              </span>
            </h1>
            <p className="hero-text text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Simply ask questions about your crops, soil, or weather using text, voice, or images.
              <span className="text-white"> Krishi Mitra Ai</span> gives you instant, expert guidance.
            </p>
          </div>

          {/* 3D Scene Interactions Container */}
          <div className="farm-scene-container w-full relative min-h-[500px] md:min-h-[600px] flex items-center justify-center">

            {/* Center 3D Model */}
            <div className="absolute inset-0 z-10">
              <FarmScene />
            </div>

            {/* Left Features */}
            <div className="hidden md:flex flex-col gap-8 absolute left-0 top-1/2 -translate-y-1/2 z-20 w-80">
              <div className="feature-card-left">
                <FeatureCard
                  title="Weather Analysis"
                  desc="Real-time hyperlocal forecasts and planting windows."
                  icon="cloud"
                  align="left"
                />
              </div>
              <div className="feature-card-left">
                <FeatureCard
                  title="Soil Health"
                  desc="Instant analysis of soil reports and nutrient recommendations."
                  icon="leaf"
                  align="left"
                />
              </div>
            </div>

            {/* Right Features */}
            <div className="hidden md:flex flex-col gap-8 absolute right-0 top-1/2 -translate-y-1/2 z-20 w-80">
              <div className="feature-card-right">
                <FeatureCard
                  title="Crop Disease"
                  desc="Upload photos to identify pests and diseases instantly."
                  icon="scan"
                  align="right"
                />
              </div>
              <div className="feature-card-right">
                <FeatureCard
                  title="Voice Expert"
                  desc="Talk to your assistant naturally in your local language."
                  icon="mic"
                  align="right"
                />
              </div>
            </div>

            {/* Mobile Features List (Simple Fade In) */}
            <div className="md:hidden absolute -bottom-10 grid grid-cols-2 gap-4 w-full hero-text">
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
          <div className="cta-container mt-20 md:mt-12 flex flex-col items-center gap-6 z-30">
            <Link href="/dashboard">
              <UserCtaButton>
                Start Your Journey
              </UserCtaButton>
            </Link>
            <p className="text-sm text-gray-500">No credit card required • Free for farmers</p>
          </div>

          {/* Audio Tape Section */}
          <div className="audio-tape-section w-full">
            <AudioTape />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden flex flex-col z-20 pt-10 pb-0">

        <div className="w-full max-w-7xl mx-auto px-6 relative z-30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            {/* Links */}
            <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Contact</Link>
            </div>
            <p className="text-gray-500 text-[10px]">Empowering farmers with cutting-edge artificial intelligence.</p>
            <div className="text-[10px] text-gray-600">
              © {new Date().getFullYear()} Krishi Mitra. All rights reserved.
            </div>
          </div>
        </div>

        {/* Giant Brand Text */}
        <div className="w-full flex justify-center mt-auto relative z-10 pointer-events-none select-none -mb-8 md:-mb-12">
          <h2 className="text-[13vw] font-black text-transparent bg-clip-text bg-linear-to-b from-white/20 to-white/0 leading-none tracking-tighter text-center">
            Krishi Mitra Ai
          </h2>
        </div>

        {/* Grass Image Overlay */}
        <div className="w-full relative z-20 -mt-[6vw] md:-mt-[8vw] pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/grass_overlay.png"
            alt="Grass Overlay"
            className="w-full h-auto object-cover max-h-[30vh]"
          />
        </div>
      </footer>
    </div>
  );
}

// Premium GSAP Hover Card
function FeatureCard({ title, desc, icon, align }: { title: string, desc: string, icon: string, align: 'left' | 'right' }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    gsap.to(".feature-icon", { y: -5, borderColor: "rgba(52, 211, 153, 0.5)", backgroundColor: "rgba(52, 211, 153, 0.1)", duration: 0.3 });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(".feature-icon", { y: 0, borderColor: "rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.05)", duration: 0.3 });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} cursor-default`}
    >
      <div className={`feature-icon w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 transition-colors`}>
        {icon === 'cloud' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
        {icon === 'leaf' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        {icon === 'scan' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        {icon === 'mic' && <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{desc}</p>
    </div>
  )
}

// Premium CTA Button with Hover Animation
function UserCtaButton({ children, variant = 'default', onClick }: { children: React.ReactNode, variant?: 'default' | 'primary', onClick?: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP({ scope: btnRef });

  const onEnter = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
  });

  const onLeave = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  });

  if (variant === 'primary') {
    return (
      <button
        ref={btnRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="px-8 py-4 bg-emerald-500 text-black text-lg font-bold rounded-full shadow-lg"
        data-cursor="pointer"
      >
        {children}
      </button>
    )
  }

  return (
    <button
      ref={btnRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      data-cursor="pointer"
    >
      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-emerald-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative flex items-center gap-2">
        {children}
        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </button>
  );
}