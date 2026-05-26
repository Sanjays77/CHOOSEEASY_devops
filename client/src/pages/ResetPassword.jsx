import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import gsap from "gsap";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("Password reset successful! Redirecting...");
                setTimeout(() => {
                    navigate("/auth");
                }, 2000);
            } else {
                setMessage(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            setMessage("Failed to reset password");
        }
        setLoading(false);
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-900"
            style={{
                backgroundImage: "url('/images/auth-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <FaLock className="absolute left-3 top-3.5 text-blue-300 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 rounded bg-white/10 text-center text-white border border-white/20">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
