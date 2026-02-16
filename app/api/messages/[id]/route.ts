import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.contactMessage.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}
