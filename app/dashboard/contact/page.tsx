"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

type ContactMessage = {
    id: string;
    message: string;
    subject: string | null;
    phoneNumber: string | null;
    read: boolean;
    createdAt: string;
    author: {
        id: string;
        name: string | null;
        email: string | null;
    };
};

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/contact");
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to fetch messages");

                setMessages(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading messages...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    if (messages.length === 0)
        return <p className="text-center mt-10">No messages found.</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Messages</h1>

            <div className="space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="border rounded-xl p-6 shadow-sm bg-white dark:bg-dark.card transition"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="font-semibold text-lg">{msg.subject || "No Subject"}</h2>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${msg.read ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {msg.read ? "Read" : "Unread"}
                            </span>
                        </div>

                        <p className="text-textSecondary mb-4">{msg.message}</p>

                        <div className="flex justify-between text-sm text-textSecondary">
                            <span>
                                From: {msg.author.name || msg.author.email || "Unknown"}
                                {msg.phoneNumber ? ` | Phone: ${msg.phoneNumber}` : ""}
                            </span>
                            <span>{format(new Date(msg.createdAt), "PPP p")}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
