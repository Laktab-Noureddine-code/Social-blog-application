import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Product Designer",
        avatar: "SC",
        avatarColor: "bg-indigo-600",
        rating: 5,
        quote: "This platform has completely transformed how I network with other professionals. The real-time messaging is incredibly smooth!"
    },
    {
        name: "Marcus Johnson",
        role: "Software Engineer",
        avatar: "MJ",
        avatarColor: "bg-cyan-600",
        rating: 5,
        quote: "I love how easy it is to share code snippets in my blog posts. The developer experience is top-notch."
    },
    {
        name: "Emma Williams",
        role: "Marketing Lead",
        avatar: "EW",
        avatarColor: "bg-pink-600",
        rating: 5,
        quote: "The groups feature helped me find like-minded marketers. We share strategies and learn from each other daily."
    },
    {
        name: "David Kim",
        role: "Startup Founder",
        avatar: "DK",
        avatarColor: "bg-amber-600",
        rating: 5,
        quote: "Best platform for building a professional network. Clean UI, fast performance, and great community."
    },
    {
        name: "Lisa Anderson",
        role: "UX Researcher",
        avatar: "LA",
        avatarColor: "bg-emerald-600",
        rating: 5,
        quote: "The notification system keeps me updated without being overwhelming. Perfect balance of features!"
    },
    {
        name: "James Wilson",
        role: "Content Creator",
        avatar: "JW",
        avatarColor: "bg-violet-600",
        rating: 5,
        quote: "Creating and managing my page is so intuitive. My content reaches the right audience every time."
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function TestimonialsSection() {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                        <Star size={16} fill="currentColor" />
                        User Reviews
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Loved by
                        <span className="text-indigo-600"> Professionals</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See what our community members have to say about their experience.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            variants={itemVariants}
                            className="testimonial-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4">
                                <Quote className="w-8 h-8 text-indigo-200" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="text-amber-400" fill="currentColor" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-bold`}>
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
