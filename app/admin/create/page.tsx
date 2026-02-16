"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/components/posts/markdownRender";
import ImageUpload from "@/components/public/upload";

export default function CreatePostPage() {
    const router = useRouter();
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
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

    // Auto Slug
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
        setSlug(generatedSlug);
    }, [title]);

    // Add Tag
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

    // Add Keyword
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !slug.trim() || !content.trim()) {
            setError("Title, Slug and Content are required.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/posts/create", {
                method: "POST",
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

            router.push("/");
        } catch (err) {
            setError("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Create New Post</h1>
                    <Button variant="outline" onClick={() => setPreview(!preview)}>
                        <Eye className="h-4 w-4 mr-2" />
                        {preview ? "Edit" : "Preview"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-500/10 text-red-500 p-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                <div className={`grid grid-cols-1 ${preview ? "lg:grid-cols-2 gap-8" : ""}`}>
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Main Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Post Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div>
                                    <Label>Title</Label>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Slug</Label>
                                    <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Cover Image URL</Label>
                                    <div>
                                        <Label>Cover Image</Label>

                                        <ImageUpload
                                            onUpload={(url) => {
                                                setCoverImage(url);
                                            }}
                                        />

                                        {coverImage && (
                                            <img
                                                src={coverImage}
                                                alt="Cover Preview"
                                                className="rounded-lg mt-4"
                                            />
                                        )}
                                    </div>

                                </div>

                                <div>
                                    <Label>Content (Markdown)</Label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={12}
                                    />
                                </div>

                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 mb-3">
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && (e.preventDefault(), addTag())
                                        }
                                        placeholder="Press Enter to add tag"
                                    />
                                    <Button type="button" onClick={addTag}>Add</Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag}
                                            className="bg-muted px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                        >
                                            {tag}
                                            <X
                                                className="w-3 h-3 cursor-pointer"
                                                onClick={() => removeTag(tag)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* SEO */}
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div>
                                    <Label>SEO Title</Label>
                                    <Input
                                        value={seoTitle}
                                        onChange={(e) => setSeoTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>SEO Description</Label>
                                    <Textarea
                                        value={seoDescription}
                                        onChange={(e) => setSeoDescription(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>SEO Keywords</Label>
                                    <div className="flex gap-2 mb-3">
                                        <Input
                                            value={keywordInput}
                                            onChange={(e) => setKeywordInput(e.target.value)}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" && (e.preventDefault(), addKeyword())
                                            }
                                            placeholder="Press Enter to add keyword"
                                        />
                                        <Button type="button" onClick={addKeyword}>Add</Button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {seoKeywords.map((keyword) => (
                                            <div
                                                key={keyword}
                                                className="bg-muted px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                            >
                                                {keyword}
                                                <X
                                                    className="w-3 h-3 cursor-pointer"
                                                    onClick={() => removeKeyword(keyword)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Post Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                <div className="flex items-center gap-2">
                                    <Switch checked={published} onCheckedChange={setPublished} />
                                    <Label>Publish</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch checked={featured} onCheckedChange={setFeatured} />
                                    <Label>Featured</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Switch checked={isAIEnhanced} onCheckedChange={setIsAIEnhanced} />
                                    <Label>AI Enhanced</Label>
                                </div>

                            </CardContent>
                        </Card>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Creating..." : "Create Post"}
                        </Button>

                    </form>

                    {/* Preview */}
                    {preview && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {coverImage && (
                                    <img
                                        src={coverImage}
                                        alt="Cover"
                                        className="rounded-lg mb-4"
                                    />
                                )}
                                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                                <MarkdownRenderer content={content} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
