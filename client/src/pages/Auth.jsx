import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStethoscope,
  FaLaptopCode,
  FaCalculator,
  FaPalette,
} from "react-icons/fa";
import gsap from "gsap";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("user"); // "user" or "admin"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const containerRef = useRef(null);

  // Floating icons animation
  useEffect(() => {
    const icons = document.querySelectorAll(".floating-icon");
    icons.forEach((icon) => {
      gsap.to(icon, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Initial fade in
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Switch animation
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: isSignup ? 50 : -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
    if (isSignup) setRole("user");
  }, [isSignup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "bg-gray-200", width: "0%" };
    if (password.length < 6)
      return { label: "Weak", color: "bg-red-500", width: "33%" };
    if (password.length < 10)
      return { label: "Medium", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isSignup
      ? `${import.meta.env.VITE_API_URL}/auth/signup`
      : `${import.meta.env.VITE_API_URL}/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }), // Send role with data
      });
      const data = await response.json();

      if (response.ok) {
        // Success animation
        gsap.to(formRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            localStorage.setItem("profile", JSON.stringify(data));
            navigate("/");
          },
        });
      } else {
        alert(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: "url('/images/auth-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Kept floating icons as subtle overlays */}
        <div className="floating-icon absolute top-1/4 left-1/4 text-blue-400/30 text-6xl mix-blend-screen">
          <FaLaptopCode />
        </div>
        <div className="floating-icon absolute top-1/3 right-1/4 text-purple-400/30 text-5xl mix-blend-screen">
          <FaStethoscope />
        </div>
        <div className="floating-icon absolute bottom-1/4 left-1/3 text-green-400/30 text-6xl mix-blend-screen">
          <FaCalculator />
        </div>
        <div className="floating-icon absolute bottom-1/3 right-1/3 text-pink-400/30 text-5xl mix-blend-screen">
          <FaPalette />
        </div>
        {/* Removed noise svg to let the high quality background shine */}
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 mb-4">
            <FaUser className="text-4xl text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2 mt-8">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Role Selector - Only for Login */}
        {!isSignup && (
          <div className="flex justify-center gap-4 mb-6 mt-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${role === "user"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-white/10 text-blue-200 hover:bg-white/20"
                }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${role === "admin"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                : "bg-white/10 text-blue-200 hover:bg-white/20"
                }`}
            >
              Admin
            </button>
          </div>
        )}

        <p className="text-blue-200 text-center mb-8 text-sm">
          {isSignup
            ? "Join us to shape your future"
            : `Sign in as ${role === "admin" ? "Administrator" : "User"}`}
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div className="relative group">
              <FaUser className="absolute left-3 top-3.5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                required
              />
            </div>
          )}

          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3.5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-3 top-3.5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-blue-300 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {isSignup && formData.password && (
            <div className="space-y-1">
              <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-500`}
                  style={{ width: strength.width }}
                ></div>
              </div>
              <p className="text-xs text-right text-blue-200">
                {strength.label}
              </p>
            </div>
          )}

          {!isSignup && (
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-200 hover:text-white transition-colors hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isSignup ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-blue-200 hover:text-white transition-colors hover:underline"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
