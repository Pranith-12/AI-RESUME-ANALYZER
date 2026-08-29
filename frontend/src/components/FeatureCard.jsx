function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>
      <p className="text-gray-500 mt-2 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;