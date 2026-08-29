import { FileText } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#hero" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                Resu<span className="text-blue-400">Vio</span>
              </span>
            </a>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-sm">
              AI-powered resume analysis and job matching. Build better resumes and land your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Home", href: "#hero" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Upload Resume", href: "#upload" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "Job Matcher", href: "#job-matcher" },
                { label: "FAQ", href: "#faq" },
                { label: "Testimonials", href: "#testimonials" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ResuVio. All rights reserved. Built with AI for job seekers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;