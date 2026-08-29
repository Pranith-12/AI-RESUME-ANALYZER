function TestimonialCard({ name, role, review }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">
        "{review}"
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">
            {name}
          </h3>
          <p className="text-gray-400 text-xs">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;