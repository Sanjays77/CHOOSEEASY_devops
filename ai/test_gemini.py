import requests
import json

GEMINI_API_KEY = "AIzaSyCjBg7-Rl-sc0x6Vvc_rrFyqTFMVfUx9OQ"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"

def test_api():
    print("Testing Gemini API connection with responseMimeType in v1beta...")
    
    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": (
                            "Respond with a single JSON object containing a field 'test' with value 'success' "
                            "and 'message' with a welcome message for a project named 'CHOOSEEASY'. "
                            "Return only the JSON."
                        )
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }
    
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(f"{GEMINI_API_URL}?key={GEMINI_API_KEY}", json=payload, headers=headers)
        print("HTTP Status Code:", response.status_code)
        
        if response.status_code == 200:
            res_json = response.json()
            text_response = res_json["candidates"][0]["content"]["parts"][0]["text"].strip()
            print("Raw AI response:\n", text_response)
            
            parsed = json.loads(text_response)
            print("\nParsed JSON successfully:")
            print(json.dumps(parsed, indent=2))
            print("\nAPI integration test: PASSED")
        else:
            print("Failed connection. Details:", response.text)
            print("\nAPI integration test: FAILED")
            
    except Exception as e:
        print("An error occurred:", e)
        print("\nAPI integration test: FAILED")

if __name__ == "__main__":
    test_api()
