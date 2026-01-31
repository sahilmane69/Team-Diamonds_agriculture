"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
     uid: string;
     email: string;
     displayName: string;
     photoURL?: string;
     onboardingCompleted?: boolean;
}

interface AuthContextType {
     user: User | null;
     loading: boolean;
     login: (credentials: any) => Promise<void>;
     register: (credentials: any) => Promise<void>;
     logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
     user: null,
     loading: true,
     login: async () => { },
     register: async () => { },
     logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);
     const router = useRouter();

     // Check session on mount
     useEffect(() => {
          checkSession();
     }, []);

     const checkSession = async () => {
          try {
               const res = await fetch("/api/auth/me");
               if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
               } else {
                    setUser(null);
               }
          } catch (e) {
               console.error("Session check failed", e);
               setUser(null);
          } finally {
               setLoading(false);
          }
     };

     const login = async (credentials: any) => {
          try {
               const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
               });

               const data = await res.json();
               if (!res.ok) throw new Error(data.error || "Login failed");

               setUser(data.user);
               router.push("/dashboard");
          } catch (error: any) {
               console.error("Login Error:", error);
               throw error;
          }
     };

     const register = async (credentials: any) => {
          try {
               const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
               });

               const data = await res.json();
               if (!res.ok) throw new Error(data.error || "Registration failed");

               setUser(data.user);
               // Redirect to onboarding or dashboard
               router.push("/onboarding");
          } catch (error: any) {
               console.error("Register Error:", error);
               throw error;
          }
     };

     const logout = async () => {
          try {
               await fetch("/api/auth/logout", { method: "POST" });
               setUser(null);
               router.push("/");
          } catch (error) {
               console.error("Logout Error:", error);
          }
     };

     return (
          <AuthContext.Provider value={{ user, loading, login, register, logout }}>
               {children}
          </AuthContext.Provider>
     );
};
