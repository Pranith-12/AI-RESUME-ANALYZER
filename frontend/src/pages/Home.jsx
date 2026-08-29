import { useState } from "react";

import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import UploadSection from "../components/UploadSection";
import JobMatcher from "../components/JobMatcher";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";


function Home() {

  const [resumeText, setResumeText] = useState("");


  return (
    <>
      <Hero />

      <Features />

      <HowItWorks />

      <UploadSection
        setResumeText={setResumeText}
      />

      <JobMatcher
        resumeText={resumeText}
      />

      <Testimonials />

      <FAQ />

      <Footer />
    </>
  );
}


export default Home;