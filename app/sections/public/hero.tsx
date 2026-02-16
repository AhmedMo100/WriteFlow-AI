// src/features/about/components/ui/about/AboutHero.tsx
import Link from "next/link";

interface AboutHeroProps {
    title: string;
    breadcrumb?: {
        label: string;
        href?: string; // لو مش موجود يبقى disabled
    }[];
}

const Hero = ({ title, breadcrumb }: AboutHeroProps) => {
    return (
        <section className="bg-linear-to-bl from-primary via-primary/95 to-primary/75 h-32 flex items-center justify-center text-white">
            <div className="text-center space-y-1 px-6">
                {/* Title */}
                <h1 className="text-2xl font-bold">{title}</h1>

                {/* Breadcrumbs */}
                {breadcrumb && (
                    <nav className="flex justify-center items-center space-x-2 text-sm text-white/90">
                        {breadcrumb.map((item, idx) => (
                            <span key={idx} className="flex items-center gap-1">
                                {item.href ? (
                                    <Link href={item.href} className="hover:underline">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="opacity-50 cursor-not-allowed">{item.label}</span>
                                )}
                                {idx < breadcrumb.length - 1 && <span>/</span>}
                            </span>
                        ))}
                    </nav>
                )}
            </div>
        </section>
    );
};

export default Hero;
