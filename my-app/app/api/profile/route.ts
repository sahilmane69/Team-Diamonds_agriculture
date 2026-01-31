import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/lib/db"; // Updated import

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// GET: Fetch user profile
export async function GET() {
     try {
          const cookieStore = await cookies();
          const token = cookieStore.get("auth_token");

          if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

          const decoded = jwt.verify(token.value, JWT_SECRET) as any;

          // Fetch profile (Mongoose)
          const user = await User.findById(decoded.userId).select("-password");
          if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

          return NextResponse.json({
               displayName: user.name,
               email: user.email,
               cropInterest: user.cropInterest,
               soilType: user.soilType,
               budget: user.budget,
               area: user.area,
               location: user.location,
               weather: user.weather,
               onboardingCompleted: user.onboardingCompleted
          });

     } catch (error) {
          return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }
}

// POST: Update user profile (Onboarding)
export async function POST(req: Request) {
     try {
          const cookieStore = await cookies();
          const token = cookieStore.get("auth_token");
          if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

          const decoded = jwt.verify(token.value, JWT_SECRET) as any;
          const body = await req.json();

          // Update User (Mongoose)
          const updatedUser = await User.findByIdAndUpdate(decoded.userId, {
               cropInterest: typeof body.cropInterest === 'object' ? JSON.stringify(body.cropInterest) : body.cropInterest,
               soilType: body.soilType,
               budget: body.budget,
               area: body.area,
               location: body.location,
               weather: body.weather,
               onboardingCompleted: true
          }, { new: true });

          return NextResponse.json({ success: true, user: updatedUser });

     } catch (error) {
          console.error("Profile Update Error:", error);
          return NextResponse.json({ error: "Update failed" }, { status: 500 });
     }
}
