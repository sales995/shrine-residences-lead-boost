import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { trackBrochureDownload } from "@/utils/tracking";

interface BrochureDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrochureDownloadDialog = ({ open, onOpenChange }: BrochureDownloadDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number",
        variant: "destructive",
      });
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit Indian phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Dynamic import to avoid SSR issues
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data: existingLead } = await supabase
        .from("leads")
        .select("phone")
        .eq("phone", formData.phone)
        .maybeSingle();

      if (existingLead) {
        toast({
          title: "Already Registered",
          description: "We already have your details. Downloading brochure now...",
        });
      }

      if (!existingLead) {
        const { data, error } = await supabase.functions.invoke('submit-lead', {
          body: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            message: 'Brochure & Floor Plan Download Request',
            source: 'brochure_download',
          },
        });

        if (error) {
          const msg = (error as any)?.message || '';
          const status = (error as any)?.status;
          if (status === 429 || msg.toLowerCase().includes('too many')) {
            toast({ title: 'Slow down', description: 'Too many submissions. Please try again later.', variant: 'destructive' });
            setIsSubmitting(false);
            return;
          }
          if (msg.toLowerCase().includes('captcha')) {
            toast({ title: 'Verification failed', description: 'Please complete the CAPTCHA and try again.', variant: 'destructive' });
            setIsSubmitting(false);
            return;
          }
          throw error as any;
        }

        toast({
          title: "Success!",
          description: "Thank you! Downloading your brochure now...",
        });
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = '/shriram-park63-brochure.pdf';
      link.download = 'Shriram-Park63-Brochure-FloorPlan.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track conversion
      trackBrochureDownload(formData.phone);

      // Reset form and close dialog
      setFormData({ name: "", phone: "", email: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Download Brochure & Floor Plan
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Fill in your details to get instant access to our detailed brochure and floor plans
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={handlePhoneChange}
              maxLength={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full btn-accent"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Brochure & Floor Plan
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrochureDownloadDialog;
