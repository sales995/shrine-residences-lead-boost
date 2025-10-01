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

const Index = () => {
  useScrollAnimation();

  // Update page title, meta description, and Schema markup for SEO
  useEffect(() => {
    document.title = "Shriram Park 63 Perungalathur - 2/3/4 BHK Flats on GST Road. Limited Offers";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content", 
        "Shriram Park 63 Perungalathur - Luxury 2, 3 & 4 BHK Flats on GST Road. Limited Ready-to-Move Inventory. RERA Approved. Get Latest Price List & Exclusive Offers."
      );
    }

    // Add Schema Markup for Real Estate Project
    const schema = {
      "@context": "https://schema.org",
      "@type": "RealEstateProject",
      "name": "Shriram Park 63",
      "description": "Premium residential township offering 2, 3 & 4 BHK flats in Perungalathur, Chennai. 57-acre township with 40+ amenities overlooking Vandalur Forest Reserve.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "GST Road",
        "addressLocality": "Perungalathur",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600063",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.9103",
        "longitude": "80.0897"
      },
      "telephone": "+91-9655355525",
      "priceRange": "₹1.48 Cr onwards",
      "amenityFeature": [
        "Clubhouse",
        "Swimming Pool",
        "Gymnasium",
        "Library",
        "Mini Theatre",
        "Games Room",
        "Yoga/Meditation Room",
        "Convenience Store",
        "Multipurpose Hall"
      ],
      "numberOfBedrooms": "2, 3, 4",
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": "57",
        "unitCode": "ACR"
      },
      "additionalProperty": {
        "@type": "PropertyValue",
        "name": "RERA Number",
        "value": "TN/01/Building/0072/2018"
      }
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    return () => {
      document.head.removeChild(scriptTag);
    };
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
      
      {/* Network Status Indicator */}
      <NetworkStatus />
      
      {/* Offer Popup */}
      <OfferPopup />
    </div>
  );
};

export default Index;
