import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HiChevronDown, HiFunnel, HiXMark } from "react-icons/hi2";
import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";
import productsData from "../Json/Product.json";

interface Product {
  id: string;
  name: string;
  category: string;
  animal: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  image: string;
  features?: string[];
}

const animalCategories = [
  "All",
  "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Rabbit",
  "Cattle",
  "Poultry",
  "Horse",
];

const ITEMS_PER_PAGE = 9; // 3x3 format: 3 columns x 3 rows

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category if URL parameter changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Reset to first page whenever filter or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, minPrice, maxPrice, sortBy]);

  const filteredProducts = useMemo(() => {
    let list = (productsData as Product[]).filter((p) => {
      // Category match
      const matchCategory =
        activeCategory === "All" ||
        p.animal.toLowerCase() === activeCategory.toLowerCase();

      // Price range match
      const matchPrice = p.price >= minPrice && p.price <= maxPrice;

      return matchCategory && matchPrice;
    });

    if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, minPrice, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const sidebarContent = (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900 tracking-tight pb-2 border-b border-gray-100">
        Filters
      </h2>

      {/* Category Dropdown */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
          Category
        </label>
        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              setMobileFilterOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2563a8] focus:border-[#2563a8] cursor-pointer transition-colors shadow-2xs"
          >
            <option value="All">All</option>
            {animalCategories
              .filter((c) => c !== "All")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
          <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-0.5">
          Price range
        </label>
        <p className="text-xs font-medium text-gray-500 mb-2.5">
          Rs. {minPrice.toLocaleString()} - Rs. {maxPrice.toLocaleString()}
        </p>

        <div className="space-y-2.5">
          <div>
            <span className="text-[11px] text-gray-400 block mb-1">Min</span>
            <input
              type="range"
              min={0}
              max={15000}
              step={100}
              value={minPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= maxPrice) setMinPrice(val);
              }}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <span className="text-[11px] text-gray-400 block mb-1">Max</span>
            <input
              type="range"
              min={0}
              max={15000}
              step={100}
              value={maxPrice}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= minPrice) setMaxPrice(val);
              }}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Sort by Dropdown */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-800 block mb-1.5">
          Sort by
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 hover:border-gray-400 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2563a8] focus:border-[#2563a8] cursor-pointer transition-colors shadow-2xs"
          >
            <option value="featured">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fbfcfd] text-neutral-900 antialiased">
      <div>
        <Topbar />
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200 lg:hidden">
            <span className="text-sm font-semibold text-gray-700">
              {filteredProducts.length} Products
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-800 rounded-xl text-xs font-semibold text-gray-900 shadow-xs cursor-pointer"
            >
              <HiFunnel className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Desktop Left Sidebar: perfectly balanced and professional */}
            <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-24 bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              {sidebarContent}
            </aside>

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden">
                <div
                  className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
                  onClick={() => setMobileFilterOpen(false)}
                />
                <div className="relative ml-auto w-[min(320px,85vw)] h-full bg-white p-6 overflow-y-auto shadow-2xl z-10">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <span className="font-bold text-lg text-gray-900">
                      Filters
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileFilterOpen(false)}
                      className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                    >
                      <HiXMark className="w-5 h-5" />
                    </button>
                  </div>
                  {sidebarContent}
                </div>
              </div>
            )}

            {/* Right Products Container */}
            <div className="flex-1 w-full min-w-0">
              {paginatedProducts.length > 0 ? (
                <>
                  {/* Modern 3x3 Grid of Cards matching exact reference image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                    {paginatedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex flex-col bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
                      >
                        {/* Upper Image Section */}
                        <Link
                          to="/productdetail"
                          className="relative aspect-square w-full bg-white p-4 sm:p-5 flex items-center justify-center overflow-hidden group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        </Link>

                        {/* Lower Content Section */}
                        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                          <div>
                            {/* Title */}
                            <Link to="/productdetail">
                              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#2563a8] transition-colors line-clamp-1 mb-1">
                                {product.name}
                              </h2>
                            </Link>

                            {/* Subtitle / Category in muted uppercase */}
                            <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">
                              {product.category || product.animal}
                            </p>
                          </div>

                          {/* Price in black & Outlined Green "Add to cart" button */}
                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <span className="text-gray-900 font-bold text-sm sm:text-base tracking-tight">
                              Rs. {product.price.toLocaleString()}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="px-3.5 py-1 rounded-full border border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-50 active:scale-95 text-xs font-medium transition-all duration-200 cursor-pointer shrink-0"
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Minimalist Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-200/80">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.max(p - 1, 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          const isActive = page === currentPage;
                          return (
                            <button
                              key={page}
                              type="button"
                              onClick={() => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className={`w-8 h-8 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive
                                  ? "bg-[#2563a8] text-white shadow-xs"
                                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentPage((p) => Math.min(p + 1, totalPages));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-full text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-[28px] border border-gray-100 p-8 shadow-xs">
                  <p className="text-base font-bold text-gray-900">No products found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try adjusting your category or price range
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("All");
                      setMinPrice(0);
                      setMaxPrice(15000);
                      setSortBy("featured");
                    }}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-white bg-[#2563a8] hover:bg-[#1d4e8f] rounded-full transition-colors cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <div>
        <Footer />
        <Copyright />
      </div>
    </div>
  );
};

export default Products;
