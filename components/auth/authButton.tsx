"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthButton() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Button
                variant="ghost"
                disabled
                className="cursor-wait text-[var(--color-text-secondary)]"
            >
                Loading...
            </Button>
        );
    }

    if (!session) {
        return (
            <Button
                onClick={() => signIn("google")}
                variant="outline"
                className="text-white border-0 bg-primary hover:text-white hover:bg-accent transition-colors"
            >
                Sign In
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 p-0 rounded-full overflow-hidden bg-primary transition-colors"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={session.user?.image || ""}
                            alt={session.user?.name || ""}
                        />
                        <AvatarFallback className="text-sm font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]">
                            {session.user?.name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-64 p-1 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl"
                align="end"
                forceMount
            >
                {/* User Info */}
                <DropdownMenuItem
                    className="flex flex-col space-y-0.5 p-3 cursor-default hover:bg-transparent"
                    disabled
                >
                    <p className="text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] leading-none">
                        {session.user?.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] leading-none">
                        {session.user?.email}
                    </p>
                </DropdownMenuItem>

                {/* Sign out */}
                <DropdownMenuItem
                    className="mt-1 rounded-md text-white hover:bg-[var(--color-primary)]/10 dark:hover:bg-[var(--color-accent)]/20 transition-colors"
                    onClick={() => signOut()}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
