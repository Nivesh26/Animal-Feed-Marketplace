import { useState, useEffect, useCallback } from "react";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Reveal from "./ScrollReveal";

import reviewer1 from "../assets/reviewer-1.jpg";
import reviewer2 from "../assets/reviewer-2.jpg";
import reviewer3 from "../assets/reviewer-3.jpg";
import reviewer4 from "../assets/reviewer-4.jpg";
import reviewer5 from "../assets/reviewer-5.jpg";
import reviewer6 from "../assets/reviewer-6.jpg";

interface Review {
  id: string;
  author: string;
  location: string;
  role: string;
  category: string;
  rating: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: "1",
    author: "Ramesh Khatri",
    location: "Kathmandu",
    role: "Golden Retriever Owner",
    category: "Dog Nutrition",
    rating: 5,
    title: "Noticeable boost in energy & coat shine",
    content:
      "I've been feeding my Golden Retriever Royal Canin Maxi Adult for over 4 months now. His coat is shinier, digestion is smooth, and he finishes his bowl with excitement every time.",
    image: reviewer1,
    date: "2 days ago",
  },
  {
    id: "2",
    author: "Anjali Thapa",
    location: "Pokhara",
    role: "Dairy Farm Owner",
    category: "Cattle & Dairy Feed",
    rating: 5,
    title: "15% increase in daily milk production",
    content:
      "Switching our cattle to high-protein dairy concentrate made an immediate difference. Feed intake is consistent, somatic cell count dropped, and milk yield increased by 15%.",
    image: reviewer2,
    date: "1 week ago",
  },
  {
    id: "3",
    author: "Bibek Adhikari",
    location: "Lalitpur",
    role: "Persian Cat Breeder",
    category: "Cat Nutrition",
    rating: 5,
    title: "Best hairball & urinary tract care",
    content:
      "My Persian cats are notoriously picky eaters, but they love the salmon wet pouches and urinary care dry food. Always authentic factory-sealed bags with fresh expiry dates.",
    image: reviewer3,
    date: "2 weeks ago",
  },
  {
    id: "4",
    author: "Sunil Chaudhary",
    location: "Chitwan",
    role: "Poultry Farm Owner",
    category: "Poultry Feed",
    rating: 5,
    title: "Remarkable egg shell strength",
    content:
      "We order layer pellets and calcium boosters in bulk every month. Egg breakage decreased noticeably and laying percentage has held strong above 92%. Outstanding reliability.",
    image: reviewer4,
    date: "3 weeks ago",
  },
  {
    id: "5",
    author: "Prashant Shrestha",
    location: "Bhaktapur",
    role: "Aquarium & Koi Hobbyist",
    category: "Aquarium & Fish Care",
    rating: 5,
    title: "Crystal clear water & vibrant colors",
    content:
      "Top quality spirulina staple flakes and sinking pellets. Unlike cheap supermarket brands, this doesn't cloud the tank water, and the natural reds and golds on my fish are striking.",
    image: reviewer5,
    date: "1 month ago",
  },
  {
    id: "6",
    author: "Dikshya Gurung",
    location: "Kaski",
    role: "Stable Manager",
    category: "Equine & Horse Care",
    rating: 5,
    title: "Controlled carbs & excellent muscle tone",
    content:
      "The low-starch equine performance ration gives our thoroughbred horses great stamina and glossy coats without digestive colic. The recurring scheduled delivery is so dependable.",
    image: reviewer6,
    date: "1 month ago",
  },
];

// Duplicate list for seamless 3-at-a-time loop
const DISPLAY_REVIEWS = [...REVIEWS_DATA, ...REVIEWS_DATA.slice(0, 3)];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalReviews = REVIEWS_DATA.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Rotate every 5 seconds (paused when user hovers)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      className="py-10 sm:py-14 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <Reveal delay={0} yOffset={16}>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Customer Reviews
            </h2>

            {/* Header Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Container */}
        <Reveal delay={100} yOffset={24}>
          <div className="relative">
            {/* Sliding Track Viewport */}
            <div className="overflow-hidden py-2 -mx-3 px-3">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {DISPLAY_REVIEWS.map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                  >
                    <div className="group h-full flex flex-col justify-between bg-white rounded-[28px] border border-gray-200/80 hover:border-gray-300 transition-all duration-300 p-5 sm:p-6">
                      <div>
                        {/* Rating & Animal Category */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(review.rating)].map((_, i) => (
                              <HiStar key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                            {review.category}
                          </span>
                        </div>

                        {/* Review Title */}
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1 mb-1.5">
                          {review.title}
                        </h3>

                        {/* Review Content */}
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-5">
                          "{review.content}"
                        </p>
                      </div>

                      {/* Author Row with Real Person Photo */}
                      <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.image}
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover border border-gray-100"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                              {review.author}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                              {review.role} • {review.location}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Minimal Navigation Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {REVIEWS_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-emerald-600"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
