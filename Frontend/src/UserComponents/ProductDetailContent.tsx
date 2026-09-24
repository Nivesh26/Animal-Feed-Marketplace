import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiStar,
  HiShoppingBag,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiChevronRight,
  HiMinus,
  HiPlus,
} from "react-icons/hi2";

import img1 from "../ProductImage/product-1.jpg";
import img2 from "../ProductImage/product-2.jpg";
import img3 from "../ProductImage/product-3.jpg";
import img4 from "../ProductImage/product-4.jpg";

const productImages = [
  { id: 0, src: img1, alt: "Royal Canin Maxi Adult - Front View" },
  { id: 1, src: img2, alt: "Royal Canin Maxi Adult - Side View" },
  { id: 2, src: img3, alt: "Royal Canin Maxi Adult - Kibble Detail" },
  { id: 3, src: img4, alt: "Royal Canin Maxi Adult - Packaging Back" },
];

const weightOptions = [
  { label: "3 kg", price: 3850 },
  { label: "10 kg", price: 10500 },
  { label: "15 kg", price: 14800 },
];

const ProductDetailContent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = weightOptions[selectedWeight].price;

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
        <ol className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 flex-wrap">
          <li>
            <Link to="/" className="hover:text-[#2563a8] transition-colors">
              Home
            </Link>
          </li>
          <HiChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <li>
            <Link to="/products" className="hover:text-[#2563a8] transition-colors">
              Products
            </Link>
          </li>
          <HiChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
            Royal Canin Maxi Adult Dry Dog Food
          </li>
        </ol>
      </nav>

      {/* ── Main Product Grid (Gallery + Details) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── Left: Image Gallery (Main Image on Top, 4 Thumbnails Below) ── */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Large Main Image */}
          <div className="w-full bg-white rounded-[28px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 sm:p-10 flex items-center justify-center min-h-[340px] sm:min-h-[460px] relative overflow-hidden group">
            <img
              src={productImages[selectedImageIndex].src}
              alt={productImages[selectedImageIndex].alt}
              className="w-full h-72 sm:h-96 object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          {/* 4 Thumbnails Down Below */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {productImages.map((img, index) => {
              const isSelected = selectedImageIndex === index;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white border-2 p-1.5 sm:p-2 flex items-center justify-center transition-all cursor-pointer overflow-hidden ${isSelected
                    ? "border-emerald-600 shadow-xs ring-2 ring-emerald-600/20"
                    : "border-gray-100 hover:border-gray-300"
                    }`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: Product Info & Actions ── */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Brand & Category */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            <span>Royal Canin</span>
            <span>•</span>
            <span>Dry Dog Food</span>
          </div>

          {/* Product Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug tracking-tight mb-3">
            Royal Canin Maxi Adult Dry Dog Food
          </h1>

          {/* Ratings & Stock */}
          <div className="flex items-center gap-4 flex-wrap mb-5 pb-5 border-b border-gray-100 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900 ml-1">4.8</span>
              <span className="text-gray-400">(128 reviews)</span>
            </div>

            <span className="text-gray-200">|</span>

            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>In Stock (42 units available)</span>
            </div>
          </div>

          {/* Price Row */}
          <div className="mb-6">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Rs. {currentPrice.toLocaleString()}
            </span>
          </div>

          {/* Brief Overview */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            Specifically tailored for large breed adult dogs (26–44 kg) aged 15 months to 5 years.
            Supports optimal digestive safety, joint and bone preservation, and healthy skin and coat nourishment.
          </p>

          {/* Size / Weight Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                Select Package Size:
              </span>
              <span className="text-xs text-emerald-700 font-medium">
                {weightOptions[selectedWeight].label} Selected
              </span>
            </div>

            <div className="flex gap-2.5 sm:gap-3">
              {weightOptions.map((opt, idx) => {
                const isSelected = selectedWeight === idx;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedWeight(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${isSelected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-full bg-white px-2 py-1">
                <button
                  type="button"
                  onClick={decrementQty}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <HiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incrementQty}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <HiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                className="flex-1 px-6 py-3.5 rounded-full border border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-50 active:scale-98 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <HiShoppingBag className="w-4 h-4" />
                <span>Add to cart</span>
              </button>

              <Link
                to="/cart"
                className="flex-1 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-98"
              >
                Buy Now
              </Link>
            </div>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-6">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
              <HiOutlineTruck className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">Fast Delivery</span>
              <span className="text-[10px] text-gray-500">2-4 Business Days</span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
              <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">100% Genuine</span>
              <span className="text-[10px] text-gray-500">Direct From Brand</span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-gray-50/70 border border-gray-100">
              <HiOutlineArrowPath className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-900">7 Days Return</span>
              <span className="text-[10px] text-gray-500">Hassle Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Description ── */}
      <div className="mt-14 sm:mt-20 pt-10 border-t border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-4">
          Description
        </h2>

        <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            Royal Canin Maxi Adult is formulated with the specific nutritional needs of your large dog in mind.
            Large breed dogs (such as Labradors, German Shepherds, and Golden Retrievers) experience significant physical
            strain on their bones and joints due to their body weight.
          </p>
          <h4 className="text-sm sm:text-base font-bold text-gray-900 pt-2">Key Benefits:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>
              <strong className="text-gray-800">High Digestibility:</strong> Features an exclusive formula with high quality
              protein and a balanced supply of dietary fiber to promote optimal digestive safety.
            </li>
            <li>
              <strong className="text-gray-800">Bone & Joint Support:</strong> Helps preserve strong joints and healthy cartilage in
              large dogs placed under constant biomechanical strain.
            </li>
            <li>
              <strong className="text-gray-800">Omega-3 Enriched:</strong> Enriched with EPA and DHA fatty acids to nourish the skin
              and give your dog a healthy, lustrous coat.
            </li>
            <li>
              <strong className="text-gray-800">Adapted Kibble:</strong> Tailored texture and shape stimulate chewing, promoting
              dental health while preventing gulping.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
