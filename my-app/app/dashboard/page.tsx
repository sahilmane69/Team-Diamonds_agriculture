"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
     const { user, loading } = useAuth();
     const router = useRouter();
     const [profile, setProfile] = useState<any>(null);
     const [fetching, setFetching] = useState(true);

     useEffect(() => {
          if (!loading && !user) {
               router.push("/");
          } else if (user) {
               fetchProfile();
          }
     }, [user, loading]);

     const fetchProfile = async () => {
          if (!user) return;
          try {
               if (user.uid === "mock-user-123") {
                    // Fetch from Local Storage for Mock User
                    const storedProfile = localStorage.getItem("mock_user_profile");
                    if (storedProfile) {
                         setProfile(JSON.parse(storedProfile));
                    } else {
                         // Redirect to onboarding if no local profile
                         router.push("/onboarding");
                    }
               } else {
                    // Fetch from Firebase
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                         setProfile(docSnap.data());
                    } else {
                         router.push("/onboarding");
                    }
               }
          } catch (error) {
               console.error("Error fetching profile:", error);
          } finally {
               setFetching(false);
          }
     };

     if (loading || fetching) {
          return (
               <div className="min-h-screen bg-[#050605] text-white flex items-center justify-center">
                    <div className="text-emerald-500 animate-pulse">Loading Your Farm...</div>
               </div>
          );
     }

     if (!profile) return null;

     return (
          <div className="min-h-screen bg-[#050605] text-white font-sans selection:bg-emerald-500 selection:text-white">
               <Navbar />

               <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto">
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6">
                         <div>
                              <h1 className="text-4xl font-bold text-white mb-2">
                                   Welcome back, <span className="text-emerald-400">{profile.displayName?.split(" ")[0]}</span>
                              </h1>
                              <p className="text-gray-400">Here's your farm's productivity overview.</p>
                         </div>
                         <div className="mt-4 md:mt-0 text-right">
                              <div className="text-3xl font-bold text-white">₹{parseInt(profile.budget || "0").toLocaleString()}</div>
                              <div className="text-xs text-gray-500 uppercase tracking-widest">Estimated Budget/Revenue</div>
                         </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                         {/* Current Conditions Card */}
                         <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors"></div>
                              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                   Live Conditions
                              </h3>

                              <div className="grid grid-cols-2 gap-8">
                                   <div>
                                        <div className="text-sm text-gray-400 mb-1">Weather</div>
                                        <div className="text-2xl font-medium text-white">{profile.weather?.split("Code")[0] || "Clear"}</div>
                                        <div className="text-xs text-emerald-400 mt-1">Excellent for sowing</div>
                                   </div>
                                   <div>
                                        <div className="text-sm text-gray-400 mb-1">Soil Health</div>
                                        <div className="text-2xl font-medium text-white">{profile.soilType}</div>
                                        <div className="text-xs text-emerald-400 mt-1">Nitrogen rich</div>
                                   </div>
                                   <div>
                                        <div className="text-sm text-gray-400 mb-1">Location</div>
                                        <div className="text-lg font-medium text-white truncate text-ellipsis">{profile.location}</div>
                                   </div>
                                   <div>
                                        <div className="text-sm text-gray-400 mb-1">Farm Area</div>
                                        <div className="text-2xl font-medium text-white">{profile.area} Acres</div>
                                   </div>
                              </div>
                         </div>

                         {/* Quick Actions / Rec Crop */}
                         <div className="col-span-1 bg-linear-to-br from-emerald-900/40 to-black border border-emerald-500/30 rounded-3xl p-8 flex flex-col justify-between">
                              <div>
                                   <h3 className="text-lg font-bold text-emerald-400 mb-2">Recommended Crop</h3>
                                   <div className="text-3xl font-bold text-white mb-1 capitalize">{profile.cropInterest?.split(",")[0]}</div>
                                   <p className="text-xs text-gray-400">Based on your soil ({profile.soilType}) and current weather.</p>
                              </div>
                              <button className="mt-8 w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:scale-[1.02] transition-transform">
                                   Get Detailed Plan
                              </button>
                         </div>
                    </div>

                    {/* Chat History Section */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[300px]">
                         <h3 className="text-xl font-bold text-white mb-6">Recent Consultations</h3>
                         <div className="space-y-4">
                              {/* Placeholder Items */}
                              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer">
                                   <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                        </div>
                                        <div>
                                             <div className="text-white font-medium">Fertilizer Schedule for Wheat</div>
                                             <div className="text-xs text-gray-500">2 days ago</div>
                                        </div>
                                   </div>
                                   <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Resolved</div>
                              </div>

                              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer">
                                   <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <div>
                                             <div className="text-white font-medium">Leaf Spot Disease Identification</div>
                                             <div className="text-xs text-gray-500">5 days ago</div>
                                        </div>
                                   </div>
                                   <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Resolved</div>
                              </div>
                         </div>
                    </div>

               </main>
          </div>
     );
}
