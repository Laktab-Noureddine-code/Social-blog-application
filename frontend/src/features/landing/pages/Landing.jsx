// components
import Navbar from '@/features/landing/components/Navbar'
import HeroSection from '@/features/landing/components/HeroSection'
import Features from '@/features/landing/components/Features'
import FaqSection from '@/features/landing/components/Faq'
import { DevelopersSection } from '@/features/landing/components/DevelopersSection'
import { Footer } from '@/features/landing/components/Footer'

export default function Landing() {
    return (
        <div className='bg-[#f4f5f5] min-h-[300vh] pt-8'>
            <header className='z-999 sticky top-4 bg-white md:max-w-7xl mx-auto rounded-3xl border border-gray-100 py-2 px-4 shadow-md'>
                <Navbar />
            </header>
            <main>
                <HeroSection />
                <Features/>
                <DevelopersSection/>
                <FaqSection/>
                <Footer/>
            </main>
        </div>
    )
}

