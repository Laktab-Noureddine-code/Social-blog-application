import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/components/ui/accordion";

export default function FaqSection() {
    return (
        <section id="faq" className="max-w-2xl mx-auto py-10 px-3">
            <h2 className="text-[40px] font-bold mb-8 text-center">FAQ – Questions fréquentes</h2>
            <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="q1" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">C’est gratuit&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Oui, l’inscription et l’utilisation de la plateforme sont entièrement gratuites. Profitez de toutes les fonctionnalités sans débourser un centime.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">Puis-je publier du code dans mes blogs&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Absolument ! Notre éditeur de blogs vous permet d’intégrer du code, des images, des vidéos et même des liens externes facilement.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">Comment rejoindre un groupe&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Recherchez le groupe qui vous intéresse, puis cliquez sur “Rejoindre”. Vous aurez immédiatement accès aux discussions et aux fichiers partagés du groupe.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">Est-ce que je peux discuter avec mes amis&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Oui, vous pouvez envoyer des messages privés à vos contacts ou discuter dans les groupes grâce à notre messagerie en temps réel.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q5" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">Est-ce que je reçois des notifications en temps réel&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Bien sûr&nbsp;! Vous êtes averti instantanément pour chaque nouveau message, réaction, ou invitation sur la plateforme.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q6" className="group">
                    <AccordionTrigger className="cursor-pointer text-xl bg-gray-50 px-3">Puis-je créer ma propre page ou groupe&nbsp;?</AccordionTrigger>
                    <AccordionContent className="text-lg bg-gray-100 border-b border-gray-400 p-3">
                        Oui, chaque utilisateur peut créer des pages dédiées à ses projets ou lancer des groupes thématiques pour rassembler une communauté autour d’une passion commune.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </section>
    );
}
