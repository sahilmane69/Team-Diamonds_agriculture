"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
     return (
          <nav className="flex items-center justify-between px-6 py-6 md:px-10 absolute top-0 w-full z-50">
               {/* Logo (Left/Center if you want) */}
               <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
                         <div className="w-4 h-4 bg-black/20" />
                    </div>
                    <span className="font-bold text-white tracking-tight text-xl">FARM MINERALS</span>
               </Link>

               {/* Auth (Right) */}
               <div className="flex items-center gap-4">
                    <SignedOut>
                         <SignInButton mode="modal">
                              <button className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                                   Sign In
                              </button>
                         </SignInButton>
                         <SignUpButton mode="modal">
                              <button className="px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-200 transition-colors">
                                   Join
                              </button>
                         </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                         <UserButton
                              appearance={{
                                   elements: {
                                        avatarBox: "w-9 h-9 border-2 border-white/20"
                                   }
                              }}
                         />
                    </SignedIn>
               </div>
          </nav>
     );
}
