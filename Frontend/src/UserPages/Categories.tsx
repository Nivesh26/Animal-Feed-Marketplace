import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiMagnifyingGlass } from "react-icons/hi2";
import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";
import dogImg from "../ProductImage/product-1.jpg";
import catImg from "../ProductImage/product-5.jpg";
import birdImg from "../ProductImage/product-9.jpg";
import fishImg from "../ProductImage/product-12.jpg";
import rabbitImg from "../ProductImage/product-15.jpg";
import cattleImg from "../ProductImage/product-17.jpg";
import poultryImg from "../ProductImage/product-19.jpg";
import horseImg from "../ProductImage/product-21.jpg";

interface CategoryData {
  id: string;
  name: string;
  title: string;
  group: "pets" | "farm" | "other";
  description: string;
  image: string;
  popularBrands: string[];
  productCount: number;
}

const categories: CategoryData[] = [
  {
    id: "dog",
    name: "Dog",
    title: "Dog Food & Nutrition",
    group: "pets",
    description: "Tailored kibble, high-protein puppy diets, vet-recommended formulas, and rewarding treats.",
    image: dogImg,
    popularBrands: ["Royal Canin", "Pedigree", "Purina Pro Plan"],
    productCount: 4,
  },
  {
    id: "cat",
    name: "Cat",
    title: "Cat Food & Treats",
    group: "pets",
    description: "Nutritious dry kibbles, salmon wet food pouches, urinary tract care, and savory crunch treats.",
    image: catImg,
    popularBrands: ["Whiskas", "Royal Canin", "Temptations"],
    productCount: 4,
  },
  {
    id: "bird",
    name: "Bird",
    title: "Bird Seeds & Pellets",
    group: "other",
    description: "Vitamin-enriched seed mixes, omega-3 grains, and fruit-blend pellets for parrots & songbirds.",
    image: birdImg,
    popularBrands: ["Kaytee", "ZuPreem", "Wagner's"],
    productCount: 3,
  },
  {
    id: "fish",
    name: "Fish",
    title: "Aquarium & Fish Food",
    group: "other",
    description: "BioActive staple flakes, color-enhancing spirulina pellets, and freeze-dried blood worms.",
    image: fishImg,
    popularBrands: ["Tetra", "Hikari", "API"],
    productCount: 3,
  },
  {
    id: "rabbit",
    name: "Rabbit",
    title: "Rabbit & Small Pet Food",
    group: "pets",
    description: "High-fiber Timothy grass pellets, aromatic green hay forage, and natural botanical treats.",
    image: rabbitImg,
    popularBrands: ["Oxbow", "Small Pet Select"],
    productCount: 2,
  },
  {
    id: "cattle",
    name: "Cattle",
    title: "Cattle & Livestock Feed",
    group: "farm",
    description: "High-energy finisher rations, dairy cow concentrates, and rumen-bypass mineral balances.",
    image: cattleImg,
    popularBrands: ["Purina Mills", "Nutrena"],
    productCount: 2,
  },
  {
    id: "poultry",
    name: "Poultry",
    title: "Poultry & Chicken Feed",
    group: "farm",
    description: "USDA organic layer pellets, non-GMO grower mash, cracked corn, and calcium egg boosters.",
    image: poultryImg,
    popularBrands: ["Manna Pro", "Scratch and Peck"],
    productCount: 2,
  },
  {
    id: "horse",
    name: "Horse",
    title: "Equine & Horse Feed",
    group: "farm",
    description: "Low-starch controlled-carb performance rations, beet pulp feeds, and senior equine nutrition.",
    image: horseImg,
    popularBrands: ["Buckeye Nutrition", "Triple Crown"],
    productCount: 2,
  },
];

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<"all" | "pets" | "farm" | "other">("all");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.popularBrands.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchGroup = selectedGroup === "all" || cat.group === selectedGroup;

      return matchSearch && matchGroup;
    });
  }, [searchQuery, selectedGroup]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Animal Feed Categories
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Choose your animal to explore specialized feeds, organic nutrition, and veterinary-formulated diets.
            </p>
          </div>

          {/* ── Search & Filter Controls ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-gray-100">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dog, poultry, cattle feed..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>

            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
              {[
                { key: "all", label: "All Animals" },
                { key: "pets", label: "Pets" },
                { key: "farm", label: "Livestock & Farm" },
                { key: "other", label: "Birds & Aquatic" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedGroup(tab.key as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedGroup === tab.key
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Categories Grid ── */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-[28px] border border-gray-100 p-8">
              <p className="text-base font-bold text-gray-900">No categories found</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for another animal such as Dog, Cat, Poultry, or Cattle.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGroup("all");
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full bg-white p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 border-t border-gray-50">
                    <div>
                      {/* Name / Category badge */}
                      <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                        {category.name} Nutrition
                      </p>

                      {/* Title */}
                      <h2 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#2563a8] transition-colors line-clamp-1 mb-1.5">
                        {category.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {category.description}
                      </p>
                    </div>

                    {/* Footer Row: Explore Button with Arrow */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <span className="text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        Browse Products
                      </span>

                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <Copyright />
    </div>
  );
};

export default Categories;
