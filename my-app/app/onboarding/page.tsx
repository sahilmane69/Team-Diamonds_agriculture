"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";

export default function OnboardingPage() {
     const { user } = useAuth();
     const router = useRouter();
     const [loading, setLoading] = useState(false);
     const [formData, setFormData] = useState({
          cropInterest: "",
          soilType: "",
          budget: "",
          area: "",
          location: "",
          weather: "", // To be auto-filled
          conditions: "", // To be auto-filled or derived
     });

     const [geoStatus, setGeoStatus] = useState("Detecting location...");

     useEffect(() => {
          if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(
                    async (position) => {
                         const { latitude, longitude } = position.coords;
                         setGeoStatus("Location detected.");
                         await fetchWeather(latitude, longitude);
                    },
                    (error) => {
                         setGeoStatus("Unable to retrieve location. Please enter manually.");
                    }
               );
          } else {
               setGeoStatus("Geolocation not supported. Please enter manually.");
          }
     }, []);

     const fetchWeather = async (lat: number, lon: number) => {
          try {
               // Using Open-Meteo API (No key required)
               const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
               );
               const data = response.data;
               const weatherDesc = `Tel: ${data.current.temperature_2m}°C, Code: ${data.current.weather_code}`;

               setFormData((prev) => ({
                    ...prev,
                    location: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
                    weather: weatherDesc,
                    conditions: "Automatically detected based on weather",
               }));
          } catch (error) {
               console.error("Weather fetch failed", error);
               setFormData((prev) => ({ ...prev, weather: "Failed to fetch weather" }));
          }
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!user) return;

          setLoading(true);
          try {
               const profileData = {
                    ...formData,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    onboardingCompleted: true,
                    createdAt: new Date(), // Local storage will stringify this
               };

               if (user.uid === "mock-user-123") {
                    // Save to Local Storage for Mock User
                    localStorage.setItem("mock_user_profile", JSON.stringify(profileData));
                    console.log("Saved to local storage (Mock Mode)");
               } else {
                    // Save to Firebase
                    await setDoc(doc(db, "users", user.uid), profileData);
               }

               router.push("/dashboard");
          } catch (error) {
               console.error("Error saving profile:", error);
               alert("Failed to save profile.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
               <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-emerald-500/30 p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400 mb-2">
                         Setup Your Farm Profile
                    </h1>
                    <p className="text-gray-400 mb-6 text-sm">
                         We need a few details to personalize your Krishi Mitra experience.
                    </p>

                    <div className="mb-6 p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/20 text-xs text-emerald-300">
                         <p><strong>Status:</strong> {geoStatus}</p>
                         <p><strong>Weather:</strong> {formData.weather || "Pending..."}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Crops Interested to Grow</label>
                              <input
                                   type="text"
                                   name="cropInterest"
                                   value={formData.cropInterest}
                                   onChange={handleChange}
                                   placeholder="e.g. Wheat, Rice, Tomato"
                                   className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                   required
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Soil Type</label>
                              <select
                                   name="soilType"
                                   value={formData.soilType}
                                   onChange={handleChange}
                                   className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                   required
                              >
                                   <option value="" className="bg-black">Select Soil Type</option>
                                   <option value="Alluvial" className="bg-black">Alluvial</option>
                                   <option value="Black" className="bg-black">Black (Regur)</option>
                                   <option value="Red" className="bg-black">Red</option>
                                   <option value="Laterite" className="bg-black">Laterite</option>
                                   <option value="Clay" className="bg-black">Clay</option>
                                   <option value="Sandy" className="bg-black">Sandy</option>
                              </select>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                              <div>
                                   <label className="block text-sm font-medium text-gray-300 mb-1">Budget (₹)</label>
                                   <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="50000"
                                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                   />
                              </div>
                              <div>
                                   <label className="block text-sm font-medium text-gray-300 mb-1">Farm Area (Acres)</label>
                                   <input
                                        type="number"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="2.5"
                                        className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                        required
                                   />
                              </div>
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">Location Details</label>
                              <input
                                   type="text"
                                   name="location"
                                   value={formData.location}
                                   onChange={handleChange}
                                   placeholder="Detecting..."
                                   className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                                   readOnly
                              />
                         </div>

                         <button
                              type="submit"
                              disabled={loading}
                              className="w-full mt-6 bg-linear-to-r from-emerald-500 to-teal-500 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                         >
                              {loading ? "Saving..." : "Create Profile & Go to Dashboard"}
                         </button>
                    </form>
               </div>
          </div>
     );
}
