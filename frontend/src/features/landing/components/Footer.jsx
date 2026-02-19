import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: <Facebook size={20} />, url: "#", label: "Facebook" },
  { icon: <Twitter size={20} />, url: "#", label: "Twitter" },
  { icon: <Instagram size={20} />, url: "#", label: "Instagram" },
  { icon: <Youtube size={20} />, url: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-8 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-2 rounded-full text-[#636E72] hover:text-[#2A7B88] hover:bg-[#EFF5EC] transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#636E72] text-sm">
            &copy; {new Date().getFullYear()} Noureddine & Mohammed. All rights
            reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}