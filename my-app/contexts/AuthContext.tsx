"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
     onAuthStateChanged,
     signInWithPopup,
     signOut,
     User,
     GoogleAuthProvider
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
     user: User | null;
     loading: boolean;
     googleSignIn: () => Promise<void>;
     logout: () => Promise<void>;
}

// Mock User Object
const MOCK_USER = {
     uid: "mock-user-123",
     displayName: "Local Farmer",
     email: "farmer@local.com",
     photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
     emailVerified: true,
     isAnonymous: false,
     metadata: {},
     providerData: [],
     refreshToken: "",
     tenantId: null,
     delete: async () => { },
     getIdToken: async () => "mock-token",
     getIdTokenResult: async () => ({
          token: "mock-token",
          signInProvider: "google",
          claims: {},
          authTime: Date.now().toString(),
          issuedAtTime: Date.now().toString(),
          expirationTime: (Date.now() + 3600000).toString(),
     }),
     reload: async () => { },
     toJSON: () => ({}),
} as unknown as User;

const AuthContext = createContext<AuthContextType>({
     user: null,
     loading: true,
     googleSignIn: async () => { },
     logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);
     const router = useRouter();

     useEffect(() => {
          // Check for mock user in local storage
          const storedMockUser = localStorage.getItem("mock_auth_user");
          if (storedMockUser) {
               setUser(MOCK_USER);
               setLoading(false);
               return; // Skip Firebase check if mock is active
          }

          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser);
               setLoading(false);
          });
          return () => unsubscribe();
     }, []);

     const googleSignIn = async () => {
          try {
               // Fallback to Mock Login for now (as requested by user)
               // Normal flow: await signInWithPopup(auth, googleProvider);

               console.log("Using Local/Mock Login as requested.");
               localStorage.setItem("mock_auth_user", "true");
               setUser(MOCK_USER);

          } catch (error) {
               console.error("Google Sign In Error:", error);
          }
     };

     const logout = async () => {
          try {
               if (localStorage.getItem("mock_auth_user")) {
                    localStorage.removeItem("mock_auth_user");
                    setUser(null);
                    router.push("/");
                    return;
               }

               await signOut(auth);
               router.push("/");
          } catch (error) {
               console.error("Logout Error:", error);
          }
     };

     return (
          <AuthContext.Provider value={{ user, loading, googleSignIn, logout }}>
               {children}
          </AuthContext.Provider>
     );
};
