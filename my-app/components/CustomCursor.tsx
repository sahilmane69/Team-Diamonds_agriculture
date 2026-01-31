"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
     const cursorRef = useRef<HTMLDivElement>(null);
     const followerRef = useRef<HTMLDivElement>(null);
     const [isHovering, setIsHovering] = useState(false);
     const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
          // Check if device is touch/mobile
          const checkMobile = () => {
               setIsMobile(window.matchMedia("(pointer: coarse)").matches);
          };
          checkMobile();
          window.addEventListener("resize", checkMobile);
          return () => window.removeEventListener("resize", checkMobile);
     }, []);

     useGSAP(() => {
          if (isMobile || !cursorRef.current || !followerRef.current) return;

          // Initial Hide (wait for mouse move)
          gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50, opacity: 0 });

          const moveCursor = (e: MouseEvent) => {
               // Make visible on first move
               gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.2 });

               // Inner Dot - Fast Follow
               gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: "power2.out",
               });

               // Outer Ring - Smooth Inertia
               gsap.to(followerRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: "power2.out",
               });
          };

          const handleHoverStart = () => setIsHovering(true);
          const handleHoverEnd = () => setIsHovering(false);

          window.addEventListener("mousemove", moveCursor);

          // Add hover listeners to clickable elements
          const clickables = document.querySelectorAll('a, button, input, [data-cursor="pointer"]');
          clickables.forEach((el) => {
               el.addEventListener("mouseenter", handleHoverStart);
               el.addEventListener("mouseleave", handleHoverEnd);
          });

          // Cleanup for dynamic elements (MutationObserver could be better but this is MVP)
          const observer = new MutationObserver((mutations) => {
               mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                         mutation.addedNodes.forEach(node => {
                              if (node instanceof HTMLElement) {
                                   const interactives = node.querySelectorAll?.('a, button, input, [data-cursor="pointer"]');
                                   if (interactives) {
                                        interactives.forEach(el => {
                                             el.addEventListener("mouseenter", handleHoverStart);
                                             el.addEventListener("mouseleave", handleHoverEnd);
                                        });
                                   }
                                   if (node.tagName === 'A' || node.tagName === 'BUTTON') {
                                        node.addEventListener("mouseenter", handleHoverStart);
                                        node.addEventListener("mouseleave", handleHoverEnd);
                                   }
                              }
                         })
                    }
               });
          });

          observer.observe(document.body, { childList: true, subtree: true });

          return () => {
               window.removeEventListener("mousemove", moveCursor);
               window.removeEventListener("resize", checkMobile);
               clickables.forEach((el) => {
                    el.removeEventListener("mouseenter", handleHoverStart);
                    el.removeEventListener("mouseleave", handleHoverEnd);
               });
               observer.disconnect();
          };
     }, [isMobile]);

     useEffect(() => {
          if (followerRef.current) {
               if (isHovering) {
                    gsap.to(followerRef.current, { scale: 3, opacity: 0.2, backgroundColor: "#10b981", duration: 0.3 });
               } else {
                    gsap.to(followerRef.current, { scale: 1, opacity: 1, backgroundColor: "transparent", duration: 0.3 });
               }
          }
     }, [isHovering]);

     if (isMobile) return null;

     return (
          <>
               <style jsx global>{`
        body {
          cursor: none;
        }
        /* Restore cursor on touch devices if JS fails or media query matches late */
        @media (pointer: coarse) {
            body { cursor: auto; }
        }
      `}</style>

               {/* Outer Follower */}
               <div
                    ref={followerRef}
                    className="fixed top-0 left-0 w-8 h-8 border border-emerald-500 rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
               />

               {/* Inner Dot */}
               <div
                    ref={cursorRef}
                    className="fixed top-0 left-0 w-2 h-2 bg-emerald-400 rounded-full pointer-events-none z-[9999]"
               />
          </>
     );
}
