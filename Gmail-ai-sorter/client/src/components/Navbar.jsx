import { NavLink } from "react-router-dom";
import { useState } from "react";

/* 🔥 Logo */
function CircularLogo({ src = "/fevicon.jpeg", size = 36 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden
                 bg-white border border-slate-700"
      style={{ width: size, height: size }}
    >
      <img src={src} alt="logo" className="w-full h-full object-contain" />
    </div>
  );
}

export default function Navbar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const base =
    "block px-4 py-3 rounded-lg text-sm font-medium transition";

  const links = [
    ["/", "Home"],
    ["/dashboard", "Dashboard"],
    ["/about", "About"],
    ["/about-us", "About Us"],
    ["/contact", "Contact"]
  ];

  const handleLogout = async () => {
    await fetch(
      "https://gmail-ai-sorter-backend.onrender.com/auth/logout",
      { credentials: "include" }
    );
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            <CircularLogo size={36} />
          </div>
          <span className="text-white font-bold text-sm sm:text-base">
            Gmail AI Sorter
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user?.authenticated ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-full
                         bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              Logout
            </button>
          ) : (
            <a
              href="https://gmail-ai-sorter-backend.onrender.com/auth/google"
              className="ml-2 px-4 py-2 rounded-full
                         bg-blue-500 text-white hover:bg-blue-600"
            >
              Login
            </a>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-200"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-4 py-3 space-y-1">
            {links.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `${base} ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {user?.authenticated ? (
              <button
                onClick={handleLogout}
                className={`${base} text-red-400 hover:bg-slate-800 w-full text-left`}
              >
                Logout
              </button>
            ) : (
              <a
                href="https://gmail-ai-sorter-backend.onrender.com/auth/google"
                className={`${base} bg-blue-500 text-white text-center`}
              >
                Login with Google
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
