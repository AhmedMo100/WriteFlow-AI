"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
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

  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(generatedSlug);
  }, [title]);

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
    } catch {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 max-w-7xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Create New Post
            </h1>
            <p className="text-text-secondary mt-1">
              Write, optimize and publish your article
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
          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Content Card */}
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
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="rounded-xl mt-4 shadow-md"
                    />
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

            {/* Tags */}
            <Card className="border border-accent/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-accent">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    placeholder="Press Enter to add tag"
                  />
                  <Button type="button" className="bg-accent text-white" onClick={addTag}>
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-2 text-sm"
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
            <Card className="border border-primary/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-primary">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                <div>
                  <Label>SEO Title</Label>
                  <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
                </div>

                <div>
                  <Label>SEO Description</Label>
                  <Textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
                </div>

                <div>
                  <Label>SEO Keywords</Label>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addKeyword())
                      }
                    />
                    <Button type="button" className="bg-primary text-white" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {seoKeywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-sm"
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
            <Card className="border border-accent/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-accent">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SwitchRow label="Publish" checked={published} onChange={setPublished} />
                <SwitchRow label="Featured" checked={featured} onChange={setFeatured} />
                <SwitchRow label="AI Enhanced" checked={isAIEnhanced} onChange={setIsAIEnhanced} />
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 py-3 text-lg shadow-lg"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </form>

          {/* ================= PREVIEW ================= */}
          {preview && (
            <Card className="border border-accent/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-accent">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                {coverImage && (
                  <img src={coverImage} alt="Cover" className="rounded-xl shadow-md" />
                )}

                <h2 className="text-3xl font-bold text-primary">{title || "Post Title"}</h2>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                <MarkdownRenderer content={content || "Start writing to see preview..."} />

                <div className="border-t pt-6 space-y-2 text-sm text-text-secondary">
                  <p><strong>SEO Title:</strong> {seoTitle}</p>
                  <p><strong>SEO Description:</strong> {seoDescription}</p>
                  <p><strong>SEO Keywords:</strong> {seoKeywords.join(", ")}</p>
                  <p><strong>Published:</strong> {published ? "Yes" : "No"}</p>
                  <p><strong>Featured:</strong> {featured ? "Yes" : "No"}</p>
                  <p><strong>AI Enhanced:</strong> {isAIEnhanced ? "Yes" : "No"}</p>
                </div>

              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function SwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-accent/5 p-3 rounded-lg">
      <Label>{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
