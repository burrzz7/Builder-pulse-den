import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Timer, ArrowRight, Sparkles } from "lucide-react";
import {
  getTodaysQuote,
  getTodaysCat,
  isBirthday,
  getBirthdayMessage,
  moodCats,
} from "@shared/data";

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState(getTodaysQuote());
  const [currentCat, setCurrentCat] = useState(getTodaysCat());
  const [showBirthday, setShowBirthday] = useState(false);
  const [birthdayMessage, setBirthdayMessage] = useState(getBirthdayMessage());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    // Set today's content
    setCurrentQuote(getTodaysQuote());
    setCurrentCat(getTodaysCat());
    setShowBirthday(isBirthday());
    setBirthdayMessage(getBirthdayMessage());

    // Load saved mood from localStorage
    const savedMood = localStorage.getItem("meowu-selected-mood");
    if (savedMood) {
      setSelectedMood(savedMood);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 via-pink-50 to-purple-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">����</div>
          <h1 className="text-4xl font-corporate font-bold text-text-dark mb-2">
            MeowU
          </h1>
          <p className="text-text-gray font-corporate">
            Your daily dose of motivation and purrs!
          </p>
        </div>

        {/* Birthday Message */}
        {showBirthday && (
          <Card
            className={`mb-6 bg-gradient-to-r ${birthdayMessage.color} border-pink-200`}
          >
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">{birthdayMessage.emoji}</div>
              <h3 className="font-corporate text-xl font-bold text-text-dark mb-2">
                Special Day! 🎉
              </h3>
              <p className="text-text-gray font-corporate leading-relaxed">
                {birthdayMessage.message}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Current Mood Display */}
        {selectedMood && (
          <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="text-3xl mr-3">
                  {moodCats.find((cat) => cat.id === selectedMood)?.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-corporate text-lg font-bold text-text-dark">
                    Current Mood
                  </h3>
                  <p className="text-sm font-corporate text-text-gray">
                    You're feeling{" "}
                    {moodCats
                      .find((cat) => cat.id === selectedMood)
                      ?.mood.toLowerCase()}{" "}
                    today
                  </p>
                </div>
                <Link to="/mood">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-dark hover:bg-purple-200 font-corporate"
                  >
                    Change
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/timer">
            <Card className="bg-pink-100 border-pink-200 hover:bg-pink-200 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Timer className="mx-auto mb-2 text-text-dark" size={24} />
                <h3 className="font-corporate font-semibold text-text-dark text-sm">
                  Study Timer
                </h3>
              </CardContent>
            </Card>
          </Link>

          <Link to="/mood">
            <Card className="bg-purple-100 border-purple-200 hover:bg-purple-200 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Sparkles className="mx-auto mb-2 text-text-dark" size={24} />
                <h3 className="font-corporate font-semibold text-text-dark text-sm">
                  How I Feel
                </h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Daily Quote */}
        <Card className="mb-6 bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="text-3xl mr-3">{currentQuote.catEmoji}</div>
              <div className="flex-1">
                <h3 className="font-corporate text-xl font-bold text-text-dark mb-2">
                  Daily Inspiration
                </h3>
                <blockquote className="text-text-gray font-corporate leading-relaxed italic">
                  "{currentQuote.quote}"
                </blockquote>
                <p className="text-sm font-corporate text-text-gray mt-2">
                  — {currentQuote.author}
                </p>
              </div>
            </div>
            <Link to="/quotes">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-dark hover:bg-purple-200 font-corporate"
              >
                More quotes <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Did You Know */}
        <Card className="mb-6 bg-purple-100 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-corporate text-lg font-bold text-text-dark mb-4 text-center">
              Did You Know?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-xl mr-3">🐾</span>
                <p className="text-sm font-corporate text-text-gray">
                  Cats spend 70% of their lives sleeping - that's 13-16 hours a
                  day!
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">💝</span>
                <p className="text-sm font-corporate text-text-gray">
                  A cat's purr can help heal bones, reduce pain, and lower blood
                  pressure.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">🌟</span>
                <p className="text-sm font-corporate text-text-gray">
                  Each cat has a unique nose print, just like human
                  fingerprints!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center py-4">
          <p className="text-text-gray font-corporate text-sm">
            "You're doing amazing, keep going!"
          </p>
          <p className="text-text-gray font-corporate text-sm text-center">
            Birthday Gift for Jasmine cause I keep forgetting it
          </p>
        </div>
      </div>
    </div>
  );
}
