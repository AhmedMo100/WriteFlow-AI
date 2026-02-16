"use client";

import { useState, useEffect } from "react";
import AboutHero from "@/app/sections/public/hero";
import SearchInput from "@/app/sections/public/searchInput";
import SortDropdown from "@/app/sections/blogs/sortDropdown";
import Pagination from "@/components/public/pagination";
import PostsShowcase from "@/app/sections/blogs/postsShowcase";
import CallToAction from "@/app/sections/public/callToAction";

export default function PostsPage() {
    // States
    const [posts, setPosts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [selectedSort, setSelectedSort] = useState("Newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch posts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append("search", search);
                if (selectedSort) params.append("sort", selectedSort);
                params.append("page", currentPage.toString());
                params.append("limit", "6");

                const res = await fetch(`/api/posts?${params.toString()}`);
                const data = await res.json();

                setPosts(data.posts);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
            }
            setLoading(false);
        };

        fetchData();
    }, [search, selectedSort, currentPage]);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <AboutHero
                title="All Posts"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Posts" },
                ]}
            />

            <main className="min-w-9/12 mx-auto px-4 my-8 py-8 max-w-5xl space-y-8">
                {/* Search + Sort Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search posts..."
                        className="flex-1"
                    />

                    <SortDropdown
                        selected={selectedSort}
                        onSelect={setSelectedSort}
                        className="w-full sm:w-48"
                    />
                </div>

                {/* Posts Showcase */}
                {loading ? (
                    <p className="text-center py-10">Loading posts...</p>
                ) : posts.length > 0 ? (
                    <PostsShowcase posts={posts} />
                ) : (
                    <p className="text-center py-10">No posts found.</p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}

            </main>
            {/* ===== CALL TO ACTION ===== */}
            <CallToAction
                title={
                    <>
                        Ready to Create Content That <span className="text-accent">Stands Out</span>?
                    </>
                }
                description="Start writing smarter with AI-powered tools, publish engaging articles, and grow your audience faster than ever."
                buttonText="Start Writing Now"
                buttonLink="/dashboard"
            />
        </div>
    );
}
