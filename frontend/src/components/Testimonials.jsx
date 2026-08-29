import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review: "The ATS suggestions helped me improve my resume dramatically. I went from getting zero callbacks to landing interviews at top companies.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    review: "Beautiful interface and very accurate resume analysis. The job matcher feature is incredibly useful for tailoring my resume.",
  },
  {
    name: "Arjun Kumar",
    role: "Data Analyst",
    review: "I received more interview calls after improving my resume using ResuVio. The AI suggestions were spot-on.",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Join thousands of job seekers who improved their resumes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;