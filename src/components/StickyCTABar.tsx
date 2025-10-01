import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Download, MessageCircle } from "lucide-react";
import BrochureDownloadDialog from "./BrochureDownloadDialog";
import SiteVisitDialog from "./SiteVisitDialog";

const StickyCTABar = () => {
  const [brochureDialogOpen, setBrochureDialogOpen] = useState(false);
  const [siteVisitDialogOpen, setSiteVisitDialogOpen] = useState(false);

  const handleSiteVisit = () => {
    setSiteVisitDialogOpen(true);
  };

  const handleBrochureDownload = () => {
    setBrochureDialogOpen(true);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919655355525?text=Hi! I'm interested in 2/3/4 BHK flats at Shriram Park 63 Perungalathur on GST Road. Please send the latest price list and brochure.", "_blank");
  };

  return (
    <div className="sticky-cta-bar">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={handleSiteVisit}
            className="btn-virtual-tour text-[10px] sm:text-sm py-3 px-1.5 sm:px-4 h-auto min-h-[48px] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2"
          >
            <Calendar className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="leading-tight">Schedule Visit</span>
          </Button>
          
          <Button 
            onClick={handleBrochureDownload}
            className="btn-accent text-[10px] sm:text-sm py-3 px-1.5 sm:px-4 h-auto min-h-[48px] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2"
          >
            <Download className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="leading-tight">Get Brochure</span>
          </Button>
          
          <Button 
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-sm py-3 px-1.5 sm:px-4 font-semibold h-auto min-h-[48px] flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2"
          >
            <MessageCircle className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="leading-tight">WhatsApp</span>
          </Button>
        </div>
      </div>
      <BrochureDownloadDialog 
        open={brochureDialogOpen} 
        onOpenChange={setBrochureDialogOpen} 
      />
      <SiteVisitDialog 
        open={siteVisitDialogOpen} 
        onOpenChange={setSiteVisitDialogOpen} 
      />
    </div>
  );
};

export default StickyCTABar;