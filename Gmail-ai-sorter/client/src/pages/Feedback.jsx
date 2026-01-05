import React, { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = async () => {
    setError("");

    if (!rating) {
      setError("Please select a rating to continue.");
      return;
    }

    if (!comment.trim()) {
      setError("Please share a few words about your experience.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        credentials: "include", // 🔥 very important
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ rating, comment })
      });

      if (!res.ok) throw new Error();

      // ✅ FORM GAYAB
      setSubmitted(true);

      // ✅ FORCE FULL RELOAD (navbar refresh)
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px-56px)] gradient-bg">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-slate-50 mb-4">
            Feedback
          </h2>

          {submitted ? (
            <p className="text-sm text-slate-300">
              Thank you for your feedback. Redirecting to dashboard…
            </p>
          ) : (
            <>
              <p className="text-sm text-slate-300 mb-6">
                Rate your experience and help us improve Gmail AI Sorter.
              </p>

              {/* ⭐ Rating */}
              <div className="flex gap-2 text-2xl mb-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    className={
                      rating >= n
                        ? "text-yellow-400"
                        : "text-slate-500"
                    }
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* 📝 Comment */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Share your experience..."
                className="w-full rounded-lg p-3 bg-slate-800 text-slate-200 mb-3"
              />

              {error && (
                <p className="text-red-400 text-sm mb-3">{error}</p>
              )}

              {/* 🚀 Submit */}
              <button
                type="button"
                onClick={submitFeedback}
                disabled={loading}
                className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
