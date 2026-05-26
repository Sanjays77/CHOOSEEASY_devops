import React, { useState } from "react";

const Admin = () => {
  const [career, setCareer] = useState({
    title: "",
    description: "",
    category: "",
    averageSalary: "",
    roadmap: "",
  });

  const handleChange = (e) => {
    setCareer({ ...career, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/careers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(career),
      });
      if (response.ok) {
        alert("Career added successfully!");
        setCareer({
          title: "",
          description: "",
          category: "",
          averageSalary: "",
          roadmap: "",
        });
      } else {
        alert("Failed to add career");
      }
    } catch (error) {
      console.error("Error adding career:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Panel - Add Career
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={career.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={career.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={career.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Salary
            </label>
            <input
              type="text"
              name="averageSalary"
              value={career.averageSalary}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Roadmap URL
            </label>
            <input
              type="text"
              name="roadmap"
              value={career.roadmap}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Career
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
