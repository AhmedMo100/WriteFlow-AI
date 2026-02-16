import { NextRequest, NextResponse } from "next/server";

// لو عايز ملف SEO بنفس الطريقة:
export async function POST_SEO(
    req: NextRequest,
    context: { params: { id: string } }
) {
    const { id } = context.params;
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
                        content: `Improve the SEO of this post:\nTitle: ${title}\nContent: ${content}`,
                    },
                ],
            }),
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "SEO enhancement failed" },
            { status: 500 }
        );
    }
}
