// src/features/about/pages/About.jsx

// Sections
import Achievements from "@/app/sections/about/acheivements";
import MissionVision from "@/app/sections/about/missionVision";
import Technologies from "@/app/sections/about/technologies";
import Values from "@/app/sections/about/values";
import CallToAction from "@/app/sections/public/callToAction";
import Hero from "@/app/sections/public/hero";;

const About = () => {
    return (
        <main className="bg-light.background dark:bg-dark.background transition-colors duration-300">
            {/* Hero Breadcrumb */}
            <Hero
                title="About WriteFlowAI"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "About" } // هنا مفيش href يبقى disabled
                ]}
            />

            {/* Mission Vision */}
            <MissionVision />

            {/* Values */}
            <Values />

            {/* Technologies */}
            <Technologies />

            {/* Achievemnts */}
            <Achievements />

            {/* Call To Action */}
            <CallToAction
                title={<>Want to Know More About <span className="text-accent">WriteFlow AI</span>?</>}
                description="Contact us to learn how we can help you grow your audience."
                buttonText="Contact Us"
                buttonLink="/public/contact"
            />
        </main>
    );
};

export default About;
