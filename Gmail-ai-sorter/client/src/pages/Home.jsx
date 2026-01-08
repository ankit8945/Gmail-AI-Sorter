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
      <div className="max-w-3xl w-full card px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-4 tracking-tight">
              Let Gemini organize your Gmail in seconds
            </h1>

            <p className="text-slate-300 text-sm mb-6">
              Gmail AI Sorter securely connects to your Gmail and uses Gemini AI
              to classify emails into smart categories like Work, Finance,
              Promotions, and more.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* LOGIN BUTTON — always visible */}
              <button
                onClick={handleConnect}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-medium shadow-lg shadow-blue-500/40 hover:from-blue-600 hover:to-sky-500 transition"
              >
                Connect Gmail 
              </button>

              {/* DASHBOARD — ONLY WHEN LOGGED IN */}
              {user?.authenticated && (
                <button
                  onClick={handleDashboard}
                  className="px-4 py-2 rounded-full border border-slate-600 text-slate-200 text-xs font-medium hover:bg-slate-800 transition"
                >
                  Go to Dashboard
                </button>
              )}
            </div>

            {/* LOGIN STATUS */}
            {user?.authenticated && (
              <p className="mt-4 text-xs text-green-400">
                ✅ You are already logged in
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-4 text-sm text-slate-300">
            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Privacy-first by design
              </p>
              <p>
                Only email subject and snippet are analyzed. Full email content
                is never accessed.
              </p>
            </div>

            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Smart inbox insights
              </p>
              <p>
                Automatically categorizes emails and provides clear visual
                summaries.
              </p>
            </div>

            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Built for real-world use
              </p>
              <p>
                Full-stack system with OAuth, AI integration, and responsive UI.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;

