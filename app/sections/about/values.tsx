"use client";

import { FaHandsHelping, FaLightbulb, FaShieldAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const values = [
    {
        icon: <FaHandsHelping size={28} />,
        title: "User-Centric",
        description:
            "Everything we build is focused on providing the best experience for our users.",
    },
    {
        icon: <FaLightbulb size={28} />,
        title: "Innovation",
        description:
            "Constantly exploring new ideas and AI-powered tools to improve blogging.",
    },
    {
        icon: <FaShieldAlt size={28} />,
        title: "Security",
        description:
            "Ensuring data privacy and platform security for all users.",
    },
    {
        icon: <FaUsers size={28} />,
        title: "Community",
        description:
            "Fostering a community of bloggers and readers to share insights and grow together.",
    },
];

const Values = () => {
    return (
        <section className="py-20 bg-background transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-sm">
                        Our Core Values
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        These principles guide our decisions and shape the experience we provide.
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            className={`
                                p-6 rounded-2xl shadow-md flex flex-col items-center text-center
                                ${idx === values.length - 1 ? 'bg-accent text-white' : 'bg-surface text-textPrimary'}
                            `}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                            whileHover={{
                                scale: 1.05,
                                rotate: [-2, 2, -1, 1, 0],
                                transition: { duration: 0.5, ease: "easeInOut" },
                            }}
                        >
                            {/* Icon */}
                            <div className={`mb-4 ${idx === values.length - 1 ? 'text-white' : 'text-primary'}`}>
                                {value.icon}
                            </div>

                            {/* Title */}
                            <h3 className={`text-xl font-semibold mb-2 ${idx === values.length - 1 ? 'text-white' : 'text-textPrimary'}`}>
                                {value.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm leading-relaxed ${idx === values.length - 1 ? 'text-white/90' : 'text-textSecondary'}`}>
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
