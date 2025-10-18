import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, User, MessageSquare, Send } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useToast } from "@/hooks/use-toast";

const LeadFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim() || null,
        source: 'contact-form',
        hp: formData.hp || "",
      });

      if ((data as any)?.rate_limited) {
        toast({
          title: 'Slow down',
          description: 'Too many submissions. Please try again later.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
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
          setIsSubmitting(false);
          return;
        }
        if (msg.toLowerCase().includes('captcha')) {
          toast({
            title: 'Verification failed',
            description: 'Please complete the CAPTCHA and try again.',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        // Handle duplicates even when returned as an error (e.g., HTTP 409)
        if (status === 409 || /duplicate|already/.test(msg.toLowerCase())) {
          toast({
            title: 'Already Registered',
            description: 'This phone number has already been registered. Our team will contact you soon!',
          });
          setIsSubmitting(false);
          setFormData({ name: '', email: '', phone: '', message: '', hp: '' });
          return;
        }
        throw new Error(msg);
      }

      if ((data as any)?.duplicate) {
        toast({
          title: 'Already Registered',
          description: 'This phone number has already been registered. Our team will contact you soon!',
        });
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', message: '', hp: '' });
        return;
      }

      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you within 24 hours."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        hp: "",
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      const msg = String((error as any)?.message || error || '').toLowerCase();
      if (/duplicate|already/.test(msg)) {
        toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
        setFormData({ name: '', email: '', phone: '', message: '', hp: '' });
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
  return <section id="lead-form" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`fade-in ${inView ? "visible" : ""}`}>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Ready to make Shriram Residences your new home? Fill out the form below and our expert team will contact you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className={`slide-in-left ${inView ? "visible" : ""}`}>
              <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-strong">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-foreground">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Honeypot (hidden) */}
                  <input type="text" name="hp" value={formData.hp} onChange={handleInputChange} className="hidden" autoComplete="off" tabIndex={-1} aria-hidden="true" />
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleInputChange} className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" required />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleInputChange} className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" required />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Input 
                      type="tel" 
                      name="phone" 
                      placeholder="Phone Number" 
                      value={formData.phone} 
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData(prev => ({ ...prev, phone: value }));
                      }}
                      className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" 
                      required 
                      pattern="[6-9][0-9]{9}"
                      title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <Textarea name="message" placeholder="Your Message (Optional)" value={formData.message} onChange={handleInputChange} className="pl-10 md:pl-12 min-h-[100px] md:min-h-[120px] resize-none text-sm md:text-base" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-hero-primary h-10 md:h-12 text-sm md:text-base">
                    {isSubmitting ? <>
                        <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </> : <>
                        <Send className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                        Send Message
                      </>}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info & CTA */}
            <div className={`slide-in-right ${inView ? "visible" : ""}`}>
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-strong">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-foreground">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3 md:mr-4" />
                      <div>
                        <p className="font-semibold text-sm md:text-base">Call Us</p>
                        <a href="tel:9655355525" className="text-primary hover:text-primary-hover text-base md:text-lg">+91 9655355525</a>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>

                {/* Quick CTA */}
                <div className="bg-gradient-to-r from-primary to-primary-hover text-white rounded-2xl p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">Need Immediate Assistance?</h3>
                  <p className="mb-4 md:mb-6 opacity-90 text-sm md:text-base">
                    Our sales team is available 24/7 to answer your questions and schedule site visits.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <a href="tel:9655355525" className="bg-white text-primary px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm md:text-base">
                      Call Now
                    </a>
                    <a href="https://wa.me/9655355525" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center text-sm md:text-base">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default LeadFormSection;