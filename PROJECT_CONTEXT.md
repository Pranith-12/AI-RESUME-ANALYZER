# ResuVio — Project Context

> Auto-generated context file to track deployment progress and project state.

---

## Project Overview

**ResuVio** is an AI-powered resume analyzer and job matcher with a React frontend and Python FastAPI backend.

- **Frontend:** React + Vite + Tailwind CSS + Axios + Lucide React
- **Backend:** Python + FastAPI + Uvicorn + PDFPlumber

---

## Live Deployment URLs

| Service | URL | Status |
|---|---|---|
| **Frontend (Vercel)** | https://resuvio.vercel.app | ✅ Deployed & Live |
| **Backend (Render)** | https://resuvio.onrender.com | ✅ Deployed & Live |

---

## API Endpoints (Verified Working)

| Method | Endpoint | Description | Status |
|---|---|---|---|
| `GET` | `/` | Health check — returns `{"message": "ResuVio Backend is running!"}` | ✅ Working |
| `POST` | `/upload-resume` | Upload PDF resume for ATS analysis | ✅ Working (returns field validation error without file, as expected) |
| `POST` | `/match-job` | Match resume against a job description | ✅ Working (returns field validation error without params, as expected) |
| `POST` | `/ai-suggestions` | Generate AI improvement suggestions | ✅ Working (returns field validation error without params, as expected) |

---

## Changes Made

### Files Modified

| File | Change |
|---|---|
| `.gitignore` | Added `backend/uploads/*.pdf` and `frontend/.env` to ignored paths |
| `backend/app.py` | Switched file uploads to `tempfile` with automatic cleanup via `try/finally`; added configurable `ALLOWED_ORIGINS` CORS via env var; added `import tempfile` |
| `backend/requirements.txt` | Verified all dependencies present: fastapi, uvicorn, pdfplumber, python-multipart |
| `frontend/src/components/UploadSection.jsx` | Uses `API_URL` from `config.js` for all API calls |
| `frontend/src/components/JobMatcher.jsx` | Uses `API_URL` from `config.js` for all API calls |

### Files Created

| File | Purpose |
|---|---|
| `README.md` | Full deployment documentation with step-by-step instructions |
| `backend/utils/__init__.py` | Makes `utils/` a proper Python package |
| `backend/uploads/.gitkeep` | Ensures the uploads directory is tracked in git |
| `backend/build.sh` | Render build script (installs deps, creates uploads dir) |
| `backend/render.yaml` | Render deployment configuration |
| `frontend/.env.example` | Environment variable template (`VITE_API_URL=http://localhost:8000`) |
| `frontend/src/config.js` | Central API URL config using `import.meta.env.VITE_API_URL` |
| `frontend/vercel.json` | Vercel deployment config with SPA rewrites |

---

## Deployment Problems Fixed

1. **File accumulation** — Uploaded PDFs were saved permanently to `uploads/` and never cleaned up. Now uses temp files that are deleted after analysis.
2. **Missing `__init__.py`** — `backend/utils/` lacked this file for proper Python packaging.
3. **Invalid `.env.example`** — Had a `[TEMPLATE]` prefix that's not valid `.env` syntax.
4. **Missing `.gitignore` rules** — `frontend/.env` wasn't explicitly ignored.
5. **No deployment docs** — README now has complete deployment instructions.
6. **Unpushed commits** — Backend code was never pushed to GitHub, causing Render to deploy only frontend files.

---

## Environment Variables

### Frontend (Vercel)

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://resuvio.onrender.com` |

### Backend (Render)

| Variable | Value |
|---|---|
| `ALLOWED_ORIGINS` | *(Needs to be set to `https://resuvio.vercel.app`)* |

---

## Deployment Settings

### Backend — Render

- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
- **Runtime:** Python 3.11

### Frontend — Vercel

- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework:** Vite

---

## Pending / Remaining Tasks

### 1. Configure CORS on Render ⚠️ HIGH PRIORITY

The `ALLOWED_ORIGINS` env var on Render needs to be set to allow requests from the Vercel frontend:

1. Go to [render.com](https://render.com) → your backend service → **Environment** tab
2. Add/Update env var:
   - **Key:** `ALLOWED_ORIGINS`
   - **Value:** `https://resuvio.vercel.app`
3. Save — Render will auto-redeploy

Without this, the frontend will be blocked by CORS when making API calls to the backend.

### 2. Test Full Integration

After CORS is configured:
- Upload a PDF resume on the frontend
- Test job matching
- Test AI suggestions

### 3. Optional Improvements

- Add custom domain to Vercel
- Set up auto-deploy on push for both services
- Add rate limiting to backend
- Add error boundary to frontend

---

## Project Structure

```
AI-RESUME-ANALYZER/
├── backend/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── render.yaml         # Render deployment config
│   ├── build.sh            # Render build script
│   ├── uploads/            # Temp upload directory (cleaned after analysis)
│   │   └── .gitkeep
│   └── utils/
│       ├── __init__.py
│       ├── ai.py           # AI suggestion engine
│       ├── ats.py          # ATS scoring logic
│       └── matcher.py      # Job matching engine
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── UploadSection.jsx
│   │   │   ├── JobMatcher.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── config.js       # API URL configuration
│   │   └── main.jsx        # App entry point
│   ├── .env.example        # Environment variable template
│   ├── package.json        # Node dependencies
│   ├── vercel.json         # Vercel deployment config
│   └── vite.config.js      # Vite configuration
├── .gitignore
├── package.json            # Root package.json
└── README.md
```

---

## Git History

```
92105d2 Prepare project for production deployment (Render + Vercel)
fe7bd90 second commit
8736c3b first commit
```

All commits have been pushed to `origin/main`.

---

*Last updated: August 30, 2026*
