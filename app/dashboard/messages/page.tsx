"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactMessage {
  id: string;
  message: string;
  subject?: string;
  phoneNumber?: string;
  read: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/contactMessages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-text-primary">Contact Messages</h1>

        {loading ? (
          <p className="text-center py-16 text-text-secondary animate-pulse">
            Loading messages...
          </p>
        ) : messages.length > 0 ? (
          <div className="space-y-6">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                className="rounded-2xl border border-accent/30 shadow-md hover:shadow-lg transition hover:scale-[1.02]"
              >
                <CardHeader className="px-6 pt-4">
                  <CardTitle className="text-lg font-semibold text-text-primary">
                    {msg.subject || "No Subject"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-4 space-y-3">

                  {/* Message Info */}
                  <div className="flex flex-col gap-1 text-sm text-text-secondary">
                    <p><strong>From:</strong> {msg.author.name}</p>
                    <p><strong>Phone:</strong> {msg.phoneNumber || "N/A"}</p>
                    <p className="line-clamp-3">{msg.message}</p>
                    <p className="text-xs text-text-secondary">
                      Sent: {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700 transition"
                      onClick={() => deleteMessage(msg.id)}
                    >
                      Delete
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-16 text-text-secondary">
            No messages found.
          </p>
        )}

      </div>
    </div>
  );
}
