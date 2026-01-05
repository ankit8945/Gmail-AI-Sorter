import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

/* 🔥 Reusable Circular Logo */
function CircularLogo({ src = "/fevicon.jpeg", size = 36 }) {
  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden
                 bg-white border border-slate-700 flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt="logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

export default function Navbar({ user }) {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition";

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // logout handler
  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      credentials: "include"
    });
    window.location.href = "/";
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto min-h-[56px] px-4 flex justify-between items-center">

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-2">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
            <CircularLogo src="/fevicon.jpeg" size={40} />
          </div>

          <span className="text-white font-bold whitespace-nowrap">
            Gmail AI Sorter
          </span>
        </div>

        {/* NAV + PROFILE */}
        <div className="flex gap-2 items-center flex-wrap">

          {/* PUBLIC LINKS */}
          {[
            ["/", "Home"],
            ["/dashboard", "Dashboard"],
            ["/about", "About"],
            ["/about-us", "About Us"],
            ["/contact", "Contact"]
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
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

          {/* ✅ FEEDBACK (ONLY IF NOT SUBMITTED) */}
          {user?.authenticated && !user?.user?.feedbackGiven && (
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `${base} ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Feedback
            </NavLink>
          )}

          {/* PROFILE / LOGIN */}
          {user?.authenticated ? (
            <div className="relative ml-2" ref={ref}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-2 py-1 rounded-full
                           hover:bg-slate-800 transition max-w-[160px]"
              >
                <img
                  src={
                    user.user.photo ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="profile"
                  className="h-8 w-8 rounded-full border border-slate-600 flex-shrink-0"
                />

                <span className="text-xs text-slate-200 hidden md:block truncate">
                  {user.user.name}
                </span>
              </button>

              {open && (
                <div
                  className="absolute right-0 mt-2 w-56 max-w-[90vw]
                             bg-slate-900 border border-slate-700
                             rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-medium truncate">
                      {user.user.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm
                               text-red-400 hover:bg-slate-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="http://localhost:5000/auth/google"
              className="ml-2 px-4 py-2 rounded-full text-sm
                         bg-blue-500 text-white hover:bg-blue-600"
            >
              Login with Google
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
