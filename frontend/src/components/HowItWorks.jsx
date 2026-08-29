import StepCard from "./StepCard";

const steps = [
  {
    number: 1,
    title: "Upload Resume",
    description: "Upload your PDF resume securely with one click."
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our AI analyzes content, format, and keywords."
  },
  {
    number: 3,
    title: "ATS Score",
    description: "Receive your ATS compatibility score and feedback."
  },
  {
    number: 4,
    title: "Improve & Match",
    description: "Get suggestions and match with job descriptions."
  }
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Get your resume analyzed in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;