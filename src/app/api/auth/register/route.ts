import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import bcrypt from "bcryptjs"; // Make sure to: npm install bcryptjs && npm install -D @types/bcryptjs

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be more than 6 characters!" },
        { status: 400 },
      );
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists!" },
        { status: 409 },
      );
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User (Including the password field)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // This was missing and caused the type error
      },
    });

    // 5. Return success (Hide the password from the response)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  return NextResponse.json({ message: "Auth route is active" });
};
