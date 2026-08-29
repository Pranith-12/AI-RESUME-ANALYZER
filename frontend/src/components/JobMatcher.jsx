import { useState } from "react";
import {
  Briefcase,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:8000";

function JobMatcher({ resumeText }) {
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    if (!resumeText) {
      setError("Please upload and analyze your resume first above.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste a job description before matching.");
      return;
    }

    setLoading(true);
    setError("");
    setMatchResult(null);

    try {
      const formData = new FormData();
      formData.append("resume_text", resumeText);
      formData.append("job_description", jobDescription);

      const response = await axios.post(`${API_URL}/match-job`, formData);
      setMatchResult(response.data);
    } catch (err) {
      console.error("Job matching error:", err);
      if (err.code === "ECONNABORTED" || !err.response) {
        setError("Unable to connect to the backend. Make sure the server is running.");
      } else {
        setError("Unable to match the resume with the job description. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="job-matcher" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
            <Briefcase size={16} className="text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Job Matching</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            Job Description Matcher
          </h2>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
            Compare your resume with a specific job description to see how well you match
          </p>
        </div>

        {/* Job Description Input */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Paste the Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here, including requirements, skills, and responsibilities..."
            className="w-full h-48 p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-gray-700 placeholder-gray-400 transition-colors"
          />
          <p className="text-xs text-gray-400 mt-2">
            {jobDescription.length > 0 ? `${jobDescription.length} characters` : "Paste as much of the job description as possible for best results"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Match Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleMatch}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Matching your resume with the job...
              </>
            ) : (
              <>
                <Briefcase size={20} />
                Match Resume
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {matchResult && (
          <div className="mt-10 space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <p className="text-gray-500 font-medium">Job Match Score</p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="text-6xl font-extrabold text-blue-600">
                  {matchResult.match_score}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="max-w-sm mx-auto mt-4">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                    style={{ width: `${matchResult.match_score}%` }}
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Based on {matchResult.total_job_keywords} keywords from the job description
              </p>
            </div>

            {/* Matched + Missing Keywords */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Matched Keywords */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={20} className="text-green-600" />
                  <h4 className="text-lg font-bold text-green-700">
                    Matched Keywords ({matchResult.matched_keywords.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResult.matched_keywords.length > 0 ? (
                    matchResult.matched_keywords.map((kw, i) => (
                      <span key={i} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No matching keywords found</p>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={20} className="text-red-500" />
                  <h4 className="text-lg font-bold text-red-600">
                    Missing Keywords ({matchResult.missing_keywords.length})
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missing_keywords.length > 0 ? (
                    matchResult.missing_keywords.map((kw, i) => (
                      <span key={i} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <p className="text-green-600 text-sm font-medium">
                      Excellent! No important keywords are missing.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-blue-600" />
                <h4 className="text-lg font-bold text-blue-700">Recommendations</h4>
              </div>
              <div className="space-y-3">
                {matchResult.recommendations?.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobMatcher;