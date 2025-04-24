import { motion } from "framer-motion";
import { User,  Users,  MessageSquare, PenLine, LayoutGrid, Send } from "lucide-react";

const features = [
    {
        bg : "bg-blue-50",
        icon: <User size={38} className="text-blue-700" />,
        title: "Profil personnalisé",
        desc: "Construis ton identité numérique, partage tes passions et connecte-toi avec une communauté engagée.",
    },
    {
        bg: "bg-green-50",
        icon: <PenLine size={38} className="text-green-600" />,
        title: "Création de blogs",
        desc: "Exprime-toi librement avec des articles riches en texte, images, vidéos, liens et même du code.",
    },
    {
        bg: "bg-purple-50",
        icon: <MessageSquare size={38} className="text-purple-600" />,
        title: "Commentaires & réactions",
        desc: "Interagis avec les publications grâce aux commentaires et réactions pour créer un vrai échange.",
    },
    {
        bg: "bg-pink-50",
        icon: <Users size={38} className="text-pink-600" />,
        title: "Groupes thématiques",
        desc: "Crée ou rejoins des groupes autour de tes centres d’intérêt pour partager et apprendre ensemble.",
    },
    {
        bg: "bg-yellow-50",
        icon: <LayoutGrid size={38} className="text-yellow-600" />,
        title: "Pages & abonnements",
        desc: "Suis des pages inspirantes ou crée les tiennes pour diffuser du contenu ciblé à ta communauté.",
    },
    {
        bg: "bg-red-50",
        icon: <Send size={38} className="text-red-600" />,
        title: "Messagerie & notifications",
        desc: "Discute en temps réel avec tes amis et reçois des notifications instantanées pour rester connecté.",
    },
];


export default function Features() {
    return (
        <section id="features" className="py-24 px-4 md:px-0 max-w-7xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl mb-12 font-bold text-center"
            >
                Fonctionnalités Clés
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feat, i) => (
                    <motion.div
                        key={feat.title}
                        className="flex min-h-[300px] py-10 border border-gray-300 items-center justify-between bg-white p-6 rounded-xl shadow-lg hover:shadow-xl flex-col gap-4 h-full"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                    >
                        <div className="flex flex-col justify-center gap-4 items-center">
                            <div className={`flex-shrink-0 p-6 my-5 ${feat.bg}  rounded-full`}>{feat.icon}</div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
                            </div>
                        </div>
                        <p className="text-gray-700 text-center">{feat.desc}</p>
                        
                    </motion.div>
                ))}
            </div>
        </section>
    );
}