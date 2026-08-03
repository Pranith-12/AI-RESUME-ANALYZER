function StepCard({ number, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition duration-300">

      <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold">

        {number}

      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-600 mt-4">
        {description}
      </p>

    </div>
  );
}

export default StepCard;