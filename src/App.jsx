import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AskAI from "./pages/AskAI";
import Insights from "./pages/Insights";
import MockInterview from "./pages/MockInterview";
import Quizzes from "./pages/Quizzes";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout";
import ResumePage from "./pages/ResumePage";
import MyInterview from "./pages/MyInterview";
import QuizPage from "./pages/QuizPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"; 

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/ask-ai"
            element={
              <ProtectedRoute>
                <AskAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mock-interview"
            element={
              <ProtectedRoute>
                <MockInterview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes"
            element={
              <ProtectedRoute>
                <Quizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <ResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:topic"
            element={
              <ProtectedRoute>
                <MyInterview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes/:topic"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
