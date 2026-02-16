"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AboutHero from "@/app/sections/public/hero";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CallToAction from "@/app/sections/public/callToAction";

const faqs = [
    {
        question: "How do I create an account?",
        answer:
            "Currently, you can browse and save blogs without creating an account. In the future, we plan to introduce full account registration, which will allow you to personalize your experience, receive AI-driven recommendations, and sync your saved blogs across multiple devices.",
    },
    {
        question: "Can I save blogs for later reading?",
        answer:
            "Yes! Each blog post has a bookmark option that lets you save it for later. All your saved blogs will be organized in your personal library so you can easily access them anytime. This feature ensures you never lose track of the content you love.",
    },
    {
        question: "Is my data safe on WriteFlow AI?",
        answer:
            "Absolutely. We prioritize user privacy and data security. All your interactions, saved blogs, and preferences are encrypted and stored securely. We never share your personal information with third parties, and we follow industry best practices for security.",
    },
    {
        question: "How can I contact support?",
        answer:
            "You can contact our support team through multiple channels. Email us at support@roeya.com for detailed inquiries, or use Live Support during working hours for immediate assistance. Our team is dedicated to helping you resolve any issues efficiently.",
    },
    {
        question: "Do you offer content recommendations?",
        answer:
            "Yes! WriteFlow AI uses intelligent algorithms to analyze your reading patterns and suggest blogs that match your interests. These personalized recommendations help you discover new topics and authors that you might love, making your reading experience richer and more enjoyable.",
    },
    {
        question: "Can I customize my reading experience?",
        answer:
            "Absolutely! You can adjust font sizes for comfortable reading, switch between light and dark themes, and bookmark your favorite blogs. In future updates, we plan to add even more customization options to tailor the platform to your unique preferences.",
    },
    {
        question: "Are there any limitations on usage?",
        answer:
            "No. You can explore and read all blogs freely without any limitations. Our platform is designed to be fully accessible, allowing you to enjoy content without restrictions. Additional features may be added in the future, but basic usage will always remain unrestricted.",
    },
    {
        question: "Can I contribute my own blogs to WriteFlow AI?",
        answer:
            "Currently, WriteFlow AI focuses on curated content, but we plan to allow user submissions soon. This will let bloggers share their own content with our community, reach a wider audience, and get discovered by readers interested in their niche topics.",
    },
    {
        question: "How often is content updated?",
        answer:
            "We continuously update our platform with fresh and trending blogs. New content is added regularly based on popularity, quality, and relevance, ensuring that you always have access to the latest insights and perspectives across different topics.",
    },
    {
        question: "Can I interact with other users?",
        answer:
            "Yes! WriteFlow AI aims to build a community of readers and bloggers. In future updates, we will introduce features like comments, likes, and discussion threads so you can engage with other users, share your thoughts, and get feedback from the community.",
    },
    {
        question: "Do you have a mobile app?",
        answer:
            "Currently, WriteFlow AI is accessible via web on all devices. However, we are planning to launch a mobile app that will offer offline reading, push notifications, and enhanced personalization, so you can enjoy a seamless blogging experience on the go.",
    },
    {
        question: "How can I suggest new features?",
        answer:
            "We value user feedback greatly. You can suggest new features by contacting our support team or using the feedback form in your user dashboard. Every suggestion is reviewed by our team to help improve the platform for all users.",
    },
];


const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggleIndex = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

    return (
        <div className="bg-background text-textPrimary transition-colors min-h-screen">

            {/* Hero */}
            <AboutHero
                title="Frequently Asked Questions"
                breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
            />

            {/* FAQ Section */}
            <section className="py-20 max-w-5xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Got Questions? We’ve Got Answers</h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        Browse through our most frequently asked questions.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            className="bg-surface dark:bg-dark-surface rounded-xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleIndex(idx)}
                                className="w-full flex justify-between items-center p-5 text-left font-semibold text-accent transition-colors rounded-lg bg-white"
                            >
                                <span className="text-lg">{faq.question}</span>
                                {openIndex === idx ? (
                                    <FaChevronUp className="text-accent transition-transform" />
                                ) : (
                                    <FaChevronDown className="text-accent transition-transform" />
                                )}
                            </button>

                            {openIndex === idx && (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="px-5 pb-5 text-white dark:text-white bg-primary text-sm leading-relaxed pt-5"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Call To Action */}
            <CallToAction
                title={<>Still have questions? <span className="text-accent">Reach Out!</span></>}
                description="Our team is always ready to help you with any doubts or inquiries."
                buttonText="Contact Us"
                buttonLink="/contact"
            />
        </div>
    );
};

export default FAQPage;
