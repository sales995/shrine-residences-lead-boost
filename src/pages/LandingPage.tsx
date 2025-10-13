import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Download, CheckCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import CountdownTimer from "@/components/CountdownTimer";
import RERABadge from "@/components/RERABadge";

// Performance-optimized landing page for Google Ads
// Target: PageSpeed Mobile 90+, optimized FCP and CLS

const LandingPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Validate Indian phone number format
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          message: null,
          source: 'landing-page',
        },
      });

      if (error) {
        const msg = (error as any)?.message || '';
        if (msg.toLowerCase().includes('too many')) {
          toast({
            title: 'Slow down',
            description: 'Too many submissions. Please try again later.',
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }

      if ((data as any)?.duplicate) {
        toast({
          title: 'Already Registered',
          description: 'Our team will contact you soon!',
        });
        setFormData({ name: '', phone: '', email: '' });
        return;
      }

      toast({
        title: "Thank you!",
        description: `We'll send you the price list within 15 minutes.`,
      });
      
      setFormData({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        path="/" 
        title="Shriram Park 63 | 3 BHK Flats on GST Road, Perungalathur, Chennai"
        description="Premium 3 BHK flats at Shriram Park 63, Perungalathur – 57-acre township on GST Road, Chennai. RERA approved, modern amenities."
      />
      
      {/* Minimal Header - Logos Only */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/shriram-logo.png" 
                alt="Shriram Properties" 
                className="h-10 md:h-12"
                width="120"
                height="48"
              />
              <div className="hidden sm:block w-px h-10 bg-border"></div>
              <img 
                src="/assets/park63-logo.png" 
                alt="Park 63" 
                className="h-10 md:h-12"
                width="120"
                height="48"
              />
            </div>
            <a 
              href="tel:+919655355525"
              className="flex items-center text-primary hover:text-primary-hover font-semibold text-sm md:text-base"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">+91 9655355525</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Above the Fold Priority */}
      <section
        id="hero"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(30, 70, 80, 0.85), rgba(40, 85, 95, 0.80)), url(/assets/building-aerial-1.jpg)',
          }}
        ></div>

        {/* Urgency Strip */}
        <div className="absolute top-20 left-0 right-0 z-20 bg-accent py-2 md:py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <h2 className="text-white font-bold text-sm md:text-lg text-center">
                🔥 Exclusive Offer: GST Waiver & 90% Bank Loan Approved
              </h2>
              <CountdownTimer />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10 pt-32 sm:pt-36 md:pt-32 pb-8 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            
            {/* Left: Value Proposition */}
            <div className={`text-white fade-in ${inView ? "visible" : ""}`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Premium 3 BHK Flats on GST Road, Perungalathur
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-accent font-bold">
                1725-1970 Sq.ft | Ready-to-Move | RERA Approved
              </p>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base md:text-lg">57-Acre Premium Township with 40+ Amenities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base md:text-lg">Overlooking 1350-Acre Vandalur Forest</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base md:text-lg">Prime GST Road Location - 11.8 km from Airport</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base md:text-lg">90% Bank Loan Approved from Leading Banks</span>
                </li>
              </ul>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
                <Button
                  onClick={() => window.location.href = "tel:+919655355525"}
                  className="btn-hero-primary text-base md:text-lg w-full sm:w-auto"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now: +91 9655355525
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 flex-wrap">
                <RERABadge />
                <div className="text-sm text-white/90">
                  <strong>1000+</strong> Happy Families
                </div>
              </div>
            </div>

            {/* Right: Lead Capture Form - Primary Conversion Element */}
            <div className={`fade-in ${inView ? "visible" : ""}`}>
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
                <header className="mb-4 md:mb-6 text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
                    Download Price List & Floor Plans
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    Get instant access to exclusive offers
                  </p>
                </header>

                <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                      required
                      pattern="[6-9][0-9]{9}"
                      title="Enter 10-digit mobile number"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                      autoComplete="email"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-hero-primary text-lg md:text-xl py-5 md:py-7"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 w-5 h-5" />
                        Download Price List Now
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By submitting, you agree to receive updates from Shriram Properties
                  </p>
                </form>

                {/* Social Proof */}
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

      {/* Minimal Footer - No Distractions */}
      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-2">
            Shriram Park 63 - RERA: TN/01/Building/0072/2018
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shriram Properties. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
