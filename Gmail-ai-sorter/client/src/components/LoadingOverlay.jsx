import React from "react";

const LoadingOverlay = ({ message = "Analyzing your inbox..." }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="card px-8 py-6 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-blue-500/20 border-t-blue-400 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-blue-500/20 blur-lg" />
        </div>
        <p className="text-slate-100 font-medium text-sm">{message}</p>
        <p className="text-xs text-slate-400">
          Gemini is classifying your latest emails. This may take a few seconds.
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
