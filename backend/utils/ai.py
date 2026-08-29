import re


def generate_ai_suggestions(resume_text, job_description=""):
    """Generate intelligent, categorized resume improvement suggestions."""

    resume_lower = resume_text.lower()
    suggestions = []

    # --------------------------------
    # 1. Summary / Profile
    # --------------------------------

    summary_found = any(w in resume_lower for w in ["summary", "profile", "objective"])
    if not summary_found:
        suggestions.append({
            "category": "Content",
            "suggestion": "Add a professional summary at the top of your resume that highlights your key skills, experience, and career goals in 2-3 sentences."
        })
    else:
        suggestions.append({
            "category": "Content",
            "suggestion": "Ensure your professional summary is concise (2-3 sentences) and tailored to your target role."
        })

    # --------------------------------
    # 2. Action Verbs
    # --------------------------------

    strong_verbs = ["developed", "implemented", "designed", "engineered", "optimized",
                    "automated", "architected", "streamlined", "spearheaded", "pioneered"]
    found_verbs = [v for v in strong_verbs if re.search(r'\b' + re.escape(v) + r'\b', resume_lower)]

    if len(found_verbs) < 3:
        missing_verbs = [v for v in strong_verbs[:6] if v not in found_verbs]
        suggestions.append({
            "category": "Language",
            "suggestion": f"Use more action verbs in your descriptions. Try words like: {', '.join(missing_verbs[:4])}"
        })

    # --------------------------------
    # 3. Quantifiable Achievements
    # --------------------------------

    numbers = re.findall(r'\b\d+(?:\.\d+)?\s*(?:%|percent|users?|projects?|months?|years?|x|times)?\b', resume_lower)
    if len(numbers) < 3:
        suggestions.append({
            "category": "Impact",
            "suggestion": "Add measurable achievements to your bullet points. Use metrics like percentages, user counts, time saved, or performance improvements to quantify your impact."
        })

    # --------------------------------
    # 4. Technical Skills
    # --------------------------------

    common_skills = ["python", "java", "javascript", "react", "node.js", "sql",
                     "html", "css", "git", "docker", "aws", "mongodb"]
    found = [s for s in common_skills if s in resume_lower]
    if len(found) < 3:
        suggestions.append({
            "category": "Skills",
            "suggestion": "Add a dedicated Skills section listing your technical proficiencies. Include programming languages, frameworks, tools, and technologies."
        })

    # --------------------------------
    # 5. Resume Sections
    # --------------------------------

    sections_found = 0
    for sec in ["experience", "education", "projects", "skills"]:
        if sec in resume_lower:
            sections_found += 1

    if sections_found < 3:
        missing_sections = []
        for sec in ["experience", "education", "projects", "skills"]:
            if sec not in resume_lower:
                missing_sections.append(sec.title())
        suggestions.append({
            "category": "Structure",
            "suggestion": f"Add missing resume sections: {', '.join(missing_sections)}. A well-structured resume should include Education, Skills, Experience, and Projects sections."
        })

    # --------------------------------
    # 6. Project Descriptions
    # --------------------------------

    if "projects" in resume_lower:
        lines = resume_text.split("\n")
        in_projects = False
        project_lines = []
        for line in lines:
            ll = line.lower()
            if "project" in ll:
                in_projects = True
            elif any(s in ll for s in ["experience", "education", "skills", "certification"]):
                in_projects = False
            if in_projects:
                project_lines.append(line)

        project_text = " ".join(project_lines)
        has_tech = any(t in project_text.lower() for t in ["using", "built with", "developed with", "tech stack", "technologies"])
        if not has_tech:
            suggestions.append({
                "category": "Projects",
                "suggestion": "Include the technologies used in each project description (e.g., 'Built using React, Node.js, and MongoDB')."
            })

    # --------------------------------
    # 7. Job-Specific Suggestions
    # --------------------------------

    if job_description:
        job_lower = job_description.lower()
        important_keywords = [
            "python", "java", "javascript", "react", "sql", "fastapi",
            "machine learning", "data analysis", "git", "aws", "docker",
            "kubernetes", "typescript", "node.js", "next.js", "graphql",
            "postgresql", "mongodb", "redis", "linux", "ci/cd",
        ]

        missing_keywords = [k for k in important_keywords if k in job_lower and k not in resume_lower]

        if missing_keywords:
            suggestions.append({
                "category": "Job Match",
                "suggestion": f"Your resume is missing these keywords from the job description: {', '.join(missing_keywords[:6])}. Add them if you have relevant experience."
            })

        # Check for role-specific terms
        role_terms = re.findall(r'\b(senior|junior|lead|principal|staff)\b', job_lower)
        if role_terms:
            suggestions.append({
                "category": "Leveling",
                "suggestion": f"The job description mentions a {role_terms[0]} level role. Ensure your experience and achievements demonstrate the appropriate seniority."
            })

    # --------------------------------
    # 8. Formatting
    # --------------------------------

    if resume_text.count("  ") > 10:
        suggestions.append({
            "category": "Formatting",
            "suggestion": "Clean up extra whitespace in your resume. ATS systems may parse multi-space text incorrectly."
        })

    if len(resume_text) > 5000:
        suggestions.append({
            "category": "Length",
            "suggestion": "Your resume may be too long. Aim for 1-2 pages and focus on the most relevant information."
        })

    return suggestions