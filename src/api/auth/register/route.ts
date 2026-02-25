import { NextResponse } from "next/server";
// import { prisma } from "../../../../lib/prisma";
import { prisma } from "@/../lib/prisma";

export const POST = async (request: Request) => {
  const body = await request.json();
  console.log(body);
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message: "All fields are required!",
      },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      {
        message: "Password must be more tha 6 charecters!",
      },
      { status: 400 },
    );
  }

  const newUser = await prisma.user.create({ data: { name, email, password } });
  return NextResponse.json({
    message: "User created successfully",
    data: newUser,
  });
};

export const GET = async (req: Request) => {
  return NextResponse.json({ message: "hello" });
};
