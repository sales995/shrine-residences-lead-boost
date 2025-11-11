import { useAvailableUnits } from "@/contexts/UnitsContext";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export const StickyUrgencyBanner = () => {
  const { unitsRemaining, isLoading } = useAvailableUnits();
  const [isVisible, setIsVisible] = useState(true);

  const handleRegisterClick = () => {
    const formElement = document.getElementById('lead-form-hero');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      <div className="bg-accent border-t-4 border-primary shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Warning icon with pulse */}
            <div className="flex items-center gap-3">
              <AlertTriangle 
                className="w-6 h-6 md:w-7 md:h-7 text-white animate-pulse" 
                aria-hidden="true"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-white font-bold text-sm md:text-lg">
                  🔥 Ready Homes: Only <span className="text-xl md:text-2xl animate-pulse">
                    {isLoading ? '40' : unitsRemaining}
                  </span> Units Left!
                </span>
                <span className="text-white/90 text-xs md:text-sm hidden sm:inline">
                  ₹1.46 Cr* | No GST | OC Received
                </span>
              </div>
            </div>

            {/* Right: CTA and Close */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={handleRegisterClick}
                className="bg-white text-accent hover:bg-white/90 font-bold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 shadow-lg hover:scale-105 transition-transform"
                aria-label="Register now for Shriram Park 63"
              >
                Register Now
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white hover:text-white/80 transition-colors p-1"
                aria-label="Close banner"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
