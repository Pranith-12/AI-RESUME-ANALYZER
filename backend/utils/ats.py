import re


def calculate_ats_score(text):
    """Analyze a resume and return a detailed ATS compatibility score."""

    text_lower = text.lower()

    score = 0
    strengths = []
    suggestions = []

    # -----------------------------------
    # 1. Contact Information (max 15)
    # -----------------------------------

    contact_score = 0

    # Email
    email_found = re.search(r'[\w.-]+@[\w.-]+\.\w+', text)
    if email_found:
        contact_score += 4
        strengths.append("Professional email address found")
    else:
        suggestions.append("Add a professional email address")

    # Phone number
    phone_found = re.search(r'(\+\d{1,3}[\s-]?)?\d{10}|\(\d{3}\)[\s.-]?\d{3}[\s.-]?\d{4}', text)
    if phone_found:
        contact_score += 4
        strengths.append("Phone number found")
    else:
        suggestions.append("Add a valid phone number")

    # LinkedIn
    linkedin_found = re.search(r'linkedin\.com', text_lower)
    if linkedin_found:
        contact_score += 4
        strengths.append("LinkedIn profile found")
    else:
        suggestions.append("Add your LinkedIn profile URL")

    # GitHub
    github_found = re.search(r'github\.com', text_lower)
    if github_found:
        contact_score += 3
        strengths.append("GitHub profile found")
    else:
        if any(skill in text_lower for skill in ['python', 'javascript', 'react', 'node', 'java']):
            suggestions.append("Add your GitHub profile to showcase your projects")

    score += contact_score

    # -----------------------------------
    # 2. Resume Sections (max 50)
    # -----------------------------------

    sections = {
        "professional summary": 10,
        "summary": 10,
        "profile": 10,
        "objective": 10,
        "education": 10,
        "skills": 10,
        "experience": 10,
        "work experience": 10,
        "projects": 8,
        "certifications": 5,
        "awards": 3,
        "extracurricular": 2,
    }

    section_labels = {
        "professional summary": "Professional Summary",
        "summary": "Professional Summary",
        "profile": "Professional Summary",
        "objective": "Career Objective",
        "education": "Education",
        "skills": "Skills",
        "experience": "Work Experience",
        "work experience": "Work Experience",
        "projects": "Projects",
        "certifications": "Certifications",
        "awards": "Awards",
        "extracurricular": "Extracurricular Activities",
    }

    # Track which labels we've already added to avoid duplicates
    found_section_labels = set()
    section_score = 0

    for section, points in sections.items():
        # Use word boundary matching to avoid false positives
        if re.search(r'\b' + re.escape(section) + r'\b', text_lower):
            label = section_labels[section]
            if label not in found_section_labels:
                section_score += points
                found_section_labels.add(label)
                strengths.append(f"{label} section found")

    # Check for missing essential sections
    essential = ["education", "skills"]
    for sec in essential:
        label = section_labels[sec]
        if label not in found_section_labels:
            suggestions.append(f"Consider adding a {label} section")

    if "experience" not in found_section_labels and "work experience" not in found_section_labels:
        suggestions.append("Consider adding a Work Experience section")

    if "projects" not in found_section_labels:
        suggestions.append("Consider adding a Projects section to showcase your work")

    # Cap section score
    section_score = min(section_score, 50)
    score += section_score

    # -----------------------------------
    # 3. Technical Skills (max 15)
    # -----------------------------------

    technical_skills = [
        "python", "java", "javascript", "typescript", "react",
        "node.js", "node", "fastapi", "django", "flask",
        "sql", "mysql", "mongodb", "postgresql", "html",
        "css", "tailwind", "tailwind css", "git", "github",
        "docker", "kubernetes", "aws", "azure", "gcp",
        "machine learning", "deep learning", "data analysis",
        "pandas", "numpy", "opencv", "tensorflow", "pytorch",
        "c", "c++", "matlab", "rest api", "api",
        "figma", "linux", "next.js", "vue", "angular",
        "spring boot", "express", "graphql", "redis",
        "elasticsearch", "kafka", "scala", "rust", "go",
        "swift", "kotlin", "flutter", "react native",
    ]

    found_skills = []
    for skill in technical_skills:
        if skill in text_lower:
            found_skills.append(skill)

    skill_score = min(len(found_skills) * 1.0, 15)
    score += skill_score

    if len(found_skills) >= 8:
        strengths.append(f"Strong technical skill set ({len(found_skills)} skills detected)")
    elif len(found_skills) >= 4:
        strengths.append(f"{len(found_skills)} technical skills identified")
        suggestions.append("Consider adding more relevant technical skills")
    elif len(found_skills) > 0:
        strengths.append(f"{len(found_skills)} technical skills identified")
        suggestions.append("Add more technical skills relevant to your target role")
    else:
        suggestions.append("Add relevant technical skills and tools you have experience with")

    # -----------------------------------
    # 4. Action Verbs (max 5)
    # -----------------------------------

    action_words = [
        "developed", "designed", "implemented", "created", "built",
        "optimized", "automated", "engineered", "analyzed", "improved",
        "managed", "led", "coordinated", "streamlined", "deployed",
        "architected", "integrated", "launched", "delivered", "achieved",
        "reduced", "increased", "established", "pioneered", "spearheaded",
        "develop", "design", "implement", "create", "build",
        "optimize", "manage", "lead", "analyze",
    ]

    found_action_words = []
    for word in action_words:
        if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
            found_action_words.append(word)

    if len(found_action_words) >= 6:
        score += 5
        strengths.append("Uses strong action-oriented language")
    elif len(found_action_words) >= 3:
        score += 3
        strengths.append("Uses some action-oriented language")
        suggestions.append("Use more strong action words such as engineered, architected, streamlined")
    else:
        suggestions.append("Use stronger action words such as developed, implemented, designed, optimized")

    # -----------------------------------
    # 5. Quantifiable Achievements (max 5)
    # -----------------------------------

    numbers = re.findall(
        r'\b\d+(?:\.\d+)?\s*(?:%|percent|users|projects?|months?|years?|x|times|hrs?|hours?|pages?|features?|components?)?\b',
        text_lower
    )

    if len(numbers) >= 5:
        score += 5
        strengths.append("Resume contains strong measurable achievements")
    elif len(numbers) >= 3:
        score += 3
        strengths.append("Resume contains some measurable achievements")
        suggestions.append("Add more quantifiable results (percentages, metrics, timeframes)")
    else:
        suggestions.append("Add measurable results such as percentages, numbers, or performance improvements")

    # -----------------------------------
    # 6. Resume Length (max 5)
    # -----------------------------------

    word_count = len(re.findall(r'\b\w+\b', text))

    if word_count < 100:
        suggestions.append("Resume appears too short; add relevant achievements, projects, and experience")
    elif word_count < 200:
        suggestions.append("Resume could be longer; consider adding more detail to your experience and projects")
    elif word_count > 1500:
        suggestions.append("Resume may be too long; remove unnecessary information and focus on relevance")
    elif word_count > 1000:
        score += 3
        strengths.append("Good resume length")
    else:
        score += 5
        strengths.append("Resume length is well-balanced")

    # -----------------------------------
    # 7. Deduplicate suggestions and strengths
    # -----------------------------------

    suggestions = list(dict.fromkeys(suggestions))
    strengths = list(dict.fromkeys(strengths))

    # -----------------------------------
    # 8. Final Score Calculation
    # -----------------------------------

    score = min(round(score), 100)

    # -----------------------------------
    # 9. Overall Rating
    # -----------------------------------

    if score >= 85:
        rating = "Excellent"
    elif score >= 70:
        rating = "Good"
    elif score >= 50:
        rating = "Needs Improvement"
    else:
        rating = "Needs Major Improvement"

    # -----------------------------------
    # 10. Return structured result
    # -----------------------------------

    return {
        "score": score,
        "rating": rating,
        "strengths": strengths,
        "suggestions": suggestions,
        "keywords": found_skills,
        "word_count": word_count,
        "action_words": found_action_words,
        "contact_score": contact_score,
        "section_score": section_score,
        "skills_score": min(round(skill_score), 15),
    }