import { Card, CardContent } from "../components/ui/card";

export default function Mood() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-beige-50 to-blush-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">😸</div>
          <h1 className="text-3xl font-handwritten font-bold text-warm-brown mb-2">
            Which Cat Do You Feel Today?
          </h1>
          <p className="text-warm-gray font-rounded">
            Tap to discover your mood cat!
          </p>
        </div>

        <Card className="bg-mint-100 border-mint-200">
          <CardContent className="p-6 text-center">
            <div className="text-8xl mb-4">🚧</div>
            <h3 className="font-handwritten text-xl font-bold text-warm-brown mb-2">
              Coming Soon!
            </h3>
            <p className="text-warm-gray font-rounded">
              This page will feature an interactive mood selector with different
              cat personalities.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
