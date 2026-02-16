// src/features/contact/components/ResponsePromise.tsx
"use client";

import { FaClock, FaShieldAlt } from "react-icons/fa";

const promises = [
    {
        icon: <FaClock size={24} className="text-accent" />,
        text: "Response within 24 hours",
    },
    {
        icon: <FaShieldAlt size={24} className="text-accent" />,
        text: "Your information is always safe",
    },
];

const ResponsePromise = () => {
    return (
        <section className="py-24 bg-linear-to-bl from-primary via-primary/80 to-primary/60 transition-colors">
            <div className="max-w-5xl mx-auto px-6 text-center">

                {/* Top Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg animate-pulse">
                        <FaClock size={40} className="text-white/90" />
                    </div>
                </div>

                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    We Respect Your Time
                </h2>

                {/* Description */}
                <p className="mt-4 text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
                    Once you reach out, our team carefully reviews your message and responds as quickly as possible. Your inquiries are always our priority.
                </p>

                {/* Promise Cards */}
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
                    {promises.map((promise, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-14 h-14 flex items-center justify-center bg-accent/20 rounded-full">
                                {promise.icon}
                            </div>
                            <span className="text-white font-medium text-lg">{promise.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResponsePromise;
