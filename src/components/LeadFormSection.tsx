import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, User, MessageSquare, Send } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useToast } from "@/hooks/use-toast";
import { useApiCall } from "@/hooks/useApiCall";
import { submitForm, APIError } from "@/utils/api";
import ErrorMessage from "@/components/ui/error-message";
const LeadFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const {
    toast
  } = useToast();
  const {
    loading: isSubmitting,
    error: submitError,
    execute: submitFormData,
    reset: resetError
  } = useApiCall(submitForm);
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
    resetError();
    try {
      await submitFormData(formData);
      toast({
        title: "Thank you for your interest!",
        description: "Our team will contact you within 24 hours."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      // Error is handled by the useApiCall hook
      console.error('Form submission failed:', error);
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
                  {submitError && <ErrorMessage error={submitError} onRetry={() => handleSubmit({
                  preventDefault: () => {}
                } as React.FormEvent)} className="mb-4" />}

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
                    <Input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleInputChange} className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base" required />
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

                {/* Download Brochure */}
                <div className="bg-secondary/10 rounded-2xl p-4 sm:p-6 md:p-8 border border-secondary/20">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 md:mb-4 text-foreground">Download Resources</h3>
                  <div className="space-y-2 md:space-y-3">
                    <button className="w-full bg-secondary text-secondary-foreground px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-secondary-hover transition-colors text-sm md:text-base">
                      Download Brochure
                    </button>
                    <button className="w-full bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-sm md:text-base">
                      Download Floor Plans
                    </button>
                    <button className="w-full bg-white text-primary border border-primary px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-sm md:text-base">
                      Price List
                    </button>
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