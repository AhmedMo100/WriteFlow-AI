"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    coverImage?: string;
    tags: string[];
    author: {
        name: string;
        image?: string;
    };
    _count: {
        likes: number;
        comments: number;
    };
    featured: boolean;
    isAIEnhanced: boolean;
}

interface PostsShowcaseProps {
    posts: Post[];
}

export default function PostsShowcase({ posts }: PostsShowcaseProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
                <motion.div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.03, rotate: 0.5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                >
                    {/* Image + Link */}
                    {post.coverImage && (
                        <Link href={`/posts/${post.id}`} className="relative w-full h-48 overflow-hidden">
                            <motion.img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05, rotate: 0.3 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </Link>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-semibold mb-2 text-primary">{post.title}</h3>

                        {/* Content snippet */}
                        <p className="text-sm text-textSecondary flex-1">
                            {post.content.length > 150 ? post.content.slice(0, 150) + "..." : post.content}
                        </p>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium transition-all hover:bg-accent hover:text-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Author & Stats */}
                        <div className="mt-4 flex items-center justify-between text-xs text-textSecondary">
                            <div className="flex items-center gap-2">
                                {post.author.image && (
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                )}
                                <span>{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span>{post._count.likes} ❤️</span>
                                <span>{post._count.comments} 💬</span>
                            </div>
                        </div>

                        {/* Read More button */}
                        <Link
                            href={`/posts/${post.id}`}
                            className="mt-4 w-full text-center block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-all font-medium"
                        >
                            Read More
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
