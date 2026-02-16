"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

const ContactForm = () => {
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        message: "",
        subject: "",
        phoneNumber: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Validation errors
    const [validationErrors, setValidationErrors] = useState<{
        subject?: string;
        phoneNumber?: string;
        message?: string;
    }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        // Clear validation error on change
        setValidationErrors((prev) => ({
            ...prev,
            [e.target.name]: undefined,
        }));
    };

    const validate = () => {
        const errors: typeof validationErrors = {};

        if (!formData.subject.trim()) {
            errors.subject = "Subject is required.";
        } else if (formData.subject.trim().length < 3) {
            errors.subject = "Subject must be at least 3 characters.";
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required.";
        } else if (!/^\d{11}$/.test(formData.phoneNumber.trim())) {
            errors.phoneNumber = "Phone number must be exactly 11 digits.";
        }

        if (!formData.message.trim()) {
            errors.message = "Message is required.";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!session) {
            setError("You must be logged in to send a message.");
            return;
        }

        if (!validate()) return;

        setIsSubmitting(true);
        setSuccess(null);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to send message");

            setSuccess("Your message has been sent successfully!");
            setFormData({ message: "", subject: "", phoneNumber: "" });
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-white transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Send Us a Message
                    </h2>
                    <p className="mt-3 text-textSecondary text-lg">
                        Have a question or a project in mind? Fill out the form and we’ll get back to you.
                    </p>
                </div>

                {/* Login prompt */}
                {!session && (
                    <div className="mb-6 text-center text-red-600">
                        You must be logged in to send a message.{" "}
                        <button
                            onClick={() => signIn()}
                            className="underline font-semibold"
                        >
                            Login
                        </button>
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-dark.card rounded-2xl shadow-lg p-10 space-y-6"
                >
                    {/* Feedback */}
                    {success && <p className="text-green-600 text-center font-medium">{success}</p>}
                    {error && <p className="text-red-600 text-center font-medium">{error}</p>}

                    {/* Subject */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-primary">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Your subject here..."
                            className="px-4 py-3 rounded-lg border border-gray-300 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                            disabled={!session}
                        />
                        {validationErrors.subject && (
                            <p className="text-red-600 text-sm">{validationErrors.subject}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-primary">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Your phone number..."
                            className="px-4 py-3 rounded-lg border border-gray-300 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                            disabled={!session}
                        />
                        {validationErrors.phoneNumber && (
                            <p className="text-red-600 text-sm">{validationErrors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-primary">Message *</label>
                        <textarea
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            className="px-4 py-3 rounded-lg border border-gray-300 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition"
                            disabled={!session}
                        />
                        {validationErrors.message && (
                            <p className="text-red-600 text-sm">{validationErrors.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            disabled={!session || isSubmitting}
                            className={`inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
