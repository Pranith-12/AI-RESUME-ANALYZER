# ResuVio — AI-Powered Resume Analyzer & Job Matcher

An intelligent resume analysis platform that provides ATS compatibility scoring, job description matching, and AI-powered improvement suggestions.

## Features

- **ATS Score Analysis** — Get an instant compatibility score with detailed breakdowns
- **Job Description Matching** — Compare your resume against specific job descriptions
- **AI Suggestions** — Receive intelligent, categorized improvement recommendations
- **Download Reports** — Export your full analysis as a text report

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, Axios, Lucide React

**Backend:** Python, FastAPI, Uvicorn, PDFPlumber

---

## Local Development

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

The backend will run at `http://localhost:8000`.

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the dev server
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

### Backend (Render Dashboard)

| Variable | Description | Example |
|---|---|---|
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins | `https://your-app.vercel.app,http://localhost:5173` |

---

## Deployment

### Backend — Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create a new **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** `resuvio-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Python
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - **Key:** `ALLOWED_ORIGINS`
   - **Value:** `https://your-frontend-url.vercel.app` (replace with your actual Vercel URL)
6. Click **Create Web Service**

Your backend will be live at `https://your-app-name.onrender.com`.

### Frontend — Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your GitHub repository
3. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend-name.onrender.com` (the URL from your Render deployment)
5. Click **Deploy**

Your frontend will be live at `https://your-app-name.vercel.app`.

### Post-Deployment Setup

After both services are deployed:

1. Go back to your **Render** backend settings
2. Update the `ALLOWED_ORIGINS` environment variable to include your Vercel frontend URL
3. Save — Render will auto-redeploy

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/upload-resume` | Upload PDF resume for ATS analysis |
| `POST` | `/match-job` | Match resume against a job description |
| `POST` | `/ai-suggestions` | Generate AI improvement suggestions |

---

## Project Structure

```
AI-RESUME-ANALYZER/
├── backend/
│   ├── app.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── render.yaml         # Render deployment config
│   ├── uploads/            # Temp upload directory (cleaned after analysis)
│   └── utils/
│       ├── __init__.py
│       ├── ai.py           # AI suggestion engine
│       ├── ats.py          # ATS scoring logic
│       └── matcher.py      # Job matching engine
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── config.js       # API URL configuration
│   │   └── main.jsx        # App entry point
│   ├── .env.example        # Environment variable template
│   ├── package.json        # Node dependencies
│   ├── vercel.json         # Vercel deployment config
│   └── vite.config.js      # Vite configuration
├── .gitignore
└── README.md
```

## License

MIT
