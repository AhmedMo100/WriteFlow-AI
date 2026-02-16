"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, MessageSquare, Pencil } from "lucide-react";

interface Post {
    id: number;
    title: string;
    status: "Published" | "Draft";
    createdAt: string;
}

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
}

interface Stats {
    totalPosts: number;
    draftPosts: number;
    publishedPosts: number;
    totalUsers: number;
    totalMessages: number;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentPosts, setRecentPosts] = useState<Post[]>([]);
    const [recentMessages, setRecentMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const res = await fetch("/api/dashboard/overview");
                const data = await res.json();

                setStats(data.stats);
                setRecentPosts(data.recentPosts);
                setRecentMessages(data.recentMessages);
            } catch (err) {
                console.error("Failed to fetch dashboard overview:", err);
            }
            setLoading(false);
        };

        fetchOverview();
    }, []);

    if (loading || !stats) {
        return (
            <p className="text-center py-16 text-text-secondary animate-pulse">
                Loading dashboard...
            </p>
        );
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                    Dashboard Overview
                </h2>

                <Link href="/dashboard/create-post">
                    <Button className="gap-2 bg-primary text-white hover:bg-accent transition">
                        <Pencil className="h-4 w-4" />
                        Quick Create Post
                    </Button>
                </Link>
            </div>

            {/* Stats Section */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {[
                    { title: "Total Posts", value: stats.totalPosts, icon: <FileText /> },
                    { title: "Draft Posts", value: stats.draftPosts, icon: <FileText /> },
                    { title: "Published Posts", value: stats.publishedPosts, icon: <FileText /> },
                    { title: "Total Users", value: stats.totalUsers, icon: <Users /> },
                    { title: "Total Messages", value: stats.totalMessages, icon: <MessageSquare /> },
                ].map((stat) => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>

            {/* Recent Posts + Messages */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* Recent Posts */}
                <Card className="border border-accent/20 shadow-md hover:shadow-lg transition hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="text-primary">Recent Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between rounded-lg border border-accent/20 p-4 hover:bg-accent/10 transition"
                                >
                                    <div>
                                        <p className="font-medium text-text-primary">{post.title}</p>
                                        <p className="text-sm text-text-secondary">
                                            {post.status} • {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="text-sm text-accent hover:underline"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Messages */}
                <Card className="border border-accent/20 shadow-md hover:shadow-lg transition hover:scale-[1.02]">
                    <CardHeader>
                        <CardTitle className="text-primary">Recent Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="rounded-lg border border-accent/20 p-4 bg-white hover:bg-accent/5 transition"
                                >
                                    <p className="font-semibold text-primary">{msg.name}</p>
                                    <p className="text-sm text-text-secondary">{msg.email}</p>
                                    <p className="mt-2 text-sm line-clamp-2 text-text-primary">
                                        {msg.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

/* ===================== Reusable Stat Card ===================== */
function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
    return (
        <Card className="border border-accent/20 shadow-md hover:shadow-lg transition hover:scale-[1.02]">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <p className="text-sm text-text-secondary">{title}</p>
                    <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
                </div>
                <div className="text-accent text-2xl">{icon}</div>
            </CardContent>
        </Card>
    );
}
