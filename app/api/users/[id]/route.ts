// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils/auth";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const admin = await requireAdmin(); // بس الـAdmins يقدروا يحذفوا

        const userId = params.id;

        // ما تحذفش نفسك بالغلط 😅
        if (admin.id === userId) {
            return NextResponse.json(
                { error: "You cannot delete yourself." },
                { status: 400 }
            );
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "User deleted successfully." });
    } catch (error: any) {
        console.error("Failed to delete user:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete user." },
            { status: 500 }
        );
    }
}
