import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
        <Sparkles size={16} className="text-blue-600" />
        <span className="text-sm font-medium text-blue-700">AI-Powered Resume Analysis</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
        Land Your Dream Job
        <span className="block text-blue-600 mt-2">with ResuVio</span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
        Analyze your resume with AI-powered insights, improve your ATS score,
        and match your skills to job descriptions — all in one place.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <a
          href="#upload"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
        >
          Upload Resume
          <ArrowRight size={20} />
        </a>
        <a
          href="#job-matcher"
          className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
        >
          Try Job Matcher
        </a>
      </div>
    </section>
  );
}

export default Hero;