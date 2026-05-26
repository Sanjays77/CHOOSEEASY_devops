import os
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Fallback Gemini API key as provided by the user
FALLBACK_API_KEY = "AIzaSyCjBg7-Rl-sc0x6Vvc_rrFyqTFMVfUx9OQ"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"

def get_api_key():
    return os.environ.get("GEMINI_API_KEY") or FALLBACK_API_KEY

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "service": "CHOOSEEASY AI Recommendation Service"})

@app.route("/recommend", methods=["POST"])
def get_recommendation():
    try:
        data = request.get_json() or {}
        
        # Extract inputs
        answers = data.get("answers", {})
        category_scores = data.get("categoryScores", {})
        recommended_career = data.get("recommendedCareer", "General")
        user_wish = data.get("wish", "").strip()
        
        # Parse sections for prompt construction
        psycho_summary = []
        for q_id, q_data in answers.get("psychometric", {}).items():
            if isinstance(q_data, dict):
                q_text = q_data.get("questionText", "Question")
                scores = q_data.get("scores", {})
                scores_str = ", ".join([f"{k}: {v}" for k, v in scores.items() if isinstance(v, (int, float))])
                psycho_summary.append(f"Question: '{q_text}' -> Preferences: [{scores_str}]")
        
        tech_summary = []
        for q_id, q_data in answers.get("technical", {}).items():
            if isinstance(q_data, dict):
                q_text = q_data.get("questionText", "Question")
                sel_opt = q_data.get("selectedOption", "N/A")
                is_corr = "Correct" if q_data.get("isCorrect") else "Incorrect"
                tech_summary.append(f"Question: '{q_text}' -> User chose: '{sel_opt}' ({is_corr})")
                
        apt_summary = []
        for q_id, q_data in answers.get("aptitude", {}).items():
            if isinstance(q_data, dict):
                q_text = q_data.get("questionText", "Question")
                sel_opt = q_data.get("selectedOption", "N/A")
                is_corr = "Correct" if q_data.get("isCorrect") else "Incorrect"
                apt_summary.append(f"Question: '{q_text}' -> User chose: '{sel_opt}' ({is_corr})")

        # Formatting data sections for prompt
        psycho_text = "\n".join(psycho_summary) or "None provided"
        tech_text = "\n".join(tech_summary) or "None provided"
        apt_text = "\n".join(apt_summary) or "None provided"
        
        tech_score = category_scores.get("technical", 0)
        apt_score = category_scores.get("aptitude", 0)
        
        wish_text = f"The user has specific career wishes: '{user_wish}'" if user_wish else "The user did not specify any specific career wishes."

        # Create system prompt instructing Gemini to return JSON
        system_instruction = (
            "You are CHOOSEEASY AI, a premium, intelligent career counseling assistant. "
            "Your task is to analyze user test answers, scores, and specific career wishes to generate a highly personalized, structured career recommendation report. "
            "You must return ONLY a valid JSON object. Do not wrap the JSON in Markdown ticks or write any conversational text outside of the JSON structure. "
            "Ensure the JSON exactly conforms to this template:\n"
            "{\n"
            "  \"aiAnalysis\": \"Detailed analysis justifying the career choice based on answers and personality profile.\",\n"
            "  \"compatibilityScore\": 92, // An integer percentage matching compatibility\n"
            "  \"roles\": [\n"
            "    { \"title\": \"Job Title 1\", \"description\": \"Short description of the job role.\" },\n"
            "    { \"title\": \"Job Title 2\", \"description\": \"Short description of the job role.\" }\n"
            "  ],\n"
            "  \"roadmap\": [\n"
            "    { \"phase\": \"Phase 1: Foundation\", \"title\": \"Learn Core Concepts\", \"skills\": [\"Skill A\", \"Skill B\"], \"certifications\": [\"Cert A\"], \"projects\": [\"Project Title 1\"] },\n"
            "    { \"phase\": \"Phase 2: Deep Dive\", \"title\": \"Build Projects & Specialities\", \"skills\": [\"Skill C\"], \"certifications\": [\"Cert B\"], \"projects\": [\"Project Title 2\"] },\n"
            "    { \"phase\": \"Phase 3: Launch\", \"title\": \"Internships & Applications\", \"skills\": [\"Skill D\"], \"certifications\": [\"Cert C\"], \"projects\": [\"Portfolio Site\"] }\n"
            "  ],\n"
            "  \"marketOutlook\": {\n"
            "    \"indiaSalary\": \"₹X,XX,XXX - ₹XX,XX,XXX\",\n"
            "    \"globalSalary\": \"$XX,XXX - $XXX,XXX\",\n"
            "    \"growthRate\": \"XX% (Faster than average)\",\n"
            "    \"automationRisk\": \"Low/Medium/High\"\n"
            "  },\n"
            "  \"skillsToDevelop\": [\"Skill 1\", \"Skill 2\", \"Skill 3\", \"Skill 4\"],\n"
            "  \"tailoredAdvice\": \"Specific tips addressing the user's specific wishes (e.g. remote work, working in tech/finance, work-life balance).\"\n"
            "}"
        )
        
        user_prompt = (
            f"Here are the test results for the user:\n\n"
            f"Rule-Based Recommended Career Category: {recommended_career}\n"
            f"Category Scores:\n"
            f"- Technical Score: {tech_score}\n"
            f"- Aptitude Score: {apt_score}\n\n"
            f"1. Psychometric Personality Answers:\n{psycho_text}\n\n"
            f"2. Technical Knowledge Answers:\n{tech_text}\n\n"
            f"3. Aptitude & Logical Reasoning Answers:\n{apt_text}\n\n"
            f"Custom User Wish/Goal:\n{wish_text}\n\n"
            f"Analyze this data and generate the JSON report."
        )
        
        # Prepare the Gemini API payload
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"{system_instruction}\n\n{user_prompt}"
                        }
                    ]
                }
            ],
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        }
        
        api_key = get_api_key()
        headers = {"Content-Type": "application/json"}
        
        # Request to Gemini
        response = requests.post(f"{GEMINI_API_URL}?key={api_key}", json=payload, headers=headers)
        
        if response.status_code != 200:
            print("Gemini API Error:", response.text)
            return jsonify({
                "message": "Error calling Gemini API",
                "error": response.text
            }), 500
            
        res_json = response.json()
        
        # Parse content text from response
        try:
            candidates = res_json.get("candidates", [])
            if not candidates:
                raise ValueError("No candidates returned from Gemini")
            
            text_response = candidates[0]["content"]["parts"][0]["text"].strip()
            
            # Clean Markdown formatting wrapper if present
            if text_response.startswith("```"):
                lines = text_response.splitlines()
                # Remove starting ```json or ``` and ending ```
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines[-1].startswith("```"):
                    lines = lines[:-1]
                text_response = "\n".join(lines).strip()
                
            recommendation_report = json.loads(text_response)
            return jsonify(recommendation_report), 200
            
        except Exception as parse_err:
            print("Failed to parse Gemini response:", parse_err)
            print("Raw text response was:", text_response)
            return jsonify({
                "message": "Failed to parse AI response structure",
                "error": str(parse_err),
                "raw_response": text_response
            }), 500
            
    except Exception as err:
        print("General Exception in recommendation route:", err)
        return jsonify({
            "message": "An internal error occurred",
            "error": str(err)
        }), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
