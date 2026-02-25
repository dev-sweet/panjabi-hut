import { prisma } from "@/../lib/prisma";
import { NextResponse } from "next/server";

// get all products
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const ids = searchParams.get("ids");

  const query: any = {};

  // handle products based on tags
  if (tag === "new") {
    query.isNew = true;
  }

  if (tag === "isPremium") {
    query.isPremium = true;
  }

  if (tag === "isTrending") {
    query.isTrending = true;
  }

  if (tag === "isEidCollection") {
    query.isEidCollection = true;
  }

  if (ids) {
    query.id = { in: ids.split(",") };
  }

  const result = await prisma.product.findMany({
    where: query,
  });

  // handle prodcuts based on ids

  return NextResponse.json({
    message: "Data retrive successfully",
    data: result,
  });
};
