
import { motion } from "framer-motion";
import { User, MessageCircle, Bell, Users } from "lucide-react";

const features = [
    {
        icon: <User size={38} className="text-blue-600" />,
        title: "Créez votre profil",
        desc: "Connectez-vous avec des professionnels partout dans le monde et personnalisez votre présence."
    },
    {
        icon: <MessageCircle size={38} className="text-green-600" />,
        title: "Groupes & discussions",
        desc: "Rejoignez des groupes à thème, échangez, collaborez et partagez vos idées en temps réel."
    },
    {
        icon: <Users size={38} className="text-purple-600" />,
        title: "Réseautage avancé",
        desc: "Découvrez des pages, des communautés et agrandissez votre réseau pro facilement."
    },
    {
        icon: <Bell size={38} className="text-pink-600" />,
        title: "Notifications en direct",
        desc: "Recevez des notifications instantanées pour ne rien manquer : messages, réactions, invitations, etc."
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-0 max-w-5xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl mb-12 font-bold text-center"
            >
                Fonctionnalités Clés
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {features.map((feat, i) => (
                    <motion.div
                        key={feat.title}
                        className="bg-white p-6 rounded-xl shadow border flex gap-6 items-start"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                    >
                        <div className="flex-shrink-0">{feat.icon}</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                            <p className="text-gray-700">{feat.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}