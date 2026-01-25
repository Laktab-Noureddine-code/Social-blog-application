// Components
import Navbar from '@/features/landing/components/Navbar'
import HeroSection from '@/features/landing/components/HeroSection'
import Features from '@/features/landing/components/Features'
import StatsSection from '@/features/landing/components/StatsSection'
import TestimonialsSection from '@/features/landing/components/TestimonialsSection'
import FaqSection from '@/features/landing/components/Faq'
import { DevelopersSection } from '@/features/landing/components/DevelopersSection'
import { Footer } from '@/features/landing/components/Footer'

export default function Landing() {
    return (
        <div className='min-h-screen'>
            {/* Fixed Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <main>
                {/* Hero Section with dark gradient */}
                <HeroSection />
                
                {/* Features Section */}
                <Features />
                
                {/* Stats Section */}
                <StatsSection />
                
                {/* Testimonials Section */}
                <TestimonialsSection />
                
                {/* Developers/Team Section */}
                <DevelopersSection />
                
                {/* FAQ Section */}
                <FaqSection />
                
                {/* Footer */}
                <Footer />
            </main>
        </div>
    )
}
