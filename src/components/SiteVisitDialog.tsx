import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackSiteVisitRequest } from "@/utils/tracking";

interface SiteVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const SiteVisitDialog = ({ open, onOpenChange }: SiteVisitDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    const formattedDate = format(selectedDate, "EEEE, MMMM do, yyyy");
    const message = `Hi! I would like to schedule a site visit to Shriram Park 63 Perungalathur on ${formattedDate} at ${selectedTime}. Please confirm the appointment.`;
    
    // Track the event
    trackSiteVisitRequest();
    
    // Open WhatsApp with the message
    window.open(
      `https://wa.me/919655355525?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    
    // Reset and close
    setSelectedDate(undefined);
    setSelectedTime("");
    onOpenChange(false);
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Schedule Your Site Visit
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center mt-2">
            Select your preferred date and time slot
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Date Selection */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Select Date
            </h3>
            <div className="flex justify-center border rounded-lg p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || isWeekend(date)}
                initialFocus
                className={cn("pointer-events-auto")}
              />
            </div>
            {selectedDate && (
              <p className="text-sm text-center mt-2 text-primary font-medium">
                {format(selectedDate, "EEEE, MMMM do, yyyy")}
              </p>
            )}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Select Time Slot</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={cn(
                      "text-sm",
                      selectedTime === time && "btn-accent"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="w-full btn-virtual-tour"
            size="lg"
          >
            Submit & Send via WhatsApp
          </Button>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">
              Note: Weekend visits are not available. Our team will confirm your appointment via WhatsApp.
            </p>
            <p className="text-xs text-muted-foreground text-center font-medium">
              Multiple visits can be scheduled at the same time by different users.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SiteVisitDialog;
