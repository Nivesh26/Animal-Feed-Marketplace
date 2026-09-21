import React from "react";
import Logo from "../assets/Logo.png";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
  { label: "Categories", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

const categories = [
  { label: "Dog Food", href: "#" },
  { label: "Cat Food", href: "#" },
  { label: "Bird Food", href: "#" },
  { label: "Fish Food", href: "#" },
  { label: "Rabbit Food", href: "#" },
];

const support = [
  { label: "FAQ", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Return & Refund", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
  const el = e.currentTarget as HTMLElement;
  el.style.backgroundColor = enter ? "#2563a8" : "";
  el.style.borderColor = enter ? "#2563a8" : "";
  el.style.color = enter ? "#fff" : "";
};

const linkHover = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
  (e.currentTarget as HTMLElement).style.color = enter ? "#2563a8" : "";
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-4">
            <img src={Logo} alt="PetFeed" className="h-16 w-auto object-contain object-left" />
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium nutrition for every pet. Quality animal feed delivered right to your doorstep.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { label: "Facebook", icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />, fill: true },
                { label: "Instagram", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></>, fill: false },
                { label: "Twitter", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, fill: true },
              ].map(({ label, icon, fill }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 transition-all duration-200"
                  onMouseEnter={e => socialHover(e, true)}
                  onMouseLeave={e => socialHover(e, false)}
                >
                  <svg className="w-4 h-4" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth={fill ? undefined : 2} viewBox="0 0 24 24">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-500 transition-colors duration-150"
                    onMouseEnter={e => linkHover(e, true)} onMouseLeave={e => linkHover(e, false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Categories ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Categories</h3>
            <ul className="flex flex-col gap-3">
              {categories.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-500 transition-colors duration-150"
                    onMouseEnter={e => linkHover(e, true)} onMouseLeave={e => linkHover(e, false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Support</h3>
            <ul className="flex flex-col gap-3">
              {support.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-500 transition-colors duration-150"
                    onMouseEnter={e => linkHover(e, true)} onMouseLeave={e => linkHover(e, false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;