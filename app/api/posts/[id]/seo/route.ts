import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // خد الـ id من url مباشرة
  const url = new URL(req.url);
  const id = url.pathname.split("/")[4]; // /api/posts/[id]/seo → [4] هو الـ id
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
            content: `Generate SEO metadata for this post:\nTitle: ${title}\nContent: ${content}\nReturn tags, SEO title, SEO description, keywords.`,
          },
        ],
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI SEO generation failed" }, { status: 500 });
  }
}
