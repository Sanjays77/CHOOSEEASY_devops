import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaComments,
  FaTrash,
  FaSearch,
  FaBriefcase,
  FaQuestionCircle,
  FaPlus,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [careers, setCareers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'user', 'career', 'question'
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const userProfile = JSON.parse(localStorage.getItem("profile"));
      const token = userProfile?.token;

      if (!token || userProfile?.result?.role !== "admin") {
        navigate("/auth");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, feedbackRes, careersRes, questionsRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/admin/users", { headers }),
          axios.get("http://localhost:5000/api/admin/feedback", { headers }),
          axios.get("http://localhost:5000/api/careers"), // Public read
          axios.get("http://localhost:5000/api/questions"), // Public read, admin write
        ]);

      setUsers(usersRes.data);
      setFeedback(feedbackRes.data);
      setCareers(careersRes.data);
      setQuestions(questionsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setLoading(false);
    }
  };

  const getHeaders = () => {
    const userProfile = JSON.parse(localStorage.getItem("profile"));
    return { Authorization: `Bearer ${userProfile?.token}` };
  };

  // --- Handlers ---

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`))
      return;
    try {
      const url =
        type === "user"
          ? `http://localhost:5000/api/admin/users/${id}`
          : type === "career"
          ? `http://localhost:5000/api/careers/${id}`
          : `http://localhost:5000/api/questions/${id}`;

      await axios.delete(url, { headers: getHeaders() });
      fetchData(); // Refresh
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  const handeSave = async (e) => {
    e.preventDefault();
    const headers = getHeaders();
    try {
      if (modalType === "career") {
        if (selectedItem._id) {
          await axios.put(
            `http://localhost:5000/api/careers/${selectedItem._id}`,
            selectedItem,
            { headers }
          );
        } else {
          await axios.post(`http://localhost:5000/api/careers`, selectedItem, {
            headers,
          });
        }
      } else if (modalType === "question") {
        if (selectedItem._id) {
          await axios.put(
            `http://localhost:5000/api/questions/${selectedItem._id}`,
            selectedItem,
            { headers }
          );
        } else {
          await axios.post(
            `http://localhost:5000/api/questions`,
            selectedItem,
            { headers }
          );
        }
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Save failed", error);
      alert("Save failed");
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);

    if (item) {
      setSelectedItem(item);
    } else if (type === "career") {
      setSelectedItem({ title: "", description: "", category: "General" });
    } else {
      // Default for new question
      setSelectedItem({
        text: "",
        category: "Technical", // Default to Technical as user asked for correct answers
        options: [
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
        ],
      });
    }

    setShowModal(true);

    // If viewing user, fetch details
    if (type === "user" && item) {
      fetchUserDetails(item._id);
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/users/${id}`,
        { headers: getHeaders() }
      );
      setSelectedItem({ ...res.data.user, testResults: res.data.testResults });
    } catch (e) {
      console.error(e);
    }
  };

  // --- Render Helpers ---

  if (loading)
    return <div className="text-center text-white mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "users", icon: FaUsers, label: "Users" },
              { id: "careers", icon: FaBriefcase, label: "Careers" },
              { id: "questions", icon: FaQuestionCircle, label: "Questions" },
              { id: "feedback", icon: FaComments, label: "Feedback" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <tab.icon /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 min-h-[500px]">
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="p-4">Username</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Test Details</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30"
                    >
                      <td className="p-4">{user.username}</td>
                      <td className="p-4 text-gray-300">{user.email}</td>
                      <td className="p-4">
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/admin/user/${user._id}`)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaEye className="inline mr-2" /> View Details
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDelete("user", user._id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "careers" && (
            <div>
              <button
                onClick={() => openModal("career")}
                className="bg-green-600 px-4 py-2 rounded mb-4 flex items-center gap-2"
              >
                <FaPlus /> Add Career
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {careers.map((career) => (
                  <div key={career._id} className="bg-gray-700 p-4 rounded-xl">
                    <h3 className="font-bold text-lg">{career.title}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {career.description}
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        onClick={() => openModal("career", career)}
                        className="text-blue-400"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete("career", career._id)}
                        className="text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div>
              <button
                onClick={() => openModal("question")}
                className="bg-green-600 px-4 py-2 rounded mb-4 flex items-center gap-2"
              >
                <FaPlus /> Add Question
              </button>
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q._id}
                    className="bg-gray-700 p-4 rounded-xl flex justify-between items-center"
                  >
                    <div>
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded mr-2">
                        {q.category}
                      </span>
                      <span className="font-medium">{q.text}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("question", q)}
                        className="text-blue-400"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete("question", q._id)}
                        className="text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedback.map((item) => (
                <div key={item._id} className="bg-gray-700 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{item.name}</h4>
                    <span className="text-yellow-400">{item.rating} ★</span>
                  </div>
                  <p className="text-gray-300 mt-2">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold capitalize">
                  {modalType === "user"
                    ? "User Details"
                    : `${selectedItem._id ? "Edit" : "Add"} ${modalType}`}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {modalType === "user" ? (
                <div className="space-y-6">
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <p>
                      <span className="text-gray-400">Username:</span>{" "}
                      {selectedItem?.username}
                    </p>
                    <p>
                      <span className="text-gray-400">Email:</span>{" "}
                      {selectedItem?.email}
                    </p>
                    <p>
                      <span className="text-gray-400">Joined:</span>{" "}
                      {new Date(
                        selectedItem?.visitHistory?.[0] || Date.now()
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <h3 className="font-bold text-lg">Test History</h3>
                  {selectedItem?.testResults?.length > 0 ? (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {selectedItem.testResults.map((result, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-700 p-4 rounded-xl border-l-4 border-blue-500"
                        >
                          <div className="flex justify-between">
                            <span className="font-bold text-blue-300">
                              {result.recommendedCareer}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(
                                result.testDate || result.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-2 text-sm flex gap-4">
                            <span>
                              Tech Score: {result.categoryScores?.technical}
                            </span>
                            <span>
                              Aptitude Score: {result.categoryScores?.aptitude}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No tests taken yet.</p>
                  )}
                </div>
              ) : (
                <form onSubmit={handeSave} className="space-y-4">
                  {modalType === "career" && (
                    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                      {/* Basic Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="Job Title"
                          value={selectedItem.title || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              title: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 p-3 rounded"
                          required
                        />
                        <input
                          placeholder="Category"
                          value={selectedItem.category || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              category: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 p-3 rounded"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={selectedItem.description || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 p-3 rounded"
                        rows={3}
                        required
                      />

                      {/* Snapshot */}
                      <h3 className="font-bold text-gray-300 border-b border-gray-600 pb-2">
                        Snapshot Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="Avg Salary (e.g. $80k)"
                          value={selectedItem.averageSalary || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              averageSalary: e.target.value,
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        />
                        <input
                          placeholder="Growth (e.g. +15%)"
                          value={selectedItem.jobGrowth || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              jobGrowth: e.target.value,
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        />
                        <select
                          value={selectedItem.difficulty || "Moderate"}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              difficulty: e.target.value,
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        <input
                          placeholder="Demand Level"
                          value={selectedItem.demandLevel || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              demandLevel: e.target.value,
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        />
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <label className="text-gray-400 text-sm block mb-2">
                          Key Responsibilities (Split by comma or new line)
                        </label>
                        <textarea
                          placeholder="Design designs, Manage teams..."
                          value={
                            Array.isArray(selectedItem.responsibilities)
                              ? selectedItem.responsibilities.join("\n")
                              : selectedItem.responsibilities || ""
                          }
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              responsibilities: e.target.value.split("\n"),
                            })
                          }
                          className="w-full bg-gray-700 p-3 rounded"
                          rows={3}
                        />
                      </div>

                      {/* Skills */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm">
                            Tech Skills (Comma sep)
                          </label>
                          <input
                            placeholder="Python, Java..."
                            value={
                              selectedItem.skills?.technical?.join(", ") || ""
                            }
                            onChange={(e) =>
                              setSelectedItem({
                                ...selectedItem,
                                skills: {
                                  ...selectedItem.skills,
                                  technical: e.target.value
                                    .split(",")
                                    .map((s) => s.trim()),
                                },
                              })
                            }
                            className="w-full bg-gray-700 p-3 rounded"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-sm">
                            Soft Skills (Comma sep)
                          </label>
                          <input
                            placeholder="Communication, Leadership..."
                            value={selectedItem.skills?.soft?.join(", ") || ""}
                            onChange={(e) =>
                              setSelectedItem({
                                ...selectedItem,
                                skills: {
                                  ...selectedItem.skills,
                                  soft: e.target.value
                                    .split(",")
                                    .map((s) => s.trim()),
                                },
                              })
                            }
                            className="w-full bg-gray-700 p-3 rounded"
                          />
                        </div>
                      </div>

                      {/* Education */}
                      <h3 className="font-bold text-gray-300 border-b border-gray-600 pb-2">
                        Education & Future
                      </h3>
                      <input
                        placeholder="Required Degree"
                        value={selectedItem.educationPathway?.degree || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            educationPathway: {
                              ...selectedItem.educationPathway,
                              degree: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-gray-700 p-3 rounded"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          placeholder="Future Trend"
                          value={selectedItem.futureScope?.demandTrend || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              futureScope: {
                                ...selectedItem.futureScope,
                                demandTrend: e.target.value,
                              },
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        />
                        <input
                          placeholder="Tech Impact"
                          value={selectedItem.futureScope?.techChanges || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              futureScope: {
                                ...selectedItem.futureScope,
                                techChanges: e.target.value,
                              },
                            })
                          }
                          className="bg-gray-700 p-3 rounded"
                        />
                      </div>
                    </div>
                  )}

                  {modalType === "question" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm">
                          Question Text
                        </label>
                        <input
                          placeholder="Enter question here..."
                          value={selectedItem.text || ""}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              text: e.target.value,
                            })
                          }
                          className="w-full bg-gray-700 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-gray-400 text-sm">
                            Category
                          </label>
                          <select
                            value={selectedItem.category || "Technical"}
                            onChange={(e) =>
                              setSelectedItem({
                                ...selectedItem,
                                category: e.target.value,
                              })
                            }
                            className="w-full bg-gray-700 p-3 rounded outline-none"
                          >
                            <option value="Technical">Technical</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="Psychometric">
                              Psychometric (Advanced)
                            </option>
                          </select>
                        </div>
                        {selectedItem.category === "Technical" ||
                        selectedItem.category === "Aptitude" ? (
                          <div className="space-y-2">
                            <label className="text-gray-400 text-sm">
                              Sub-Category
                            </label>
                            <input
                              placeholder="e.g. IT, Analytical"
                              value={selectedItem.subCategory || ""}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  subCategory: e.target.value,
                                })
                              }
                              className="w-full bg-gray-700 p-3 rounded outline-none"
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-3">
                        <label className="text-gray-400 text-sm block">
                          Options (Select the radio button for the correct
                          answer)
                        </label>
                        {selectedItem.options &&
                          selectedItem.options.map((option, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-gray-700/50 p-2 rounded"
                            >
                              <span className="text-gray-500 font-mono w-6">
                                {idx + 1}.
                              </span>
                              <input
                                type="text"
                                placeholder={`Option ${idx + 1}`}
                                value={option.text || ""}
                                onChange={(e) => {
                                  const newOptions = [...selectedItem.options];
                                  newOptions[idx] = {
                                    ...newOptions[idx],
                                    text: e.target.value,
                                  };
                                  setSelectedItem({
                                    ...selectedItem,
                                    options: newOptions,
                                  });
                                }}
                                className="flex-1 bg-transparent outline-none border-b border-gray-600 focus:border-blue-500 px-2 py-1"
                                required
                              />
                              <input
                                type="radio"
                                name="correctOption"
                                checked={option.correct === true}
                                onChange={() => {
                                  const newOptions = selectedItem.options.map(
                                    (opt, i) => ({
                                      ...opt,
                                      correct: i === idx, // Set only this one to true
                                    })
                                  );
                                  setSelectedItem({
                                    ...selectedItem,
                                    options: newOptions,
                                  });
                                }}
                                className="w-5 h-5 accent-green-500 cursor-pointer"
                                title="Mark as Correct Answer"
                              />
                            </div>
                          ))}
                        {(!selectedItem.options ||
                          selectedItem.options.length === 0) && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedItem({
                                ...selectedItem,
                                options: [
                                  { text: "", correct: true },
                                  { text: "", correct: false },
                                  { text: "", correct: false },
                                  { text: "", correct: false },
                                ],
                              })
                            }
                            className="text-sm text-blue-400 hover:underline"
                          >
                            Generate 4 Options Template
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 py-3 rounded font-bold hover:bg-blue-700"
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
