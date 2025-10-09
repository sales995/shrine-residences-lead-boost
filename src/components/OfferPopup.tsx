import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Sparkles, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OptimizedImage } from "./OptimizedImage";
import offerImage from "@/assets/ayudha-pooja-offer.jpeg";
export const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Check if popup was already shown in this session
    const hasShownPopup = sessionStorage.getItem('offerPopupShown');
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('offerPopupShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Indian phone number format
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          message: null,
          source: 'popup',
        },
      });
      if (error) {
        const msg = (error as any)?.message || '';
        const status = (error as any)?.status;
        if (status === 429 || msg.toLowerCase().includes('too many')) {
          toast({ title: 'Slow down', description: 'Too many submissions. Please try again later.', variant: 'destructive' });
          return;
        }
        if (msg.toLowerCase().includes('captcha')) {
          toast({ title: 'Verification failed', description: 'Please complete the CAPTCHA and try again.', variant: 'destructive' });
          return;
        }
        throw error as any;
      }

      if ((data as any)?.duplicate) {
        toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '' });
        return;
      }
      toast({
        title: "Congratulations! 🎉",
        description: "You've unlocked exclusive offers! Our team will contact you within 15 minutes."
      });
      setIsOpen(false);
      setFormData({
        name: "",
        phone: "",
        email: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-2 border-primary/20 max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Ayudha Pooja Exclusive Offer</DialogTitle>
          <DialogDescription className="sr-only">Fill the form to claim the limited-time offer.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {/* Offer Image */}
          <div className="w-full bg-white relative">
            <OptimizedImage
              src={offerImage}
              alt="Ayudha Pooja Special Offer - Limited Time Discounts on 3 BHK Flats"
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-center max-w-[200px]">
              To avail Ayudha Pooja Offer fill the form below
            </div>
          </div>
          
          {/* Form Section */}
          <div className="w-full bg-gradient-to-b from-white to-gray-50 p-6">
            
            
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
              <Input type="text" placeholder="Your Full Name *" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="h-11 text-base border-2 border-gray-300 focus:border-primary bg-white" required />

              <Input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={handlePhoneChange} maxLength={10} className="h-11 text-base border-2 border-gray-300 focus:border-primary bg-white" required pattern="[6-9][0-9]{9}" />

              <Input type="email" placeholder="Email Address (Optional)" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="h-11 text-base border-2 border-gray-300 focus:border-primary bg-white" />

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary-hover text-white shadow-lg transition-all">
                {isSubmitting ? "Submitting..." : "🎉 Register & Claim Offer"}
              </Button>

              <p className="text-xs text-center text-muted-foreground pt-1">
                ⏰ Offer valid till 5th October, 2025
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};