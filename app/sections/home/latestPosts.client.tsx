"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
    id: string;
    title: string;
    content: string;
    coverImage?: string;
    slug: string;
}

interface Props {
    posts: Post[];
}

export default function LatestPostsClient({ posts }: Props) {
    return (
        <section className="py-24 bg-background transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Latest Blogs for You
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        Explore, read, and save the most interesting blogs curated for our users.
                    </p>
                </div>

                {/* Blogs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            className={`group rounded-xl overflow-hidden shadow-md flex flex-col ${idx === 0
                                ? "bg-accent text-white"
                                : "bg-surface text-textPrimary"
                                }`}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ scale: 1.03, y: -3, transition: { duration: 0.3 } }}
                        >
                            {/* Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={post.coverImage || "https://source.unsplash.com/600x400/?blog"}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col grow">
                                <h3 className={`text-lg font-semibold mb-2 ${idx === 0 ? "text-white" : "text-textPrimary"}`}>
                                    {post.title}
                                </h3>

                                <p className={`text-sm grow leading-relaxed ${idx === 0 ? "text-white/90" : "text-textSecondary"}`}>
                                    {post.content.slice(0, 120)}...
                                </p>

                                <Link
                                    href={`/posts/${post.id}`}
                                    className={`mt-4 inline-flex items-center gap-1 font-medium transition ${idx === 0
                                        ? "text-white/90 hover:text-white"
                                        : "text-primary hover:underline"
                                        }`}
                                >
                                    Read More →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/public/posts"
                        className="inline-block px-6 py-3 rounded-lg bg-accent text-white font-semibold shadow hover:opacity-90 transition"
                    >
                        View All Blogs →
                    </Link>
                </div>
            </div>
        </section>
    );
}
