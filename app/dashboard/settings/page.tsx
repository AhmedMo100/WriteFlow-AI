"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/public/upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Setting = {
    id?: string;
    siteName: string;
    logo: string;
    favicon: string;
    socialLinks: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        youtube?: string;
    };
    contactInfo: {
        email?: string;
        phone?: string;
        address?: string;
    };
};

export default function SettingsPage() {
    const [setting, setSetting] = useState<Setting>({
        siteName: "",
        logo: "",
        favicon: "",
        socialLinks: {},
        contactInfo: {},
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data) setSetting(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSetting();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSetting((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSetting((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value },
        }));
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSetting((prev) => ({
            ...prev,
            contactInfo: { ...prev.contactInfo, [name]: value },
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const method = setting.id ? "PATCH" : "POST";
            const res = await fetch("/api/settings", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(setting),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save settings");

            setSetting(data);
            alert("Settings saved successfully!");
        } catch (err: any) {
            alert(err.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <p className="text-center py-16 text-text-secondary animate-pulse">
                Loading settings...
            </p>
        );

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto space-y-8">

                <h1 className="text-3xl font-bold text-text-primary">
                    Site Settings
                </h1>

                {/* Site Info */}
                <Card className="rounded-2xl border border-accent/20 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-primary">
                            Site Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Site Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                                Site Name
                            </label>
                            <input
                                name="siteName"
                                value={setting.siteName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-accent/30 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                            />
                        </div>

                        {/* Logo */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-text-primary">
                                Logo
                            </label>
                            <ImageUpload
                                onUpload={(url) =>
                                    setSetting((prev) => ({ ...prev, logo: url }))
                                }
                            />
                            {setting.logo && (
                                <img
                                    src={setting.logo}
                                    alt="Logo Preview"
                                    className="h-16 rounded-lg border border-accent/20 shadow-sm"
                                />
                            )}
                        </div>

                        {/* Favicon */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-text-primary">
                                Favicon
                            </label>
                            <ImageUpload
                                onUpload={(url) =>
                                    setSetting((prev) => ({ ...prev, favicon: url }))
                                }
                            />
                            {setting.favicon && (
                                <img
                                    src={setting.favicon}
                                    alt="Favicon Preview"
                                    className="h-12 rounded-lg border border-accent/20 shadow-sm"
                                />
                            )}
                        </div>

                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="rounded-2xl border border-accent/20 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-primary">
                            Social Links
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {["facebook", "twitter", "linkedin", "instagram", "youtube"].map(
                            (network) => (
                                <input
                                    key={network}
                                    name={network}
                                    value={
                                        setting.socialLinks?.[
                                        network as keyof typeof setting.socialLinks
                                        ] || ""
                                    }
                                    onChange={handleSocialChange}
                                    placeholder={network}
                                    className="w-full rounded-lg border border-accent/30 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                                />
                            )
                        )}
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="rounded-2xl border border-accent/20 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-primary">
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {["email", "phone", "address"].map((field) => (
                            <input
                                key={field}
                                name={field}
                                value={
                                    setting.contactInfo?.[
                                    field as keyof typeof setting.contactInfo
                                    ] || ""
                                }
                                onChange={handleContactChange}
                                placeholder={field}
                                className="w-full rounded-lg border border-accent/30 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary text-white hover:bg-primary/90 px-8 py-2 rounded-xl shadow-md transition"
                    >
                        {saving ? "Saving..." : "Save Settings"}
                    </Button>
                </div>

            </div>
        </div>
    );
}
