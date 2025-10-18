import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Download } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import RERABadge from "./RERABadge";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hp: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Validate Indian phone number format (10 digits starting with 6-9)
    const { INDIAN_PHONE_REGEX, PHONE_ERROR_MESSAGE } = await import("@/utils/validation");
    if (!INDIAN_PHONE_REGEX.test(formData.phone.trim())) {
      toast({
        title: "Invalid Phone Number",
        description: PHONE_ERROR_MESSAGE,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { cloudInvoke } = await import("@/utils/cloud");
      const data = await cloudInvoke('submit-lead', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        message: null,
        source: 'hero',
        hp: formData.hp || "",
      });

      if ((data as any)?.rate_limited) {
        toast({
          title: 'Slow down',
          description: 'Too many submissions. Please try again later.',
          variant: 'destructive',
        });
        return;
      }

      if ((data as any)?.error) {
        const msg = (data as any)?.error || '';
        const status = (data as any)?.status;
        if (status === 429 || msg.toLowerCase().includes('too many') || msg.toLowerCase().includes('rate')) {
          toast({
            title: 'Slow down',
            description: 'Too many submissions. Please try again later.',
            variant: 'destructive',
          });
          return;
        }
        if (msg.toLowerCase().includes('captcha')) {
          toast({
            title: 'Verification failed',
            description: 'Please complete the CAPTCHA and try again.',
            variant: 'destructive',
          });
          return;
        }
        // Gracefully handle duplicate submissions even if returned as an error (e.g., 409)
        if (status === 409 || /duplicate|already/.test(msg.toLowerCase())) {
          toast({
            title: 'Already Registered',
            description: 'This phone number has already been registered. Our team will contact you soon!',
          });
          setFormData({ name: '', phone: '', email: '', hp: '' });
          return;
        }
        throw new Error(msg);
      }

      if ((data as any)?.duplicate) {
        toast({
          title: 'Already Registered',
          description: 'This phone number has already been registered. Our team will contact you soon!',
        });
        setFormData({ name: '', phone: '', email: '', hp: '' });
        return;
      }

      toast({
        title: "Thank you!",
        description: `Thank you ${formData.name}! We'll send you the latest price list and exclusive offers within 15 minutes.`,
      });
      
      setFormData({ name: "", phone: "", email: "", hp: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      const msg = String((error as any)?.message || error || '').toLowerCase();
      if (/duplicate|already/.test(msg)) {
        toast({
          title: 'Already Registered',
          description: 'This phone number has already been registered. Our team will contact you soon!',
        });
        setFormData({ name: '', phone: '', email: '', hp: '' });
        return;
      }
      toast({
        title: 'Error',
        description: 'Failed to submit form. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
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
    >
      {/* Optimized Background Image with Preload */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg-optimized.webp"
          alt="Shriram Park 63 premium residential towers aerial view"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
      </div>
      {/* Urgency Strip with Countdown */}
      <div className="absolute top-20 left-0 right-0 z-20 bg-accent py-2 md:py-4" style={{ zIndex: 20 }}>
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
            {/* Heading - main title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Shriram Park 63 – 3 BHK Flats on GST Road, Perungalathur, Chennai
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-accent font-bold">
              Premium 3 BHK Apartments (1725-1970 Sq.ft) – Limited Ready-to-Move Inventory
            </p>

            <ul className="space-y-2 md:space-y-4 mb-6 md:mb-8">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                <span className="text-sm sm:text-base md:text-lg">57-Acre Premium Township with 40+ Modern Amenities</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                <span className="text-sm sm:text-base md:text-lg">Overlooking 1350-Acre Vandalur Forest Reserve</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                <span className="text-sm sm:text-base md:text-lg">Prime Location on GST Road, Perungalathur</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" aria-hidden="true"></div>
                <span className="text-sm sm:text-base md:text-lg">RERA Approved – TN/01/Building/0072/2018</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
              <Button
                onClick={handleCallNow}
                className="btn-hero-primary text-base md:text-lg w-full sm:w-auto"
                aria-label="Call Shriram Park 63 sales team at +91 9655355525"
              >
                <Phone className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                <span className="truncate">Call: +91 9655355525</span>
              </Button>
              <Button
                onClick={() => document.getElementById('lead-form-hero')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-hero-secondary text-base md:text-lg w-full sm:w-auto"
                aria-label="Download Shriram Park 63 price list and floor plans"
              >
                <Download className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
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
              <header className="mb-4 md:mb-6 text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
                  Download Latest Price & Exclusive Offer
                </h2>
                <p className="text-sm md:text-base text-gray-600">Fill the form below to get instant access</p>
              </header>

              <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                {/* Honeypot (hidden) */}
                <input type="text" name="hp" value={formData.hp} onChange={(e) => setFormData({...formData, hp: e.target.value})} className="hidden" autoComplete="off" tabIndex={-1} aria-hidden="true" />
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
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                    className="w-full border-2 border-gray-300 focus:border-accent py-4 md:py-6 text-base md:text-lg"
                    required
                    pattern="[6-9][0-9]{9}"
                    title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
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
                  disabled={isSubmitting}
                  className="w-full btn-hero-primary text-lg md:text-xl py-5 md:py-7"
                  aria-label="Submit form to download Shriram Park 63 price list"
                >
                  {isSubmitting ? "Submitting..." : "Download Price List Now"}
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
