import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/aboutus" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close drawer on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Main Header ─── */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">

            {/* Left: Logo */}
            <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
              <img
                src={Logo}
                alt="PetFeed"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
              />
            </Link>

            {/* Center: Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center"
              aria-label="Main navigation"
            >
              {navLinks.map(({ label, href }) => {
                const isActive = label === "Home" ? isHome : location.pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    className="relative group text-sm font-medium transition-colors duration-200"
                    style={{ color: isActive ? '#2563a8' : undefined }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#2563a8';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = isActive ? '#2563a8' : '';
                    }}
                  >
                    <span className={isActive ? "text-[#2563a8] font-semibold" : "text-gray-600 group-hover:text-[#2563a8]"}>
                      {label}
                    </span>
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      style={{ backgroundColor: '#2563a8' }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search + Login (desktop) + Hamburger (mobile) */}
            <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0 ml-auto">

              {/* Search — visible from md */}
              <div className="hidden md:block relative w-[11rem] lg:w-[13rem] shrink-0 mx-1 lg:mx-2">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Login — hidden on mobile, visible on sm+ */}
              <Link
                to="/login"
                id="login-btn"
                className="hidden sm:inline-flex flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-white text-xs sm:text-sm font-medium transition-colors"
                style={{ backgroundColor: '#2563a8' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#1d4e8f'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#2563a8'}
              >
                Login
              </Link>

              {/* Hamburger — mobile only, on the right */}
              <button
                type="button"
                id="mobile-menu-btn"
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer Backdrop ─── */}
      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden top-14 sm:top-16"
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}

      {/* ─── Mobile Drawer ─── */}
      <aside
        id="mobile-nav"
        aria-hidden={!menuOpen}
        className={`fixed top-14 sm:top-16 right-0 z-50 flex flex-col w-[min(280px,85vw)] h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-white border-l border-gray-200 shadow-xl transition-transform duration-200 ease-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">

          {/* Drawer Header with Close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-700">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 py-5 flex flex-col flex-1">
            {/* Mobile Search */}
            <div className="mb-4 pb-4 border-b border-gray-100">
              <div className="relative w-full">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
              {navLinks.map(({ label, href }) => {
                const isActive = label === "Home" ? isHome : location.pathname === href;
                return (
                  <Link
                    key={label}
                    to={href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-3 py-2.5 mb-0.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-blue-50 text-[#2563a8] font-semibold" : "text-gray-700 hover:bg-blue-50"
                      }`}
                    style={{ color: isActive ? '#2563a8' : undefined }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#2563a8')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = isActive ? '#2563a8' : '')}
                  >
                    <span>{label}</span>
                    <svg
                      className={`w-4 h-4 ${isActive ? "text-[#2563a8]" : "text-gray-300"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Login */}
            <Link
              to="/login"
              id="mobile-login-btn"
              onClick={closeMenu}
              className="mt-auto pt-4 inline-block w-full text-center px-6 py-2.5 rounded-full text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#2563a8' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#1d4e8f'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#2563a8'}
            >
              Login
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;