import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CareerDetails = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isSaved, setIsSaved] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/careers/${id}`);
        const data = await response.json();
        setCareer(data);
      } catch (error) {
        console.error("Error fetching career details:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkSavedStatus = async () => {
      if (!user?.token) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const userData = await response.json();
        const saved = userData.savedCareers.some(
          (c) => c._id === id || c === id
        );
        setIsSaved(saved);
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    fetchCareer();
    checkSavedStatus();
  }, [id]);

  const handleSaveCareer = async () => {
    if (!user?.token) {
      alert("Please login to save careers");
      return;
    }

    try {
      const method = isSaved ? "DELETE" : "POST";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/save-career/${id}`,
        {
          method,
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.ok) {
        setIsSaved(!isSaved);
      } else {
        alert("Failed to update saved status");
      }
    } catch (error) {
      console.error("Error saving career:", error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!career) return <div className="text-center py-20">Career not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {career.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {career.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="bg-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Category: {career.category}
            </span>
            <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
              Salary: {career.averageSalary || "N/A"}
            </span>
            <span className="bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
              Growth: {career.jobGrowth || "Stable"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Responsibilities */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Day-to-Day Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {career.responsibilities?.length > 0 ? (
                  career.responsibilities.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))
                ) : (
                  <li>Information not available yet.</li>
                )}
              </ul>
            </section>

            {/* Skills */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Required Skills
              </h2>
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-blue-800 mb-2">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.skills?.technical?.length > 0 ? (
                    career.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-800 mb-2">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {career.skills?.soft?.length > 0 ? (
                    career.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Education Pathway
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Degree / Diploma
                  </h3>
                  <p className="text-gray-600">
                    {career.educationPathway?.degree || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Certifications
                  </h3>
                  <p className="text-gray-600">
                    {career.educationPathway?.certifications?.join(", ") ||
                      "N/A"}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Snapshot */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Career Snapshot
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-semibold text-gray-900">
                    {career.difficulty || "Moderate"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Demand:</span>
                  <span className="font-semibold text-green-600">
                    {career.demandLevel || "High"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Education:</span>
                  <span className="font-semibold text-gray-900">
                    {career.educationRequired || "Bachelor's"}
                  </span>
                </li>
              </ul>
              <button
                onClick={handleSaveCareer}
                className={`w-full mt-6 py-2 rounded-md transition ${
                  isSaved
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSaved ? "Saved" : "Save Career"}
              </button>
            </div>

            {/* Future Scope */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Future Scope
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Trend:</strong>{" "}
                {career.futureScope?.demandTrend || "Growing"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tech Impact:</strong>{" "}
                {career.futureScope?.techChanges || "High"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
