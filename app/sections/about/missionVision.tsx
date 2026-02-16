"use client";

import { FaBullseye, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const missionVision = [
    {
        icon: <FaBullseye size={28} />,
        title: "Our Mission",
        description:
            "Empower bloggers and readers alike by providing a platform that makes creating, sharing, and discovering content effortless and enjoyable.",
    },
    {
        icon: <FaEye size={28} />,
        title: "Our Vision",
        description:
            "To become the go-to platform for bloggers worldwide, fostering a community where quality content thrives and readers find value every day.",
    },
];

const MissionVision = () => {
    return (
        <section className="py-20 bg-white transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-sm">
                        Our Mission & Vision
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        Discover what drives us and the goals we aim to achieve for our users.
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {missionVision.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className={`
                                group p-8 rounded-2xl shadow-md flex flex-col items-center text-center
                                ${idx === 0 ? "bg-accent text-white" : "bg-surface text-textPrimary"}
                                hover:shadow-xl transition-shadow duration-300
                            `}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            <div className={`mb-4 ${idx === 0 ? "text-white" : "text-primary"}`}>
                                {item.icon}
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${idx === 0 ? "text-white" : "text-textPrimary"}`}>
                                {item.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${idx === 0 ? "text-white/90" : "text-textSecondary"}`}>
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionVision;
