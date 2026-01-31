"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#050605] text-white overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden pt-20">

        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/farm.jpg"
            alt="Farm background"
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050605] to-transparent" />
        </div>

        {/* Hero Content - Grid Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left Column: Text */}
          <div className="space-y-8 max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white drop-shadow-2xl font-pixel">
              Fertilizer,<br />
              <span className="text-emerald-500">Reinvented.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-lg border-l-4 border-emerald-500 pl-6">
              For Your Crops.<br />
              For the Planet.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-[#4ade80] text-black text-xl font-bold font-pixel rounded-none hover:bg-[#22c55e] transition-all transform hover:-translate-y-1 shadow-[4px_4px_0_0_#14532d]">
                Explore Products
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white text-xl font-bold font-pixel rounded-none hover:bg-white/10 transition-all hover:translate-x-1 hover:translate-y-1">
                Our Technology
              </button>
            </div>
          </div>

          {/* Right Column: Placeholder for 3D Model (Removed) */}
          <div className="relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center">
            {/* 3D Model removed as requested */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="flex flex-col items-center gap-2">
            <span className="font-pixel text-sm uppercase tracking-widest text-[#4ade80]">Scroll</span>
            <div className="w-6 h-10 border-2 border-[#4ade80] flex justify-center pt-2 rounded-none">
              <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-none animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Better Way (White Background) */}
      <section className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-24 rounded-t-[3rem] -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight font-pixel">
                We found a <br />
                <span className="text-emerald-600">better way.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                Traditional fertilizers are inefficient and carbon-intensive.
                Our next-generation plant nutrition uses carbon-captured fertilizers
                to boost yields while cutting emissions.
              </p>
              <div className="pt-4">
                <Link href="#" className="group inline-flex items-center text-lg font-bold text-emerald-700 hover:text-emerald-800 transition-colors font-pixel">
                  Learn more about our technology
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Image Placeholder / Feature Visual */}
            <div className="relative h-[400px] w-full bg-emerald-50 overflow-hidden shadow-[8px_8px_0_0_#064e3b] border-4 border-black">
              <div className="absolute inset-0 bg-[url('/farm.jpg')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center space-y-2">
                  <span className="block text-8xl font-black text-emerald-900/20 font-pixel">CO₂</span>
                  <h3 className="text-3xl font-bold text-emerald-900 font-pixel">Carbon Negative</h3>
                  <p className="text-sm font-medium text-emerald-700 font-mono">Turning pollution into plant food.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Products (Light Gray) */}
      <section className="w-full bg-neutral-50 py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-pixel">
              For Better Plants. <span className="text-gray-400">For Healthier Animals.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="group relative bg-white p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0_0_rgba(16,185,129,0.2)] transition-all duration-300 border-4 border-gray-100 hover:border-emerald-500 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-100 flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform border-2 border-black">
                  <svg className="w-8 h-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-pixel">CropTab™ NPK</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  High-performance macronutrient fertilizers powered by zero-emission carbon capsule technology.
                </p>
                <div className="pt-8">
                  <span className="inline-flex items-center px-6 py-3 bg-black text-white text-sm font-bold group-hover:bg-emerald-600 transition-colors duration-300 font-pixel hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0_0_#9ca3af] group-hover:shadow-none">
                    View Product
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0_0_rgba(59,130,246,0.2)] transition-all duration-300 border-4 border-gray-100 hover:border-blue-500 hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-blue-100 flex items-center justify-center mb-6 -rotate-3 group-hover:rotate-0 transition-transform border-2 border-black">
                  <svg className="w-8 h-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 font-pixel">NutriPeak™</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  Liquid supplements work alongside your main fertilizer to address specific nutrient needs.
                </p>
                <div className="pt-8">
                  <span className="inline-flex items-center px-6 py-3 bg-black text-white text-sm font-bold group-hover:bg-blue-600 transition-colors duration-300 font-pixel hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0_0_#9ca3af] group-hover:shadow-none">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-emerald-900 text-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to transform your yield?</h2>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            Join the farmers using our science-driven technology to improve soil health and profitability.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-10 py-4 bg-white text-emerald-900 text-lg font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl hover:scale-105">
                Get Started Today
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <button className="px-10 py-4 bg-white text-emerald-900 text-lg font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl hover:scale-105">
              Contact Sales
            </button>
          </SignedIn>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-[#1a1a1a] text-white py-16 px-6 md:px-12 border-t-4 border-[#2E3B23]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight font-pixel">FARM MINERALS</h2>
            <p className="text-gray-500 max-w-xs font-mono">Pioneering the future of sustainable agriculture.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-gray-400 font-mono">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold font-pixel text-lg">Products</h4>
              <Link href="#" className="hover:text-emerald-400">CropTab™</Link>
              <Link href="#" className="hover:text-emerald-400">NutriPeak™</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold font-pixel text-lg">Company</h4>
              <Link href="#" className="hover:text-emerald-400">About</Link>
              <Link href="#" className="hover:text-emerald-400">Careers</Link>
              <Link href="#" className="hover:text-emerald-400">Contact</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold font-pixel text-lg">Legal</h4>
              <Link href="#" className="hover:text-emerald-400">Privacy</Link>
              <Link href="#" className="hover:text-emerald-400">Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center md:text-left text-xs text-gray-600 font-mono">
          © {new Date().getFullYear()} Farm Minerals Inc. All Rights Reserved.
        </div>
      </footer>
    </div >

  );
}