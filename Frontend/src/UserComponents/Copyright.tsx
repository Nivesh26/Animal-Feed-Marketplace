const Copyright = () => {
  return (
    <div className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} PetFeed. All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          Quality Pet Nutrition — Delivered to your door
        </p>
      </div>
    </div>
  );
};

export default Copyright;
