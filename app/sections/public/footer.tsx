import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-surface dark:bg-surface text-textSecondary transition-colors border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* 🔹 Navigation Links */}
                <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    {[
                        { label: "Home", href: "/" },
                        { label: "About", href: "/about" },
                        { label: "Blogs", href: "/blogs" },
                        { label: "Contact", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="font-medium text-textSecondary hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* 🔹 Social Icons */}
                <div className="flex items-center gap-6 text-textPrimary">
                    <a
                        href="#"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaFacebookF size={18} />
                    </a>

                    <a
                        href="#"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaTwitter size={18} />
                    </a>

                    <a
                        href="#"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        <FaLinkedinIn size={18} />
                    </a>
                </div>

                {/* 🔹 Copyright */}
                <p className="text-sm text-textSecondary text-center md:text-right">
                    © {new Date().getFullYear()} Blogify Pro. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
