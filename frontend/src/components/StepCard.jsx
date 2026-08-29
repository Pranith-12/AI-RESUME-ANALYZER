function StepCard({ number, title, description }) {
  return (
    <div className="text-center group">
      <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mt-5">
        {title}
      </h3>
      <p className="text-gray-500 mt-2 text-sm">
        {description}
      </p>
    </div>
  );
}

export default StepCard;