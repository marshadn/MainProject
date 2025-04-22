import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateGeminiResponse } from "@/lib/Model3";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  RotateCw,
  ArrowLeft,
  Trophy,
  Aperture,
} from "lucide-react";

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setProgress(0);

      // Simulate progress for better UX
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      const prompt = `Generate exactly 10 multiple-choice questions on ${topic}. 
      Each question should have 4 options and one correct answer.
      Format: [{"question": "...", "options": ["A. Option text", "B. Option text", "C. Option text", "D. Option text"], "answer": "A. Option text", "explanation": "Brief explanation of why this is the correct answer"}]`;

      try {
        const response = await generateGeminiResponse(prompt);
        const formattedQuestions = JSON.parse(response);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Failed to parse questions:", error);
        setQuestions([]);
      } finally {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setProgress(0), 500);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleAnswerSelect = (questionIndex, option) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    }
  };

  const toggleExplanation = (questionIndex) => {
    setShowExplanation((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) newScore += 1;
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setScore(0);
    setSubmitted(false);
    setShowExplanation({});
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-primary p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to topics
          </button>

          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {topic} <span className="text-white">Challenge</span>
          </h1>
          <p className="max-w-2xl text-white/80">
            Test your knowledge with AI-generated questions and detailed
            explanations
          </p>
        </div>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 space-y-6"
        >
          {/* Multi-layer spinner animation */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-purple-300 animate-spin animation-delay-400"></div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Crafting Your Quiz
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Generating personalized questions...
          </p>
          {/* Progress bar */}
          <div className="w-full max-w-xs h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Questions Grid */}
          <div className="grid grid-cols-1 gap-6">
            {questions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50">
                        <span className="text-primary dark:text-purple-300 font-medium">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        {q.question}
                      </h3>

                      <div className="space-y-3">
                        {q.options.map((option, i) => {
                          const isSelected = selectedAnswers[index] === option;
                          const isCorrect = q.answer === option;

                          let optionClasses =
                            "p-3 rounded-lg border transition-all flex items-center";

                          if (submitted) {
                            if (isSelected && isCorrect) {
                              optionClasses +=
                                " bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
                            } else if (isSelected && !isCorrect) {
                              optionClasses +=
                                " bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800";
                            } else if (isCorrect) {
                              optionClasses +=
                                " bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800";
                            } else {
                              optionClasses +=
                                " border-gray-200 dark:border-gray-700";
                            }
                          } else if (isSelected) {
                            optionClasses +=
                              " bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800";
                          } else {
                            optionClasses +=
                              " border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50";
                          }

                          return (
                            <div
                              key={i}
                              className={optionClasses}
                              onClick={() => handleAnswerSelect(index, option)}
                              style={{
                                pointerEvents: submitted ? "none" : "auto",
                              }}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                                  submitted
                                    ? isCorrect
                                      ? "bg-green-500 border-green-600 text-white"
                                      : isSelected
                                      ? "bg-red-500 border-red-600 text-white"
                                      : "border-gray-300 dark:border-gray-600"
                                    : isSelected
                                    ? "bg-primary border-primary text-white"
                                    : "border-gray-300 dark:border-gray-600"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}
                              </div>
                              <span className="text-gray-800 dark:text-gray-200">
                                {option.replace(/^[A-D]\.\s*/, "")}
                              </span>

                              {submitted && isCorrect && (
                                <div className="ml-auto bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                  Correct
                                </div>
                              )}
                              {submitted && isSelected && !isCorrect && (
                                <div className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                  Incorrect
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-4 space-y-4">
                          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-center">
                              <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                                Correct Answer: {q.answer}
                              </h4>
                            </div>
                          </div>

                          {q.explanation && (
                            <div>
                              <button
                                onClick={() => toggleExplanation(index)}
                                className="flex items-center text-sm font-medium text-primary dark:text-primary hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                              >
                                {showExplanation[index] ? (
                                  <>
                                    <ChevronUp className="mr-1 h-4 w-4" />
                                    Hide Explanation
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="mr-1 h-4 w-4" />
                                    Show Explanation
                                  </>
                                )}
                              </button>

                              <AnimatePresence>
                                {showExplanation[index] && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                                  >
                                    <p className="text-gray-700 dark:text-gray-300">
                                      {q.explanation}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                disabled={
                  Object.keys(selectedAnswers).length !== questions.length
                }
                className="bg-gradient-to-r from-primary to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all group px-8 py-3"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Submit Quiz
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors px-8 py-3"
                >
                  <RotateCw className="mr-2 h-5 w-5" />
                  Retry Quiz
                </Button>

                <Button
                  onClick={() => navigate(-1)}
                  className="bg-gradient-to-r from-primary to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all px-8 py-3"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Topics
                </Button>
              </>
            )}
          </div>

          {/* Results Panel */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`mt-8 p-8 rounded-2xl shadow-xl border-2 ${
                score > questions.length / 2
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white mb-4">
                  {score > questions.length / 2 ? (
                    <Trophy className="h-8 w-8" />
                  ) : (
                    <Aperture className="h-8 w-8" />
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {score > questions.length / 2
                    ? "Excellent Work!"
                    : "Good Effort!"}
                </h2>

                <p className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                  {score}{" "}
                  <span className="text-xl text-gray-500 dark:text-gray-400">
                    / {questions.length}
                  </span>
                </p>

                <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-6">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(score / questions.length) * 100}%`,
                      background:
                        score > questions.length / 2
                          ? "linear-gradient(to right, #10b981, #3b82f6)"
                          : "linear-gradient(to right, #ef4444, #f59e0b)",
                    }}
                  />
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {score > questions.length / 2
                    ? "You've demonstrated strong knowledge in this area!"
                    : "Review the explanations to improve your understanding."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
