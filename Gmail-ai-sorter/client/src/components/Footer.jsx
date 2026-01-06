import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <span className="text-center sm:text-left">
          © {new Date().getFullYear()} Team Hexa. All rights reserved.
        </span>

        <span className="text-slate-500 text-center sm:text-right">
          Built with ❤️ by Team Hexa
        </span>
        <span>
        <a href="/privacy-policy">Privacy Policy</a>
           
        <a href="/terms-of-service">Terms of Service</a>

        </span>
      </div>
    </footer>
  );
};

export default Footer;


