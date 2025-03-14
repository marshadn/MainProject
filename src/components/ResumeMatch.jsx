import React, { useState } from "react";
import { generateGeminiResponse } from "@/lib/Model3";
import { Button } from "@/components/ui/Button";

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to generate interview questions based on resume
  const generateInterviewQuestions = async () => {
    if (!resumeText.trim()) {
      alert("Please enter your resume content first.");
      return;
    }

    setLoading(true);
    const prompt = `Generate 10 interview questions based on the following resume:\n${resumeText}
    Provide the response in JSON format: ["Question 1", "Question 2", "Question 3", ...]`;

    try {
      const response = await generateGeminiResponse(prompt);
      const formattedQuestions = JSON.parse(response);

      if (Array.isArray(formattedQuestions)) {
        setInterviewQuestions(formattedQuestions);
      } else {
        setInterviewQuestions(["Invalid response format from AI."]);
      }
    } catch (error) {
      console.error("Failed to parse questions:", error);
      setInterviewQuestions(["Error generating questions."]);
    }
    setLoading(false);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Interview Questions</h1>

      {/* Resume Input Textarea */}
      <textarea
        className="w-full p-3 border rounded mb-4 h-40 bg-light dark:bg-dark text-dark dark:text-light"

        placeholder="Paste your resume content here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      ></textarea>

      {/* Button */}
      <div className="mb-6">
        <Button onClick={generateInterviewQuestions} disabled={loading}>
          {loading ? "Generating..." : "Generate Interview Questions"}
        </Button>
      </div>

      {/* Interview Questions - Dark Mode Card */}
      {interviewQuestions.length > 0 && (
        <div className="mt-6 p-4 border rounded shadow bg-white dark:bg-black text-black dark:text-white">
          <h2 className="text-xl font-bold mb-2">Interview Questions</h2>
          <ul className="list-disc ml-5">
            {interviewQuestions.map((q, index) => (
              <li key={index} className="mt-2">{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeMatch;
