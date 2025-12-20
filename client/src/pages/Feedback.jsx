import React, { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaStar,
  FaSmile,
  FaFrown,
  FaMeh,
  FaGrinStars,
  FaRocket,
} from "react-icons/fa";
import gsap from "gsap";
import confetti from "canvas-confetti";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
    mood: "Neutral",
    categories: [],
    feeling: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Load from localStorage
    const savedData = localStorage.getItem("feedbackDraft");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Auto-save
    localStorage.setItem("feedbackDraft", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryToggle = (category) => {
    const updatedCategories = formData.categories.includes(category)
      ? formData.categories.filter((c) => c !== category)
      : [...formData.categories, category];
    setFormData({ ...formData, categories: updatedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        localStorage.removeItem("feedbackDraft");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
        });
      } else {
        alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "UI Design",
    "Navigation",
    "Speed",
    "Career Suggestions",
    "Accuracy",
    "Overall Experience",
  ];
  const feelings = [
    { label: "Positive", icon: <FaSmile />, color: "bg-green-500" },
    { label: "Motivated", icon: <FaRocket />, color: "bg-orange-500" },
    { label: "Neutral", icon: <FaMeh />, color: "bg-yellow-500" },
    { label: "Issue", icon: <FaFrown />, color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 py-20 px-4">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        {submitted ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
              <FaGrinStars className="text-5xl text-white animate-bounce" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Thank You! 💙
            </h2>
            <p className="text-blue-200 text-lg mb-8">
              Your voice shapes the future of CHOOSE EASY 💫
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20"
            >
              Send Another Response
            </button>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                We Value Your Voice ✨
              </h2>
              <p className="text-blue-200">
                Help us improve CHOOSE EASY for students like you
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Feeling Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {feelings.map((feel) => (
                  <div
                    key={feel.label}
                    onClick={() =>
                      setFormData({ ...formData, feeling: feel.label })
                    }
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                      formData.feeling === feel.label
                        ? `${feel.color} border-transparent shadow-lg scale-105`
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-3xl text-white mb-2 flex justify-center">
                      {feel.icon}
                    </div>
                    <div className="text-center text-white text-sm font-medium">
                      {feel.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="text-center">
                <label className="block text-blue-200 mb-4 text-sm font-medium">
                  How would you rate your experience?
                </label>
                <div className="flex justify-center gap-4 text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`transition-transform hover:scale-125 focus:outline-none ${
                        formData.rating >= star
                          ? "text-yellow-400 drop-shadow-glow"
                          : "text-white/20"
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-blue-200 mb-4 text-sm font-medium">
                  What is this regarding?
                </label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        formData.categories.includes(category)
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 border-white/10 text-blue-200 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-blue-200 text-sm ml-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-blue-200 text-sm ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-blue-200 text-sm ml-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none"
                  placeholder="Tell us what you loved or how we can improve..."
                  required
                ></textarea>
                <div className="text-right text-xs text-blue-300">
                  {formData.message.length} characters
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Submit Feedback{" "}
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
