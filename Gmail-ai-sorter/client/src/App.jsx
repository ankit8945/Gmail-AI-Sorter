import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Feedback from "./pages/Feedback.jsx";

import { getMe } from "./api.js";

export default function App() {
  const [me, setMe] = useState(null);

const handleLogout = async () => {
  try {
    await fetch(
      "https://gmail-ai-sorter-backend.onrender.com/auth/logout",
      { credentials: "include" }
    );
  } catch (e) {
    console.error("Logout failed");
  } finally {
    // 🔥 THIS IS THE KEY LINE
    setMe({ authenticated: false, user: null });
  }
};


  useEffect(() => {
    getMe()
      .then(setMe)
      .catch(() => setMe({ authenticated: false }));
  }, []);

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        Loading Gmail AI Sorter...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={me} onLogout={handleLogout} />


      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home user={me} />} />

          {/* 🔥 SINGLE SOURCE OF TRUTH */}
          <Route
            path="/dashboard"
            element={<Dashboard user={me} />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

