import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaLinkedin } from "react-icons/fa";
import FeatureCard from "../components/FeatureCard";
import TestimonialCard from "../components/TestimonialCard";

const Home = () => {
  const features = [
    {
      icon: "🧠",
      title: "AI Career Test",
      description:
        "Personalized questionnaire with real-time scoring to find your best fit.",
    },
    {
      icon: "📊",
      title: "Skill Assessment",
      description:
        "Ranks your strengths using advanced machine learning patterns.",
    },
    {
      icon: "🎯",
      title: "Unbiased Advice",
      description: "Get recommendations based on data, not external pressure.",
    },
    {
      icon: "📈",
      title: "Growth Tracking",
      description: "Monitor your progress and explore career roadmaps.",
    },
    {
      icon: "🔖",
      title: "Bookmark Careers",
      description: "Save your favorite paths and revisit them anytime.",
    },
    {
      icon: "🌐",
      title: "Global Insights",
      description: "Access worldwide career trends and salary data.",
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      message:
        "CHOOSE EASY helped me realize my passion for coding when everyone told me to be a doctor.",
      rating: 5,
    },
    {
      name: "Sarah Lee",
      role: "Graphic Designer",
      message:
        "The AI test was spot on! I found a career that truly matches my creativity.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Data Analyst",
      message:
        "Unbiased and data-driven. Exactly what I needed to make a confident decision.",
      rating: 4,
    },
  ];

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      {/* Hero Section */}
      <section
        className="relative text-white py-24 px-4  text-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/home-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: '50% 25%',
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-up drop-shadow-lg">
            CHOOSE EASY — Shape Your Future With Confidence
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 drop-shadow-md">
            AI-powered career guidance that helps you discover your true path —
            without external pressure.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/test"
              className="bg-blue-600 text-white border border-blue-400 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50 backdrop-blur-sm bg-opacity-90"
            >
              Start Career Test
            </Link>
            <Link
              to="/explore"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition backdrop-blur-sm"
            >
              Explore Career Paths
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why CHOOSE EASY?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Too often, career choices are influenced by family, friends, or
              societal expectations.
              <strong>CHOOSE EASY</strong> is built to empower you with clarity
              and independence.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our AI engine analyzes your unique interests, skills, and passions
              to recommend the perfect career path — free from external
              influence.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl">
            <img
              src="/images/career-choice.png"
              alt="Career Choice Illustration"
              className="rounded-xl shadow-md w-full transition-transform hover:scale-105 duration-300"
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Powerful Features for Your Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Success Stories
          </h2>
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-blue-900 dark:text-blue-400">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {/* Team Member 1 */}
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full transform hover:-translate-y-2 transition duration-300">
              <div className="w-60 h-80 bg-gray-300 dark:bg-gray-600 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border-4 border-blue-500">
                <img
                  src="/images/Karthik.png"
                  alt="Karthik S N"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Karthik S N
              </h3>
              <p className="text-blue-600 dark:text-blue-300 font-medium mb-4">
                CEO
              </p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="mailto:karthiksn20112004@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/karthiknadamritham/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-sm w-full transform hover:-translate-y-2 transition duration-300">
              <div className="w-60 h-80 bg-gray-300 dark:bg-gray-600 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border-4 border-purple-500">
                <img
                  src="/images/sanjay.jpeg"
                  alt="Sanjay S"
                  className="w-full h-full object-cover object-top transform scale-[1.8] translate-y-14"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Sanjay S
              </h3>
              <p className="text-purple-600 dark:text-purple-300 font-medium mb-4">
                CEO
              </p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="mailto:sanjay28912005@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
                <a
                  href="http://www.linkedin.com/in/sanjay-s77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
