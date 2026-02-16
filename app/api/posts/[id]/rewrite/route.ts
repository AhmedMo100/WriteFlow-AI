import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body;

    try {
        const res = await fetch("https://api.openrouter.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "user",
                        content: `Rewrite this post in an improved way:\nTitle: ${title}\nContent: ${content}`,
                    },
                ],
            }),
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "AI rewrite failed" }, { status: 500 });
    }
}
