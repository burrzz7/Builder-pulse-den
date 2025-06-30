import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Heart, Shuffle } from "lucide-react";
import { motivationalQuotes, getTodaysQuote } from "@shared/data";

export default function Quotes() {
  const [quotes, setQuotes] = useState(motivationalQuotes);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const todaysQuote = getTodaysQuote();
  const categories = [
    "all",
    ...Array.from(new Set(motivationalQuotes.map((q) => q.category))),
  ];

  const toggleFavorite = (quoteId: number) => {
    setFavorites((prev) =>
      prev.includes(quoteId)
        ? prev.filter((id) => id !== quoteId)
        : [...prev, quoteId],
    );
  };

  const shuffleQuotes = () => {
    const shuffled = [...quotes].sort(() => Math.random() - 0.5);
    setQuotes(shuffled);
  };

  const filterQuotes = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setQuotes(motivationalQuotes);
    } else {
      setQuotes(
        motivationalQuotes.filter((quote) => quote.category === category),
      );
    }
  };

  const toggleFavoritesView = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    if (!showFavoritesOnly) {
      setQuotes(
        motivationalQuotes.filter((quote) => favorites.includes(quote.id)),
      );
    } else {
      setQuotes(motivationalQuotes);
      setSelectedCategory("all");
    }
  };

  const displayQuotes = showFavoritesOnly
    ? motivationalQuotes.filter((quote) => favorites.includes(quote.id))
    : quotes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 via-pink-50 to-purple-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-corporate font-bold text-text-dark mb-2">
            Daily Quotes
          </h1>
          <p className="text-text-gray font-corporate">
            Inspiration for every day!
          </p>
        </div>

        {/* Today's Featured Quote */}
        <Card className="mb-6 bg-gradient-to-r from-pink-200 to-purple-200 border-pink-300">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-corporate text-lg font-bold text-text-dark">
                  Today's Featured Quote
                </h3>
                <p className="text-sm font-corporate text-text-gray">
                  Your daily dose of inspiration
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(todaysQuote.id)}
                className="ml-auto text-text-dark hover:bg-black/10"
              >
                <Heart
                  size={20}
                  className={
                    favorites.includes(todaysQuote.id)
                      ? "fill-current text-red-500"
                      : ""
                  }
                />
              </Button>
            </div>
            <blockquote className="text-text-gray font-corporate leading-relaxed italic text-center mb-3">
              "{todaysQuote.quote}"
            </blockquote>
            <p className="text-sm font-corporate text-text-gray text-center">
              — {todaysQuote.author}
            </p>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleQuotes}
            className="border-white-200 text-text-dark hover:bg-white-100 font-corporate"
          >
            <Shuffle size={16} className="mr-1" />
            Shuffle
          </Button>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={toggleFavoritesView}
            className={`font-corporate ${
              showFavoritesOnly
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "border-white-200 text-text-dark hover:bg-white-100"
            }`}
          >
            <Heart size={16} className="mr-1" />
            Favorites ({favorites.length})
          </Button>
        </div>

        {/* Quotes List */}
        <div className="space-y-4">
          {displayQuotes.length === 0 ? (
            <Card className="bg-white-100 border-white-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-corporate text-lg font-bold text-text-dark mb-2">
                  No favorites yet!
                </h3>
                <p className="text-text-gray font-corporate text-sm">
                  Start adding quotes to your favorites by tapping the heart
                  icon.
                </p>
              </CardContent>
            </Card>
          ) : (
            displayQuotes.map((quote, index) => {
              const isFavorited = favorites.includes(quote.id);
              const isToday = quote.id === todaysQuote.id;

              return (
                <Card
                  key={`${quote.id}-${index}`}
                  className={`${
                    isToday
                      ? "bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200"
                      : "bg-gradient-to-r from-white-100 to-pink-100 border-white-200"
                  } relative`}
                >
                  <CardContent className="p-6">
                    {/* Top section with badge and button */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {isToday && (
                          <div className="text-xs font-corporate bg-pink-300 text-text-dark px-2 py-1 rounded-full inline-block mb-3">
                            Today's
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(quote.id)}
                        className="text-text-dark hover:bg-black/10 ml-2"
                      >
                        <Heart
                          size={18}
                          className={
                            isFavorited ? "fill-current text-red-500" : ""
                          }
                        />
                      </Button>
                    </div>

                    {/* Quote content */}
                    <div className="mb-4">
                      <blockquote className="text-text-gray font-corporate leading-relaxed italic mb-3">
                        "{quote.quote}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-corporate text-text-gray">
                          — {quote.author}
                        </p>
                        <span className="text-xs font-corporate bg-white/50 text-text-gray px-2 py-1 rounded-full">
                          {quote.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Stats */}
        <Card className="mt-6 bg-white-100 border-white-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-lg font-corporate font-bold text-text-dark">
                  {motivationalQuotes.length}
                </div>
                <div className="text-xs font-corporate text-text-gray">
                  Total Quotes
                </div>
              </div>
              <div>
                <div className="text-lg font-corporate font-bold text-text-dark">
                  {favorites.length}
                </div>
                <div className="text-xs font-corporate text-text-gray">
                  Favorites
                </div>
              </div>
              <div>
                <div className="text-lg font-corporate font-bold text-text-dark">
                  4
                </div>
                <div className="text-xs font-corporate text-text-gray">
                  Artists
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center py-6">
          <p className="text-text-gray font-corporate text-sm">
            "Let these words inspire your beautiful journey!"
          </p>
        </div>
      </div>
    </div>
  );
}
