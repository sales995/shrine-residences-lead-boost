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
import NetworkStatus from "@/components/NetworkStatus";
import { OfferPopup } from "@/components/OfferPopup";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEOHead from "@/components/SEOHead";
import FAQBlock from "@/components/FAQBlock";

const Index = () => {
  useScrollAnimation();

  // FAQPage Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the RERA number of Shriram Park 63?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shriram Park 63 is RERA approved with registration number TN/01/Building/0072/2018."
        }
      },
      {
        "@type": "Question",
        name: "How far is Shriram Park 63 from Chennai Airport?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shriram Park 63 is located approximately 11.8 km from Chennai International Airport, easily accessible via GST Road."
        }
      },
      {
        "@type": "Question",
        name: "What amenities are offered at Shriram Park 63?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shriram Park 63 offers 40+ world-class amenities including clubhouse, swimming pool, gymnasium, library, mini theatre, tennis courts, badminton courts, children's play area, landscaped gardens, and 24/7 security."
        }
      },
      {
        "@type": "Question",
        name: "What is the size of 3 BHK flats at Shriram Park 63?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 3 BHK flats at Shriram Park 63 Perungalathur range from 1725 to 1970 square feet, offering spacious and comfortable living spaces."
        }
      },
      {
        "@type": "Question",
        name: "Is bank loan available for Shriram Park 63?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Shriram Park 63 has 90% bank loan approval from leading banks and financial institutions, making it easier for buyers to purchase their dream home."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead 
        path="/" 
        title="Shriram Properties Park 63 – Premium 3 BHK Apartments in Chennai"
        description="Discover Shriram Properties Park 63 in Chennai — premium 3 BHK apartments with world-class amenities, seamless connectivity, and strong investment potential. Schedule your visit today!"
        additionalSchema={faqSchema}
      />
      
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
          <FAQBlock />
          <LeadFormSection />
          <ContactSection />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <WhatsAppFloat />
        
        {/* Sticky Bottom CTA Bar */}
        <StickyCTABar />
        
        {/* Network Status Indicator */}
        <NetworkStatus />
        
        {/* Offer Popup */}
        <OfferPopup />
      </div>
    </>
  );
};

export default Index;
