import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AskAI from "./pages/AskAI";
import Insights from "./pages/Insights";
import MockInterview from "./pages/MockInterview";
import Quizzes from "./pages/Quizzes";
import HomePage from "./pages/Home";
import Layout from "./pages/Layout"
import ResumePage from "./pages/ResumePage";
import MyInterview from "./pages/MyInterview";


const App = () => {
  return (
    <Router>
       <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ Set HomePage as the default route */}
        <Route path="/ask-ai" element={<AskAI />} /> {/* ✅ Match the URL */}
        <Route path="/insights" element={<Insights />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/interview/:topic" element={<MyInterview />} />
      </Routes>
      </Layout>
    </Router>
  );
};

export default App;




