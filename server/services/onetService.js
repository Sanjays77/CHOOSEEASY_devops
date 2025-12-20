import axios from "axios";

// Base URL for O*NET Web Services
const ONET_BASE_URL = "https://services.onetcenter.org/ws";

// NOTE: You need to register for O*NET Web Services to get credentials
// https://services.onetcenter.org/
const username = process.env.ONET_USERNAME;
const password = process.env.ONET_PASSWORD;

const getAuthHeader = () => {
  if (!username || !password) return {};
  const token = Buffer.from(`${username}:${password}`).toString("base64");
  return { Authorization: `Basic ${token}` };
};

export const fetchCareerByCode = async (onetCode) => {
  if (!username || !password) {
    console.warn("O*NET credentials not found in .env. Returning mock data.");
    return null; // Or return mock data here if preferred
  }

  try {
    // Example: Fetching Job Overview
    // This is a simplified example. O*NET has many endpoints.
    // You might need to call multiple endpoints to fill the Career model.

    // 1. Career Overview
    const overviewRes = await axios.get(
      `${ONET_BASE_URL}/mnm/careers/${onetCode}/report`,
      {
        headers: { ...getAuthHeader(), Accept: "application/json" },
      }
    );

    // 2. Skills
    const skillsRes = await axios.get(
      `${ONET_BASE_URL}/mnm/careers/${onetCode}/skills`,
      {
        headers: { ...getAuthHeader(), Accept: "application/json" },
      }
    );

    // Transform O*NET data to our Career model format
    // This mapping depends heavily on the exact response structure of O*NET API
    const data = overviewRes.data;

    return {
      title: data.title,
      description: data.description,
      onetCode: onetCode,
      // ... map other fields
    };
  } catch (error) {
    console.error(
      "Error fetching from O*NET:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch career data from O*NET");
  }
};

export const searchCareers = async (keyword) => {
  if (!username || !password) return [];

  try {
    const response = await axios.get(`${ONET_BASE_URL}/mnm/search`, {
      params: { keyword },
      headers: { ...getAuthHeader(), Accept: "application/json" },
    });
    return response.data.career; // Array of careers
  } catch (error) {
    console.error("Error searching O*NET:", error);
    return [];
  }
};
