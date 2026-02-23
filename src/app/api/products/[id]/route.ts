import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
// import { prisma } from "@/../lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext, // params is a Promise
) {
  try {
    // 1. Await the params
    const { id } = await params;
    const result = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json({
      success: true,
      product: result,
    });
  } catch (err) {
    console.log(err);
  }
}
