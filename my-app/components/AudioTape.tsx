"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const tracks = [
     { id: 'en', label: 'English', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Dummy audio
     { id: 'hi', label: 'Hindi', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },   // Dummy audio
     { id: 'mr', label: 'Marathi', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }, // Dummy audio
];

export default function AudioTape() {
     const [isPlaying, setIsPlaying] = useState(false);
     const [currentTrack, setCurrentTrack] = useState(tracks[0]);
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const leftReelRef = useRef<HTMLDivElement>(null);
     const rightReelRef = useRef<HTMLDivElement>(null);

     // Reel Rotation Animation
     useGSAP(() => {
          if (isPlaying && leftReelRef.current && rightReelRef.current) {
               gsap.to([leftReelRef.current, rightReelRef.current], {
                    rotation: "+=360",
                    duration: 2,
                    repeat: -1,
                    ease: "none",
               });
          } else {
               gsap.killTweensOf([leftReelRef.current, rightReelRef.current]);
          }
     }, [isPlaying]);

     const togglePlay = () => {
          if (!audioRef.current) return;
          if (isPlaying) {
               audioRef.current.pause();
          } else {
               audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
     };

     const changeTrack = (track: typeof tracks[0]) => {
          setIsPlaying(false);
          setCurrentTrack(track);
          if (audioRef.current) {
               audioRef.current.src = track.src;
               audioRef.current.load();
               // define whether to autoplay or wait for user
          }
     };

     return (
          <div className="w-full max-w-4xl mx-auto py-20 px-4 relative z-20">

               {/* Audio Element Hidden */}
               <audio ref={audioRef} src={currentTrack.src} onEnded={() => setIsPlaying(false)} />

               <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">

                    {/* Decorative Lines */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                    {/* Left Reel */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                         <div ref={leftReelRef} className="w-full h-full rounded-full border-2 border-white/20 relative flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                                   <div className="w-8 h-8 rounded-full bg-emerald-900/40 relative">
                                        {/* Spindles */}
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full top-1 left-1/2 -translate-x-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full bottom-1 left-1/2 -translate-x-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full left-1 top-1/2 -translate-y-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full right-1 top-1/2 -translate-y-1/2" />
                                   </div>
                              </div>
                              {/* Spokes */}
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-0" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-45" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-90" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-[135deg]" />
                         </div>
                    </div>

                    {/* Center Control Panel */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                         <div className="text-center space-y-2">
                              <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Now Playing • {currentTrack.label}</div>
                              <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden mx-auto">
                                   {isPlaying && <div className="h-full bg-emerald-500 animate-progress w-full origin-left" style={{ animationDuration: '30s', animationTimingFunction: 'linear' }} />}
                              </div>
                         </div>

                         {/* Language Selectors */}
                         <div className="flex items-center gap-3">
                              {tracks.map(track => (
                                   <button
                                        key={track.id}
                                        onClick={() => changeTrack(track)}
                                        className={`px-4 py-1.5 rounded-md text-xs font-medium border transition-colors ${currentTrack.id === track.id ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-transparent text-gray-400 border-gray-700 hover:border-emerald-500/50'}`}
                                   >
                                        {track.label}
                                   </button>
                              ))}
                         </div>

                         {/* Play Button */}
                         <button
                              onClick={togglePlay}
                              className="group relative w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                         >
                              {isPlaying ? (
                                   <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
                              ) : (
                                   <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                              )}
                         </button>
                    </div>

                    {/* Right Reel */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                         <div ref={rightReelRef} className="w-full h-full rounded-full border-2 border-white/20 relative flex items-center justify-center">
                              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                                   <div className="w-8 h-8 rounded-full bg-emerald-900/40 relative">
                                        {/* Spindles */}
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full top-1 left-1/2 -translate-x-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full bottom-1 left-1/2 -translate-x-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full left-1 top-1/2 -translate-y-1/2" />
                                        <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full right-1 top-1/2 -translate-y-1/2" />
                                   </div>
                              </div>
                              {/* Spokes */}
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-0" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-45" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-90" />
                              <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 rotate-[135deg]" />
                         </div>
                    </div>

               </div>
          </div>
     );
}
