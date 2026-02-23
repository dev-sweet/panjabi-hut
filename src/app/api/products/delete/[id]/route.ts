import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
// import prisma from '/prisma'; // Using the singleton pattern we discussed

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    console.log(id);
    const deletedItem = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
      deletedItem,
    });
  } catch (error: any) {
    // Prisma error code P2025 means "Record to delete does not exist."
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
