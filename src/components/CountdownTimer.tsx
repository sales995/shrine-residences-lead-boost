import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const calculateTimeLeft = (): TimeLeft => {
    // Set target date to end of December 31st, 2025
    const targetDate = new Date('2025-12-31T23:59:59').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-1 sm:gap-2 md:gap-4 items-center justify-center">
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{timeLeft.days}</span>
        <span className="text-[10px] sm:text-xs text-white uppercase">Days</span>
      </div>
      <span className="text-accent text-lg sm:text-2xl font-bold">:</span>
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-white uppercase">Hours</span>
      </div>
      <span className="text-accent text-lg sm:text-2xl font-bold">:</span>
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-white uppercase">Mins</span>
      </div>
      <span className="text-accent text-lg sm:text-2xl font-bold">:</span>
      <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg min-w-[50px] sm:min-w-[60px]">
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs text-white uppercase">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
