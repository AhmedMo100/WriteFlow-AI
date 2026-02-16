"use client";

import { useState } from "react";

export default function ImageUpload({
    onUpload,
}: {
    onUpload: (url: string) => void;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (file: File) => {
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Upload failed");
                return;
            }

            onUpload(data.url);
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        handleUpload(e.target.files[0]);
                    }
                }}
            />

            {loading && <p className="text-sm text-muted-foreground">Uploading...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
