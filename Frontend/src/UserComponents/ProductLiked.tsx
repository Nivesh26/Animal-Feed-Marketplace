import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
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

// 5 curated sets of 4 products (20 products) rotated every 10 seconds
const PRODUCT_SETS: string[][] = [
  ["2", "7", "9", "17"],
  ["4", "6", "12", "21"],
  ["3", "8", "10", "15"],
  ["1", "5", "11", "19"],
  ["13", "14", "16", "20"],
];

const ProductLiked = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchSet = useCallback((nextIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSetIndex(nextIndex);
      setIsTransitioning(false);
    }, 220);
  }, []);

  const handleNext = useCallback(() => {
    const nextIdx = (currentSetIndex + 1) % PRODUCT_SETS.length;
    switchSet(nextIdx);
  }, [currentSetIndex, switchSet]);

  // Rotate every 10 seconds (paused on mouse hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const currentProducts: Product[] = PRODUCT_SETS[currentSetIndex]
    .map((id) => productsData.find((p) => p.id === id)!)
    .filter(Boolean);

  return (
    <section
      className="py-10 sm:py-14 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Products You May Like
          </h2>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 group transition-colors"
          >
            <span>View All</span>
            <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Product Grid with smooth crossfade */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ease-in-out ${
            isTransitioning
              ? "opacity-0 translate-y-1 scale-[0.99]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden justify-between"
            >
              {/* Image Container */}
              <Link
                to="/productdetail"
                className="block relative aspect-square w-full bg-white p-4 sm:p-5 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </Link>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Title */}
                  <Link to="/productdetail">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#2563a8] transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Category / Brand */}
                  <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">
                    {product.brand} • {product.category || product.animal}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="text-gray-900 font-bold text-sm sm:text-base tracking-tight">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  </div>

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
      </div>
    </section>
  );
};

export default ProductLiked;
