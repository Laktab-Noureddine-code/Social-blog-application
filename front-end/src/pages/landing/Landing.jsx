// components
import Navbar from '../../components/pages/landing/Navbar'
import HeroSection from '../../components/pages/landing/HeroSection'
import Features from '../../components/pages/landing/Features'
import FaqSection from '../../components/pages/landing/Faq'
import { DevelopersSection } from '../../components/pages/landing/DevelopersSection'
import { Footer } from '../../components/pages/landing/Footer'

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

