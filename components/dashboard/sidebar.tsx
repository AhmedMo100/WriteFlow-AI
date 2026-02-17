"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Users,
    BarChart,
    Settings,
    User,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navigation = [
    {
        title: "Main",
        items: [
            { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
            { title: "Posts", href: "/dashboard/posts", icon: FileText },
            { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
        ],
    },
    {
        title: "Management",
        items: [
            { title: "Users", href: "/dashboard/users", icon: Users },
            { title: "Analytics", href: "/dashboard/analytics", icon: BarChart },
        ],
    },
    {
        title: "System",
        items: [
            { title: "Settings", href: "/dashboard/settings", icon: Settings },
            { title: "Profile", href: "/dashboard/profile", icon: User },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="h-screen w-[260px] flex flex-col bg-primary text-white shadow-2xl">

            {/* Logo */}
            <div className="flex h-[70px] items-center justify-center border-b border-white/10 text-xl font-bold tracking-wide">
                <Link href="/dashboard" className="hover:opacity-80 transition">
                    WriteFlow AI
                </Link>
            </div>

            {/* Navigation - Centered Vertically */}
            <div className="flex-1 flex flex-col justify-center px-6">

                <div className="space-y-10">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                                {section.title}
                            </p>

                            <div className="space-y-2">
                                {section.items.map((item) => {
                                    const isActive =
                                        pathname === item.href ||
                                        pathname.startsWith(item.href + "/");

                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={cn(
                                                "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-white text-primary shadow-lg"
                                                    : "text-white/80 hover:bg-accent hover:text-white"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-4 w-4 transition",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-white/70 group-hover:text-white"
                                                )}
                                            />
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6">
                <button
                    onClick={() => signOut()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
