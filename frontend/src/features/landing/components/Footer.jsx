import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
    product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#" },
        { label: "Security", href: "#" },
        { label: "Roadmap", href: "#" },
    ],
    company: [
        { label: "About", href: "#developers" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
    ],
    resources: [
        { label: "Help Center", href: "#faq" },
        { label: "Community", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Status", href: "#" },
    ],
    legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
    ],
};

const socialLinks = [
    { icon: <Github size={22} />, url: "#", label: "GitHub" },
    { icon: <Linkedin size={22} />, url: "#", label: "LinkedIn" },
    { icon: <Twitter size={22} />, url: "#", label: "Twitter" },
    { icon: <Mail size={22} />, url: "mailto:contact@example.com", label: "Email" },
];

export function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gray-900 text-white overflow-hidden"
        >
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <img src="/logo.png" loading="lazy" className="h-12 mb-6" alt="Logo" />
                        <p className="text-gray-400 mb-6 max-w-xs">
                            Building the future of professional networking. Connect, share, and grow together.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Noureddine & Mohammed. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        Made with <Heart size={16} className="text-red-500" fill="currentColor" /> in Morocco
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}