import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const CareerCard = ({ career, locked }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Locked Overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 backdrop-blur-sm bg-white/40 dark:bg-black/40 flex flex-col items-center justify-center text-center p-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg mb-3">
            <FaLock className="text-2xl text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Career Locked
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-[200px]">
            Sign in to explore detailed insights about this career path.
          </p>
          <Link
            to="/auth"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors shadow-md"
          >
            Sign In to View
          </Link>
        </div>
      )}

      {/* Main Content - Blurred if locked */}
      <div className={`flex flex-col h-full ${locked ? "blur-xs select-none" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400">
            {career.title}
          </h3>
          <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
            {career.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 grow line-clamp-3">
          {career.description}
        </p>

        <div className="space-y-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Salary:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {career.averageSalary || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Growth:</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {career.jobGrowth || "N/A"}
            </span>
          </div>
        </div>

        <Link
          to={locked ? "#" : `/career/${career._id}`}
          className={`block text-center py-2 rounded transition mt-auto ${locked
            ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          onClick={(e) => locked && e.preventDefault()}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CareerCard;
