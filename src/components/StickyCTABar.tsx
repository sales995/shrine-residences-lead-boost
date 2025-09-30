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
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          <Button 
            onClick={handleSiteVisit}
            className="btn-virtual-tour text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 h-auto"
          >
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden xs:inline">Book </span>Visit
          </Button>
          
          <Button 
            onClick={handleBrochureDownload}
            className="btn-accent text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 h-auto"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden xs:inline">Download</span><span className="xs:hidden">Get</span> Brochure
          </Button>
          
          <Button 
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 font-semibold h-auto"
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;