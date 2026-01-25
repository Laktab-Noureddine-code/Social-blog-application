import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, Star, Shield } from "lucide-react";

function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden hero-bg">
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-1 animate-pulse-glow"></div>
                <div className="orb orb-2 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
                <div className="orb orb-3 animate-pulse-glow" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Floating shapes */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-purple-500/20 backdrop-blur-sm"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-40 right-20 w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm"
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute bottom-40 left-1/4 w-12 h-12 rounded-lg bg-amber-500/20 backdrop-blur-sm"
                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white/90 text-sm font-medium mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Now with Real-time Messaging
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                            Build Your
                            <span className="block text-indigo-400">Professional Network</span>
                            & Share Ideas
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
                            A modern platform to publish, collaborate, and exchange in real-time. 
                            Connect with like-minded professionals and grow together.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <Link
                                to="/register"
                                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold text-lg hover:bg-white/20 transition-all">
                                <Play className="w-5 h-5" />
                                Watch Demo
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                            <div className="flex items-center gap-2 text-gray-300">
                                <div className="p-2 rounded-lg bg-white/10">
                                    <Users className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">10K+</p>
                                    <p className="text-xs">Active Users</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <div className="p-2 rounded-lg bg-white/10">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">4.9/5</p>
                                    <p className="text-xs">User Rating</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <div className="p-2 rounded-lg bg-white/10">
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Secure</p>
                                    <p className="text-xs">End-to-End</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Floating UI Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Card */}
                            <motion.div
                                className="glass-card rounded-3xl p-6 glow"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Mock Feed Post */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-gray-800">Sarah Chen</p>
                                            <span className="text-xs text-gray-500">• 2h ago</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">Just published my new article on modern web development practices! 🚀</p>
                                    </div>
                                </div>
                                <div className="w-full h-40 rounded-xl bg-indigo-100 mb-4"></div>
                                <div className="flex items-center gap-4 text-gray-500 text-sm">
                                    <span>❤️ 234</span>
                                    <span>💬 56</span>
                                    <span>🔗 12</span>
                                </div>
                            </motion.div>

                            {/* Floating Notification Card */}
                            <motion.div
                                className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">✓</div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">New Connection</p>
                                        <p className="text-xs text-gray-500">Alex joined your network</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Stats Card */}
                            <motion.div
                                className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-xl"
                                animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-lg">📈</div>
                                    <div>
                                        <p className="font-bold text-gray-800">+127%</p>
                                        <p className="text-xs text-gray-500">Profile Views</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f4f5f5"/>
                </svg>
            </div>
        </section>
    );
}

export default HeroSection;
