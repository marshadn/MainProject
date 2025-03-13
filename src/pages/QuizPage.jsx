import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateGeminiResponse } from "@/lib/Model3";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion"; // For animation

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic || "General Knowledge";
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const prompt = `Generate exactly 10 multiple-choice questions on ${topic}. 
      Each question should have 4 options and one correct answer.
      Format: [{"question": "...", "options": ["A. Option text", "B. Option text", "C. Option text", "D. Option text"], "answer": "A. Option text", "explanation": "Brief explanation of why this is the correct answer"}]`;

      const response = await generateGeminiResponse(prompt);

      try {
        const formattedQuestions = JSON.parse(response);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Failed to parse questions:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  // Handle answer selection (disable other options)
  const handleAnswerSelect = (questionIndex, option) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: option,
      }));
    }
  };

  // Toggle explanation visibility
  const toggleExplanation = (questionIndex) => {
    setShowExplanation((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

  // Calculate score and reveal answers
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  // Handle retry quiz
  const handleRetry = () => {
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);
    setShowExplanation({});
  };

  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Quiz: {topic}</h1>

      {loading ? (
        <div className="text-center p-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg dark:text-white">Generating questions, please wait...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <p className="font-medium text-lg dark:text-white">{index + 1}. {q.question}</p>
              <ul className="mt-3 space-y-2">
                {q.options.map((option, i) => {
                  const isSelected = selectedAnswers[index] === option;
                  const isCorrect = q.answer === option;
                  
                  // Base classes
                  let optionClasses = "p-3 border rounded-md cursor-pointer transition-colors dark:text-white";
                  
                  if (submitted) {
                    // After submission
                    if (isSelected && isCorrect) {
                      // Selected and correct - strong green
                      optionClasses += " bg-green-600 border-green-700 text-white dark:text-white";
                    } else if (isSelected && !isCorrect) {
                      // Selected but wrong - strong red
                      optionClasses += " bg-red-600 border-red-700 text-white dark:text-white";
                    } else if (isCorrect) {
                      // Correct answer (but not selected) - shown in green
                      optionClasses += " bg-green-600 border-green-700 text-white dark:text-white";
                    } else {
                      // Normal unselected option
                      optionClasses += " hover:bg-gray-50 dark:hover:bg-gray-700";
                    }
                  } else if (isSelected) {
                    // Selected but not submitted yet - primary color
                    optionClasses += " bg-blue-600 border-blue-700 text-white dark:text-white";
                  } else {
                    // Normal unselected option
                    optionClasses += " hover:bg-gray-50 dark:hover:bg-gray-700";
                  }

                  return (
                    <li
                      key={i}
                      className={optionClasses}
                      onClick={() => handleAnswerSelect(index, option)}
                      style={{
                        pointerEvents: submitted ? "none" : "auto", // Disable selection after submission
                      }}
                    >
                      {option}
                      {submitted && isCorrect && (
                        <span className="ml-2 inline-flex items-center justify-center text-xs font-medium rounded-full bg-white text-green-800 px-2">✓ Correct</span>
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <span className="ml-2 inline-flex items-center justify-center text-xs font-medium rounded-full bg-white text-red-800 px-2">✗ Incorrect</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              
              {submitted && (
                <div className="mt-3">
                  <p className="text-sm dark:text-white">
                    <span className="font-semibold">Correct Answer:</span> {q.answer}
                  </p>
                  
                  {q.explanation && (
                    <div className="mt-2">
                      <button 
                        onClick={() => toggleExplanation(index)}
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
                      >
                        {showExplanation[index] ? "Hide Explanation" : "Show Explanation"}
                        <svg className={`ml-1 h-4 w-4 transition-transform ${showExplanation[index] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {showExplanation[index] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 p-3 rounded-md text-sm dark:text-white"
                        >
                          {q.explanation}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center space-x-4">
        {!submitted && !loading && (
          <Button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md"
            disabled={Object.keys(selectedAnswers).length !== questions.length}
          >
            Submit Quiz
          </Button>
        )}

        {submitted && (
          <>
            <Button 
              onClick={handleRetry}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md shadow-md"
            >
              Retry Quiz
            </Button>
            
            <Button 
              onClick={() => navigate(-1)} 
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md"
            >
              Back to Topics
            </Button>
          </>
        )}
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 p-6 rounded-lg shadow-lg text-center border-2"
          style={{ 
            borderColor: score > questions.length / 2 ? 
              "rgb(22, 163, 74)" : "rgb(220, 38, 38)"  // Strong green/red colors
          }}
        >
          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            {score > questions.length / 2 ? "🎉 Well done!" : "Keep practicing!"}
          </h2>
          <p className="text-3xl font-bold mb-3 dark:text-white">
            Your Score: {score} / {questions.length}
            <span className="text-lg ml-2 dark:text-gray-300">
              ({Math.round((score / questions.length) * 100)}%)
            </span>
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mt-4">
            <div 
              className="h-4 rounded-full transition-all duration-1000" 
              style={{ 
                width: `${(score / questions.length) * 100}%`,
                backgroundColor: score > questions.length / 2 ? 
                  "rgb(22, 163, 74)" : "rgb(220, 38, 38)"  // Strong green/red colors
              }}
            ></div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default QuizPage;