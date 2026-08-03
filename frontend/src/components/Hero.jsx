function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gray-100 px-6">

      <h1 className="text-6xl font-bold text-blue-600">
        Land Your Dream Job
      </h1>

      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        Analyze your resume using Artificial Intelligence,
        improve your ATS score, and increase your interview chances.
      </p>

      <div className="flex gap-4 mt-8">

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Upload Resume
        </button>

        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
          Try Demo
        </button>

        

      </div>

      

    </section>
  );
}

export default Hero;