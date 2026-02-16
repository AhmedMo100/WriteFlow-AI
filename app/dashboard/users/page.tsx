"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch users");

        if (!ignore) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err.message || "Something went wrong");
          setLoading(false);
        }
      }
    }

    fetchUsers();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-center py-16 text-text-secondary animate-pulse">Loading users...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;
  if (users.length === 0) return <p className="text-center py-16 text-text-secondary">No users found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-text-primary">Users</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card
              key={user.id}
              className="p-6 border border-accent/20 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition bg-white"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-semibold text-text-primary">{user.name || "No Name"}</h2>
                  <p className="text-sm text-text-secondary">{user.email || "No Email"}</p>
                  <p className="text-sm text-accent capitalize">{user.role}</p>
                  <p className="text-xs text-text-secondary">
                    Created at: {format(new Date(user.createdAt), "PPP p")}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 transition"
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
