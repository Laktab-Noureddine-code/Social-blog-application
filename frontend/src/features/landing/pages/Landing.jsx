// Components
import Navbar from "@/features/landing/components/Navbar";
import HeroSection from "@/features/landing/components/HeroSection";
import HelpSection from "@/features/landing/components/HelpSection";
import Features from "@/features/landing/components/Features";
import HowItWorks from "@/features/landing/components/HowItWorks";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import NewsletterSection from "@/features/landing/components/NewsletterSection";
import { Footer } from "@/features/landing/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Help Section - "We're here to help you find new friends" */}
        <HelpSection />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Newsletter Section - "Stay up to date" */}
        <NewsletterSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
