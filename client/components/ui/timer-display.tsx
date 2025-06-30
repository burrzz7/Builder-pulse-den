import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Play, Pause, Square, RotateCcw } from "lucide-react";

interface TimerDisplayProps {
  initialMinutes?: number;
  breakMinutes?: number;
  onComplete?: () => void;
}

export default function TimerDisplay({
  initialMinutes = 25,
  breakMinutes = 5,
  onComplete,
}: TimerDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalTime, setTotalTime] = useState(initialMinutes * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            // Auto switch between focus and break
            const newIsBreak = !isBreak;
            const newTime = newIsBreak
              ? breakMinutes * 60
              : initialMinutes * 60;
            setIsBreak(newIsBreak);
            setTotalTime(newTime);
            return newTime;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isBreak, breakMinutes, initialMinutes, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const resetTime = isBreak ? breakMinutes * 60 : initialMinutes * 60;
    setTimeLeft(resetTime);
    setTotalTime(resetTime);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    const resetTime = initialMinutes * 60;
    setTimeLeft(resetTime);
    setTotalTime(resetTime);
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-64 h-64">
        {/* Progress Circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-beige-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={isBreak ? "text-mint-500" : "text-blush-500"}
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            style={{
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>

        {/* Timer Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-handwritten font-bold text-warm-brown mb-2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg font-rounded text-warm-gray">
            {isBreak ? "Break Time!" : "Focus Time"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={toggleTimer}
          size="lg"
          className={`rounded-full w-16 h-16 ${
            isBreak
              ? "bg-mint-500 hover:bg-mint-600 text-white"
              : "bg-blush-500 hover:bg-blush-600 text-white"
          }`}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </Button>

        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12 border-beige-300 text-warm-gray hover:bg-beige-100"
        >
          <RotateCcw size={20} />
        </Button>

        <Button
          onClick={stopTimer}
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12 border-beige-300 text-warm-gray hover:bg-beige-100"
        >
          <Square size={20} />
        </Button>
      </div>

      {/* Session Info */}
      <div className="text-center">
        <p className="text-sm font-rounded text-warm-gray">
          {isBreak
            ? "Take a break and stretch! 🧘‍♀️"
            : "Stay focused, you've got this! 💪"}
        </p>
      </div>
    </div>
  );
}
