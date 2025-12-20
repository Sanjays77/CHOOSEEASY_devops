import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CareerCard from "../components/CareerCard";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);

  // Initialize from URL params
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/careers");
        const data = await response.json();
        setCareers(data);
        setFilteredCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  useEffect(() => {
    let result = [...careers];

    // Filter by search term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      // Split search term into words to allow partial matching of multiple words
      const searchWords = lowerTerm.split(/\s+/).filter(Boolean);

      result = result.filter((career) => {
        const title = career.title.toLowerCase();
        const desc = career.description.toLowerCase();
        const category = career.category.toLowerCase();

        // Check if ANY of the search words match title, description, or category
        // Or check if the full search term is contained
        return (
          title.includes(lowerTerm) ||
          desc.includes(lowerTerm) ||
          category.includes(lowerTerm) ||
          searchWords.some(
            (word) => title.includes(word) || desc.includes(word)
          )
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((career) => career.category === selectedCategory);
    }

    // Sort by title A-Z
    result = result.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredCareers(result);
  }, [searchTerm, selectedCategory, careers]);

  // Get unique categories for the filter dropdown
  const categories = ["All", ...new Set(careers.map((c) => c.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-blue-800 dark:text-blue-400 font-semibold">
          Loading careers...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300"
      style={{
        backgroundImage: "url('/images/explore-bg.png')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay' // Allows dark mode color to tint it
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900 dark:text-blue-400">
          Explore Careers
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search careers (e.g., 'Developer', 'Nurse')..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/4">
            <select
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCareers.map((career, index) => {
              // Check if user is authenticated
              const user = JSON.parse(localStorage.getItem("profile"));
              // Lock careers after the first 3 if not authenticated
              const isLocked = !user && index >= 3;

              return (
                <CareerCard key={career._id} career={career} locked={isLocked} />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No careers found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
