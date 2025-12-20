import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCodeBranch,
  FaStar,
  FaHistory,
  FaUserCircle,
  FaLightbulb,
  FaTrash,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [testResults, setTestResults] = useState([]);
  const [savedCareers, setSavedCareers] = useState([]);
  const [visitHistory, setVisitHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("saved");
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    careerId: null,
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Test Results
        const resultsRes = await fetch(
          `http://localhost:5000/api/test-results/${user.result._id}`
        );
        const resultsData = await resultsRes.json();
        setTestResults(resultsData);

        // Fetch Saved Careers and Visit History
        const profileRes = await fetch(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const profileData = await profileRes.json();
        setSavedCareers(profileData.savedCareers || []);
        setVisitHistory(profileData.visitHistory || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleRemoveCareer = (e, careerId) => {
    e.stopPropagation();
    setDeleteModal({ show: true, careerId });
  };

  const confirmDelete = async () => {
    const { careerId } = deleteModal;
    if (!careerId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/save-career/${careerId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.ok) {
        setSavedCareers(savedCareers.filter((c) => c._id !== careerId));
        setDeleteModal({ show: false, careerId: null });
      } else {
        alert("Failed to remove career");
      }
    } catch (error) {
      console.error("Error removing career:", error);
    }
  };

  // Generate data for the selected year (Jan 1 - Dec 31)
  const generateCalendarData = () => {
    const startDate = new Date(selectedYear, 0, 1); // Jan 1
    const endDate = new Date(selectedYear, 11, 31); // Dec 31

    // Determine the day of the week for Jan 1st (0 = Sunday, 1 = Monday, ...)
    const startDayOfWeek = startDate.getDay();

    const weeks = [];
    let currentWeek = [];

    // Add placeholders for days before Jan 1st in the first week
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      const isVisited = visitHistory.includes(dateString);

      currentWeek.push({
        date: dateString,
        visited: isVisited,
        isCurrentYear: true,
        dayIndex: currentDate.getDay(),
      });

      // If week is full (7 days), push to weeks and start new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fill the last week with placeholders if it's not full
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const calendarWeeks = generateCalendarData();

  // Helper to get month labels
  const getMonthLabels = (weeks) => {
    const labels = [];
    weeks.forEach((week, index) => {
      // Check if any day in this week is the 1st of a month
      const firstDayOfMonth = week.find((day) => {
        if (!day) return false;
        const d = new Date(day.date);
        return d.getDate() === 1 && d.getFullYear() === selectedYear;
      });

      if (firstDayOfMonth) {
        const date = new Date(firstDayOfMonth.date);
        labels.push({
          month: date.toLocaleString("default", { month: "short" }),
          index,
        });
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels(calendarWeeks);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 text-white font-sans relative">
      {/* Custom Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <h3 className="text-xl font-bold text-white mb-2">
              Remove Career?
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to remove this career from your saved list?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, careerId: null })}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR (Profile & Nav) - Col Span 3 */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative group">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mb-4 shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    {user.result.imageUrl ? (
                      <img
                        src={user.result.imageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl font-bold text-gray-400">
                        {user.result.name?.charAt(0) ||
                          user.result.username?.charAt(0) ||
                          "U"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 bg-gray-800 rounded-full p-2 border border-gray-700 text-sm">
                  🎯
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white">
                {user.result.name || user.result.username || "User"}
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                @{user.result.username || "student"}
              </p>

              <button className="w-full py-1.5 px-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md text-sm font-medium transition-colors mb-6">
                Edit profile
              </button>

              <div className="w-full space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <FaUserCircle /> <span>Student</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCodeBranch />{" "}
                  <span>Tests Taken: {testResults.length}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="font-semibold mb-2 flex items-center justify-between">
                Recent Tests
                <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full text-gray-400">
                  New
                </span>
              </h3>
              <ul className="space-y-1">
                {testResults.length > 0 ? (
                  testResults.slice(0, 5).map((res) => (
                    <li key={res._id}>
                      <div className="flex items-center gap-2 text-sm text-gray-300 hover:text-blue-400 cursor-pointer p-1 rounded-md hover:bg-gray-800/50 transition-colors">
                        <FaBook className="text-gray-500" />
                        <span className="truncate">
                          {res.recommendedCareer}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">
                    No tests taken yet
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT WRAPPER (Graph + Feed + Explore) - Col Span 9 */}
          <div className="md:col-span-9">
            {/* Visit Graph - Full Width of the 9 columns */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 mb-8 backdrop-blur-sm">
              <div className="w-full">
                {/* Header with Year Selector */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-300">
                    Contribution Activity
                  </h3>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded px-2 py-1 outline-none focus:border-blue-500"
                  >
                    {[2023, 2024, 2025].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Month Labels */}
                <div className="flex mb-2 text-xs text-gray-400 relative h-4 w-full">
                  {monthLabels.map((label, i) => (
                    <span
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${(label.index / calendarWeeks.length) * 100}%`,
                      }}
                    >
                      {label.month}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 w-full">
                  {/* Day Labels */}
                  <div className="flex flex-col justify-between text-[10px] text-gray-400 py-[2px] h-[88px] pr-2">
                    <span></span>
                    <span>Mon</span>
                    <span></span>
                    <span>Wed</span>
                    <span></span>
                    <span>Fri</span>
                    <span></span>
                  </div>

                  {/* Grid */}
                  <div className="flex justify-between w-full flex-nowrap gap-[2px]">
                    {calendarWeeks.map((week, wIndex) => (
                      <div
                        key={wIndex}
                        className="flex flex-col justify-between h-[88px] gap-[2px]"
                      >
                        {week.map((day, dIndex) =>
                          day ? (
                            <div
                              key={dIndex}
                              className={`w-[10px] h-[10px] rounded-[2px] ${
                                day.visited ? "bg-[#39d353]" : "bg-[#161b22]"
                              } border border-white/5`}
                              title={`${day.date}: ${
                                day.visited ? "Present" : "Absent"
                              }`}
                            ></div>
                          ) : (
                            <div
                              key={dIndex}
                              className="w-[10px] h-[10px]"
                            ></div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 mt-4 text-xs text-gray-400">
                  <span>Absent</span>
                  <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px] border border-white/5"></div>
                  <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px] border border-white/5"></div>
                  <span>Present</span>
                </div>
              </div>
            </div>

            {/* SPLIT CONTENT: Saved Careers (Left) & Explore (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* CENTER CONTENT (Saved Careers / Assessments) - Col Span 2 */}
              <div className="md:col-span-2">
                {/* Tabs */}
                <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === "saved"
                        ? "border-blue-500 text-white font-medium"
                        : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Saved Careers
                  </button>
                  <button
                    onClick={() => setActiveTab("assessments")}
                    className={`px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === "assessments"
                        ? "border-blue-500 text-white font-medium"
                        : "border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    Assessments
                  </button>
                </div>

                {/* Content Area */}
                <div className="mb-8">
                  {activeTab === "saved" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Saved Careers
                      </h3>
                      {savedCareers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {savedCareers.map((career) => (
                            <div
                              key={career._id}
                              onClick={() => navigate(`/career/${career._id}`)}
                              className="bg-gray-900/50 border border-gray-700 rounded-md p-4 hover:border-blue-500 transition-colors cursor-pointer group relative"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 font-semibold text-blue-400 group-hover:underline">
                                  <FaBook /> <span>{career.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaStar className="text-yellow-400" />
                                  <button
                                    onClick={(e) =>
                                      handleRemoveCareer(e, career._id)
                                    }
                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                    title="Remove from saved"
                                  >
                                    <FaTrash size={12} />
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                                {career.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="bg-gray-800 px-2 py-1 rounded text-gray-300">
                                  {career.category}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">
                          No saved careers yet.
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "assessments" && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Assessment History
                      </h3>
                      {testResults.length > 0 ? (
                        <div className="space-y-4">
                          {testResults.map((result) => (
                            <div
                              key={result._id}
                              className="bg-gray-900/50 border border-gray-700 rounded-md p-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-bold text-blue-400 text-lg">
                                    {result.recommendedCareer}
                                  </h4>
                                  <p className="text-xs text-gray-500">
                                    Taken on{" "}
                                    {new Date(
                                      result.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="block text-sm font-semibold text-green-400">
                                    Match Found
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t border-gray-800">
                                <p className="text-sm text-gray-300">
                                  Based on your answers, this career path
                                  strongly aligns with your interests and
                                  skills.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">
                          You haven't taken any assessments yet.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDEBAR (Explore) - Col Span 1 */}
              <div className="md:col-span-1 space-y-6 mt-12">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Explore</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "AI & Machine Learning",
                        desc: "Trending in Tech",
                        search: "Machine Learning",
                      },
                      {
                        name: "Sustainable Energy",
                        desc: "Trending in Science",
                        search: "Sustainable Energy",
                      },
                      {
                        name: "Digital Marketing",
                        desc: "Trending in Business",
                        search: "Marketing",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-800 last:border-0 pb-3 last:pb-0"
                      >
                        <h4
                          onClick={() =>
                            navigate(
                              `/explore?search=${encodeURIComponent(
                                item.search
                              )}`
                            )
                          }
                          className="font-medium text-white hover:text-blue-400 cursor-pointer truncate"
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.desc}
                        </p>
                        <button
                          onClick={() =>
                            navigate(
                              `/explore?search=${encodeURIComponent(
                                item.search
                              )}`
                            )
                          }
                          className="w-full py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-xs font-medium transition-colors"
                        >
                          Explore
                        </button>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => navigate("/explore")}
                    className="mt-4 pt-4 border-t border-gray-800 text-xs text-blue-400 hover:underline cursor-pointer"
                  >
                    Explore more topics →
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Latest Changes</h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <FaLightbulb className="text-yellow-500 mt-1" />
                      <span>
                        New "Career Roadmap" feature added to details page.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <FaHistory className="text-purple-500 mt-1" />
                      <span>Updated salary data for 2025.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
