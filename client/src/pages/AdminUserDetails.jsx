import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaEnvelope,
  FaHistory,
  FaStar,
} from "react-icons/fa";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTestId, setActiveTestId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userProfile = JSON.parse(localStorage.getItem("profile"));
        const token = userProfile?.token;
        const headers = { Authorization: `Bearer ${token}` };

        const res = await axios.get(
          `http://localhost:5000/api/admin/users/${id}`,
          { headers }
        );
        setData(res.data);
        if (res.data.testResults.length > 0) {
          setActiveTestId(res.data.testResults[0]._id);
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch failed", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return <div className="text-center p-20 text-white">Loading...</div>;
  if (!data)
    return <div className="text-center p-20 text-white">User not found</div>;

  const { user, testResults, feedback } = data;
  const activeTest = testResults.find((t) => t._id === activeTestId);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        {/* Header Profile */}
        <div className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400 flex items-center gap-2 mt-2">
              <FaEnvelope /> {user.email}
            </p>
            <div className="mt-4 flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  user.role === "admin"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {user.role.toUpperCase()}
              </span>
              <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                Joined:{" "}
                {new Date(
                  user.visitHistory?.[0] || Date.now()
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Test History & Feedback */}
          <div className="space-y-8">
            {/* Test History List */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaHistory /> Test History
              </h2>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {testResults.map((test, index) => (
                  <button
                    key={test._id}
                    onClick={() => setActiveTestId(test._id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeTestId === test._id
                        ? "bg-blue-600 shadow-lg"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">
                        Attempt #{testResults.length - index}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(
                          test.testDate || test.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm mt-1 opacity-90">
                      {test.recommendedCareer}
                    </div>
                  </button>
                ))}
                {testResults.length === 0 && (
                  <p className="text-gray-400">No tests taken.</p>
                )}
              </div>
            </div>

            {/* Feedback List */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaStar /> Feedback
              </h2>
              <div className="space-y-4">
                {feedback.map((f) => (
                  <div key={f._id} className="bg-gray-700 p-4 rounded-xl">
                    <div className="flex justify-between text-yellow-400 text-sm mb-2">
                      <span>{"★".repeat(f.rating)}</span>
                      <span className="text-gray-400">
                        {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200">"{f.message}"</p>
                  </div>
                ))}
                {feedback.length === 0 && (
                  <p className="text-gray-400">No feedback submitted.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Result View */}
          <div className="lg:col-span-2 space-y-8">
            {activeTest ? (
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6">
                  Test Details{" "}
                  <span className="text-blue-400">
                    ({activeTest.recommendedCareer})
                  </span>
                </h2>

                {/* Scores */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Technical Score</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {activeTest.categoryScores?.technical}
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Aptitude Score</div>
                    <div className="text-2xl font-bold text-green-400">
                      {activeTest.categoryScores?.aptitude}
                    </div>
                  </div>
                </div>

                {/* Answers Breakdown */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold border-b border-gray-700 pb-2">
                    Technical Answers
                  </h3>
                  {Object.entries(activeTest.answers?.technical || {}).map(
                    ([key, ans], i) => {
                      // Handle Legacy Data (where ans is just boolean)
                      const isLegacy = typeof ans === "boolean";
                      const isCorrect = isLegacy ? ans : ans.isCorrect;
                      const questionText = isLegacy
                        ? "Legacy Result (Details unavailable)"
                        : ans.questionText;
                      const selectedOption = isLegacy
                        ? "N/A"
                        : ans.selectedOption;

                      return (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border-l-4 ${
                            isCorrect
                              ? "border-green-500 bg-green-500/10"
                              : "border-red-500 bg-red-500/10"
                          }`}
                        >
                          <p className="font-medium mb-1">
                            {questionText || "Question text unavailable"}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">
                              Selected: {selectedOption}
                            </span>
                            {isCorrect ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaTimes className="text-red-500" />
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                  {(!activeTest.answers?.technical ||
                    Object.keys(activeTest.answers.technical).length === 0) && (
                    <p className="text-gray-400">
                      No technical answers details available.
                    </p>
                  )}

                  <h3 className="text-lg font-bold border-b border-gray-700 pb-2 pt-4">
                    Aptitude Answers
                  </h3>
                  {Object.entries(activeTest.answers?.aptitude || {}).map(
                    ([key, ans], i) => {
                      // Handle Legacy Data
                      const isLegacy = typeof ans === "boolean";
                      const isCorrect = isLegacy ? ans : ans.isCorrect;
                      const questionText = isLegacy
                        ? "Legacy Result (Details unavailable)"
                        : ans.questionText;
                      const selectedOption = isLegacy
                        ? "N/A"
                        : ans.selectedOption;

                      return (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border-l-4 ${
                            isCorrect
                              ? "border-green-500 bg-green-500/10"
                              : "border-red-500 bg-red-500/10"
                          }`}
                        >
                          <p className="font-medium mb-1">
                            {questionText || "Question text unavailable"}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">
                              Selected: {selectedOption}
                            </span>
                            {isCorrect ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaTimes className="text-red-500" />
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                  {(!activeTest.answers?.aptitude ||
                    Object.keys(activeTest.answers.aptitude).length === 0) && (
                    <p className="text-gray-400">
                      No aptitude answers details available.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center text-gray-400">
                Select a test attempt to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
