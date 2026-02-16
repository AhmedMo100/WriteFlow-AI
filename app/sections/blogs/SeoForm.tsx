"use client";

import { useState } from "react";

interface Props {
    post: {
        id: string;
        tags: string[];
        seoKeywords: string[];
        seoTitle?: string;
        seoDescription?: string;
    };
}

export default function SeoForm({ post }: Props) {
    const [tags, setTags] = useState(post.tags.join(", "));
    const [seoKeywords, setSeoKeywords] = useState(post.seoKeywords.join(", "));
    const [seoTitle, setSeoTitle] = useState(post.seoTitle || "");
    const [seoDescription, setSeoDescription] = useState(post.seoDescription || "");
    const [loading, setLoading] = useState(false);

    const generateAI = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${post.id}/seo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: seoTitle, content: seoDescription }),
            });

            const data = await res.json();
            const aiContent = data.choices?.[0]?.message?.content || "";

            // هنا ممكن parse حسب الطريقة اللي OpenRouter بيرجعها، مؤقتاً هنفصل بالكاما
            const lines = aiContent.split("\n");
            setTags(lines[0] || "");
            setSeoTitle(lines[1] || "");
            setSeoDescription(lines[2] || "");
            setSeoKeywords(lines[3] || "");
        } catch (err) {
            console.error(err);
            alert("AI SEO generation failed");
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await fetch(`/api/posts/${post.id}/seo`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tags: tags.split(",").map((t) => t.trim()),
                    seoKeywords: seoKeywords.split(",").map((k) => k.trim()),
                    seoTitle,
                    seoDescription,
                }),
            });
            alert("Saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Save failed");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags (comma separated)"
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="SEO Keywords (comma separated)"
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO Title"
                className="w-full border p-2 rounded"
            />
            <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                rows={4}
                placeholder="SEO Description"
                className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
                <button
                    onClick={generateAI}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Generating..." : "Generate with AI"}
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
