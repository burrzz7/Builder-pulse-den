import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

// Pages
import Index from "./pages/Index";
import Timer from "./pages/Timer";
import CatOfTheDay from "./pages/CatOfTheDay";
import Mood from "./pages/Mood";
import Quotes from "./pages/Quotes";
import NotFound from "./pages/NotFound";

// Components
import BottomNavigation from "./components/BottomNavigation";

function App() {
  return (
    <BrowserRouter>
      <div className="font-rounded antialiased">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/cat-of-the-day" element={<CatOfTheDay />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
