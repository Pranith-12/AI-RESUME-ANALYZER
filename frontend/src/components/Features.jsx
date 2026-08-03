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
    icon: <Star size={45} className="text-yellow-500" />,
    title: "ATS Score",
    description: "Analyze ATS compatibility.",
  },
  {
    icon: <Bot size={45} className="text-blue-600" />,
    title: "AI Suggestions",
    description: "Receive AI-powered recommendations.",
  },
  {
    icon: <FileText size={45} className="text-green-600" />,
    title: "Resume Match",
    description: "Match your resume with job descriptions.",
  },
  {
    icon: <Download size={45} className="text-purple-600" />,
    title: "Download Report",
    description: "Download a professional PDF report.",
  },
  {
    icon: <ShieldCheck size={45} className="text-red-500" />,
    title: "Secure Data",
    description: "Your resume is encrypted and kept private.",
  },
];

function Features() {
  return (
    <section className="bg-white py-20">
      <h2 className="text-4xl font-bold text-center mb-14">
        Powerful Features
      </h2>

      <div className="flex justify-center gap-8 flex-wrap">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;