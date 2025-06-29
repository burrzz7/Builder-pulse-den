import { Card, CardContent } from "../components/ui/card";

export default function CatOfTheDay() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-blush-50 to-mint-50 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-3xl font-handwritten font-bold text-warm-brown mb-2">
            Cat of the Day
          </h1>
          <p className="text-warm-gray font-rounded">
            Meet your daily feline friend!
          </p>
        </div>

        <Card className="bg-beige-100 border-beige-200">
          <CardContent className="p-6 text-center">
            <div className="text-8xl mb-4">🚧</div>
            <h3 className="font-handwritten text-xl font-bold text-warm-brown mb-2">
              Coming Soon!
            </h3>
            <p className="text-warm-gray font-rounded">
              This page will feature daily cat illustrations with encouraging
              messages.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
