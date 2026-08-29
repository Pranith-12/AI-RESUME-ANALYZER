from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

import os
import pdfplumber

from utils.ats import calculate_ats_score
from utils.ai import generate_ai_suggestions


app = FastAPI()

# --------------------------------
# CORS Configuration
# --------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------
# Upload folder
# --------------------------------

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# --------------------------------
# Home / Test API
# --------------------------------

@app.get("/")
def home():
    return {"message": "ResuVio Backend is running!"}


# --------------------------------
# Upload + Analyze Resume
# --------------------------------

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload a PDF resume, extract text, and run ATS analysis."""

    if not file.filename.lower().endswith(".pdf"):
        return {"error": "Only PDF files are allowed."}

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    # Extract text from PDF
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    if not text.strip():
        return {"error": "Could not extract text from the PDF. Please try a different file."}

    # ATS Analysis
    analysis = calculate_ats_score(text)

    return {
        "filename": file.filename,
        "message": "Resume analyzed successfully!",
        "text": text,
        "analysis": analysis,
    }


# --------------------------------
# Match Resume With Job Description
# --------------------------------

@app.post("/match-job")
async def match_job(
    resume_text: str = Form(...),
    job_description: str = Form(...),
):
    """Match resume against a job description and return detailed results."""
    from utils.matcher import match_resume_to_job
    result = match_resume_to_job(resume_text, job_description)
    return result


# --------------------------------
# AI Suggestions
# --------------------------------

@app.post("/ai-suggestions")
async def ai_suggestions(
    resume_text: str = Form(...),
    job_description: str = Form(""),
):
    """Generate intelligent resume improvement suggestions."""
    suggestions = generate_ai_suggestions(resume_text, job_description)
    return {"suggestions": suggestions}