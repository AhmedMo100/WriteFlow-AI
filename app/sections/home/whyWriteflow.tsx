"use client";

import { FaBookmark, FaStar, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <FaBookmark size={28} />,
        title: "Save Your Favorites",
        description: "Easily bookmark and organize the blogs you love for quick access anytime.",
    },
    {
        icon: <FaStar size={28} />,
        title: "Curated Content",
        description: "Get the best blogs selected for you, so you never miss high-quality content.",
    },
    {
        icon: <FaLightbulb size={28} />,
        title: "Smart Recommendations",
        description: "Receive personalized blog suggestions powered by AI to match your interests.",
    },
    {
        icon: <FaShieldAlt size={28} />,
        title: "Secure Experience",
        description: "Your reading history and saved blogs are safe and private with our secure platform.",
    },
];

export default function WhyWriteFlowAI() {
    return (
        <section className="py-24 bg-white transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Why Users Love WriteFlow AI
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        Discover how our platform makes reading, discovering, and saving blogs effortless.
                    </p>
                </div>

                {/* Features with animation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const isLast = idx === features.length - 1;
                        return (
                            <motion.div
                                key={idx}
                                className={`group p-6 rounded-2xl shadow-md 
                                    ${isLast ? "bg-white text-textPrimary" : "bg-accent text-white"}
                                    transform transition-all duration-500 ease-in-out
                                    hover:-translate-y-2 hover:scale-105 hover:shadow-xl`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6 }}
                            >
                                <div
                                    className={`mb-4 flex items-center justify-center w-12 h-12 rounded-full
                                        ${isLast ? "bg-primary/10 text-primary" : "bg-white text-primary"}`}
                                >
                                    {feature.icon}
                                </div>

                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p
                                    className={`text-sm leading-relaxed ${
                                        isLast ? "text-textSecondary" : "text-white/90"
                                    }`}
                                >
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Call-to-action button */}
                <div className="text-center mt-12">
                    <Link
                        href="/public/about"
                        className="inline-block px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-accent transition"
                    >
                        Learn More About Us →
                    </Link>
                </div>
            </div>
        </section>
    );
}
