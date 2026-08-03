import StepCard from "./StepCard";

const steps = [
  {
    number: 1,
    title: "Upload Resume",
    description: "Upload your PDF resume securely."
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our AI analyzes your resume."
  },
  {
    number: 3,
    title: "ATS Score",
    description: "Receive ATS compatibility score."
  },
  {
    number: 4,
    title: "Download Report",
    description: "Download your improvement report."
  }
];

function HowItWorks() {
  return (

    <section className="py-24 bg-gray-100">

      <h1 className="text-5xl font-bold text-center">

        How It Works

      </h1>

      <p className="text-center text-gray-600 mt-4">

        Get your resume analyzed in four simple steps.

      </p>

      <div className="grid grid-cols-4 gap-8 mt-16 px-20">

        {steps.map((step,index)=>(

          <StepCard
             key={index}
             number={step.number}
             title={step.title}
             description={step.description}
          />

        ))}

      </div>

    </section>

  );
}

export default HowItWorks;