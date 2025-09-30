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
    }, 3000);

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
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-primary/5 via-white to-accent/5 border-2 border-accent/20">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <Gift className="w-16 h-16 text-accent animate-bounce" />
              <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            🎁 Exclusive Limited Time Offer!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Offer Highlights */}
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-accent animate-pulse" />
              <h3 className="font-bold text-lg text-foreground">Get Instant Access To:</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span className="font-semibold">Free Home Loan Consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span className="font-semibold">Priority Site Visit Booking</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">✓</span>
                <span className="font-semibold">Exclusive Price List & Floor Plans</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                type="text"
                placeholder="Your Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-12 text-base border-2 border-gray-300 focus:border-accent"
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
                className="h-12 text-base border-2 border-gray-300 focus:border-accent"
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
                className="h-12 text-base border-2 border-gray-300 focus:border-accent"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white shadow-lg"
            >
              {isSubmitting ? "Claiming Offer..." : "🎉 Claim Your Exclusive Offer Now!"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              ⏰ Limited slots available. Only 5 offers left today!
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
