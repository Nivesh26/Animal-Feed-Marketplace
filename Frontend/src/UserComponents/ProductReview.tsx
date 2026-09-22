import { useState } from "react";
import {
  HiStar,
  HiPencilSquare,
  HiXMark,
  HiHandThumbUp,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  likes: number;
}

const initialReviews: Review[] = [
  {
    id: "1",
    author: "Ramesh Khatri",
    date: "2 days ago",
    rating: 5,
    title: "Remarkable difference in my dog's coat and energy!",
    content:
      "I've been feeding my Golden Retriever Royal Canin Maxi Adult for over 4 months now. His coat is shinier, digestion is smooth with no stomach issues, and he finishes his bowl with excitement every time. Packaging was sturdy and fresh upon arrival.",
    likes: 24,
  },
  {
    id: "2",
    author: "Pooja Shrestha",
    date: "1 week ago",
    rating: 5,
    title: "Best kibble for large breeds, highly recommend",
    content:
      "The kibble size is large enough to force my German Shepherd to chew rather than swallow whole, which is great for his teeth. Delivery was fast within 2 days.",
    likes: 18,
  },
  {
    id: "3",
    author: "Bibek Adhikari",
    date: "2 weeks ago",
    rating: 4,
    title: "Great nutritional quality, dog loves it",
    content:
      "High quality dog food recommended by our vet. Only giving 4 stars because the 15kg bag can be heavy to handle, but the food quality itself is top tier.",
    likes: 9,
  },
  {
    id: "4",
    author: "Sita Sharma",
    date: "3 weeks ago",
    rating: 5,
    title: "Authentic sealed pack with good expiry date",
    content:
      "Was skeptical about buying feed online, but PetFeed delivered a genuine brand pack with clear batch codes and a long expiry date. Will be ordering regularly.",
    likes: 14,
  },
];

const ratingBreakdown = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 11 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

const avatarColorPalette = [
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-amber-50 text-amber-800 border-amber-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-indigo-50 text-indigo-700 border-indigo-200",
];

const getAvatarColor = (name: string) => {
  const charCode = (name.trim().charCodeAt(0) || 0) + (name.length || 0);
  return avatarColorPalette[charCode % avatarColorPalette.length];
};

const ProductReview = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form states
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      author: formName.trim(),
      date: "Just now",
      rating: formRating,
      title: formTitle.trim() || "Customer Review",
      content: formContent.trim(),
      likes: 0,
    };

    setReviews([newReview, ...reviews]);
    setFormName("");
    setFormTitle("");
    setFormContent("");
    setFormRating(5);
    setIsFormOpen(false);
  };

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Verified feedback from pet owners who purchased this product.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm font-semibold transition-all cursor-pointer self-start sm:self-auto"
          >
            <HiPencilSquare className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* ── Add Review Form Modal / Box ── */}
        {isFormOpen && (
          <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gray-50/80 border border-gray-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                Share Your Experience
              </h3>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                aria-label="Close review form"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Select */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <HiStar
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">
                    {formRating} out of 5 stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ramesh Khatri"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Great quality and fast delivery"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="How was the food quality? Did your pet enjoy it?"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Summary & Rating Breakdown Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-10 border-b border-gray-100">
          {/* Overall Rating Card */}
          <div className="lg:col-span-4 flex flex-col justify-center p-6 rounded-2xl bg-gray-50/70 border border-gray-100">
            <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              4.8
            </span>
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Based on {reviews.length + 124} customer reviews
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              96% of buyers recommend this product
            </p>
          </div>

          {/* Star Distribution Bars */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-2.5">
            {ratingBreakdown.map((item) => (
              <button
                key={item.stars}
                type="button"
                onClick={() =>
                  setFilterRating(filterRating === item.stars ? null : item.stars)
                }
                className={`flex items-center gap-3 w-full group cursor-pointer text-left py-0.5 rounded-lg transition-colors ${
                  filterRating === item.stars ? "bg-emerald-50/60 px-2" : ""
                }`}
              >
                <div className="flex items-center gap-1 w-14 shrink-0 text-xs font-semibold text-gray-700">
                  <span>{item.stars}</span>
                  <HiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>

                <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <span className="text-xs text-gray-400 w-10 text-right font-medium shrink-0">
                  {item.percent}%
                </span>
              </button>
            ))}

            {filterRating && (
              <div className="pt-2 flex items-center justify-between text-xs text-emerald-700">
                <span>Filtering by {filterRating} stars</span>
                <button
                  type="button"
                  onClick={() => setFilterRating(null)}
                  className="font-semibold underline cursor-pointer hover:text-emerald-800"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Reviews List ── */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 p-6">
              <p className="text-sm font-semibold text-gray-700">
                No reviews found for this filter
              </p>
              <button
                type="button"
                onClick={() => setFilterRating(null)}
                className="mt-2 text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                View all reviews
              </button>
            </div>
          ) : (
            filteredReviews.map((review) => {
              const isLiked = likedReviews[review.id];

              return (
                <div
                  key={review.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-colors shadow-2xs"
                >
                  {/* Profile Header with Alphabet Initial */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0 border shadow-2xs ${getAvatarColor(
                        review.author
                      )}`}
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                        {review.author}
                      </h5>

                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <HiStar
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-400">•</span>
                        <span className="text-[11px] text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                    {review.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3">
                    {review.content}
                  </p>

                  {/* ── Like / Liked Button at the bottom of the review ── */}
                  <div className="pt-1 flex items-center justify-start">
                    <button
                      type="button"
                      onClick={() => toggleLike(review.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 border ${
                        isLiked
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                      aria-label={isLiked ? "Unlike review" : "Like review"}
                    >
                      {isLiked ? (
                        <HiHandThumbUp className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      ) : (
                        <HiOutlineHandThumbUp className="w-3.5 h-3.5 text-gray-400" />
                      )}
                      <span>{isLiked ? "Liked" : "Like"}</span>
                      <span className="text-[11px] opacity-75 font-normal">
                        ({review.likes + (isLiked ? 1 : 0)})
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReview;
