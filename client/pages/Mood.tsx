import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { moodCats } from "@shared/data";

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setShowMessage(true);
    // Save mood to localStorage for persistence
    localStorage.setItem("meowu-selected-mood", moodId);
  };

  const resetSelection = () => {
    setSelectedMood(null);
    setShowMessage(false);
  };

  const selectedCat = moodCats.find((cat) => cat.id === selectedMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-beige-50 to-blush-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">😸</div>
          <h1 className="text-3xl font-corporate font-bold text-warm-brown mb-2">
            Which Cat Do You Feel Today?
          </h1>
          <p className="text-warm-gray font-corporate">
            Tap a cat that matches your mood!
          </p>
        </div>

        {showMessage && selectedCat ? (
          /* Selected Mood Display */
          <div className="space-y-6">
            <Card
              className={`bg-gradient-to-r ${selectedCat.color} border-none relative overflow-hidden`}
            >
              <CardContent className="p-8 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetSelection}
                  className="absolute top-4 right-4 text-warm-brown hover:bg-black/10"
                >
                  <RotateCcw size={16} />
                </Button>

                <div className="text-8xl mb-4">{selectedCat.emoji}</div>
                <h2 className="text-2xl font-corporate font-bold text-warm-brown mb-2">
                  {selectedCat.name}
                </h2>
                <p className="text-lg font-corporate text-warm-gray mb-4">
                  Feeling {selectedCat.mood.toLowerCase()}
                </p>
                <div className="text-sm font-corporate text-warm-gray bg-white/50 rounded-full px-4 py-2 inline-block mb-6">
                  {selectedCat.description}
                </div>

                <div className="bg-white/70 rounded-xl p-6">
                  <div className="flex items-center justify-center mb-3">
                    <Sparkles size={20} className="text-warm-brown mr-2" />
                    <h3 className="font-corporate text-lg font-bold text-warm-brown">
                      Message for You
                    </h3>
                    <Sparkles size={20} className="text-warm-brown ml-2" />
                  </div>
                  <p className="text-warm-gray font-corporate leading-relaxed italic text-center">
                    {selectedCat.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-beige-100 border-beige-200">
              <CardContent className="p-6">
                <h3 className="font-corporate text-lg font-bold text-warm-brown mb-4 text-center">
                  Self-Care Tips 💖
                </h3>
                <div className="space-y-3">
                  {selectedCat.id === "happy" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🌟</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Share your joy! Call a friend or write in a gratitude
                          journal.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🎵</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Play your favorite upbeat songs and dance!
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "sleepy" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🛌</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Take a power nap or rest with a cozy blanket.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🍵</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Try some chamomile tea and gentle stretching.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "sad" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🤗</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          It's okay to feel sad. Reach out to someone you trust.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">📝</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Write down your feelings in a journal.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "angry" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🧘</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Take deep breaths and count to ten slowly.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🏃</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Channel that energy into physical exercise.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "curious" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">📚</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Read something new or explore a interesting topic!
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🔍</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Try a new hobby or skill you've been curious about.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "playful" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🎮</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Play a fun game or do something creative!
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🎨</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Express yourself through art, music, or writing.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "anxious" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🌸</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Practice mindfulness or try a breathing exercise.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">☕</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Make a warm drink and focus on the present moment.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "loving" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">💌</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Send a message to someone you care about.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🌺</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Practice self-love with positive affirmations.
                        </p>
                      </div>
                    </>
                  )}
                  {selectedCat.id === "focused" && (
                    <>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">🎯</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Make a to-do list and tackle one task at a time.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="text-lg mr-3">⏰</span>
                        <p className="text-sm font-corporate text-warm-gray">
                          Use the study timer to maintain your focus!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={resetSelection}
                variant="outline"
                className="border-beige-300 text-warm-brown hover:bg-beige-100 font-corporate"
              >
                Choose Another Mood
              </Button>
            </div>
          </div>
        ) : (
          /* Mood Selection Grid */
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {moodCats.map((cat) => (
                <Card
                  key={cat.id}
                  className={`bg-gradient-to-r ${cat.color} border-none cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95`}
                  onClick={() => handleMoodSelect(cat.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{cat.emoji}</div>
                    <h3 className="font-corporate text-lg font-bold text-warm-brown mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm font-corporate text-warm-gray font-medium">
                      {cat.mood}
                    </p>
                    <p className="text-xs font-corporate text-warm-gray mt-2">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Encouragement */}
            <Card className="bg-gradient-to-r from-blush-100 to-mint-100 border-blush-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">💖</div>
                <h3 className="font-corporate text-lg font-bold text-warm-brown mb-2">
                  All Feelings Are Valid
                </h3>
                <p className="text-warm-gray font-corporate text-sm leading-relaxed">
                  Whatever you're feeling today is completely okay. Every
                  emotion has its place, and you're doing great! 🌟
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Motivational Footer */}
        <div className="text-center py-6">
          <p className="text-warm-gray font-corporate text-sm">
            "Your feelings matter, and so do you! 💕"
          </p>
          <div className="text-2xl mt-2">🐾✨🐾</div>
        </div>
      </div>
    </div>
  );
}
