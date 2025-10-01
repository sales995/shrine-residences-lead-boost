import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Sparkles, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import offerImage from "@/assets/ayudha-pooja-offer.jpeg";

export const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
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
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || null,
          message: null,
          source: 'popup'
        });

      if (error) {
        if (error.code === '23505' && error.message.includes('leads_phone_unique')) {
          toast({
            title: "Already Registered",
            description: "This phone number has already been registered. Our team will contact you soon!",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Congratulations! 🎉",
        description: "You've unlocked exclusive offers! Our team will contact you within 15 minutes.",
      });
      
      setIsOpen(false);
      setFormData({ name: "", phone: "", email: "" });
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-2 border-accent/20 max-h-[90vh] overflow-y-auto">
        {/* Offer Image */}
        <div className="relative w-full">
          <img 
            src={offerImage} 
            alt="Ayudha Pooja Special Offer" 
            className="w-full h-auto object-contain max-h-[50vh]"
          />
        </div>
        
        <div className="p-4 sm:p-6 bg-white">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-lg sm:text-xl font-bold text-center text-foreground">
              📋 Register Now to Avail This Offer!
            </DialogTitle>
          </DialogHeader>
        
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <Input
                type="text"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-10 text-sm border-2 border-gray-300 focus:border-primary"
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handlePhoneChange}
                maxLength={10}
                className="h-10 text-sm border-2 border-gray-300 focus:border-primary"
                required
                pattern="[6-9][0-9]{9}"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email Address (Optional)"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-10 text-sm border-2 border-gray-300 focus:border-primary"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 text-base font-bold bg-primary hover:bg-primary-hover text-white shadow-lg"
            >
              {isSubmitting ? "Submitting..." : "🎉 Register & Claim Offer"}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-2">
              ⏰ Offer valid till 5th October, 2025
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
