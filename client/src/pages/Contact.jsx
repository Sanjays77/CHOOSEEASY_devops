import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import gsap from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        className="relative z-10 w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Contact Info Section */}
        <div className="bg-blue-900/40 p-10 md:w-2/5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Have questions about your career path? Need help with our
              platform? Our team is here to assist you on your journey.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Visit Us</h4>
                  <p className="text-blue-200 text-sm">
                    123 Education Lane, Tech City, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email Us</h4>
                  <p className="text-blue-200 text-sm">
                    support@chooseeasy.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-500/20 p-3 rounded-lg text-pink-400">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Call Us</h4>
                  <p className="text-blue-200 text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="flex space-x-4">
              {/* Social Icons could go here */}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-10 md:w-3/5 bg-black/20">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-gray-400 text-sm">
              We usually respond within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 mb-6 border border-green-500/50 shadow-lg shadow-green-500/30 animate-bounce">
                <svg
                  className="h-10 w-10 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-blue-200 mb-8">
                Thank you for reaching out. We'll get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-blue-200 text-sm ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-blue-200 text-sm ml-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-blue-200 text-sm ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && (
                      <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
