import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, dbConnect } from "@/lib/db"; // Updated import

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function POST(req: Request) {
     try {
          await dbConnect(); // Ensure DB is connected
          const { email, password } = await req.json();

          if (!email || !password) {
               return NextResponse.json({ error: "Missing fields" }, { status: 400 });
          }

          // Find User (Mongoose)
          const user = await User.findOne({ email });
          if (!user) {
               return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
               return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
          }

          const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
               expiresIn: "7d",
          });

          const response = NextResponse.json({
               user: {
                    uid: user._id.toString(),
                    email: user.email,
                    displayName: user.name,
               },
          });

          response.cookies.set("auth_token", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               path: "/",
               maxAge: 60 * 60 * 24 * 7,
          });

          return response;
     } catch (error) {
          console.error("Login Error:", error);
          return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
     }
}
