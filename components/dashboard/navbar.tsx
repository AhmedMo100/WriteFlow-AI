"use client";

import { Menu, Bell } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import AuthButton from "@/components/auth/authButton";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex h-[70px] items-center justify-between border-b border-border bg-surface/80 backdrop-blur-md px-4 md:px-8">
            
            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Mobile Sidebar */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden hover:bg-primary/10 transition"
                            aria-label="Open navigation menu"
                        >
                            <Menu className="h-5 w-5 text-primary" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="p-0 w-[260px] bg-primary"
                    >
                        {/* Required for accessibility (Radix / shadcn fix) */}
                        <SheetTitle className="sr-only">
                            Dashboard Navigation
                        </SheetTitle>
                        <SheetDescription className="sr-only">
                            Sidebar navigation links for the dashboard
                        </SheetDescription>

                        <Sidebar />
                    </SheetContent>
                </Sheet>

                {/* Welcome Text */}
                <div className="hidden sm:flex flex-col">
                    <h1 className="text-lg font-semibold text-accent">
                        Welcome back{" "}
                        <span className="block text-xs text-black">
                            Let’s manage your platform efficiently today.
                        </span>
                    </h1>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-primary/10 transition"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5 text-text-secondary" />
                </Button>

                {/* Auth */}
                <AuthButton />
            </div>
        </header>
    );
}
