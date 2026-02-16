"use client";

import { useState } from "react";

interface Props {
    post: {
        id: string;
        title: string;
        content: string;
    };
}

export default function RewriteForm({ post }: Props) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [loading, setLoading] = useState(false);

    const generateAI = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${post.id}/rewrite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            const data = await res.json();
            const aiText = data.choices?.[0]?.message?.content || "";
            setContent(aiText);
        } catch (err) {
            console.error(err);
            alert("AI rewrite failed");
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await fetch(`/api/posts/${post.id}/rewrite`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, isAIEnhanced: true }),
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
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
