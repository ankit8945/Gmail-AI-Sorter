import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Feedback from "./pages/Feedback.jsx";


// ⚠️ CASE-SENSITIVE IMPORT (VERY IMPORTANT)
import AddKeyword from "./components/AddKeyword.jsx";

import { getMe } from "./api.js";

const App = () => {
  const [me, setMe] = useState({ authenticated: false, user: null });
  const [initialized, setInitialized] = useState(false);

  // 🔥 keyword → category map (frontend copy)
  const [keywordMap, setKeywordMap] = useState({});

  useEffect(() => {
    const loadMe = async () => {
      try {
        const data = await getMe();
        setMe(data);
      } catch {
        setMe({ authenticated: false, user: null });
      } finally {
        setInitialized(true);
      }
    };
    loadMe();
  }, []);

  /* ======================
     LOADING SCREEN
  ====================== */
  if (!initialized) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="card px-6 py-5 flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-blue-500/20 border-t-blue-400 animate-spin" />
          <p className="text-xs text-slate-300">
            Loading Gmail AI Sorter...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <Navbar user={me} />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home user={me} />} />

          {/* DASHBOARD (AUTH REQUIRED) */}
          <Route
            path="/dashboard"
            element={
              me.authenticated ? (
                <div className="px-4 py-4">
                  

                  {/* 🔥 DASHBOARD GETS KEYWORD MAP */}
                  <Dashboard
                    user={me}
                    keywordMap={keywordMap}
                  />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* STATIC PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />


          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;



