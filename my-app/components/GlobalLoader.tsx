"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlobalLoader() {
     const containerRef = useRef<HTMLDivElement>(null);
     const [loading, setLoading] = useState(true);

     useGSAP(() => {
          const tl = gsap.timeline({
               onComplete: () => setLoading(false)
          });

          // Initial state
          tl.set(containerRef.current, { opacity: 1 });

          // Pulse logo
          tl.fromTo(".loader-logo",
               { scale: 0.8, opacity: 0 },
               { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
          );

          // Text reveal
          tl.fromTo(".loader-text",
               { y: 20, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
               "-=0.5"
          );

          // Fade out loader
          tl.to(containerRef.current, {
               opacity: 0,
               duration: 0.8,
               delay: 1.5, // Wait a bit
               ease: "power2.inOut",
               pointerEvents: "none"
          });

     }, { scope: containerRef });

     if (!loading) return null;

     return (
          <div
               ref={containerRef}
               className="fixed inset-0 z-[9999] bg-[#050605] flex flex-col items-center justify-center"
          >
               <div className="relative w-24 h-24 mb-6 loader-logo opacity-0">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[spin_3s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-emerald-400/30 animate-[spin_4s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                         <Image
                              src="/image.png"
                              alt="Loading..."
                              fill
                              className="object-cover"
                              priority
                         />
                    </div>
               </div>

               <div className="relative">
                    <h1 className="text-4xl font-bold font-sans tracking-tight loader-text opacity-0 bg-clip-text text-transparent bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                         KrishiMitraAI
                    </h1>
               </div>

               <div className="mt-4 flex gap-1 loader-text opacity-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
               </div>
          </div>
     );
}
