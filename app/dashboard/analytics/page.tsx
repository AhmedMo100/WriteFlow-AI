"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FaUsers, FaFileAlt, FaEnvelope, FaEye, FaHeart } from "react-icons/fa";

interface AnalyticsData {
  totalUsers: number;
  totalPosts: number;
  totalMessages: number;
  totalViews: number;
  totalLikes: number;
  trend: { day: string; users: number; posts: number; messages: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
      setLoading(false);
    };

    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-text-secondary animate-pulse">Loading analytics...</p>
      </div>
    );
  }

  const cards = [
    { title: "Total Users", value: data.totalUsers, icon: <FaUsers className="text-3xl text-primary" /> },
    { title: "Total Posts", value: data.totalPosts, icon: <FaFileAlt className="text-3xl text-accent" /> },
    { title: "Total Messages", value: data.totalMessages, icon: <FaEnvelope className="text-3xl text-yellow-500" /> },
    { title: "Total Views", value: data.totalViews, icon: <FaEye className="text-3xl text-pink-500" /> },
    { title: "Total Likes", value: data.totalLikes, icon: <FaHeart className="text-3xl text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-text-primary">Dashboard Analytics</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-accent/20 shadow-md hover:shadow-xl hover:scale-[1.02] transition bg-white"
            >
              {/* Icon */}
              <div className="flex-shrink-0">{card.icon}</div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-secondary font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-text-primary">{card.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trend Chart */}
        <Card className="p-6 rounded-2xl border border-accent/20 shadow-md hover:shadow-lg transition bg-white">
          <h2 className="text-xl font-semibold mb-4 text-text-primary">Last 7 Days Trend</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fill: "var(--color-text-secondary)" }} />
              <YAxis tick={{ fill: "var(--color-text-secondary)" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="var(--color-primary)" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="posts" stroke="var(--color-accent)" />
              <Line type="monotone" dataKey="messages" stroke="#facc15" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
}
