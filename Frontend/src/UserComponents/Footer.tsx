import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/Logo.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/aboutus" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Dog Food", href: "/products?category=Dog" },
  { label: "Cat Food", href: "/products?category=Cat" },
  { label: "Bird Food", href: "/products?category=Bird" },
  { label: "Fish Food", href: "/products?category=Fish" },
  { label: "Rabbit Food", href: "/products?category=Rabbit" },
];

const support = [
  { label: "FAQ", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Return & Refund", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const socialHover = (e: MouseEvent<HTMLElement>, enter: boolean) => {
  const el = e.currentTarget as HTMLElement;
  el.style.backgroundColor = enter ? "#2563a8" : "";
  el.style.borderColor = enter ? "#2563a8" : "";
  el.style.color = enter ? "#fff" : "";
};

const linkHover = (e: MouseEvent<HTMLElement>, enter: boolean) => {
  (e.currentTarget as HTMLElement).style.color = enter ? "#2563a8" : "";
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-block w-fit">
              <img src={Logo} alt="PetFeed" className="h-16 w-auto object-contain object-left" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium nutrition for every pet. Quality animal feed delivered right to your doorstep.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {[
                { label: "Facebook", icon: <FaFacebookF className="w-3.5 h-3.5" /> },
                { label: "Instagram", icon: <FaInstagram className="w-3.5 h-3.5" /> },
                { label: "X", icon: <FaXTwitter className="w-3.5 h-3.5" /> },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 transition-all duration-200"
                  onMouseEnter={e => socialHover(e, true)}
                  onMouseLeave={e => socialHover(e, false)}
                >
                  {icon}
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
                  <Link to={href} className="text-sm text-gray-500 transition-colors duration-150"
                    onMouseEnter={e => linkHover(e, true)} onMouseLeave={e => linkHover(e, false)}>
                    {label}
                  </Link>
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
                  <Link
                    to={href}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-sm text-gray-500 transition-colors duration-150"
                    onMouseEnter={e => linkHover(e, true)}
                    onMouseLeave={e => linkHover(e, false)}
                  >
                    {label}
                  </Link>
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