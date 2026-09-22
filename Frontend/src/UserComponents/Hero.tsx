import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";

const stats = [
  { value: "500+", label: "Products" },
  { value: "8", label: "Animal Categories" },
  { value: "10k+", label: "Happy Customers" },
];



const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />

      {/* Dark gradient overlay — left side heavy, right side lighter */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.30) 75%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Green tint glow at bottom */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(16,185,129,0.12), transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Premium Food for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #6ee7b7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Animal
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-lg"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Trusted nutrition for dogs, cats, birds, fish, rabbits, cattle and more —
            all in one place. Quality feed, delivered to your door.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.20)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              }}
            >
              Browse Categories
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center gap-8 sm:gap-12">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8 sm:gap-12">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-xs sm:text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {s.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="hidden sm:block h-8 w-px"
                    style={{ background: "rgba(255,255,255,0.20)" }}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;