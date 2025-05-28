import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Logo from "../../../Logo";

export function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900 text-white pt-20 pb-12"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Big N&M Logo */}
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="mb-10"
                    >
                        <img src="/logo.png" loading="lazy" className="h-20" />
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex space-x-8 mb-12"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                y: -5,
                                scale: 1.2,
                            }}
                            className="text-gray-400 hover:text-white transition-all"
                        >
                            <Github size={28} />
                        </motion.a>
                        <motion.a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                y: -5,
                                scale: 1.2,
                            }}
                            className="text-gray-400 hover:text-white transition-all"
                        >
                            <Linkedin size={28} />
                        </motion.a>
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="border-t border-gray-800 pt-8 w-full text-center"
                    >
                        <p className="text-gray-400">
                            &copy; {new Date().getFullYear()} Noureddine & Mohammed. Tous droits réservés.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
}