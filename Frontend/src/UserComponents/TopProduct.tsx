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

const TOP_PRODUCT_IDS = ["3", "6", "15", "22"];

const TopProduct = () => {
  const topProducts: Product[] = TOP_PRODUCT_IDS.map(
    (id) => productsData.find((p) => p.id === id)!
  ).filter(Boolean);

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
          {topProducts.map((product) => (
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

export default TopProduct;