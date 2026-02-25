import { prisma } from "@/../lib/prisma";
import { NextResponse } from "next/server";

// create a product
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body,
    });

    return NextResponse.json(
      { message: "Product created successfully.", data: product },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
};
