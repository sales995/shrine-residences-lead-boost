import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Sparkles, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
        throw new Error(msg);
      }

      if ((data as any)?.duplicate) {
        toast({ title: 'Already Registered', description: 'This phone number has already been registered. Our team will contact you soon!' });
        setIsOpen(false);
        setFormData({ name: '', phone: '', email: '', hp: '' });
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
        email: "",
        hp: ""
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
      <DialogContent className="w-[90%] max-w-[90%] md:max-w-lg p-0 overflow-hidden border-2 border-primary/20 max-h-[80vh] md:max-h-[95vh] overflow-y-auto rounded-xl md:rounded-lg shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Exclusive Limited Time Offer</DialogTitle>
          <DialogDescription>Fill the form to unlock exclusive offers on Shriram Park 63 flats.</DialogDescription>
        </DialogHeader>
        
        <div className="bg-gradient-to-br from-primary via-primary-variant to-accent p-4 md:p-8 text-white text-center">
          <div className="flex items-center justify-center mb-3 md:mb-4">
            <Gift className="w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-3" />
            <h2 className="text-xl md:text-3xl font-bold">Exclusive Offer</h2>
          </div>
          <p className="text-base md:text-xl mb-3 md:mb-4">Get Additional Benefits on Your Dream Home</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 mb-3 md:mb-4">
            <ul className="space-y-2 md:space-y-3 text-left">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-xs md:text-sm">GST Waiver on Select Units</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-xs md:text-sm">90% Bank Loan Pre-Approval</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-xs md:text-sm">Free Site Visit & Virtual Tour</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-xs md:text-sm">Instant Price List & Floor Plans</span>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center justify-center text-xs md:text-sm">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span>Limited period offer - Register now!</span>
          </div>
        </div>
        
        <div className="p-4 md:p-6 bg-white">
          <h3 className="text-lg md:text-xl font-bold text-center text-primary mb-3 md:mb-4">
            Register to Unlock Exclusive Offers
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
            {/* Honeypot (hidden) */}
            <input type="text" name="hp" value={formData.hp} onChange={e => setFormData({ ...formData, hp: e.target.value })} className="hidden" autoComplete="off" tabIndex={-1} aria-hidden="true" />
            <Input type="text" placeholder="Your Full Name *" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="h-10 md:h-11 text-sm md:text-base border-2 border-gray-300 focus:border-primary" required />

            <Input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={handlePhoneChange} maxLength={10} className="h-10 md:h-11 text-sm md:text-base border-2 border-gray-300 focus:border-primary" required pattern="[6-9][0-9]{9}" />

            <Input type="email" placeholder="Email Address (Optional)" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="h-10 md:h-11 text-sm md:text-base border-2 border-gray-300 focus:border-primary" />

            <Button type="submit" disabled={isSubmitting} className="w-full h-11 md:h-12 text-base md:text-lg font-bold bg-primary hover:bg-primary-hover text-white shadow-lg transition-all">
              {isSubmitting ? "Submitting..." : "Get Exclusive Offers Now"}
            </Button>

            <p className="text-[10px] md:text-xs text-center text-muted-foreground pt-1">
              By submitting, you agree to receive updates from Shriram Properties
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>;
};