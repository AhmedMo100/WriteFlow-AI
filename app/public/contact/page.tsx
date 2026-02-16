// src/features/contact/pages/Contact.jsx

import Hero from "@/app/sections/public/hero";
import ContactForm from "@/app/sections/contact/form";
import Methods from "@/app/sections/contact/methods";
import ResponsePromise from "@/app/sections/contact/responsePromise";

const Contact = () => {
    return (
        <main className="bg-light.background dark:bg-dark.background transition-colors duration-300">
            {/* Hero Section */}
            <Hero
                title="Contact Us"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Contact" }
                ]}
            />

            {/* Methods */}
            <Methods />

            {/* Contact Form */}
            <ContactForm />

             {/* Response Promise */}
            <ResponsePromise />
        </main>
    );
};

export default Contact;
