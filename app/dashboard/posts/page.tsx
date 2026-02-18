"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchInput from "@/app/sections/public/searchInput";
import SortDropdown from "@/app/sections/blogs/sortDropdown";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  published: boolean;
  featured: boolean;
  isAIEnhanced: boolean;
  tags: string[];
  seoKeywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
  };
}

export default function AllPostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (selectedSort) params.append("sort", selectedSort);

        const res = await fetch(`/api/posts?${params.toString()}`);
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [search, selectedSort]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold text-text-primary">All Posts</h1>
          <Button
            className="bg-primary text-white hover:bg-accent transition"
            onClick={() => router.push("/dashboard/create-post")}
          >
            Create Post
          </Button>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search posts..."
          />
          <SortDropdown selected={selectedSort} onSelect={setSelectedSort} />
        </div>

        {/* Posts Grid */}
        {loading ? (
          <p className="text-center py-16 text-text-secondary animate-pulse">
            Loading posts...
          </p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="rounded-2xl border border-accent/20 shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="rounded-t-2xl w-full h-44 object-cover"
                  />
                )}

                <CardHeader className="px-6 pt-4">
                  <CardTitle className="text-lg font-semibold text-text-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-4 space-y-3">

                  {/* Post Content */}
                  <p className="text-sm text-text-secondary line-clamp-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <p>Author: {post.author.name}</p>
                    <p>Published: {post.published ? "Yes" : "No"}</p>
                    <p>Featured: {post.featured ? "Yes" : "No"}</p>
                    <p>AI Enhanced: {post.isAIEnhanced ? "Yes" : "No"}</p>
                    <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(post.updatedAt).toLocaleDateString()}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-3">

                    {/* ✅ NEW EDIT BUTTON */}
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700 transition"
                      onClick={() =>
                        router.push(`/dashboard/posts/${post.id}/edit-post`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      className="bg-primary text-white hover:bg-primary/90 transition"
                      onClick={() =>
                        router.push(`/dashboard/posts/${post.id}/rewrite`)
                      }
                    >
                      Rewrite
                    </Button>

                    <Button
                      size="sm"
                      className="bg-accent text-white hover:bg-accent/90 transition"
                      onClick={() =>
                        router.push(`/dashboard/posts/${post.id}/seo`)
                      }
                    >
                      SEO
                    </Button>

                    <Button
                      size="sm"
                      className="bg-green-600 text-white hover:bg-green-700 transition"
                      onClick={() => router.push(`/posts/${post.id}`)}
                    >
                      View
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700 transition"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </Button>

                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-16 text-text-secondary">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}
