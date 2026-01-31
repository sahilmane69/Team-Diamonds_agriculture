"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     // Lock body scroll when menu is open
     useEffect(() => {
          if (isMenuOpen) {
               document.body.style.overflow = "hidden";
          } else {
               document.body.style.overflow = "unset";
          }
     }, [isMenuOpen]);

     const menuItems = [
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
          { label: "Science", href: "/science" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
     ];

     return (
          <>
               {/* Top Navigation Bar */}
               <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 mix-blend-difference text-white">

                    {/* Menu Trigger (Left) */}
                    <button
                         onClick={() => setIsMenuOpen(true)}
                         className="group flex items-center gap-3 hover:text-emerald-400 transition-colors"
                    >
                         <div className="flex flex-col gap-[4px] w-6 h-6 justify-center">
                              {/* Custom Pixelated Hamburger Icon */}
                              <div className="w-1 h-1 bg-current shadow-[4px_0_0_0_currentColor,8px_0_0_0_currentColor,12px_0_0_0_currentColor]" />
                              <div className="w-1 h-1 bg-current shadow-[4px_0_0_0_currentColor,8px_0_0_0_currentColor,12px_0_0_0_currentColor]" />
                              <div className="w-1 h-1 bg-current shadow-[4px_0_0_0_currentColor,8px_0_0_0_currentColor,12px_0_0_0_currentColor]" />
                         </div>
                         <span className="font-pixel text-xl tracking-wide">MENU</span>
                    </button>

                    {/* Logo (Center) */}
                    <Link href="/" className="absolute left-1/2 top-6 -translate-x-1/2 text-center group">
                         {/* Simple Pixel Flower Icon Placeholder */}
                         <div className="w-4 h-4 mx-auto mb-1 bg-white group-hover:bg-emerald-400 transition-colors shadow-[4px_-4px_0_0_rgba(255,255,255,0.5),-4px_-4px_0_0_rgba(255,255,255,0.5)]" />
                         <span className="font-pixel text-lg tracking-tight block">Farm Minerals</span>
                    </Link>

                    {/* Auth (Right) */}
                    <div className="flex items-center gap-4">
                         <SignedOut>
                              <SignInButton mode="modal">
                                   <button className="hidden md:block font-pixel text-lg hover:text-emerald-400 transition-colors">
                                        SIGN IN
                                   </button>
                              </SignInButton>
                              <SignUpButton mode="modal">
                                   <button className="font-pixel text-lg bg-white text-black px-4 py-1 hover:bg-emerald-400 transition-colors shadow-[4px_4px_0_0_rgba(255,255,255,0.5)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                                        JOIN
                                   </button>
                              </SignUpButton>
                         </SignedOut>

                         <SignedIn>
                              <UserButton
                                   appearance={{
                                        elements: {
                                             avatarBox: "w-8 h-8 md:w-10 md:h-10 border-2 border-white"
                                        }
                                   }}
                              />
                         </SignedIn>
                    </div>
               </nav>

               {/* Full Screen Overlay Menu */}
               <div
                    className={`fixed inset-0 z-[60] bg-[#2E3B23] text-[#E8F1D5] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
                         }`}
               >
                    <div className="flex flex-col h-full p-6 md:p-10">
                         {/* Header inside Menu */}
                         <div className="flex justify-between items-center">
                              <button
                                   onClick={() => setIsMenuOpen(false)}
                                   className="flex items-center gap-3 hover:text-white transition-colors text-[#E8F1D5]/70"
                              >
                                   <span className="font-pixel text-xl">CLOSE</span>
                              </button>

                              <div className="font-pixel text-lg text-[#E8F1D5]/70">Farm Minerals</div>
                         </div>

                         {/* Main Menu Links */}
                         <div className="flex-1 flex flex-col justify-center gap-2 md:gap-4 pl-4 md:pl-20">
                              {menuItems.map((item, i) => (
                                   <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-pixel text-6xl md:text-8xl hover:text-white hover:translate-x-4 transition-all duration-300 block w-fit"
                                   >
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {/* Footer inside Menu */}
                         <div className="flex flex-col md:flex-row justify-between items-end border-l-2 border-[#E8F1D5]/20 pl-6 md:pl-10 py-4 text-xs md:text-sm font-mono text-[#E8F1D5]/60 gap-4">
                              <div>
                                   <div className="mb-2 font-pixel text-lg text-[#E8F1D5]">FARM THE LEAP</div>
                                   <a href="mailto:hello@farmminerals.com" className="hover:text-white transition-colors">HELLO@FARMMINERALS.COM</a>
                              </div>
                              <a href="#" className="hover:text-white transition-colors font-pixel text-lg">LINKEDIN</a>
                         </div>
                    </div>
               </div>
          </>
     );
}
