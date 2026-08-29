import re


# --------------------------------
# Skills Database
# --------------------------------

TECHNICAL_SKILLS = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c", "c++", "c#",
    "ruby", "go", "rust", "kotlin", "swift", "php", "scala", "r",
    "matlab", "perl", "objective-c",
    # Frontend
    "react", "react.js", "reactjs", "next.js", "nextjs", "vue", "vue.js",
    "angular", "angularjs", "html", "html5", "css", "css3", "sass",
    "tailwind", "tailwind css", "bootstrap", "jquery", "svelte",
    # Backend
    "node.js", "nodejs", "express", "express.js", "fastapi", "django",
    "flask", "spring", "spring boot", "laravel", "rails", "ruby on rails",
    "asp.net", "graphql", "rest api", "rest", "api",
    # Databases
    "sql", "mysql", "postgresql", "postgres", "mongodb", "redis",
    "elasticsearch", "cassandra", "dynamodb", "sqlite", "oracle", "mariadb",
    "firebase", "supabase", "neo4j",
    # Cloud & DevOps
    "aws", "amazon web services", "azure", "microsoft azure", "gcp",
    "google cloud", "docker", "kubernetes", "k8s", "jenkins", "ci/cd",
    "terraform", "ansible", "linux", "nginx", "apache",
    # AI/ML
    "machine learning", "deep learning", "artificial intelligence",
    "natural language processing", "nlp", "computer vision",
    "data science", "data analysis", "data engineering",
    "pandas", "numpy", "scipy", "scikit-learn", "opencv",
    "tensorflow", "keras", "pytorch", "hugging face", "transformers",
    "matplotlib", "seaborn", "tableau", "power bi",
    # Mobile
    "flutter", "dart", "react native", "ios", "android",
    # Tools
    "git", "github", "gitlab", "bitbucket", "jira", "confluence",
    "figma", "postman", "vs code", "visual studio",
    # Testing
    "jest", "pytest", "selenium", "cypress", "junit", "mocha",
    # Other
    "blockchain", "web3", "solidity", "sass", "webpack", "babel",
    "microservices", "serverless", "agile", "scrum", "kanban",
]

SOFT_SKILLS = [
    "communication", "teamwork", "team", "collaboration",
    "leadership", "problem solving", "problem-solving",
    "time management", "adaptability", "creativity",
    "analytical", "detail-oriented", "detail oriented",
    "critical thinking", "organization", "self-motivated",
    "project management", "mentoring", "presentation",
    "negotiation", "decision making", "emotional intelligence",
]


def match_resume_to_job(resume_text, job_description):
    """Match a resume against a job description and return detailed results."""

    resume_lower = resume_text.lower()
    job_lower = job_description.lower()

    # --------------------------------
    # Find job-required skills
    # --------------------------------

    job_technical = [s for s in TECHNICAL_SKILLS if s in job_lower]
    job_soft = [s for s in SOFT_SKILLS if s in job_lower]

    job_keywords = list(dict.fromkeys(job_technical + job_soft))

    # --------------------------------
    # Matched and missing keywords
    # --------------------------------

    matched_keywords = [k for k in job_keywords if k in resume_lower]
    missing_keywords = [k for k in job_keywords if k not in resume_lower]

    # Separate missing into technical and missing
    missing_technical = [k for k in missing_keywords if k in TECHNICAL_SKILLS]
    missing_soft = [k for k in missing_keywords if k in SOFT_SKILLS]

    # --------------------------------
    # Calculate Match Score
    # --------------------------------

    if len(job_keywords) > 0:
        match_score = round((len(matched_keywords) / len(job_keywords)) * 100)
    else:
        match_score = 0

    # --------------------------------
    # Generate Recommendations
    # --------------------------------

    recommendations = []

    if missing_technical:
        recommendations.append(
            f"Add missing technical skills if you have experience with them: {', '.join(missing_technical[:5])}"
        )

    if missing_soft:
        recommendations.append(
            "Incorporate relevant soft skills naturally into your experience descriptions"
        )

    if match_score >= 80:
        recommendations.append(
            "Excellent match! Tailor your resume summary to emphasize these key skills"
        )
    elif match_score >= 50:
        recommendations.append(
            "Moderate match. Highlight more relevant skills and projects that align with this role"
        )
        recommendations.append(
            "Customize your project descriptions to emphasize technologies used in the job description"
        )
    else:
        recommendations.append(
            "Low keyword match. Consider tailoring your resume to include skills mentioned in the job description"
        )
        recommendations.append(
            "Add relevant projects that demonstrate experience with the required technologies"
        )

    # Additional recommendations based on resume quality
    word_count = len(re.findall(r'\\b\\w+\\b', resume_text))
    if word_count < 200:
        recommendations.append(
            "Your resume is quite short. Add more detailed descriptions of your projects and experience"
        )

    if "%" not in resume_text:
        recommendations.append(
            "Add quantifiable achievements (e.g., 'improved performance by 40%')"
        )

    return {
        "match_score": match_score,
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "missing_technical": missing_technical,
        "missing_soft": missing_soft,
        "total_job_keywords": len(job_keywords),
        "recommendations": recommendations,
    }
