import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleConnect = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div className="gradient-bg min-h-[calc(100vh-56px-56px)] flex items-center justify-center px-4">
      <div className="max-w-3xl w-full card px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-4 tracking-tight">
              Let Gemini organize your Gmail in seconds
            </h1>
            <p className="text-slate-300 text-sm mb-6">
              Gmail AI Sorter connects securely with your Gmail, pulls only
              subjects and snippets, and uses Gemini AI to classify your inbox
              into smart categories like Work, Promotions and Finance.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={handleConnect}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 text-white text-sm font-medium shadow-lg shadow-blue-500/40 hover:from-blue-600 hover:to-sky-500 transition"
              >
                {user && user.authenticated
                  ? "Re-connect Gmail"
                  : "Connect Gmail with Google"}
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-full border border-slate-600 text-slate-200 text-xs font-medium hover:bg-slate-800 transition"
              >
                Go to dashboard
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 text-sm text-slate-300">
            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Privacy-first by design
              </p>
              <p>
                Connects securely to Gmail and reads only subject, snippet,
                and received date. Email content is never accessed.
              </p>
            </div>

            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Smart inbox insights
              </p>
              <p>
                Automatically categorizes emails and shows clear
                visual summaries using charts.
              </p>
            </div>

            <div className="border border-slate-700/70 rounded-xl p-4 bg-slate-900/70">
              <p className="font-semibold mb-1 text-slate-100">
                Built as a complete system
              </p>
              <p>
                Full-stack project with authentication, real APIs,
                and a clean, responsive interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
