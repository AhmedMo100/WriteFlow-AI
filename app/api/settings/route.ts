// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/utils/auth";

export async function GET() {
    try {
        await requireAdmin();
        const setting = await prisma.setting.findFirst({
            orderBy: { updatedAt: "desc" },
        });
        return NextResponse.json(setting || null);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const body = await req.json();

        const existing = await prisma.setting.findFirst();
        if (existing) {
            return NextResponse.json({ error: "Settings already exist, use PATCH to update" }, { status: 400 });
        }

        const newSetting = await prisma.setting.create({
            data: {
                siteName: body.siteName || "",
                logo: body.logo || "",
                favicon: body.favicon || "",
                socialLinks: body.socialLinks || {},
                contactInfo: body.contactInfo || {},
            },
        });

        return NextResponse.json(newSetting, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to create settings" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        await requireAdmin();
        const body = await req.json();

        if (!body.id) return NextResponse.json({ error: "Setting ID is required" }, { status: 400 });

        const updatedSetting = await prisma.setting.update({
            where: { id: body.id },
            data: {
                siteName: body.siteName || "",
                logo: body.logo || "",
                favicon: body.favicon || "",
                socialLinks: body.socialLinks || {},
                contactInfo: body.contactInfo || {},
            },
        });

        return NextResponse.json(updatedSetting);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update settings" }, { status: 500 });
    }
}
