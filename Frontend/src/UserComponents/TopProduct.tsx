import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
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

const TOP_PRODUCT_IDS = ["3", "6", "15", "22"];

const TopProduct = () => {
  const [addedId, setAddedId] = useState<string | null>(null);

  const topProducts: Product[] = TOP_PRODUCT_IDS.map(
    (id) => productsData.find((p) => p.id === id)!
  ).filter(Boolean);

  const handleAddToCart = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Top Rated Products
          </h2>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 group transition-colors"
          >
            <span>View All</span>
            <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Image Container */}
                <Link
                  to="/productdetail"
                  className="block relative bg-[#f8fafc] h-52 p-4 flex items-center justify-center overflow-hidden"
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
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Category / Brand */}
                    <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">
                      {product.brand} • {product.category || product.animal}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-50 mt-auto">
                    <div>
                      <span className="text-gray-900 font-bold text-sm sm:text-base tracking-tight">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product.id, e)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        isAdded
                          ? "bg-emerald-600 text-white border border-emerald-600"
                          : "border border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white active:scale-95"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <HiCheck className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        "Add to cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopProduct;