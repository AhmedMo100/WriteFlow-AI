"use client";

import { FaNodeJs, FaFigma, FaMobileAlt } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";
import { motion } from "framer-motion";

const technologies = [
    {
        icon: <FaNodeJs size={36} className="text-primary" />,
        name: "Node.js",
    },
    {
        icon: <SiPostgresql size={36} className="text-white" />,
        name: "PostgreSQL",
    },
    {
        icon: <SiNextdotjs size={48} className="text-primary" />,
        name: "Next.js",
    },
    {
        icon: <FaFigma size={36} className="text-white" />,
        name: "Figma",
    },
    {
        icon: <FaMobileAlt size={36} className="text-primary/90" />,
        name: "Mobile UI/UX",
    },
];

const Technologies = () => {
    return (
        <section className="py-20 bg-linear-to-bl from-primary via-primary/95 to-primary/75">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                        Technologies & Tools We Use
                    </h2>
                    <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                        Leveraging modern technologies to build a scalable and efficient platform.
                    </p>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 justify-items-center">
                    {technologies.map((tech, idx) => {
                        const isCenter = idx === 2; // Next.js في المنتصف

                        return (
                            <motion.div
                                key={idx}
                                className="flex flex-col items-center space-y-3 cursor-pointer"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                                whileHover={{
                                    scale: isCenter ? 1.2 : 1.1,
                                    rotate: isCenter ? [0, 5, -5, 0] : [0, 3, -3, 0],
                                    transition: { duration: 0.6, ease: "easeInOut" },
                                }}
                            >
                                <div
                                    className={`flex items-center justify-center rounded-full transition-all 
                                        ${isCenter
                                            ? "w-28 h-28 bg-white shadow-lg"
                                            : "w-20 h-20 bg-accent shadow-md"
                                        }`}
                                >
                                    {tech.icon}
                                </div>
                                <span className="text-white font-medium">{tech.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Technologies;
