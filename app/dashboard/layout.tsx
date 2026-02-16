import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth"; // حسب مكان ملفك
import { ToastProvider } from "@/components/ui/toast";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    if (session.user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="flex h-screen bg-background text-text-primary">
            {/* Sidebar */}
            <aside className="hidden md:flex w-[260px] border-r border-border bg-surface">
                <Sidebar />
            </aside>

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                
                {/* Navbar */}
                <header className="h-[70px] border-b border-border bg-surface">
                    <Navbar />
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
                    {children}
                </main>
            </div>

            <ToastProvider />
        </div>
    );
}
