import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BookingCalculator = () => {
  const [journeyDate, setJourneyDate] = useState<Date | undefined>(undefined);

  const calculateBookingDate = (journey: Date) => {
    const booking = new Date(journey);
    booking.setDate(booking.getDate() - 60);
    booking.setHours(8, 0, 0, 0);
    return booking;
  };

  const bookingDate = journeyDate ? calculateBookingDate(journeyDate) : undefined;

  const handleClear = () => {
    setJourneyDate(undefined);
  };

  const getDayName = (date: Date) => {
    return format(date, "EEEE");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-12 max-w-4xl w-full space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-foreground mb-12">
          Let's book your trip
        </h1>

        <div className="space-y-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full glass-input justify-between text-left font-normal hover:bg-white/40 transition-all",
                  !journeyDate && "text-white/60"
                )}
              >
                {journeyDate ? format(journeyDate, "dd-MM-yyyy") : "dd - mm - yyyy"}
                <CalendarIcon className="h-5 w-5 text-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card border-white/30" align="start">
              <Calendar
                mode="single"
                selected={journeyDate}
                onSelect={setJourneyDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {journeyDate && bookingDate && (
            <div className="glass-card p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">Journey Date:</h2>
                <p className="text-foreground text-xl">({getDayName(journeyDate)})</p>
                <p className="text-foreground text-xl">{format(journeyDate, "dd-MMMM-yyyy")}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-accent mb-2">Booking Date:</h2>
                <p className="text-foreground text-xl">({getDayName(bookingDate)})</p>
                <p className="text-foreground text-xl">
                  {format(bookingDate, "dd-MMMM-yyyy")} - {format(bookingDate, "hh:mm a")}
                </p>
              </div>

              <Button
                onClick={handleClear}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg rounded-xl font-medium transition-all"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalculator;
