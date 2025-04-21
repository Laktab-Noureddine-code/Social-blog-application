import { motion } from "framer-motion";
import { User, Book, Group, MessageCircleDashed } from "lucide-react";

const steps = [
    {
        icon: <User size={32} className="text-blue-600" />,
        title: "Étape 1 : Inscription",
        desc: "Créez un compte en quelques clics pour débuter votre aventure professionnelle.",
    },
    {
        icon: <Book size={32} className="text-green-600" />,
        title: "Étape 2 : Complétez votre profil",
        desc: "Ajoutez vos informations et valorisez votre expertise.",
    },
    {
        icon: <Group size={32} className="text-purple-600" />,
        title: "Étape 3 : Rejoignez des groupes",
        desc: "Trouvez des communautés adaptées à vos intérêts et échangez avec vos pairs.",
    },
    {
        icon: <MessageCircleDashed size={32} className="text-pink-600" />,
        title: "Étape 4 : Participez activement",
        desc: "Publiez, commentez et développez votre réseau en toute simplicité.",
    },
];

export default function HowItWorks() {
    return (
        <>
            <section className="py-20 max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-4xl mb-10 font-bold text-center"
                >
                    Comment ça marche&nbsp;?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            className="bg-white rounded-xl p-6 shadow border flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.13 }}
                        >
                            <div className="mb-3">{step.icon}</div>
                            <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            </>
    );
}
