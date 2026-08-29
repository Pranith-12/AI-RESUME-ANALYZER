import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is my resume secure?",
    answer: "Yes, absolutely. Your resume is processed locally on our server and is never shared with third parties. We take your privacy seriously.",
  },
  {
    question: "Which file formats are supported?",
    answer: "Currently we support PDF files. DOCX support will be added in a future update.",
  },
  {
    question: "How is the ATS score calculated?",
    answer: "Our analysis engine evaluates contact information, resume sections, technical skills, action verbs, quantifiable achievements, resume length, and overall formatting to calculate an ATS compatibility score.",
  },
  {
    question: "How does the Job Description Matcher work?",
    answer: "The matcher compares the keywords and skills from the job description against your resume content, calculating a match percentage and identifying both matched and missing keywords.",
  },
  {
    question: "What are AI Suggestions?",
    answer: "AI Suggestions provide intelligent, categorized recommendations for improving your resume, including content, structure, language, and job-specific tailoring advice.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 text-sm pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;