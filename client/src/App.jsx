import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserDetails from "./pages/AdminUserDetails";
import Test from "./pages/Test";
import CareerDetails from "./pages/CareerDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  useEffect(() => {
    const recordVisit = async () => {
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user?.token) {
        try {
          await fetch(`${import.meta.env.VITE_API_URL}/user/visit`, {
            method: "POST",
            headers: { Authorization: `Bearer ${user.token}` },
          });
        } catch (error) {
          console.error("Error recording visit:", error);
        }
      }
    };
    recordVisit();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/career/:id" element={<CareerDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/user/:id" element={<AdminUserDetails />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
