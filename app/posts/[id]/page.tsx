"use client";

import CommentSection from "@/components/posts/commentSection";
import CallToAction from "@/app/sections/public/callToAction";
import Footer from "@/app/sections/public/footer";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Post {
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    createdAt: string;
    _count: {
        comments: number;
        likes: number;
    };
}

export default function PostPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchPost(params.id as string);
        }
    }, [params.id]);

    const fetchPost = async (id: string) => {
        try {
            const response = await fetch(`/api/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPost(data);
                setLikes(data._count.likes);
            }
        } catch (error) {
            console.error("Failed to fetch post:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!post) return;

        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));

        await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="animate-pulse text-lg">Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Post not found</h1>
                <Link href="/" className="text-primary hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">

            {/* ===== HERO ===== */}
            <section className="relative h-[55vh] flex items-center justify-center text-white text-center">
                {post.coverImage && (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 px-4 max-w-3xl"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm mb-6 text-gray-300 hover:text-white transition"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {post.title}
                    </h1>
                </motion.div>
            </section>

            {/* ===== CONTENT ===== */}
            <main className="flex-1">

                <div className="max-w-5xl mx-auto px-4 py-16">

                    {/* Intro Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-2 gap-10 items-center mb-16"
                    >
                        {post.coverImage && (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="rounded-2xl shadow-lg object-cover w-full h-[300px]"
                            />
                        )}

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {post.content.slice(0, 300)}...
                        </p>
                    </motion.div>

                    {/* Full Content */}
                    <motion.article
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg max-w-none dark:prose-invert"
                    >
                        {post.content}
                    </motion.article>

                    {/* Likes + Comments Info */}
                    <div className="mt-16 flex items-center justify-between border-t pt-8">

                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all font-medium
                ${liked ? "bg-primary text-white" : "bg-muted hover:bg-primary/10"}`}
                        >
                            <Heart
                                className={liked ? "fill-white" : ""}
                                size={18}
                            />
                            {likes} Likes
                        </motion.button>

                        <div className="flex items-center text-primary gap-2 text-muted-foreground">
                            <MessageCircle size={18} />
                            {post._count.comments} Comments
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="mt-12">
                        <CommentSection postId={post.id} />
                    </div>

                </div>

                {/* ===== CALL TO ACTION ===== */}
                <CallToAction
                    title={
                        <>
                            Enjoyed This Article?{" "}
                            <span className="text-accent">Discover More Insights</span>
                        </>
                    }
                    description="Explore more powerful articles, writing tips, and AI-driven content strategies to grow your audience and level up your content game."
                    buttonText="Explore More Posts"
                    buttonLink="/posts"
                />

            </main>

            {/* ===== FOOTER ===== */}
            <Footer />

        </div>
    );
}
