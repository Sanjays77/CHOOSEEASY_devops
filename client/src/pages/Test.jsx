import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import AIRecommendationView from "../components/AIRecommendationView";
import {
  FaBrain,
  FaCode,
  FaChartLine,
  FaUserMd,
  FaGavel,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Test = () => {
  // Stages: 0: Intro, 1: Psychometric, 2: Technical, 3: Aptitude, 4: Result
  const [stage, setStage] = useState(0);

  // Data State
  const [psychometricQuestions, setPsychometricQuestions] = useState([]);
  const [technicalQuestions, setTechnicalQuestions] = useState({});
  const [aptitudeQuestions, setAptitudeQuestions] = useState([]);
  const [careerDescriptions, setCareerDescriptions] = useState({});
  const [loading, setLoading] = useState(true);

  // State for each stage
  const [psychoAnswers, setPsychoAnswers] = useState({});
  const [techAnswers, setTechAnswers] = useState({});
  const [aptitudeAnswers, setAptitudeAnswers] = useState({});

  // Stage progress tracking
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Results
  const [topCareer, setTopCareer] = useState(null); // Result from Stage 1
  const [scores, setScores] = useState({
    technical: 0,
    aptitude: 0,
  });

  // Submit Results
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error'
  const [savedResultId, setSavedResultId] = useState(null);

  // AI Recommendation States
  const [wish, setWish] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    fetchTestContent();
  }, []);

  const fetchTestContent = async () => {
    try {
      // Fetch questions and careers concurrently
      const [questionsRes, careersRes] = await Promise.all([
        api.get("/questions"),
        api.get("/careers"),
      ]);

      const allQuestions = questionsRes.data;

      // Filter Psychometric
      setPsychometricQuestions(
        allQuestions.filter((q) => q.category === "Psychometric")
      );

      // Organize Technical by SubCategory
      const techQs = {};
      allQuestions
        .filter((q) => q.category === "Technical")
        .forEach((q) => {
          const sub = q.subCategory;
          if (sub) {
            if (!techQs[sub]) techQs[sub] = [];
            techQs[sub].push(q);
          }
        });
      setTechnicalQuestions(techQs);

      // Filter Aptitude
      setAptitudeQuestions(
        allQuestions.filter((q) => q.category === "Aptitude")
      );

      // Map Careers for descriptions
      const careerMap = {};
      careersRes.data.forEach((c) => {
        careerMap[c.category] = c.description;
      });

      // Fallback descriptions
      const staticDesc = {
        Technology:
          "You have a logical mind and enjoy problem-solving. A career in Software, AI, or Data Science would be a great fit.",
        Creative:
          "You have a strong artistic sense and enjoy expression. Consider careers in Graphic Design, UI/UX, or Multimedia Arts.",
        Business:
          "You are a natural leader with a knack for strategy. Management, Marketing, or Entrepreneurship could be your path.",
        Healthcare:
          "You are compassionate and science-oriented. Nursing, Medicine, or Therapy are fields where you could shine.",
        Science:
          "You are curious and analytical. Research, Lab Work, or Environmental Science allows you to discover new things.",
        Legal:
          "You value justice, structure, and debate. Law, Policy, or Advocacy are areas where you can make an impact.",
        Education:
          "You love helping others learn and grow. Teaching, Training, or Coaching would be very rewarding for you.",
      };

      setCareerDescriptions({ ...staticDesc, ...careerMap });
      setLoading(false);
    } catch (error) {
      console.error("Failed to load test content", error);
      setLoading(false);
    }
  };

  // Calculate Psychometric Result to determine Technical Track
  useEffect(() => {
    if (stage === 2 && !topCareer) {
      const careerScores = {
        Technology: 0,
        Creative: 0,
        Business: 0,
        Healthcare: 0,
        Science: 0,
        Legal: 0,
        Education: 0,
      };

      // UPDATED: Handle object structure for answer
      // psychoAnswers is { questionId: { scores: { IT: 2... }, questionText: "..." } }
      Object.values(psychoAnswers).forEach((answerData) => {
        // answerData might be the scores object directly (old way) or the new structure.
        // Let's support the new structure prioritized.
        const answerScores = answerData.scores || answerData; // Fallback if simple object

        if (answerScores && typeof answerScores === "object") {
          Object.keys(answerScores).forEach((career) => {
            // Check if value is number to avoid "questionText"
            if (typeof answerScores[career] === "number") {
              careerScores[career] =
                (careerScores[career] || 0) + answerScores[career];
            }
          });
        }
      });

      const determinedCareer = Object.keys(careerScores).reduce((a, b) =>
        careerScores[a] > careerScores[b] ? a : b
      );
      setTopCareer(determinedCareer);
    }
  }, [stage, psychoAnswers, topCareer]);

  // Handlers
  const handlePsychoAnswer = (answerScores) => {
    // Save answer linked to question ID with MORE DETAILS
    const currentQ = psychometricQuestions[currentQuestionIndex];

    // Store: { scores: {...}, questionText: "..." }
    setPsychoAnswers({
      ...psychoAnswers,
      [currentQ._id]: { scores: answerScores, questionText: currentQ.text },
    });

    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage(2);
      setCurrentQuestionIndex(0);
    }
  };

  const handleTechAnswer = (option) => {
    // UPDATED: Receive full option object, not just isCorrect
    const currentQ = technicalQuestions[topCareer][currentQuestionIndex];

    setTechAnswers({
      ...techAnswers,
      [currentQ._id]: {
        questionText: currentQ.text,
        selectedOption: option.text,
        isCorrect: option.correct,
      },
    });

    if (option.correct)
      setScores((prev) => ({ ...prev, technical: prev.technical + 1 }));

    const currentTechQuestions = technicalQuestions[topCareer] || [];
    if (
      currentTechQuestions &&
      currentQuestionIndex < currentTechQuestions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage(3);
      setCurrentQuestionIndex(0);
    }
  };

  const handleAptitudeAnswer = (option) => {
    // UPDATED: Receive full option object
    const currentQ = aptitudeQuestions[currentQuestionIndex];

    setAptitudeAnswers({
      ...aptitudeAnswers,
      [currentQ._id]: {
        questionText: currentQ.text,
        selectedOption: option.text,
        isCorrect: option.correct,
      },
    });

    if (option.correct)
      setScores((prev) => ({ ...prev, aptitude: prev.aptitude + 1 }));

    if (currentQuestionIndex < aptitudeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage(4);
    }
  };

  useEffect(() => {
    if (stage === 4) {
      submitTestResults();
    }
  }, [stage]);

  const submitTestResults = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const userId = profile?.result?._id;

    if (!userId) {
      console.log("User not logged in, cannot save results");
      return;
    }

    setIsSubmitting(true);
    try {
      const testData = {
        userId,
        answers: {
          psychometric: psychoAnswers,
          technical: techAnswers,
          aptitude: aptitudeAnswers,
        },
        categoryScores: scores,
        recommendedCareer: topCareer,
        details: {
          timestamp: new Date().toISOString(),
        },
      };

      const response = await api.post("/test-results/submit", testData);
      setSubmissionStatus("success");
      if (response.data && response.data._id) {
        setSavedResultId(response.data._id);
      }
    } catch (error) {
      console.error("Error submitting test results", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!savedResultId) {
      alert("Test results have not been saved yet. Please wait.");
      return;
    }

    setLoadingAI(true);
    setAiError(null);
    try {
      const response = await api.post("/test-results/ai-recommendation", {
        resultId: savedResultId,
        wish
      });
      
      // Get AI Recommendation from updated details
      const aiRecommendationObj = response.data?.details?.aiRecommendation;
      if (aiRecommendationObj) {
        setAiRecommendation(aiRecommendationObj);
      } else {
        throw new Error("No recommendation was returned from the AI service.");
      }
    } catch (error) {
      console.error("AI recommendation error:", error);
      setAiError(error.response?.data?.message || error.message || "Failed to generate AI recommendation.");
    } finally {
      setLoadingAI(false);
    }
  };

  // --- Render Components ---

  const IntroView = () => (
    <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <FaBrain className="text-white text-5xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Discover Your True Potential
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Welcome to the comprehensive{" "}
          <span className="text-blue-600 font-bold">
            CHOOSE EASY Career Assessment
          </span>
          . This multi-stage test will analyze your personality, skills, and
          aptitude to recommend your perfect career path.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
              1. Psychometric
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Uncover your personality traits and work preferences.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-gray-700 rounded-xl">
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">
              2. Technical
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Test skills specific to your matched domain.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-xl">
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
              3. Any Aptitude
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Evaluate your logical and analytical reasoning.
            </p>
          </div>
        </div>

        <button
          onClick={() => setStage(1)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto gap-2"
        >
          Start Your Journey <FaArrowRight />
        </button>
      </div>
    </div>
  );

  const PsychometricView = () => {
    const question = psychometricQuestions[currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
          <span>Stage 1: Psychometric Analysis</span>
          <span>
            Question {currentQuestionIndex + 1} / {psychometricQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / psychometricQuestions.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
            {question.text}
          </h2>
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handlePsychoAnswer(option.scores)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition class-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-blue-500 mr-4 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-white font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TechnicalView = () => {
    if (!topCareer)
      return <div className="text-center p-10">Running Analysis...</div>;

    const questions = technicalQuestions[topCareer] || [];
    const question = questions[currentQuestionIndex];

    if (questions.length === 0) {
      return (
        <div className="text-center p-10 animate-fade-in">
          <h3 className="text-2xl font-bold mb-4">
            You matched with {topCareer}!
          </h3>
          <p>
            We are currently updating our technical questions for this path.
          </p>
          <button
            onClick={() => setStage(3)}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Proceed to Aptitude Test
          </button>
        </div>
      );
    }

    if (!question) return null;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
          <span>Stage 2: {topCareer} Skills Assessment</span>
          <span>
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-t-4 border-purple-500">
          <div className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-bold px-3 py-1 rounded-full mb-4">
            Domain: {topCareer}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.text}
          </h2>
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleTechAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-purple-500 mr-4 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-white font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AptitudeView = () => {
    const question = aptitudeQuestions[currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6 flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
          <span>Stage 3: General Aptitude</span>
          <span>
            Question {currentQuestionIndex + 1} / {aptitudeQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / aptitudeQuestions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-t-4 border-green-500">
          <div className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm font-bold px-3 py-1 rounded-full mb-4">
            Category: {question.subCategory || "General"}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.text}
          </h2>
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAptitudeAnswer(option)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500 mr-4 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-white font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ResultView = () => {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-10 text-center text-white">
            <h1 className="text-4xl font-extrabold mb-4">
              Assessment Complete!
            </h1>
            <p className="text-xl opacity-90">
              Here is your personalized career analysis.
            </p>
            {isSubmitting && (
              <p className="text-sm mt-2 opacity-80 animate-pulse">
                Saving your results...
              </p>
            )}
            {submissionStatus === "success" && (
              <p className="text-sm mt-2 font-bold bg-green-500/20 inline-block px-3 py-1 rounded-full border border-white/20">
                Results Saved Successfully ✅
              </p>
            )}
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Top Match */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Top Career Match
              </h2>
              <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                {topCareer}
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {careerDescriptions[topCareer] ||
                  "A great match for your skills!"}
              </p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Technical Score
                  </h3>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                    Domain Specific
                  </span>
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {scores.technical}{" "}
                  <span className="text-lg text-gray-400">
                    / {technicalQuestions[topCareer]?.length || 0}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Based on your {topCareer} knowledge.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Aptitude Score
                  </h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    General Logic
                  </span>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {scores.aptitude}{" "}
                  <span className="text-lg text-gray-400">
                    / {aptitudeQuestions.length}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  Based on logic, math, and grammar.
                </p>
              </div>
            </div>

            {/* AI Recommendation Section */}
            <div className="mt-12 pt-12 border-t border-gray-100 dark:border-gray-700">
              {loadingAI ? (
                <div className="bg-slate-900 border border-indigo-500/20 rounded-3xl p-8 text-center space-y-6 animate-pulse">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto animate-spin shadow-lg">
                    <FaBrain className="text-white text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-300">Consulting CHOOSEEASY AI Advisor...</h3>
                  <div className="max-w-md mx-auto space-y-2">
                    <p className="text-sm text-gray-400">Analyzing your psychometric profile and category scores...</p>
                    <p className="text-xs text-indigo-400 italic">"Engineering your personalized learning milestones & market insights"</p>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full max-w-sm mx-auto overflow-hidden">
                    <div className="bg-indigo-500 h-full w-2/3 rounded-full animate-infinite-loading"></div>
                  </div>
                </div>
              ) : aiRecommendation ? (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      AI Generated Insights
                    </span>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">Your Career Intelligence Report</h2>
                  </div>
                  <AIRecommendationView recommendation={aiRecommendation} />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-850 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/30 rounded-3xl p-6 md:p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        Unlock Advanced AI Career Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        Analyze your test responses against Gemini's advanced models. Get salary benchmarks, target job titles, a step-by-step learning roadmap, and tailored tips matching your preferences.
                      </p>
                      
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tell AI your specific wishes (Optional)
                        </label>
                        <input
                          type="text"
                          value={wish}
                          onChange={(e) => setWish(e.target.value)}
                          placeholder="e.g. 'I want to work remotely', 'I want high growth', 'I prefer coding over design'..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-indigo-500 transition duration-250 text-sm shadow-inner"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={handleGenerateAI}
                      className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition duration-200 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                    >
                      <FaBrain /> Generate AI Roadmap
                    </button>
                  </div>
                  {aiError && (
                    <div className="mt-4 p-3 bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400">
                      ⚠️ {aiError}. Please try again.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-12 pt-8 border-t border-gray-100 dark:border-gray-750">
              <Link
                to="/explore"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg text-center"
              >
                Explore Applied Careers
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-8 py-3 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-500 animate-pulse">
          Loading Assessment...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 transition-colors duration-300 font-sans">
      {stage === 0 && <IntroView />}
      {stage === 1 && <PsychometricView />}
      {stage === 2 && <TechnicalView />}
      {stage === 3 && <AptitudeView />}
      {stage === 4 && <ResultView />}
    </div>
  );
};

export default Test;
