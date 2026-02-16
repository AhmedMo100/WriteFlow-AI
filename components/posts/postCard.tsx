"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MarkdownRenderer from "./markdownRender";

interface Post {
    id: string;
    title: string;
    content: string;

    coverImage?: string | null;

    tags: string[];

    seoTitle?: string | null;
    seoDescription?: string | null;

    isAIEnhanced: boolean;
    published: boolean;
    featured: boolean;

    createdAt: string;

    author: {
        name: string | null;
        image: string | null;
    };

    _count: {
        comments: number;
        likes: number;
    };
}

export default function PostCard({
    post,
    showFullContent = false,
}: {
    post: Post;
    showFullContent?: boolean;
}) {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "ADMIN";

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post._count.likes);
    const [likeLoading, setLikeLoading] = useState(true);
    const [aiLoading, setAiLoading] = useState<"rewrite" | "seo" | null>(null);

    /* ---------------------- Like Logic ---------------------- */

    useEffect(() => {
        const fetchLikeStatus = async () => {
            if (!session?.user?.id) {
                setLikeLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `/api/posts/${post.id}/like-status`
                );
                if (response.ok) {
                    const data = await response.json();
                    setLiked(data.liked);
                }
            } catch (error) {
                console.error("Failed to fetch like status:", error);
            } finally {
                setLikeLoading(false);
            }
        };

        fetchLikeStatus();
    }, [post.id, session?.user?.id]);

    const handleLike = async () => {
        if (!session) return;

        try {
            const response = await fetch(`/api/posts/${post.id}/like`, {
                method: "POST",
            });
            const data = await response.json();

            setLiked(data.liked);
            setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };

    /* ---------------------- AI Logic ---------------------- */

    const handleAI = async (action: "rewrite" | "seo") => {
        setAiLoading(action);

        try {
            const res = await fetch("/api/ai/post-tools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: post.id,
                    action,
                }),
            });

            if (!res.ok) throw new Error("AI failed");

            window.location.reload(); // مؤقتًا لحد ما نعمل تحديث state احترافي
        } catch (error) {
            console.error(error);
        } finally {
            setAiLoading(null);
        }
    };

    /* ---------------------- Content ---------------------- */

    const content = showFullContent
        ? post.content
        : post.content.slice(0, 200) +
        (post.content.length > 200 ? "..." : "");

    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-muted">

            {/* Cover Image */}
            {post.coverImage && (
                <Link href={`/posts/${post.id}`}>
                    <div className="relative w-full h-64 overflow-hidden">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </Link>
            )}

            {/* Content */}
            <CardContent className="p-6 space-y-4">

                {/* Title + AI Badge */}
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl leading-tight">
                        {showFullContent ? (
                            post.title
                        ) : (
                            <Link
                                href={`/posts/${post.id}`}
                                className="hover:underline"
                            >
                                {post.title}
                            </Link>
                        )}
                    </CardTitle>

                    {post.isAIEnhanced && (
                        <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                            <Sparkles className="w-3 h-3" />
                            AI
                        </span>
                    )}
                </div>

                {/* Content Preview */}
                <div className="text-muted-foreground text-sm leading-relaxed">
                    <MarkdownRenderer content={content} />
                </div>

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-muted px-2 py-1 rounded-md"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-4 px-6 py-4 border-t">

                {/* Author + Date */}
                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center space-x-3">
                        <Avatar>
                            <AvatarImage src={post.author.image || ""} />
                            <AvatarFallback>
                                {post.author.name?.[0] || "A"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-sm">
                            <p className="font-medium">
                                {post.author.name || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Interactions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            disabled={!session}
                            className="flex items-center gap-1"
                        >
                            <Heart
                                className={`h-4 w-4 ${likeLoading
                                    ? "animate-pulse"
                                    : liked
                                        ? "fill-red-500 text-red-500"
                                        : ""
                                    }`}
                            />
                            <span>{likeCount}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>{post._count.comments}</span>
                        </Button>
                    </div>
                </div>

                {/* Admin AI Controls */}
                {/* Admin AI Controls */}
                {isAdmin && (
                    <div className="flex gap-3 w-full">
                        <Link href={`/dashboard/rewrite/${post.id}`} className="flex-1">
                            <Button size="sm" variant="secondary" className="w-full">
                                ✨ Rewrite
                            </Button>
                        </Link>

                        <Link href={`/dashboard/seo/${post.id}`} className="flex-1">
                            <Button size="sm" variant="secondary" className="w-full">
                                ✨ Fix SEO
                            </Button>
                        </Link>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
