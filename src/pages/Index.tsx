import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import OffersSection from "@/components/OffersSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadFormSection from "@/components/LeadFormSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "Shriram Residences - Luxury 3 & 4 BHK Homes with Premium Amenities";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Discover luxury living at Shriram Residences. Spacious 3 & 4 BHK homes with world-class amenities, prime location, and easy bank loan approval. Call 9655355525."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Sections */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <OffersSection />
        <GallerySection />
        <TestimonialsSection />
        <LeadFormSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
