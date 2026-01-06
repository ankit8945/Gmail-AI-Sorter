import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const base =
    "block px-4 py-3 rounded-lg text-sm font-medium transition";

  const links = [
    ["/", "Home"],
    ["/dashboard", "Dashboard"],
    ["/about", "About"],
    ["/about-us", "About Us"],
    ["/contact", "Contact"]
  ];

  /* close profile dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

          {/* 🔽 PROFILE DROPDOWN */}
          {user?.authenticated ? (
            <div className="relative ml-2" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-full
                           hover:bg-slate-800 transition"
              >
                <img
                  src={
                    user.user?.photo ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="profile"
                  className="h-8 w-8 rounded-full border border-slate-600"
                />
                <span className="text-xs text-slate-200 max-w-[120px] truncate">
                  {user.user?.name}
                </span>
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-56
                             bg-slate-900 border border-slate-700
                             rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm text-slate-100 font-medium truncate">
                      {user.user?.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.user?.email}
                    </p>
                  </div>

                  <button
                    onClick={onLogout}
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
          className="md:hidden text-slate-200 text-xl"
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
              <>
                <div className="px-4 py-2 text-xs text-slate-400">
                  {user.user?.email}
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className={`${base} text-red-400 hover:bg-slate-800 w-full text-left`}
                >
                  Logout
                </button>
              </>
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
