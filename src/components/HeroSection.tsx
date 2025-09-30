import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Download } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import heroImage from "@/assets/building-aerial-1.jpg";
import CountdownTimer from "./CountdownTimer";
import RERABadge from "./RERABadge";

const HeroSection = () => {
  console.log("HeroSection rendering...");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.phone || formData.email)) {
      alert(`Thank you ${formData.name}! We'll send you the latest price list and exclusive offers within 15 minutes.`);
      // Track lead capture
      setFormData({ name: "", phone: "", email: "" });
    }
  };

  const handleCallNow = () => {
    window.location.href = "tel:+919655355525";
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: `var(--gradient-hero), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Urgency Strip with Countdown */}
      <div className="absolute top-20 left-0 right-0 z-20 bg-accent py-2 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <h2 className="text-white font-bold text-sm md:text-lg lg:text-xl text-center px-2">
              🔥 Exclusive Offer Ending Soon: GST Waiver & 90% Bank Loan Approved
            </h2>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 sm:pt-36 md:pt-32 pb-8 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left: Main Content */}
          <div className={`text-white fade-in ${inView ? "visible" : ""}`}>
            {/* H1 - SEO Optimized */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Shriram Park 63 Perungalathur: Luxury 3 BHK <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">(1725-1970 Sq.ft)</span> Flats on GST Road
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-accent font-bold">
              Limited Ready-to-Move Inventory Remaining
            </p>

            <div className="space-y-2 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p className="text-sm sm:text-base md:text-lg">57-Acre Premium Township</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p className="text-sm sm:text-base md:text-lg">Overlooking 1350-Acre Vandalur Forest Reserve</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p className="text-sm sm:text-base md:text-lg">40+ State-of-the-Art Amenities</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <p className="text-sm sm:text-base md:text-lg">Fully Furnished Move-in Ready Homes Available</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <Button
                onClick={handleCallNow}
                className="btn-hero-primary text-base md:text-lg w-full sm:w-auto"
              >
                <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                <span className="truncate">Call: +91 9655355525</span>
              </Button>
              <Button
                onClick={() => document.getElementById('lead-form-hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-hero-secondary text-base md:text-lg w-full sm:w-auto"
              >
                <Download className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Get Price List
              </Button>
            </div>

            {/* RERA Badge */}
            <div className="flex items-center gap-4">
              <RERABadge />
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className={`fade-in ${inView ? "visible" : ""}`}>
            <div id="lead-form-hero" className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
              <div className="mb-4 md:mb-6 text-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
                  Download Latest Price & Exclusive Offer
                </h3>
                <p className="text-sm md:text-base text-gray-600">Fill the form below to get instant access</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-hero-primary text-lg md:text-xl py-5 md:py-7"
                >
                  Download Price List Now
                </Button>

                <p className="text-xs text-center text-gray-500 mt-3 md:mt-4">
                  By submitting, you agree to receive updates from Shriram Properties
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">1000+</p>
                    <p className="text-xs text-gray-600">Happy Families</p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">90%</p>
                    <p className="text-xs text-gray-600">Bank Approval</p>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">57</p>
                    <p className="text-xs text-gray-600">Acre Township</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
