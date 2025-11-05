import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
export const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    // Check if popup was already shown in this session
    const hasShownPopup = sessionStorage.getItem('offerPopupShown');
    
    if (!hasShownPopup) {
      // Wait for window load to avoid blocking initial render
      const showPopup = () => {
        setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem('offerPopupShown', 'true');
        }, 5000);
      };
      
      if (document.readyState === 'complete') {
        showPopup();
      } else {
        window.addEventListener('load', showPopup);
        return () => window.removeEventListener('load', showPopup);
      }
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
        email: null,
        message: null,
        source: 'popup',
        hp: formData.hp || "",
      });
      if ((data as any)?.error) {
        const msg = (data as any)?.error || '';
        const status = (data as any)?.status;
        if (status === 429 || msg.toLowerCase().includes('too many')) {
          toast({ title: 'Slow down', description: 'Too many submissions. Please try again later.', variant: 'destructive' });
          return;
        }
        if (msg.toLowerCase().includes('captcha')) {
          toast({ title: 'Verification failed', description: 'Please complete the CAPTCHA and try again.', variant: 'destructive' });
          return;
        }
        // Handle duplicates even if returned as error (e.g., 409)
        if (status === 409 || /duplicate|already/.test(msg.toLowerCase())) {
          toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
          setIsOpen(false);
          setFormData({ name: '', phone: '', hp: '' });
          return;
        }
        throw new Error(msg);
      }

      if ((data as any)?.duplicate) {
        toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
        setIsOpen(false);
        setFormData({ name: '', phone: '', hp: '' });
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
        hp: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      const msg = String((error as any)?.message || error || '').toLowerCase();
      if (/duplicate|already/.test(msg)) {
        toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
        setIsOpen(false);
        setFormData({ name: '', phone: '', hp: '' });
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
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="popup-overlay w-[90%] max-w-md p-6 bg-background border border-border rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🔥 Only 40 Units Left!
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2">
            Register now to secure your dream home with exclusive GST waiver & 90% bank loan approval.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Honeypot (hidden) */}
          <input 
            type="text" 
            name="hp" 
            value={formData.hp} 
            onChange={e => setFormData({ ...formData, hp: e.target.value })} 
            className="hidden" 
            autoComplete="off" 
            tabIndex={-1} 
            aria-hidden="true" 
          />
          
          <div>
            <Input 
              type="text" 
              placeholder="Full Name *" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              className="h-11 border-2 focus:border-primary" 
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
              className="h-11 border-2 focus:border-primary" 
              required 
              pattern="[6-9][0-9]{9}" 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full h-11 font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Get Offer"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to receive updates from Shriram Properties
          </p>
        </form>
      </DialogContent>
    </Dialog>;
};