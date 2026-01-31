"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
     const { user, logout } = useAuth();

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
                    {!user ? (
                         <>
                              <Link
                                   href="/login"
                                   className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
                              >
                                   Log In
                              </Link>
                              <Link
                                   href="/register"
                                   className="px-6 py-2.5 text-sm font-bold text-black bg-white rounded-full hover:bg-emerald-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5"
                              >
                                   Get Started
                              </Link>
                         </>
                    ) : (
                         <div className="flex items-center gap-4">
                              <span className="text-white text-sm hidden md:block">
                                   Hi, {user.displayName?.split(" ")[0]}
                              </span>
                              {user.photoURL && (
                                   // eslint-disable-next-line @next/next/no-img-element
                                   <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-9 h-9 rounded-full border-2 border-white/20"
                                   />
                              )}
                              <button
                                   onClick={logout}
                                   className="text-xs text-gray-400 hover:text-white transition-colors"
                              >
                                   Logout
                              </button>
                         </div>
                    )}
               </div>
          </nav>
     );
}
