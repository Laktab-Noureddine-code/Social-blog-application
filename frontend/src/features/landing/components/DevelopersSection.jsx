import { motion } from "framer-motion";
import { Github, Linkedin, Code2 } from "lucide-react";

const developers = [
    {
        name: "Noureddine Laktab",
        role: "Full-Stack Developer",
        img: "/noureddine.jpg",
        bio: "Expert in building high-performance web applications with React for interfaces and Laravel for backend.",
        skills: ["React", "Laravel", "TypeScript", "MySQL"],
        accentColor: "text-indigo-600",
        borderColor: "border-indigo-600",
        links: [
            { icon: <Github size={20} />, url: "https://github.com/Laktab-Noureddine-code", label: "GitHub" },
            { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/noureddine-laktab-171087305", label: "LinkedIn" },
        ]
    },
    {
        name: "Mohammed Triou",
        role: "Full-Stack Developer",
        img: "/mohammed.jpg",
        bio: "Specialist in full-stack web solutions combining the power of React with the elegance of Laravel.",
        skills: ["React", "Laravel", "JavaScript", "PHP"],
        accentColor: "text-cyan-600",
        borderColor: "border-cyan-600",
        links: [
            { icon: <Github size={20} />, url: "https://github.com/TRIOU-MOHAMMED", label: "GitHub" },
            { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/mohammed-triou-19b618326/", label: "LinkedIn" },
        ]
    }
];

export function DevelopersSection() {
    return (
        <section id="developers" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                        <Code2 size={16} />
                        Development Team
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Meet the
                        <span className="text-indigo-600"> Creators</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        The creative minds behind this platform
                    </p>
                </motion.div>

                {/* Developer Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {developers.map((dev, index) => (
                        <motion.div
                            key={dev.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            viewport={{ once: true }}
                            className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
                            whileHover={{ y: -8 }}
                        >
                            <div className="relative flex flex-col items-center text-center">
                                {/* Avatar */}
                                <motion.div
                                    className={`mb-6 p-1 rounded-full border-4 ${dev.borderColor}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img
                                        src={dev.img}
                                        alt={dev.name}
                                        className="w-36 h-36 object-cover rounded-full"
                                    />
                                </motion.div>

                                {/* Name & Role */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dev.name}</h3>
                                <p className={`${dev.accentColor} font-semibold mb-4`}>
                                    {dev.role}
                                </p>

                                {/* Bio */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {dev.bio}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 justify-center mb-6">
                                    {dev.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-4">
                                    {dev.links.map((link, i) => (
                                        <motion.a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -3, scale: 1.1 }}
                                            className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}