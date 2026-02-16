"use client";

import { FaEnvelope, FaComments, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const methods = [
    {
        icon: <FaEnvelope size={32} />,
        title: "Email Us",
        description: "Reach out anytime and we’ll get back to you as soon as possible.",
        value: "support@roeya.com",
        isPrimary: true,
        link: "mailto:support@roeya.com",
    },
    {
        icon: <FaComments size={32} />,
        title: "Live Support",
        description: "Chat with our team during working hours for quick help.",
        value: "Mon – Fri, 9am – 6pm",
        isPrimary: false,
    },
    {
        icon: <FaQuestionCircle size={32} />,
        title: "Help Center",
        description: "Find answers to FAQs and learn how to use our platform.",
        value: "Browse FAQs",
        isPrimary: false,
        link: "/public/faq",
    },
];

const Methods = () => {
    return (
        <section className="py-24 bg-light.background dark:bg-dark.background transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Get in Touch
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        Choose the most convenient way to reach us. We’re always happy to help.
                    </p>
                </div>

                {/* Methods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {methods.map((method, idx) => (
                        <motion.div
                            key={idx}
                            className={`
                                p-8 rounded-2xl shadow-md flex flex-col items-center text-center transition-all
                                ${method.isPrimary
                                    ? "bg-accent text-white shadow-2xl scale-[1.05]"
                                    : "bg-surface text-textPrimary hover:shadow-xl"
                                }
                            `}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, rotate: [-1, 1, -1], transition: { duration: 0.4, ease: "easeInOut" } }}
                        >
                            {/* Icon */}
                            <div className={`mb-4 p-4 rounded-full ${method.isPrimary ? "bg-white/20" : "bg-primary/10"} transition`}>
                                {method.icon}
                            </div>

                            {/* Title */}
                            <h3 className={`text-xl font-semibold mb-2 ${method.isPrimary ? "text-white" : "text-textPrimary"}`}>
                                {method.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm mb-4 ${method.isPrimary ? "text-white/90" : "text-textSecondary"}`}>
                                {method.description}
                            </p>

                            {/* Value with link if exists */}
                            {method.link ? (
                                <Link
                                    href={method.link}
                                    className={`text-sm font-medium ${method.isPrimary ? "text-white underline hover:text-white/80" : "text-primary underline hover:text-primary/80"}`}
                                >
                                    {method.value}
                                </Link>
                            ) : (
                                <span className={`text-sm font-medium ${method.isPrimary ? "text-white" : "text-primary"}`}>
                                    {method.value}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Methods;
