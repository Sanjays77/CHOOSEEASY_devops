# Walkthrough: Containerized AI Career Recommendation & DevOps Setup

This walkthrough summarizes the implementation of the Python AI Recommendation Microservice, the React frontend integration, and the DevOps configurations.

## Changes Implemented

We have successfully integrated Gemini-powered AI Career Roadmaps into the CHOOSEEASY application:

1. **Python AI Microservice (`ai/`):**
   - [app.py](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/app.py) - Flask service connecting to Gemini API over HTTPS to generate structured JSON roadmaps.
   - [requirements.txt](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/requirements.txt) - Lightweight dependencies.
   - [Dockerfile](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/Dockerfile) - Docker build instructions for the containerized Python microservice.
   - [test_gemini.py](file:///d:/LPU%20SEM%205/CHOOSEEASY/ai/test_gemini.py) - Verification script confirming active API connection.
   
2. **DevOps Orchestration:**
   - [docker-compose.yml](file:///d:/LPU%20SEM%205/CHOOSEEASY/docker-compose.yml) - Integrated `ai-service` to run on port 5001.

3. **Node.js Backend:**
   - [testResults.js](file:///d:/LPU%20SEM%205/CHOOSEEASY/server/routes/testResults.js) - Added `POST /api/test-results/ai-recommendation` route.

4. **React Frontend:**
   - [AIRecommendationView.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/components/AIRecommendationView.jsx) - High-fidelity component showing roadmap milestones and market outlooks.
   - [Test.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/pages/Test.jsx) - AI triggers added to result pages.
   - [Dashboard.jsx](file:///d:/LPU%20SEM%205/CHOOSEEASY/client/src/pages/Dashboard.jsx) - Expands past results with on-demand AI reports.

5. **Presentation Assets:**
   - [presentation_guide.md](file:///d:/LPU%20SEM%205/CHOOSEEASY/presentation_guide.md) - A full guide containing architecture graphs and answers to common examiner questions.

---

## How to Run the Project

You can run the project using either **Docker Compose** or **Local Development Servers**.

### Method 1: Using Docker Compose (Recommended for Presentation)
Make sure **Docker Desktop** is open, then open a terminal in the root directory (`d:\LPU SEM 5\CHOOSEEASY`) and run:
```bash
docker-compose up --build -d
```
Once the containers build and launch successfully:
- **Frontend Client**: Open your browser at [http://localhost](http://localhost)
- **Backend API**: Running at [http://localhost:5000](http://localhost:5000)
- **AI Microservice**: Running at [http://localhost:5001](http://localhost:5001)

---

### Method 2: Running Locally Without Docker
If you want to run the microservices individually without Docker:

1. **Step 1: Start MongoDB**
   - Ensure a local instance of MongoDB is running on port `27017` (default).

2. **Step 2: Launch the AI Service (Python)**
   - Open a terminal and navigate to the `ai/` folder.
   - Install requirements and launch the server:
     ```bash
     cd ai
     pip install -r requirements.txt
     python app.py
     ```
   - It will run on [http://localhost:5001](http://localhost:5001).

3. **Step 3: Launch the Backend Server (Node.js)**
   - Open a new terminal and navigate to the `server/` folder.
   - Start the development server:
     ```bash
     cd server
     npm run dev
     ```
   - It will run on [http://localhost:5000](http://localhost:5000).

4. **Step 4: Launch the Frontend Client (React)**
   - Open a new terminal and navigate to the `client/` folder.
   - Start the Vite server:
     ```bash
     cd client
     npm run dev
     ```
   - Open your browser at the local Vite address shown in the console (usually [http://localhost:5173](http://localhost:5173)).
