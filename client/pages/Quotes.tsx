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
    <div className="min-h-screen bg-gradient-to-br from-blush-50 via-mint-50 to-beige-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-rounded font-bold text-warm-brown mb-2">
            Daily Quotes
          </h1>
          <p className="text-warm-gray font-rounded">
            Inspiration for every day!
          </p>
        </div>

        {/* Today's Featured Quote */}
        <Card className="mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 border-yellow-300">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-handwritten text-lg font-bold text-warm-brown">
                  Today's Featured Quote
                </h3>
                <p className="text-sm font-rounded text-warm-gray">
                  Your daily dose of inspiration
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(todaysQuote.id)}
                className="ml-auto text-warm-brown hover:bg-black/10"
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
            <blockquote className="text-warm-gray font-rounded leading-relaxed italic text-center mb-3">
              "{todaysQuote.quote}"
            </blockquote>
            <p className="text-sm font-rounded text-warm-gray text-center">
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
            className="border-beige-300 text-warm-brown hover:bg-beige-100 font-rounded"
          >
            <Shuffle size={16} className="mr-1" />
            Shuffle
          </Button>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={toggleFavoritesView}
            className={`font-rounded ${
              showFavoritesOnly
                ? "bg-blush-500 text-white hover:bg-blush-600"
                : "border-beige-300 text-warm-brown hover:bg-beige-100"
            }`}
          >
            <Heart size={16} className="mr-1" />
            Favorites ({favorites.length})
          </Button>
        </div>

        {/* Quotes List */}
        <div className="space-y-4">
          {displayQuotes.length === 0 ? (
            <Card className="bg-beige-100 border-beige-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-handwritten text-lg font-bold text-warm-brown mb-2">
                  No favorites yet!
                </h3>
                <p className="text-warm-gray font-rounded text-sm">
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
                      ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200"
                      : "bg-gradient-to-r from-mint-100 to-blush-100 border-mint-200"
                  } relative`}
                >
                  <CardContent className="p-6">
                    {isToday && (
                      <div className="absolute top-2 left-2 text-xs font-rounded bg-yellow-300 text-warm-brown px-2 py-1 rounded-full">
                        Today's
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(quote.id)}
                      className="absolute top-4 right-4 text-warm-brown hover:bg-black/10"
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorited ? "fill-current text-red-500" : ""
                        }
                      />
                    </Button>

                    <div className="flex items-start mb-4">
                      <div className="flex-1">
                        <blockquote className="text-warm-gray font-rounded leading-relaxed italic mb-3">
                          "{quote.quote}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-rounded text-warm-gray">
                            — {quote.author}
                          </p>
                          <span className="text-xs font-rounded bg-white/50 text-warm-gray px-2 py-1 rounded-full">
                            {quote.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Stats */}
        <Card className="mt-6 bg-beige-100 border-beige-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-lg font-handwritten font-bold text-warm-brown">
                  {motivationalQuotes.length}
                </div>
                <div className="text-xs font-rounded text-warm-gray">
                  Total Quotes
                </div>
              </div>
              <div>
                <div className="text-lg font-handwritten font-bold text-warm-brown">
                  {favorites.length}
                </div>
                <div className="text-xs font-rounded text-warm-gray">
                  Favorites
                </div>
              </div>
              <div>
                <div className="text-lg font-handwritten font-bold text-warm-brown">
                  4
                </div>
                <div className="text-xs font-rounded text-warm-gray">
                  Artists
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center py-6">
          <p className="text-warm-gray font-rounded text-sm">
            "Let these words inspire your beautiful journey!"
          </p>
        </div>
      </div>
    </div>
  );
}
