"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function Navbar() {


     return (
          <nav className="flex items-center justify-between px-6 py-6 md:px-12 absolute top-0 w-full z-50">
               {/* Logo */}
               <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/10 shadow-lg">
                         <Image
                              src="/image.png"
                              alt="Krishi Mitra Logo"
                              fill
                              className="object-cover"
                         />
                    </div>
                    <span
                         className="font-bold tracking-tight text-2xl font-sans
  bg-clip-text text-transparent
  bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-300
  drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]"
                    >
                         KrishiMitraAI
                    </span>
               </Link>

               {/* Auth (Right) */}
               <div className="flex items-center gap-4">
                    {null}
               </div>
          </nav>
     );
}
