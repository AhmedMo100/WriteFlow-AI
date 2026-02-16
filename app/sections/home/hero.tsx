import { prisma } from "@/lib/prisma";
import { FaBlog } from "react-icons/fa";
import Link from "next/link";

async function getFeaturedPost() {
    try {
        const post = await prisma.post.findFirst({
            where: {
                featured: true,
                published: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return post;
    } catch (error) {
        console.error("Error fetching featured post:", error);
        return null;
    }
}

export default async function HeroSection() {
    const randomPost = await getFeaturedPost();

    return (
        <section className="relative py-25 bg-white text-textPrimary transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Top Hero Content */}
                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 pb-16">
                    <div className="lg:w-1/2 text-center lg:text-left space-y-6">


                        <p className="text-lg md:text-xl text-textSecondary">
                            Create high-quality content effortlessly, leverage AI tools,
                            and grow your audience with confidence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/public/posts"
                                className="px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:opacity-90 transition"
                            >
                                Explore Blogs
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:w-1/2 flex justify-center">
                        <div
                            className="w-80 h-80 rounded-full flex items-center justify-center
                            shadow-lg bg-linear-to-tr from-primary via-primary/75 to-primary/55
                            animate-bounce-slow"
                        >
                            <FaBlog size={64} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                {randomPost && (
                    <div className="mt-14 rounded-xl bg-surface p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-lg font-medium text-textPrimary">
                            ✨ Featured Blog:{" "}
                            <span className="text-primary">
                                {randomPost.title}
                            </span>
                        </p>

                        <Link
                            href={`/posts/${randomPost.id}`}
                            className="px-5 py-2 rounded-lg bg-accent text-white shadow hover:opacity-90 transition"
                        >
                            Read Now
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
