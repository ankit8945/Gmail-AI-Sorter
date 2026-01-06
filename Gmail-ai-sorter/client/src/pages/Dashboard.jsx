import React, { useEffect, useState } from "react";
import { analyzeEmails } from "../api";
import LoadingOverlay from "../components/LoadingOverlay";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import CategoryBarChart from "../components/charts/CategoryBarChart";
import AddKeyword from "../components/AddKeyword";

const EMAIL_COUNTS = [10, 20, 50, 100, 500, 1000];

const CATEGORY_COLORS = {
  Education: "bg-blue-500",
  Finance: "bg-green-500",
  Jobs: "bg-red-500",
  Social: "bg-yellow-500",
  Entertainment: "bg-purple-500",
  Updates: "bg-indigo-500",
};

export default function Dashboard({ user }) {
  console.log("DASHBOARD PAGE LOADED", user);

  const [count, setCount] = useState(20);
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({ total: 0, categories: {} });
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // 🔐 AUTH GUARD (DASHBOARD LEVEL)
if (!user?.authenticated) {
  return (
    <div className="min-h-[70vh] gradient-bg flex items-center justify-center px-4">
      <div className="card p-6 text-center max-w-sm w-full">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">
          Login required
        </h2>

        <p className="text-slate-300 text-sm mb-4">
          Please connect your Gmail account to access the dashboard.
        </p>

        <a
          href="https://gmail-ai-sorter-backend.onrender.com/auth/google"
          className="inline-block px-5 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
        >
          Connect Gmail with Google
        </a>
      </div>
    </div>
  );
}


  /* =====================
     ANALYZE EMAILS
  ===================== */
  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeEmails(count);
      setEmails(data?.emails || []);
      setStats(data?.stats || { total: 0, categories: {} });
      setActiveCategory("All");
    } catch (err) {
      setError("Failed to analyze emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     AUTO LOAD ON FIRST RENDER
  ===================== */
  useEffect(() => {
    handleAnalyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =====================
     GROUP EMAILS
  ===================== */
  const grouped = emails.reduce((acc, mail) => {
    const cat = mail.category || "Updates";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(mail);
    return acc;
  }, {});

  const categories = ["All", ...Object.keys(grouped)];

  return (
    <div className="min-h-screen gradient-bg px-4 py-6">
      {loading && <LoadingOverlay />}

      {/* HEADER */}
     <div className="mb-8 rounded-3xl p-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 shadow-xl">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

    {/* LEFT: TITLE */}
    <div>
      <h1 className="text-3xl font-bold text-white">
        Inbox Dashboard
      </h1>
      <p className="text-blue-100 text-sm mt-1 max-w-md">
        Analyze & categorize Gmail emails using AI
      </p>
    </div>

    {/* RIGHT: CONTROLS */}
    <div className="flex flex-wrap lg:justify-end gap-3 items-center">
      <select
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="rounded-full px-4 py-2 bg-white text-slate-800 font-medium shadow"
      >
        {EMAIL_COUNTS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        onClick={handleAnalyze}
        className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold shadow hover:bg-black"
      >
        Analyze
      </button>

      <AddKeyword user={user} />
    </div>
  </div>
</div>


      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400">
          {error}
        </div>
      )}

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <CategoryPieChart stats={stats} />
        <CategoryBarChart stats={stats} />
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              activeCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {cat}
            {cat !== "All" && ` (${grouped[cat]?.length || 0})`}
          </button>
        ))}
      </div>

      {/* EMAIL LIST */}
      <div className="space-y-5 max-h-[520px] overflow-y-auto pr-2">
        {(activeCategory === "All"
          ? emails
          : grouped[activeCategory] || []
        ).map((mail) => (
          <a
            key={mail.id}
            href={mail.gmailLink}
            target="_blank"
            rel="noreferrer"
            className="block p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 transition border border-slate-700"
          >
            <div className="flex justify-between items-start mb-2 gap-3">
              <h4 className="text-lg font-semibold text-white leading-snug">
                {mail.subject}
              </h4>

              <span
                className={`text-xs px-2 py-1 rounded-full text-white shrink-0 ${
                  CATEGORY_COLORS[mail.category] || "bg-gray-500"
                }`}
              >
                {mail.category}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {mail.snippet}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}



