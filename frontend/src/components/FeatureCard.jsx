function FeatureCard(props) {
  return (

    <div className="bg-white shadow-lg rounded-xl p-6 w-64 text-center hover:scale-105 hover:shadow-2xl transition-transition duration-300">

      <div className="flex justify-center mb-4">
  {props.icon}
</div>
      <h2 className="text-2xl font-bold mt-4">
        {props.title}
      </h2>

      <p className="text-gray-600 mt-3">
        {props.description}
      </p>

    </div>

  );
}

export default FeatureCard;