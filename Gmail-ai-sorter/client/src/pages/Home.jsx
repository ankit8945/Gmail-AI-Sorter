import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleConnect = () => {
    window.location.href =
      "https://gmail-ai-sorter-backend.onrender.com/auth/google";
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="gradient-bg min-h-[calc(100vh-56px-56px)] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full card px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* LEFT — CORE MESSAGE */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3 tracking-tight">
              Your Gmail, finally organized.
            </h1>

            <p className="text-slate-300 text-sm max-w-md mb-6">
              Important emails first. Everything else neatly sorted —
              automatically.
            </p>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConnect}
                className="w-full sm:w-auto px-6 py-3 rounded-full
                           bg-blue-500 text-white text-sm font-medium
                           hover:bg-blue-600 transition"
              >
                Connect Gmail
              </button>

              {user?.authenticated && (
                <button
                  onClick={handleDashboard}
                  className="w-full sm:w-auto px-5 py-3 rounded-full
                             border border-slate-600 text-slate-200 text-xs
                             hover:bg-slate-800 transition"
                >
                  Open Dashboard
                </button>
              )}
            </div>

            {user?.authenticated && (
              <p className="mt-3 text-xs text-green-400">
                ✓ Gmail connected
              </p>
            )}
          </div>

          {/* RIGHT — PRODUCT HIGHLIGHTS */}
          <div className="flex-1 grid grid-cols-1 gap-3 text-sm text-slate-300">

            <div className="rounded-lg border border-slate-700/60 p-4 bg-slate-900/60">
              <p className="text-slate-100 font-medium mb-1">
                Clean inbox overview
              </p>
              <p>
                See where your emails actually go — at a glance.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700/60 p-4 bg-slate-900/60">
              <p className="text-slate-100 font-medium mb-1">
                Smart categorization
              </p>
              <p>
                Education, finance, updates — grouped automatically.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700/60 p-4 bg-slate-900/60">
              <p className="text-slate-100 font-medium mb-1">
                Privacy-first access
              </p>
              <p>
                Read-only Gmail access. No emails stored permanently.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
