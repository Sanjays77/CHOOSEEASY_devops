# Implementation Plan: Containerized AI Career Recommendation & DevOps Integration

This implementation plan covers the design and addition of a containerized Python AI service that leverages the Gemini API to analyze user psychometric, technical, and aptitude assessment results. The service will generate personalized career roadmap reports, integrated into both the React frontend and Node.js backend. Additionally, this plan outlines the preparation of a comprehensive presentation guide for the student's academic presentation.

## User Review Required

> [!IMPORTANT]
> **Gemini API Key Security**
> The user provided their Gemini API key (`AIzaSyCjBg7-Rl-sc0x6Vvc_rrFyqTFMVfUx9OQ`). We will store this key securely in the server and AI service `.env` files and pass it to the Docker containers via `docker-compose.yml` configuration. We will also implement a fallback to this key inside the code to ensure the application works out-of-the-box for the presentation without manual environment configuration.

> [!TIP]
> **On-Demand AI Recommendation Trigger**
> Generating a detailed AI roadmap from Gemini takes 3–5 seconds. To avoid blocking the initial submission of test results, we will implement an **on-demand** AI recommendation trigger. Users will see a beautiful "Generate AI Career Roadmap & Analysis" button on their test results page and dashboard. Clicking it will trigger the API asynchronously with a premium loading experience (glowing skeleton loader, typing facts about their matched domain).

## Proposed Changes

We will introduce a Python microservice, integrate it with Docker Compose, update the Node.js backend to delegate API requests, and build an interactive UI panel in the React frontend.

---

### Python AI Microservice (`ai/`)

We will create a lightweight Python service inside a new `./ai` directory. To ensure rapid building and stability, it will use Python's standard `requests` module to interact with the Gemini API over HTTPS, avoiding the need for heavy library compilations.

#### [NEW] [app.py](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/app.py)
Creates a Flask server with a `/recommend` POST route. It will:
- Parse `answers` (psychometric, technical, aptitude), `scores`, `recommendedCareer`, and `userWish`.
- Build a detailed, formatted prompt for Gemini.
- Invoke the Gemini 1.5 Flash API with the provided key.
- Request a structured JSON output representing the recommendation:
  - `aiAnalysis`: Explanation of why this career fits their profile.
  - `roles`: Top 3 recommended job roles with titles and short descriptions.
  - `roadmap`: Step-by-step phases (Phase 1: Foundation, Phase 2: Skills, Phase 3: Specialization) with specific technologies/learning goals.
  - `marketOutlook`: Average salary (India & Global), job growth, and automation risk.
  - `skillsToDevelop`: Array of 4-5 technical/soft skills.
  - `tailoredAdvice`: Custom advice matching their personal wishes.
- Handle fallback API key and error scenarios gracefully.

#### [NEW] [Dockerfile](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/Dockerfile)
Defines the container image for the Python microservice:
- Uses `python:3.10-slim` as the base image.
- Installs dependencies from `requirements.txt`.
- Exposes port `5001`.
- Configures gunicorn/flask to run the server.

#### [NEW] [requirements.txt](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/requirements.txt)
Specifies python packages: `Flask`, `Flask-Cors`, `requests`, `gunicorn`, `python-dotenv`.

---

### DevOps Orchestration (`docker-compose.yml`)

#### [MODIFY] [docker-compose.yml](file:///d:/LPU%20SEM%205/CHOOSEEASY/docker-compose.yml)
We will add the `ai-service` container configuration:
- Context points to `./ai`.
- Exposes port `5001:5001`.
- Sets environment variables `GEMINI_API_KEY` and `PORT=5001`.
- Joins the `chooseeasy-network`.
- Configures `server` to depend on `ai-service` (optional, or just runs alongside it).

---

### Node.js Backend Server (`server/`)

#### [MODIFY] [testResults.js](file:///d:/LPU%20SEM%205/CHOOSEEASY/server/routes/testResults.js)
We will add a new API endpoint `POST /api/test-results/ai-recommendation`:
- Accepts `resultId` (ID of the `TestResult` in MongoDB) and a `wish` (optional custom wish string).
- Fetches the assessment answers and category scores for that result.
- Sends an HTTP POST request to the Python microservice at `http://ai-service:5001/recommend` (using the container name inside the Docker bridge network) or `http://localhost:5001` (as local fallback).
- Updates the `TestResult` record in MongoDB by saving the returned AI recommendation JSON under `details.aiRecommendation`.
- Returns the updated test result or the AI recommendation JSON directly to the frontend.

---

### React Frontend Client (`client/`)

We will create a high-quality React component to render the career roadmap and wire it into the assessment results and dashboard.

#### [NEW] [AIRecommendationView.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/components/AIRecommendationView.jsx)
A premium, highly-styled React component to display the AI analysis. It will use HSL-derived color badges, modern cards, and clean grid layouts to display:
- An overview/justification card with a "compatibility meter".
- An interactive roadmap timeline (Phase 1, 2, 3) showing exact skills, certifications, and projects.
- Job cards for the top 3 recommended roles.
- Salary and market growth metrics with glowing progress bars.
- A "Tailored Tips" section showing customized advice matching the user's specific career wish.

#### [MODIFY] [Test.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/pages/Test.jsx)
- In the `ResultView` screen, we will add a card for "AI-Powered Advanced Roadmap".
- Include a text input: "Any specific career wishes? (e.g., 'I want to work remotely', 'I prefer coding over managing teams', 'I want to work in finance')"
- Add a button "Generate AI Career Roadmap & Analysis".
- Display a typing/fact loader while the API resolves.
- Render the `AIRecommendationView` once the results are fetched.

#### [MODIFY] [Dashboard.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/pages/Dashboard.jsx)
- In the "Assessment History" list, when users click on a past result, show a modal or expand card containing the AI Career Roadmap.
- If it hasn't been generated yet, let them input a wish and generate it directly from the dashboard!

---

### Presentation & Docs (`d:\LPU SEM 5\CHOOSEEASY\`)

#### [NEW] [presentation_guide.md](file:///d:/LPU%20SEM%205/CHOOSEEASY/presentation_guide.md)
A comprehensive guide for tomorrow's presentation, containing:
1. **Executive Summary**: Core values and objectives of CHOOSEEASY.
2. **System Architecture**: Flow diagram and technologies (React, Node, Express, MongoDB, Flask, Gemini AI).
3. **AI Logic & Integration**: How answers map to career recommendations, and how Gemini processes them with custom prompt engineering.
4. **DevOps Implementation Details**: Docker Compose configuration, multi-container communication, and Jenkins pipeline automation.
5. **Key Advantages**: What makes this project premium, scalable, and ready for deployment.

---

## Verification Plan

### Automated Tests
- Run `npm test` inside both `client` and `server` folders to verify that existing test suites are passing.
- Create a test script `server/tests/ai.test.js` or run a local Python curl/request test to verify Flask `/recommend` endpoint returns valid JSON structure.

### Manual Verification
- Launch the application locally using Docker Compose: `docker-compose up --build`.
- Go to `http://localhost` (frontend) and take the assessment.
- Submit the test, navigate to the results page, enter a custom wish (e.g., "I love remote work and python coding"), and generate the AI Roadmap.
- Verify the AI roadmap generates successfully, displays the rich UI with interactive components, and saves correctly to the MongoDB collection (verifiable by reloading the page and dashboard).
