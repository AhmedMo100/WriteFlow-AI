"use client";

import { useState } from "react";
import AuthButton from "@/components/auth/authButton";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "About", href: "/public/about" },
    { name: "Blogs", href: "/public/posts" },
    { name: "Contact", href: "/public/contact" },
    { name: "FAQ", href: "/public/faq" },
];

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary hover:opacity-80 transition"
                >
                    WriteFlow AI
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <ul className="flex space-x-10">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-gray-600 font-medium relative px-1 py-1
                  hover:text-primary transition-colors
                  after:absolute after:left-0 after:-bottom-1
                  after:w-0 after:h-0.5 after:bg-accent
                  after:transition-all after:duration-300
                  hover:after:w-full"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center">
                    <AuthButton />
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-700"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t transition-all duration-300 overflow-hidden ${open ? "max-h-96 py-4" : "max-h-0"
                    }`}
            >
                <ul className="flex flex-col items-center space-y-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="text-gray-700 text-lg font-medium hover:text-primary transition"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <AuthButton />
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
