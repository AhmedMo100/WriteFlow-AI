"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

interface CallToActionProps {
    title: ReactNode;          // ممكن يكون نص أو JSX
    description: string;
    buttonText: string;
    buttonLink: string;
    gradientColors?: string;   // background gradient class
}

export default function CallToAction({
    title,
    description,
    buttonText,
    buttonLink,
    gradientColors = "bg-gradient-to-bl from-primary via-primary/95 to-primary/75",
}: CallToActionProps) {
    return (
        <section
            className={`${gradientColors} text-white py-24 relative overflow-hidden transition-colors`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left Content */}
                <div className="flex-1 space-y-6 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto md:mx-0">
                        {description}
                    </p>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Link
                            href={buttonLink}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg shadow-lg hover:bg-accent hover:text-white transition-all duration-300"
                        >
                            {buttonText} <FaBookOpen className="ml-3" />
                        </Link>
                    </motion.div>
                </div>

                {/* Right Graphic */}
                <div className="flex-1 hidden md:flex justify-center relative">
                    {/* Floating animated circles */}
                    <motion.div
                        className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    />
                    <motion.div
                        className="absolute top-20 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    />

                    <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center shadow-lg">
                        <FaBookOpen size={64} className="text-white/70 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
