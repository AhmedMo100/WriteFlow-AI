// src/features/about/components/Achievements.tsx
import { FaUsers, FaPenFancy, FaComment, FaRocket } from "react-icons/fa";

const stats = [
    {
        icon: <FaUsers size={32} className="text-white" />,
        number: "12K+",
        label: "Active Users",
    },
    {
        icon: <FaPenFancy size={32} className="text-primary" />,
        number: "3.5K+",
        label: "Published Blogs",
    },
    {
        icon: <FaComment size={32} className="text-green-500" />,
        number: "25K+",
        label: "Comments",
    },
    {
        icon: <FaRocket size={32} className="text-yellow-500" />,
        number: "150+",
        label: "Features Released",
    },
];

const Achievements = () => {
    return (
        <section className="py-20 bg-light.surface dark:bg-dark.surface transition-colors">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Our Achievements
                    </h2>
                    <p className="mt-3 text-textSecondary max-w-2xl mx-auto">
                        A glimpse at what we have accomplished and how we have grown with our users.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`
                flex flex-col items-center space-y-2 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300
                ${idx === 0 ? "bg-accent text-white" : "bg-background text-textPrimary dark:text-textPrimary"}
                `}
                        >
                            <div className="mb-2">{stat.icon}</div>
                            <span className={`text-2xl font-bold ${idx === 0 ? "text-white" : "text-textPrimary"}`}>
                                {stat.number}
                            </span>
                            <span className={`${idx === 0 ? "text-white/90" : "text-textSecondary"}`}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
