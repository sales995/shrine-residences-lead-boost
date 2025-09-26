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
import StickyCTABar from "@/components/StickyCTABar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "Luxury Homes on GST Road | Shriram Residences — 3 & 4 BHK | Virtual Tours for NRIs";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Discover premium 3 & 4 BHK homes on GST Main Road. RERA approved, IT-corridor connectivity, bank tie-ups & NRI-friendly virtual tours. Book yours now."
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
      
      {/* Sticky Bottom CTA Bar */}
      <StickyCTABar />
    </div>
  );
};

export default Index;
