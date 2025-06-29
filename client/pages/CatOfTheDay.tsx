import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Heart } from "lucide-react";
import { getTodaysCat, getTodaysQuote, dailyCats } from "@shared/data";

export default function CatOfTheDay() {
  const [currentCat, setCurrentCat] = useState(getTodaysCat());
  const [currentQuote, setCurrentQuote] = useState(getTodaysQuote());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const todaysCat = getTodaysCat();
    const todaysQuote = getTodaysQuote();
    setCurrentCat(todaysCat);
    setCurrentQuote(todaysQuote);

    // Find today's cat index
    const todayIndex = dailyCats.findIndex((cat) => cat.id === todaysCat.id);
    setCurrentIndex(todayIndex);
  }, []);

  const navigateCat = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % dailyCats.length
        : (currentIndex - 1 + dailyCats.length) % dailyCats.length;

    setCurrentIndex(newIndex);
    setCurrentCat(dailyCats[newIndex]);
    setIsFavorited(false);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const getDayOfWeek = (index: number) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[index];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-blush-50 to-mint-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentCat.emoji}</div>
          <h1 className="text-3xl font-handwritten font-bold text-warm-brown mb-2">
            Cat of the Day
          </h1>
          <p className="text-warm-gray font-rounded">
            Meet your daily feline friend!
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateCat("prev")}
            className="border-beige-300 text-warm-gray hover:bg-beige-100"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex items-center text-sm font-rounded text-warm-gray">
            <Calendar size={16} className="mr-1" />
            {getDayOfWeek(currentIndex)}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateCat("next")}
            className="border-beige-300 text-warm-gray hover:bg-beige-100"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Main Cat Card */}
        <Card
          className={`mb-6 bg-gradient-to-br ${currentCat.color} border-beige-200 relative overflow-hidden`}
        >
          <CardContent className="p-8">
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className="absolute top-4 right-4 text-warm-brown hover:bg-black/10"
            >
              <Heart
                size={20}
                className={isFavorited ? "fill-current text-red-500" : ""}
              />
            </Button>

            {/* Cat Character */}
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{currentCat.emoji}</div>
              <h2 className="text-2xl font-handwritten font-bold text-warm-brown mb-2">
                {currentCat.name}
              </h2>
              <p className="text-lg font-rounded text-warm-gray italic mb-4">
                {currentCat.character}
              </p>
              <div className="text-sm font-rounded text-warm-gray bg-white/50 rounded-full px-4 py-2 inline-block">
                {currentCat.personality}
              </div>
            </div>

            {/* Message */}
            <div className="bg-white/70 rounded-xl p-6 mb-6">
              <h3 className="font-handwritten text-lg font-bold text-warm-brown mb-3">
                Today's Message 💌
              </h3>
              <p className="text-warm-gray font-rounded leading-relaxed text-center italic">
                "{currentCat.message}"
              </p>
            </div>

            {/* Daily Quote */}
            <div className="bg-white/50 rounded-xl p-6">
              <h3 className="font-handwritten text-lg font-bold text-warm-brown mb-3">
                Inspiration for Today ✨
              </h3>
              <blockquote className="text-warm-gray font-rounded leading-relaxed text-center italic mb-2">
                "{currentQuote.quote}"
              </blockquote>
              <p className="text-sm font-rounded text-warm-gray text-center">
                — {currentQuote.author}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cat Gallery Preview */}
        <Card className="mb-6 bg-beige-100 border-beige-200">
          <CardContent className="p-4">
            <h3 className="font-handwritten text-lg font-bold text-warm-brown mb-4 text-center">
              This Week's Cats 🐾
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {dailyCats.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setCurrentCat(cat);
                    setIsFavorited(false);
                  }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${
                    index === currentIndex
                      ? "bg-blush-200 scale-110"
                      : "bg-beige-200 hover:bg-beige-300"
                  }`}
                >
                  {cat.emoji}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={day}
                    className="text-xs font-rounded text-warm-gray text-center"
                  >
                    {day}
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="bg-mint-100 border-mint-200">
          <CardContent className="p-6">
            <h3 className="font-handwritten text-lg font-bold text-warm-brown mb-4 text-center">
              Did You Know? 🤔
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-xl mr-3">🐾</span>
                <p className="text-sm font-rounded text-warm-gray">
                  Cats spend 70% of their lives sleeping - that's 13-16 hours a
                  day!
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">💝</span>
                <p className="text-sm font-rounded text-warm-gray">
                  A cat's purr can help heal bones, reduce pain, and lower blood
                  pressure.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">🌟</span>
                <p className="text-sm font-rounded text-warm-gray">
                  Each cat has a unique nose print, just like human
                  fingerprints!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center py-6">
          <p className="text-warm-gray font-rounded text-sm">
            "You're pawsome just the way you are! 🌟"
          </p>
          <div className="text-2xl mt-2">🐾💕🐾</div>
        </div>
      </div>
    </div>
  );
}
