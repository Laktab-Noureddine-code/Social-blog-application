import React from 'react'
// components
import { LoginForm } from './LoginForm'

// framer motion library
import { motion } from "framer-motion";
function HeroSection() {
    return (
        <motion.div initial={{
            y: 100,
            opacity: 0
        }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                duration: 1,
                ease: 'easeOut'

            }}
            className="relative min-h-screen overflow-hidden ">
            {/* Content container with text */}
            <div className="relative w-full mx-auto px-4 py-16 text-center">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl mx-auto">
                    Développez Votre Réseau Professionnel & Partagez Vos Idées
                </h1>
                <LoginForm />
                <h2 className="text-xl md:text-2xl max-w-2xl mx-auto">
                    Une plateforme moderne pour publier, collaborer et échanger en temps réel.
                </h2>
            </div>
        </motion.div>
    )
}

export default HeroSection
