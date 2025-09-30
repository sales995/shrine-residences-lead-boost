import { Button } from "@/components/ui/button";
import { Calendar, Download, MessageCircle } from "lucide-react";

const StickyCTABar = () => {
  const handleSiteVisit = () => {
    window.open("https://wa.me/919655355525?text=Hi! I'd like to schedule a site visit to Shriram Park 63 Perungalathur. Please confirm available time slots.", "_blank");
  };

  const handleBrochureDownload = () => {
    const element = document.getElementById("lead-form-hero");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919655355525?text=Hi! I'm interested in 2/3/4 BHK flats at Shriram Park 63 Perungalathur on GST Road. Please send the latest price list and brochure.", "_blank");
  };

  return (
    <div className="sticky-cta-bar">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={handleSiteVisit}
            className="btn-virtual-tour text-sm py-2"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Book Site Visit
          </Button>
          
          <Button 
            onClick={handleBrochureDownload}
            className="btn-accent text-sm py-2"
          >
            <Download className="w-4 h-4 mr-1" />
            Download Brochure
          </Button>
          
          <Button 
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 font-semibold"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;