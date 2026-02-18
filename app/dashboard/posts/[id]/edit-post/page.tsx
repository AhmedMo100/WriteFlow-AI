"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Eye, X } from "lucide-react";
import MarkdownRenderer from "@/components/posts/markdownRender";
import ImageUpload from "@/components/public/upload";

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    // Main Fields
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");

    // Arrays
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState("");
    const [seoKeywords, setSeoKeywords] = useState<string[]>([]);

    // Settings
    const [published, setPublished] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [isAIEnhanced, setIsAIEnhanced] = useState(false);

    // SEO
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");

    // ================= Fetch Post =================
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Failed to load post");
                    return;
                }

                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content);
                setCoverImage(data.coverImage || "");
                setTags(data.tags || []);
                setSeoKeywords(data.seoKeywords || []);
                setSeoTitle(data.seoTitle || "");
                setSeoDescription(data.seoDescription || "");
                setPublished(data.published);
                setFeatured(data.featured);
                setIsAIEnhanced(data.isAIEnhanced);
            } catch {
                setError("Something went wrong while loading post.");
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    // ================= Helpers =================
    const addTag = () => {
        if (!tagInput.trim()) return;
        if (!tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
        }
        setTagInput("");
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const addKeyword = () => {
        if (!keywordInput.trim()) return;
        if (!seoKeywords.includes(keywordInput.trim())) {
            setSeoKeywords([...seoKeywords, keywordInput.trim()]);
        }
        setKeywordInput("");
    };

    const removeKeyword = (keyword: string) => {
        setSeoKeywords(seoKeywords.filter((k) => k !== keyword));
    };

    // ================= Submit =================
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !slug.trim() || !content.trim()) {
            setError("Title, Slug and Content are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/posts/${id}/edit`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    slug,
                    content,
                    coverImage,
                    tags,
                    seoTitle,
                    seoDescription,
                    seoKeywords,
                    published,
                    featured,
                    isAIEnhanced,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            router.push("/dashboard/posts");
        } catch {
            setError("Failed to update post");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-primary text-lg font-semibold">Loading post...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-10 max-w-7xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">
                            Edit Post
                        </h1>
                        <p className="text-text-secondary mt-1">
                            Update and manage your article
                        </p>
                    </div>

                    <Button
                        onClick={() => setPreview(!preview)}
                        className="bg-accent text-white hover:bg-accent/90 transition shadow-md"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        {preview ? "Edit Mode" : "Preview Mode"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 border border-red-500/20">
                        {error}
                    </div>
                )}

                <div className={`grid ${preview ? "lg:grid-cols-2 gap-10" : "grid-cols-1"}`}>
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Content */}
                        <Card className="border border-primary/20 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-primary">Post Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                <div>
                                    <Label>Title</Label>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Slug</Label>
                                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Cover Image</Label>
                                    <ImageUpload onUpload={(url) => setCoverImage(url)} />
                                    {coverImage && (
                                        <img src={coverImage} alt="Cover Preview" className="rounded-xl mt-4 shadow-md" />
                                    )}
                                </div>

                                <div>
                                    <Label>Content (Markdown)</Label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={14}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white hover:bg-primary/90 py-3 text-lg shadow-lg"
                        >
                            {loading ? "Updating..." : "Update Post"}
                        </Button>
                    </form>

                    {/* Preview */}
                    {preview && (
                        <Card className="border border-accent/20 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-accent">Live Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {coverImage && (
                                    <img src={coverImage} alt="Cover" className="rounded-xl shadow-md" />
                                )}
                                <h2 className="text-3xl font-bold text-primary">{title}</h2>
                                <MarkdownRenderer content={content} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
