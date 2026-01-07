import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Feedback from "./pages/Feedback.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";

import { getMe } from "./api.js";

export default function App() {
  const [me, setMe] = useState({
    checking: true,
    authenticated: false,
    user: null,
  });

  const navigate = useNavigate();

  // 🔓 LOGOUT
  const handleLogout = async () => {
    try {
      await fetch(
        "https://gmail-ai-sorter-backend.onrender.com/auth/logout",
        { credentials: "include" }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setMe({
        checking: false,
        authenticated: false,
        user: null,
      });
      navigate("/", { replace: true });
    }
  };

  // 🔍 CHECK AUTH (NON-BLOCKING)
  useEffect(() => {
    let mounted = true;

    getMe()
      .then((res) => {
        if (mounted) {
          setMe({
            checking: false,
            authenticated: res?.authenticated || false,
            user: res?.user || null,
          });
        }
      })
      .catch(() => {
        if (mounted) {
          setMe({
            checking: false,
            authenticated: false,
            user: null,
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={me} onLogout={handleLogout} />

      <main className="flex-1">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home user={me} />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* PROTECTED ROUTE */}
          <Route
            path="/dashboard"
            element={
              me.checking ? (
                <div className="min-h-screen flex items-center justify-center text-slate-300">
                  Loading Dashboard...
                </div>
              ) : me.authenticated ? (
                <Dashboard user={me} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
