import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "./ScrollReveal";

import dogImg from "../assets/dog.jpg";
import catImg from "../assets/cat.jpg";
import birdImg from "../assets/bird.jpg";
import fishImg from "../assets/fish.jpg";
import rabbitImg from "../assets/rabbit.jpg";
import cattleImg from "../assets/cattle.jpg";
import poultryImg from "../assets/poultry.jpg";
import horseImg from "../assets/horse.jpg";

interface HomeCategory {
  name: string;
  image: string;
  count: string;
}

const homeCategories: HomeCategory[] = [
  { name: "Dog", image: dogImg, count: "4 Products" },
  { name: "Cat", image: catImg, count: "4 Products" },
  { name: "Bird", image: birdImg, count: "3 Products" },
  { name: "Fish", image: fishImg, count: "3 Products" },
  { name: "Rabbit", image: rabbitImg, count: "2 Products" },
  { name: "Cattle", image: cattleImg, count: "2 Products" },
  { name: "Poultry", image: poultryImg, count: "2 Products" },
  { name: "Horse", image: horseImg, count: "2 Products" },
];

// Duplicate for continuous seamless right-to-left rotating loop
const loopedCategories = [...homeCategories, ...homeCategories];

const CategoriesHome = () => {
  return (
    <section className="pt-8 pb-4 sm:pt-10 sm:pb-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal delay={0} yOffset={16}>
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Shop by Category
              </h2>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 group transition-colors"
            >
              <span>View All</span>
              <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Continuous Right-to-Left Rotating Carousel */}
        <Reveal delay={120} yOffset={20}>
          <div className="relative overflow-hidden py-2">
            {/* Subtle edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="animate-marquee-left flex items-center gap-6 sm:gap-8 lg:gap-10">
              {loopedCategories.map((cat, index) => (
                <Link
                  key={`${cat.name}-${index}`}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center text-center p-2 rounded-2xl transition-all duration-300 cursor-pointer shrink-0"
                >
                  {/* Square Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] group-hover:border-emerald-400 group-hover:shadow-md transition-all duration-300 flex items-center justify-center p-2 sm:p-2.5 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CategoriesHome;
