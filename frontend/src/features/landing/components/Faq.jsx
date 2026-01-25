import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from "@/shared/ui/accordion";

const faqs = [
    {
        question: "Is it free to use?",
        answer: "Yes, registration and platform use are completely free. Enjoy all features without spending a cent."
    },
    {
        question: "Can I publish code in my blogs?",
        answer: "Absolutely! Our blog editor allows you to embed code, images, videos, and external links easily with syntax highlighting."
    },
    {
        question: "How do I join a group?",
        answer: "Search for the group you're interested in, then click 'Join'. You'll immediately have access to discussions and shared files."
    },
    {
        question: "Can I chat with my friends?",
        answer: "Yes, you can send private messages to your contacts or chat in groups using our real-time messaging system."
    },
    {
        question: "Do I receive real-time notifications?",
        answer: "Of course! You'll be instantly notified for every new message, reaction, or invitation on the platform."
    },
    {
        question: "Can I create my own page or group?",
        answer: "Yes, every user can create dedicated pages for their projects or launch thematic groups to build a community around a shared passion."
    }
];

export default function FaqSection() {
    return (
        <section id="faq" className="py-24 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                        <HelpCircle size={16} />
                        Support
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Frequently Asked
                        <span className="text-indigo-600"> Questions</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about the platform
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={`q${index + 1}`}
                                value={`q${index + 1}`}
                                className="group bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <AccordionTrigger className="cursor-pointer text-lg font-semibold text-gray-900 px-6 py-5 hover:bg-gray-100 transition-colors w-full text-left flex items-center justify-between">
                                    <span>{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 px-6 pb-5 pt-0 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:support@example.com"
                        className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
