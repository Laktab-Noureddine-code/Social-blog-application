import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, FileText, MessageCircle, Globe } from "lucide-react";

const stats = [
    {
        icon: <Users className="w-8 h-8" />,
        value: 10000,
        suffix: "+",
        label: "Active Users",
        bgColor: "bg-indigo-600"
    },
    {
        icon: <FileText className="w-8 h-8" />,
        value: 50000,
        suffix: "+",
        label: "Posts Shared",
        bgColor: "bg-pink-600"
    },
    {
        icon: <MessageCircle className="w-8 h-8" />,
        value: 100000,
        suffix: "+",
        label: "Messages Sent",
        bgColor: "bg-cyan-600"
    },
    {
        icon: <Globe className="w-8 h-8" />,
        value: 50,
        suffix: "+",
        label: "Countries",
        bgColor: "bg-emerald-600"
    }
];

function Counter({ value, suffix = "" }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2.5,
            ease: "easeOut",
            onUpdate: (v) => setDisplayValue(Math.floor(v))
        });
        return controls.stop;
    }, [value]);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
        }
        return num.toString();
    };

    return (
        <span className="text-4xl md:text-5xl font-bold text-white">
            {formatNumber(displayValue)}{suffix}
        </span>
    );
}

export default function StatsSection() {
    return (
        <section id="stats" className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 hero-bg"></div>
            
            {/* Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-1 animate-pulse-glow"></div>
                <div className="orb orb-2 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Join a growing community of professionals building meaningful connections.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="stat-card rounded-2xl p-6 md:p-8 text-center backdrop-blur-sm"
                        >
                            {/* Icon */}
                            <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                                <div className="text-white">
                                    {stat.icon}
                                </div>
                            </div>

                            {/* Counter */}
                            <div className="mb-2">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>

                            {/* Label */}
                            <p className="text-gray-300 font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
