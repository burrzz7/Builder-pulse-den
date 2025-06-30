import { Link, useLocation } from "react-router-dom";
import { Home, Timer, Heart, Smile, Quote } from "lucide-react";

const navItems = [
  {
    path: "/",
    icon: Home,
    label: "Home",
    activeIcon: "🏠",
  },
  {
    path: "/timer",
    icon: Timer,
    label: "Timer",
    activeIcon: "⏰",
  },
  {
    path: "/mood",
    icon: Smile,
    label: "Mood",
    activeIcon: "😸",
  },
  {
    path: "/quotes",
    icon: Quote,
    label: "Quotes",
    activeIcon: "💭",
  },
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white-50 border-t border-white-200 px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-pink-100 text-text-dark"
                  : "text-text-gray hover:bg-white-100 hover:text-text-dark"
              }`}
            >
              <div className="relative">
                {isActive ? (
                  <span className="text-xl">{item.activeIcon}</span>
                ) : (
                  <Icon size={20} />
                )}
              </div>
              <span className="text-xs font-corporate mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
