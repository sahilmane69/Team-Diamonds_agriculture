import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, dbConnect } from "@/lib/db"; // Updated import

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function POST(req: Request) {
     try {
          await dbConnect(); // Ensure DB is connected
          const { email, password, name } = await req.json();

          if (!email || !password) {
               return NextResponse.json({ error: "Missing fields" }, { status: 400 });
          }

          // Check existing user (Mongoose)
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               return NextResponse.json({ error: "User already exists" }, { status: 400 });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          // Create User (Mongoose)
          const user = await User.create({
               email,
               password: hashedPassword,
               name: name || email.split("@")[0],
          });

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
               maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          return response;
     } catch (error: any) {
          console.error("Register Error:", error);
          return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
     }
}
