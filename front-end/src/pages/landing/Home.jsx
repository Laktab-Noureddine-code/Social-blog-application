import React from 'react'

// components
import Navbar from '../../components/pages/landing/Navbar'
import HeroSection from '../../components/pages/landing/HeroSection'
import Features from '../../components/pages/landing/Features'
import HowItWorks from '../../components/pages/landing/HowItWorks'


export default function Home() {
    return (
        <div className='bg-[#f4f5f5] min-h-[300vh] pt-12'>
            <header className='z-999 sticky top-4 bg-white md:max-w-7xl mx-auto rounded-3xl border border-gray-100 py-2 px-4 shadow-lg'>
                <Navbar />
            </header>
            <main>
                <HeroSection />
                <Features/>
                <HowItWorks/>
            </main>
        </div>
    )
}

