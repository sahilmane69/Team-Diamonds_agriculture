import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User, dbConnect } from "@/lib/db"; // Updated import

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function GET() {
     try {
          await dbConnect(); // Ensure DB is connected
          const cookieStore = await cookies();
          const token = cookieStore.get("auth_token");

          if (!token) {
               return NextResponse.json({ error: "Not user" }, { status: 401 });
          }

          const decoded = jwt.verify(token.value, JWT_SECRET) as any;

          // Find User by ID (Mongoose)
          const user = await User.findById(decoded.userId).select("-password");

          if (!user) {
               return NextResponse.json({ error: "User not found" }, { status: 404 });
          }

          return NextResponse.json({
               user: {
                    uid: user._id.toString(),
                    email: user.email,
                    displayName: user.name,
                    onboardingCompleted: user.onboardingCompleted
               },
          });
     } catch (error) {
          return NextResponse.json({ error: "Invalid token" }, { status: 401 });
     }
}
