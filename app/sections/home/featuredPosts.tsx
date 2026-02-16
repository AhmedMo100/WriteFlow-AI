// src/features/home/components/FeaturedBlogs.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function FeaturedPosts() {
    const featuredBlogs = await prisma.post.findMany({
        where: {
            featured: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });

    if (!featuredBlogs.length) return null;

    return (
        <section className="py-20 bg-background transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Featured Blogs for You
                    </h2>
                    <p className="mt-2 text-textSecondary max-w-2xl mx-auto">
                        Explore the most interesting blogs carefully selected to enrich your reading experience.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {featuredBlogs.map((post) => (
                        <Link
                            key={post.id}
                            href={`/posts/${post.id}`}
                            className="group relative rounded-2xl overflow-hidden shadow-lg
                         bg-surface dark:bg-white text-textPrimary
                         transform transition-all duration-700 ease-in-out
                         hover:-rotate-2 hover:scale-105 hover:shadow-2xl motion-reduce:transform-none"
                        >
                            {/* Image */}
                            <div className="h-48 w-full overflow-hidden">
                                <Image
                                    src={post.coverImage || "https://source.unsplash.com/600x400/?blog"}
                                    alt={post.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover
                             transition-transform duration-700 ease-in-out
                             group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col space-y-3 transition-colors duration-500 ease-in-out">
                                <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-500 ease-in-out">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-textSecondary line-clamp-3">
                                    {post.content.slice(0, 120)}...
                                </p>

                                <span className="inline-block px-4 py-2 rounded-lg font-medium transition-all duration-500 ease-in-out
                                 bg-primary text-white group-hover:bg-accent hover:shadow-lg">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/public/posts"
                        className="inline-block px-6 py-3 rounded-lg bg-accent text-white font-semibold shadow hover:opacity-90 transition duration-500 ease-in-out"
                    >
                        View All Blogs →
                    </Link>
                </div>
            </div>
        </section>
    );
}
