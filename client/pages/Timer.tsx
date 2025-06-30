import { useState } from "react";
import TimerDisplay from "../components/ui/timer-display";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Settings, Coffee, BookOpen } from "lucide-react";

const studyTips = [
  "🐱 Take stretch breaks like a cat!",
  "💧 Stay hydrated - your brain needs water!",
  "🌱 Fresh air helps with focus",
  "🎵 Try lo-fi music for concentration",
  "📝 Keep a notebook for random thoughts",
  "☕ A warm drink can be comforting",
  "💧 Drink enough water throughout the day",
];

const motivationalMessages = [
  "You're making progress! 🌟",
  "Every minute counts! ⏰",
  "Your future self will thank you! 💪",
  "One step closer to your goals! 🎯",
  "You've got this! 🔥",
];

export default function Timer() {
  const [sessionCount, setSessionCount] = useState(0);
  const [currentTip, setCurrentTip] = useState(studyTips[0]);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const handleTimerComplete = () => {
    setSessionCount((prev) => prev + 1);
    setCurrentTip(studyTips[sessionCount % studyTips.length]);
  };

  const getRandomMessage = () => {
    return motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 via-beige-50 to-mint-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-3xl font-handwritten font-bold text-warm-brown mb-2">
            Study Timer
          </h1>
          <p className="text-warm-gray font-rounded">
            Focus with your study buddy! 🐱
          </p>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <TimerDisplay
            initialMinutes={focusMinutes}
            breakMinutes={breakMinutes}
            onComplete={handleTimerComplete}
          />
        </div>

        {/* Session Stats */}
        <Card className="mb-6 bg-beige-100 border-beige-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-warm-brown font-handwritten">
                  {sessionCount}
                </div>
                <div className="text-sm text-warm-gray font-rounded">
                  Sessions Today
                </div>
              </div>
              <div className="text-4xl">🏆</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warm-brown font-handwritten">
                  {Math.floor((sessionCount * focusMinutes) / 60)}h{" "}
                  {(sessionCount * focusMinutes) % 60}m
                </div>
                <div className="text-sm text-warm-gray font-rounded">
                  Total Focus
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Tip */}
        <Card className="mb-6 bg-mint-100 border-mint-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              <div className="text-2xl mr-2">💡</div>
              <h3 className="font-handwritten font-bold text-warm-brown">
                Study Tip
              </h3>
            </div>
            <p className="text-warm-gray font-rounded">{currentTip}</p>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card className="bg-blush-100 border-blush-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <Settings className="mr-2 text-warm-brown" size={20} />
              <h3 className="font-handwritten font-bold text-warm-brown">
                Timer Settings
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="mr-2 text-warm-gray" size={16} />
                  <span className="font-rounded text-warm-gray">
                    Focus Time
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFocusMinutes(Math.max(5, focusMinutes - 5))
                    }
                    className="w-8 h-8 p-0 border-beige-300"
                  >
                    -
                  </Button>
                  <span className="font-handwritten font-bold text-warm-brown w-12 text-center">
                    {focusMinutes}m
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFocusMinutes(Math.min(60, focusMinutes + 5))
                    }
                    className="w-8 h-8 p-0 border-beige-300"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coffee className="mr-2 text-warm-gray" size={16} />
                  <span className="font-rounded text-warm-gray">
                    Break Time
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setBreakMinutes(Math.max(1, breakMinutes - 1))
                    }
                    className="w-8 h-8 p-0 border-beige-300"
                  >
                    -
                  </Button>
                  <span className="font-handwritten font-bold text-warm-brown w-12 text-center">
                    {breakMinutes}m
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setBreakMinutes(Math.min(15, breakMinutes + 1))
                    }
                    className="w-8 h-8 p-0 border-beige-300"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <div className="text-center mt-6 py-4 text-warm-gray text-sm font-rounded">
          One step closer to your goals!
        </div>
      </div>
    </div>
  );
}
