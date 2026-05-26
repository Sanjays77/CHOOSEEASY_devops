import React from "react";
import {
  FaBrain,
  FaRoute,
  FaBriefcase,
  FaCoins,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";

const AIRecommendationView = ({ recommendation }) => {
  if (!recommendation) return null;

  const {
    aiAnalysis,
    compatibilityScore = 85,
    roles = [],
    roadmap = [],
    marketOutlook = {},
    skillsToDevelop = [],
    tailoredAdvice,
  } = recommendation;

  return (
    <div className="w-full space-y-8 animate-fade-in text-white">
      {/* Overview & Compatibility Meter */}
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 border border-indigo-500/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-300 text-sm font-semibold">
              <FaBrain className="animate-pulse" /> AI Personality Mapping
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
              Personalized Career Fit
            </h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              {aiAnalysis}
            </p>
          </div>

          {/* Radial Compatibility Score */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-800/40 border border-slate-700/30 rounded-2xl min-w-44 text-center">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Compatibility Match
            </span>
            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-indigo-500"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - compatibilityScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-3xl font-black text-white">
                {compatibilityScore}%
              </div>
            </div>
            <span className="text-xs text-indigo-300 mt-2 font-medium">
              Excellent Synergy
            </span>
          </div>
        </div>
      </div>

      {/* Target Job Roles */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-300">
          <FaBriefcase /> Target Job Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-lg group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
              <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                {role.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Skills Roadmap */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-indigo-300">
          <FaRoute /> Personalized Roadmap
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {roadmap.map((step, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {step.phase || `Phase ${idx + 1}`}
                </span>
                <span className="text-gray-500 text-sm font-semibold">Step {idx + 1}</span>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-400">Recommended focus areas</p>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-400 block uppercase">Key Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {step.skills?.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs bg-slate-800 px-2 py-0.5 rounded text-indigo-200 border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {step.certifications && step.certifications.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-400 block uppercase">Certifications</span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-xs bg-indigo-950/40 border border-indigo-900/50 px-2 py-0.5 rounded text-indigo-300"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Projects */}
              {step.projects && step.projects.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-400 block uppercase">Portfolio Projects</span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.projects.map((proj, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded text-emerald-300"
                      >
                        📁 {proj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Market Outlook & Salaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Outlook metrics */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h4 className="text-lg font-bold text-indigo-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <FaChartLine /> Career Market Outlook
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-gray-400 block mb-1">Growth Outlook</span>
              <span className="text-base font-extrabold text-emerald-400 flex items-center gap-1">
                {marketOutlook.growthRate || "15% (Fast)"}
              </span>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-gray-400 block mb-1">Automation Risk</span>
              <span className={`text-base font-extrabold ${
                marketOutlook.automationRisk === "Low" ? "text-emerald-400" : 
                marketOutlook.automationRisk === "Medium" ? "text-yellow-400" : "text-red-400"
              }`}>
                {marketOutlook.automationRisk || "Low"}
              </span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Salary Benchmarks</h5>
            <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/40">
              <span className="text-gray-400 flex items-center gap-1"><FaCoins /> India Annual Range</span>
              <span className="font-extrabold text-white">{marketOutlook.indiaSalary || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span className="text-gray-400 flex items-center gap-1"><FaCoins /> Global Annual Range</span>
              <span className="font-extrabold text-white">{marketOutlook.globalSalary || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Skills & Specific Advice */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <FaLightbulb /> Custom Tips & Wishes Match
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-2xl">
              {tailoredAdvice || "Work hard, develop core computer science concepts, and build projects. Your career goals are fully achievable!"}
            </p>
          </div>

          {/* Hardcore skills to master */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-400 block uppercase">Crucial Skills to Master</span>
            <div className="flex flex-wrap gap-2">
              {skillsToDevelop.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-indigo-300 font-bold"
                >
                  🔥 {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationView;
