import { Link } from "react-router-dom";
import {
  HiShieldCheck,
  HiHeart,
  HiSparkles,
  HiTruck,
  HiCheckCircle,
  HiArrowRight,
  HiAcademicCap,
  HiGlobeAmericas,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";
import CTA from "../UserComponents/CTA";
import aboutHeroImg from "../assets/about-hero.jpg";
import teamSarahImg from "../assets/team-sarah.jpg";
import teamMarcusImg from "../assets/team-marcus.jpg";
import teamElenaImg from "../assets/team-elena.jpg";

const stats = [
  { value: "500+", label: "Verified Feeds & Formulations", sub: "Engineered for optimal animal life stages" },
  { value: "8+", label: "Target Animal Categories", sub: "Companion pets, livestock & specialty animals" },
  { value: "15,000+", label: "Registered Caregivers & Farms", sub: "Trusted agricultural and household network" },
  { value: "99.4%", label: "Lab Verification Accuracy", sub: "Exceeding national feed safety standards" },
];

const pillars = [
  {
    icon: <HiAcademicCap className="w-6 h-6 text-emerald-600" />,
    title: "Veterinary-Backed Science",
    description:
      "Every feed formula in our marketplace is analyzed for bioavailable amino acids, essential vitamins, and targeted micro-nutrients formulated by certified veterinary nutritionists.",
    badge: "Clinical Standard",
  },
  {
    icon: <HiShieldCheck className="w-6 h-6 text-emerald-600" />,
    title: "100% Traceable Sourcing",
    description:
      "We partner strictly with certified farms and non-GMO grain mills. Zero synthetic fillers, zero mystery by-products, and zero artificial preservatives in every batch.",
    badge: "Pure Ingredients",
  },
  {
    icon: <HiTruck className="w-6 h-6 text-emerald-600" />,
    title: "Farm-Fresh Supply Chain",
    description:
      "Feeds are stored in climate-controlled hubs and dispatched rapidly so sensitive fatty acids and heat-labile vitamins retain maximum potency from mill to bowl.",
    badge: "Direct Delivery",
  },
  {
    icon: <HiGlobeAmericas className="w-6 h-6 text-emerald-600" />,
    title: "Sustainable Agriculture",
    description:
      "We are committed to our planet with 100% recyclable bulk sacks, eco-conscious shipping logistics, and supporting regenerative grain growers across communities.",
    badge: "Eco-Conscious",
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Evans, DVM",
    role: "Chief Veterinary Officer",
    image: teamSarahImg,
    bio: "Over 14 years in veterinary clinical practice and companion animal dietetics. Sarah guides our safety inspection protocols and product approvals.",
    specialty: "Companion Animal Dietetics",
  },
  {
    name: "Marcus Vance, M.Sc.",
    role: "Head of Feed Formulations",
    image: teamMarcusImg,
    bio: "Agricultural biochemist specializing in ruminant nutrition, poultry growth efficiency, and balanced aquaculture feeding regimens.",
    specialty: "Livestock & Aquaculture Science",
  },
  {
    name: "Elena Rostova",
    role: "Director of Quality Assurance",
    image: teamElenaImg,
    bio: "Champion of ethical grain mills and clean protein sourcing. Elena ensures batch-level lab testing for purity, moisture safety, and freshness.",
    specialty: "Supply Chain & Organic QA",
  },
];

const standards = [
  "Non-GMO grain certifications verified across all livestock lines",
  "Batch testing for heavy metals, mycotoxins, and pathogen prevention",
  "Veterinary clinical advisory review on all specialized diets",
  "Hermetically sealed moisture-barrier bags for prolonged freshness",
  "Guaranteed crude protein, fiber, and ash levels listed transparently",
];

const Aboutus = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Topbar />
      <Header />

      <main className="flex-1">
        {/* ── 1. Hero Banner ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#eef7f2] via-[#f7faf8] to-white py-16 sm:py-24 border-b border-emerald-100/60">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-teal-200/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-600/20 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-2xs backdrop-blur-xs">
                <HiHeart className="w-4 h-4 text-emerald-600" />
                <span>Dedicated to Animal Well-Being Since 2018</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.15]">
                Nourishing Every Life, <br />
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Empowering Every Caregiver
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
                At PetFeed, we believe healthy animals build thriving homes and prosperous farms.
                We bridge the gap between world-class animal nutritionists and passionate caregivers with
                premium, laboratory-tested feeds delivered straight to your door.
              </p>

              {/* Action buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <span>Explore Feed Categories</span>
                  <HiArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-emerald-50/50 text-gray-800 font-semibold text-sm border border-emerald-200/80 shadow-xs hover:border-emerald-300 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <HiOutlineChatBubbleLeftRight className="w-4 h-4 text-emerald-600" />
                  <span>Talk With Nutrition Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Our Mission & Story (Two Columns) ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Image side */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                  <img
                    src={aboutHeroImg}
                    alt="Veterinarian in farm meadow with healthy animals"
                    className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                  {/* Floating highlight badge */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-white/80 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <HiSparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Ethical Nutrition Standard
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5 font-medium">
                        Clean ingredients & zero harmful additives
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Our Story & Purpose
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight leading-snug">
                  From Honest Farm Roots to a Modern Feed Marketplace
                </h2>

                <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  PetFeed was founded by a dedicated team of veterinarians, livestock farmers, and animal
                  welfare advocates who saw a persistent problem in animal care: sub-par, filler-laden feed
                  cluttering shelves with opaque labels and unpredictable nutritional quality.
                </p>

                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                  We set out to create a transparent, reliable one-stop platform where every caregiver—whether
                  raising a puppy, managing a dairy herd, or caring for champion horses—can access verifiable
                  nutrition formulated specifically for biological well-being and growth efficiency.
                </p>

                {/* Key commitments checklist */}
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Zero synthetic filler guarantee",
                    "Direct grain mill partnerships",
                    "Independent batch laboratory tests",
                    "Targeted micro-mineral balance",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. By the Numbers (Stats Bar) ── */}
        <section className="py-14 sm:py-16 bg-[#07241b] text-white relative overflow-hidden border-y border-emerald-900/60">
          {/* Subtle background glow */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-emerald-800/40">
              {stats.map((stat, idx) => (
                <div key={stat.label} className={idx > 0 ? "pt-6 lg:pt-0 lg:px-6" : "lg:px-6"}>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-sm sm:text-base font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="mt-1 text-xs text-emerald-200/70 font-normal leading-relaxed">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Nutritional Philosophy (4 Pillars) ── */}
        <section className="py-16 sm:py-24 bg-[#f8faf9] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Guiding Principles
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight mt-1.5">
                Our Four Nutrition Pillars
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed">
                We believe proper nutrition isn't an afterthought—it is the biological foundation of lifelong health, immunity, and productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100/70 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100/80 transition-all duration-300">
                        {pillar.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-100">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Veterinary & Leadership Team ── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Behind the Standard
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 tracking-tight mt-1.5">
                Our Nutritional Advisory Board
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed">
                Led by veterinary clinicians and agricultural scientists dedicated to formulating, auditing, and recommending the safest animal feeds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-emerald-800 shadow-xs border border-emerald-100">
                      {member.specialty}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                        {member.role}
                      </p>
                      <p className="mt-3.5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Quality & Safety Protocols ── */}
        <section className="py-14 sm:py-20 bg-[#f4f8f5] border-t border-emerald-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-emerald-100/80 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Rigorous Quality Control
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
                  How We Guarantee Feed Safety
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  We maintain strict laboratory verification standards before any product batch enters our fulfillment network, ensuring clean, fresh, and wholesome feed every single time.
                </p>

                <ul className="mt-6 space-y-3">
                  {standards.map((st) => (
                    <li key={st} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Callout box with vibrant emerald palette */}
              <div className="w-full lg:w-84 p-7 rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white shadow-xl flex flex-col justify-between shrink-0">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center mb-4 border border-white/20">
                    <HiShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-base font-bold tracking-tight">Need Custom Formulation?</h4>
                  <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                    Managing a commercial dairy farm, large poultry flock, or special dietary herd? Our consulting animal nutritionists are ready to help.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-colors shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Contact Nutritionist</span>
                  <HiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. Call To Action ── */}
        <CTA />
      </main>

      <Footer />
      <Copyright />
    </div>
  );
};

export default Aboutus;
