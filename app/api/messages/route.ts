import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET all contact messages
export async function GET(req: NextRequest) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, name: true } } },
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Failed to fetch contact messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// DELETE a message by id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Failed to delete message:", err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
