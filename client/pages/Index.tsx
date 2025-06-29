import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Timer, ArrowRight, Sparkles } from "lucide-react";

// Mock data for development
const mockQuotes = [
  {
    quote:
      "You are braver than you believe, stronger than you seem, and smarter than you think.",
    source: "A.A. Milne",
    catImage: "🐱",
  },
  {
    quote: "Every accomplishment starts with the decision to try.",
    source: "Unknown",
    catImage: "😸",
  },
  {
    quote: "Believe you can and you're halfway there.",
    source: "Theodore Roosevelt",
    catImage: "😺",
  },
];

const mockCatsOfTheDay = [
  {
    name: "Luna",
    message:
      "Today is a purr-fect day to tackle your dissertation! You've got this! 📚✨",
    catImage: "🐾",
  },
  {
    name: "Whiskers",
    message:
      "Take breaks and be kind to yourself. Progress, not perfection! 💝",
    catImage: "😻",
  },
];

const mockBirthdayMessage = {
  message:
    "Happy Birthday, beautiful soul! 🎂 May this year bring you joy, success, and lots of cuddles! 🎉🐱",
};

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState(mockQuotes[0]);
  const [currentCat, setCurrentCat] = useState(mockCatsOfTheDay[0]);
  const [showBirthday, setShowBirthday] = useState(false);

  // Simulate daily rotation
  useEffect(() => {
    const today = new Date().getDay();
    setCurrentQuote(mockQuotes[today % mockQuotes.length]);
    setCurrentCat(mockCatsOfTheDay[today % mockCatsOfTheDay.length]);

    // Show birthday message during birthday week (for demo, show randomly)
    setShowBirthday(Math.random() > 0.7);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-blush-50 to-mint-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-4xl font-handwritten font-bold text-warm-brown mb-2">
            Jasmeow
          </h1>
          <p className="text-warm-gray font-rounded">
            Your daily dose of motivation and purrs! 💕
          </p>
        </div>

        {/* Birthday Message */}
        {showBirthday && (
          <Card className="mb-6 bg-gradient-to-r from-blush-100 to-mint-100 border-blush-200">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">🎂</div>
              <h3 className="font-handwritten text-xl font-bold text-warm-brown mb-2">
                Special Day! 🎉
              </h3>
              <p className="text-warm-gray font-rounded leading-relaxed">
                {mockBirthdayMessage.message}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/timer">
            <Card className="bg-blush-100 border-blush-200 hover:bg-blush-200 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Timer className="mx-auto mb-2 text-warm-brown" size={24} />
                <div className="text-2xl mb-1">⏰</div>
                <h3 className="font-rounded font-semibold text-warm-brown text-sm">
                  Study Timer
                </h3>
              </CardContent>
            </Card>
          </Link>

          <Link to="/mood">
            <Card className="bg-mint-100 border-mint-200 hover:bg-mint-200 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Sparkles className="mx-auto mb-2 text-warm-brown" size={24} />
                <div className="text-2xl mb-1">😸</div>
                <h3 className="font-rounded font-semibold text-warm-brown text-sm">
                  How I Feel
                </h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Cat of the Day */}
        <Card className="mb-6 bg-beige-100 border-beige-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">{currentCat.catImage}</div>
              <div>
                <h3 className="font-handwritten text-xl font-bold text-warm-brown">
                  Cat of the Day
                </h3>
                <p className="text-sm font-rounded text-warm-gray">
                  Meet {currentCat.name}
                </p>
              </div>
            </div>
            <p className="text-warm-gray font-rounded leading-relaxed mb-4">
              {currentCat.message}
            </p>
            <Link to="/cat-of-the-day">
              <Button
                variant="ghost"
                size="sm"
                className="text-warm-brown hover:bg-beige-200 font-rounded"
              >
                See more <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Daily Quote */}
        <Card className="mb-6 bg-gradient-to-br from-mint-100 to-blush-100 border-mint-200">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-3xl mr-3">{currentQuote.catImage}</div>
              <div className="flex-1">
                <h3 className="font-handwritten text-xl font-bold text-warm-brown mb-2">
                  Daily Inspiration
                </h3>
                <blockquote className="text-warm-gray font-rounded leading-relaxed italic">
                  "{currentQuote.quote}"
                </blockquote>
                <p className="text-sm font-rounded text-warm-gray mt-2">
                  — {currentQuote.source}
                </p>
              </div>
            </div>
            <Link to="/quotes">
              <Button
                variant="ghost"
                size="sm"
                className="text-warm-brown hover:bg-mint-200 font-rounded"
              >
                More quotes <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center py-4">
          <p className="text-warm-gray font-rounded text-sm">
            "You're doing amazing, keep going! 🌟"
          </p>
          <div className="text-2xl mt-2">🐾💕🐾</div>
        </div>
      </div>
    </div>
  );
}
