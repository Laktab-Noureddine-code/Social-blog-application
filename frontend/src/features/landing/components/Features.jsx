import { motion } from "framer-motion";
import { User, Users, MessageSquare, PenLine, LayoutGrid, Send, Zap } from "lucide-react";

const features = [
    {
        bgColor: "bg-blue-600",
        icon: <User size={28} className="text-white" />,
        title: "Custom Profile",
        desc: "Build your digital identity, share your passions, and connect with an engaged community.",
    },
    {
        bgColor: "bg-emerald-600",
        icon: <PenLine size={28} className="text-white" />,
        title: "Blog Creation",
        desc: "Express yourself freely with rich articles featuring text, images, videos, links, and code.",
    },
    {
        bgColor: "bg-violet-600",
        icon: <MessageSquare size={28} className="text-white" />,
        title: "Comments & Reactions",
        desc: "Interact with posts through comments and reactions to create meaningful exchanges.",
    },
    {
        bgColor: "bg-pink-600",
        icon: <Users size={28} className="text-white" />,
        title: "Thematic Groups",
        desc: "Create or join groups around your interests to share and learn together.",
    },
    {
        bgColor: "bg-amber-600",
        icon: <LayoutGrid size={28} className="text-white" />,
        title: "Pages & Subscriptions",
        desc: "Follow inspiring pages or create your own to share targeted content with your community.",
    },
    {
        bgColor: "bg-cyan-600",
        icon: <Send size={28} className="text-white" />,
        title: "Real-time Messaging",
        desc: "Chat in real-time with friends and receive instant notifications to stay connected.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-0 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4"
                    >
                        <Zap size={16} />
                        Powerful Features
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything You Need to
                        <span className="text-indigo-600"> Succeed</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A complete platform designed to help you build connections, share ideas, and grow your network.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            variants={itemVariants}
                            className="feature-card group relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            {/* Icon */}
                            <div className={`inline-flex p-4 rounded-2xl ${feat.bgColor} mb-6 shadow-lg`}>
                                {feat.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-all">
                                {feat.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feat.desc}
                            </p>

                            {/* Arrow on hover */}
                            <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Learn more
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}