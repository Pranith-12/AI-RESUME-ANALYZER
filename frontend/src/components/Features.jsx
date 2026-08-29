import FeatureCard from "./FeatureCard";
import {
  Star,
  Bot,
  FileText,
  Download,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: <Star size={28} className="text-yellow-500" />,
    title: "ATS Score Analysis",
    description: "Get a detailed ATS compatibility score with actionable suggestions to improve your resume."
  },
  {
    icon: <Bot size={28} className="text-blue-600" />,
    title: "AI-Powered Suggestions",
    description: "Receive intelligent, categorized recommendations to make your resume stand out."
  },
  {
    icon: <FileText size={28} className="text-green-600" />,
    title: "Job Description Matcher",
    description: "Compare your resume against specific job descriptions and see your match percentage."
  },
  {
    icon: <Download size={28} className="text-purple-600" />,
    title: "Download Report",
    description: "Export a professional report with your scores, strengths, and improvement suggestions."
  },
  {
    icon: <ShieldCheck size={28} className="text-red-500" />,
    title: "Secure & Private",
    description: "Your resume data is processed locally and never shared with third parties."
  },
];

function Features() {
  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful Features
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Everything you need to build a resume that gets interviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;