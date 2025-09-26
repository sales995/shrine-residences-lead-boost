import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Home, CreditCard, Calendar, ArrowDown, Phone } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: ""
  });

  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleVirtualTour = () => {
    // Track virtual tour booking
    window.open("https://wa.me/9655355525?text=Hi! I'd like to book a virtual tour of Shriram Residences. I'm an NRI/IT professional interested in premium properties.", "_blank");
  };

  const handleBrochureDownload = () => {
    // Track brochure download
    alert("Brochure download will start shortly. Our team will also call you within 24 hours.");
  };

  const handleCompactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.contact && formData.interest) {
      alert(`Thank you ${formData.name}! We'll send the brochure and pricing details to your contact. Our team will reach out within 2 hours.`);
      // Track lead capture
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `var(--gradient-hero), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top Urgency Strip */}
      <div className="absolute top-20 left-0 right-0 z-20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="urgency-badge">
            🔥 Limited Pre-launch Units — Special Pricing till Dec 31st
          </div>
        </div>
      </div>

      {/* Quick Actions Top Right */}
      <div className="absolute top-24 right-4 z-20 flex gap-2">
        <a href="tel:9655355525" className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-all">
          <Phone className="w-5 h-5 text-primary" />
        </a>
        <a href="https://wa.me/9655355525" className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center text-white relative z-10 pt-16">
        <div className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Main Headline - Single Line, Benefit-First */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-5xl mx-auto">
            Luxury Living on GST Main Road — Homes Built for IT Professionals, NRIs & Business Leaders
          </h1>

          {/* Subheading - Short & Clear */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            3 & 4 BHK Villas & Apartments | RERA Approved | Virtual Tours for NRIs
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={handleVirtualTour}
              className="btn-virtual-tour text-lg px-8 py-4"
            >
              Book Virtual Tour
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              onClick={handleBrochureDownload}
              className="btn-accent text-lg px-8 py-4"
            >
              Download Pricing + Brochure
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Compact Lead Capture Form */}
          <div className="compact-form max-w-2xl mx-auto mb-8">
            <form onSubmit={handleCompactFormSubmit} className="flex flex-col md:flex-row gap-3 items-end">
              <div className="flex-1">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white border-0"
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Email / Phone"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="bg-white border-0"
                  required
                />
              </div>
              <div className="flex-1">
                <Select value={formData.interest} onValueChange={(value) => setFormData({...formData, interest: value})}>
                  <SelectTrigger className="bg-white border-0">
                    <SelectValue placeholder="Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3bhk-villa">3 BHK Villa</SelectItem>
                    <SelectItem value="4bhk-villa">4 BHK Villa</SelectItem>
                    <SelectItem value="3bhk-apt">3 BHK Apartment</SelectItem>
                    <SelectItem value="4bhk-apt">4 BHK Apartment</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="btn-virtual-tour whitespace-nowrap">
                Get Brochure
              </Button>
            </form>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="trust-badge">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-800">RERA: PRM/KH/KH/1247</span>
            </div>
            <div className="trust-badge">
              <CreditCard className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-800">Bank Pre-Approval</span>
            </div>
            <div className="trust-badge">
              <Home className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-gray-800">100% Gated Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;