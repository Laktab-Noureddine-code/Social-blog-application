import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const developers = [
    {
        name: "Noureddine Laktab",
        role: "Développeur Full-Stack",
        img: "/noureddine.jpg",
        bio: "Expert en création d'applications web performantes avec React pour les interfaces et Laravel pour le backend.",
        links: [
            { icon: <Github />, url: "https://github.com/Laktab-Noureddine-code" },
            { icon: <Linkedin />, url: "https://www.linkedin.com/in/noureddine-laktab-171087305" },
        ]
    },
    {
        name: "Mohammed Triou",
        role: "Développeur Full-Stack",
        img: "/mohammed.jpg",
        bio: "Spécialiste des solutions web full-stack combinant la puissance de React et l'élégance de Laravel.",
        links: [
            { icon: <Github />, url: "https://github.com/TRIOU-MOHAMMED" },
            { icon: <Linkedin />, url: "https://www.linkedin.com/in/mohammed-triou-19b618326/" },
        ]
    }
];

export function DevelopersSection() {
    return (
        <section id="developpeurs" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">L&apos;Équipe Technique</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Les esprits créatifs derrière cette plateforme
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
                            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    className="mb-6 rounded-full p-1 border-gray-300"
                                >
                                    <img
                                        src={dev.img}
                                        alt={dev.name}
                                        className="w-40 h-40 object-cover rounded-full border-4 border-white"
                                    />
                                </motion.div>

                                <h3 className="text-2xl font-bold text-gray-900">{dev.name}</h3>
                                <p className="text-blue-600 mb-4 font-medium">{dev.role}</p>
                                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{dev.bio}</p>

                                <div className="flex space-x-5">
                                    {dev.links.map((link, i) => (
                                        <motion.a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{
                                                y: -5,
                                            }}
                                            className={`text-gray-600  ${link.icon === <Github />
                                                ? "hover:text-black"
                                                : "hover:text-blue-600 "} 
                                            transition-all`}
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