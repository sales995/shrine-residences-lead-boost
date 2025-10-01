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
        hours: Math.floor(difference / (1000 * 60 * 60) % 24),
        minutes: Math.floor(difference / 1000 / 60 % 60),
        seconds: Math.floor(difference / 1000 % 60)
      };
    }
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex gap-2 md:gap-4 text-white font-bold text-xs md:text-sm">
      <div className="bg-white/20 px-2 md:px-3 py-1 rounded">
        <span className="text-accent">{timeLeft.days}</span> Days
      </div>
      <div className="bg-white/20 px-2 md:px-3 py-1 rounded">
        <span className="text-accent">{timeLeft.hours}</span> Hours
      </div>
      <div className="bg-white/20 px-2 md:px-3 py-1 rounded">
        <span className="text-accent">{timeLeft.minutes}</span> Min
      </div>
      <div className="bg-white/20 px-2 md:px-3 py-1 rounded">
        <span className="text-accent">{timeLeft.seconds}</span> Sec
      </div>
    </div>
  );
};
export default CountdownTimer;