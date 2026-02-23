import { prisma } from "@/../lib/prisma";
import { NextResponse } from "next/server";

// get all products
export const GET = async (req: Request) => {
  const result = await prisma.product.findMany();
  console.log(result);

  return NextResponse.json({
    message: "Data retrive successfully",
    data: result,
  });
};
