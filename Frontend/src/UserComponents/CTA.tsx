import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import ctaBg from "../assets/cta-bg.jpg";

const CTA = () => {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-14 lg:py-16 flex items-center justify-center text-center">
      {/* Full-width background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
        aria-hidden="true"
      />

      {/* Cinematic dark & emerald tint overlay for contrast and readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/45"
        aria-hidden="true"
      />

      {/* Subtle ambient soft glow */}
      <div
        className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Centered Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-emerald-300 bg-emerald-950/60 border border-emerald-400/30 backdrop-blur-md mb-3 shadow-xs">
          Premium Nutrition & Farm Supplies
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          Quality Feed Delivered Directly to Your Farm & Door
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-gray-200 leading-relaxed max-w-lg mx-auto drop-shadow-xs">
          Trusted formulas for livestock and domestic pets. Get certified nutrition,
          bulk savings, and reliable scheduled delivery.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs sm:text-sm shadow-xl shadow-black/30 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Shop All Products</span>
            <HiArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Request Bulk Quote</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
