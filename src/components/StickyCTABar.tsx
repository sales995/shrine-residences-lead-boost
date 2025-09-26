import { Button } from "@/components/ui/button";
import { Calendar, Download, MessageCircle } from "lucide-react";

const StickyCTABar = () => {
  const handleSiteVisit = () => {
    window.open("https://wa.me/9655355525?text=Hi! I'd like to schedule a site visit to Shriram Residences. Please confirm available time slots.", "_blank");
  };

  const handleBrochureDownload = () => {
    alert("Brochure download initiated. Our team will also contact you within 24 hours for any queries.");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/9655355525?text=Hi! I'm interested in 3/4 BHK at Shriram Residences — please send brochure and pricing.", "_blank");
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
            className="bg-green-500 hover:bg-green-600 text-white text-sm py-2"
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