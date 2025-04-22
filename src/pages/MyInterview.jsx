import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateGeminiResponse } from "@/lib/Model2";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Lightbulb,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  Mic,
  Send,
} from "lucide-react";

const MyInterview = () => {
  const { topic } = useParams();
  const decodedTopic = decodeURIComponent(topic);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState({});
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  // Track which questions are currently being processed for feedback
  const [processingFeedback, setProcessingFeedback] = useState({});
  const [progress, setProgress] = useState(0);

  // Enhanced question generation with error handling
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setProgress(0);

      try {
        const prompt = `Generate 5 comprehensive interview questions for ${decodedTopic} with hints and model answers. Format each as:
        
        Q: [Question text]
        Hint: [Practical hint]
        Answer: [Ideal answer]
        
        Provide diverse questions covering fundamentals to advanced concepts.`;

        // Simulate progress for demo
        const progressInterval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 300);

        const response = await generateGeminiResponse(prompt);
        clearInterval(progressInterval);
        setProgress(100);

        // Robust parsing
        const questionBlocks = response.split(/(?=Q:)/g).filter(Boolean);
        const formattedQuestions = questionBlocks
          .map((block) => {
            const questionMatch = block.match(/Q:\s*(.+?)(?=Hint:|$)/s);
            const hintMatch = block.match(/Hint:\s*(.+?)(?=Answer:|$)/s);
            const answerMatch = block.match(/Answer:\s*(.+?)(?=$)/s);

            return {
              question:
                questionMatch?.[1]?.trim() || "Question not generated properly",
              hint:
                hintMatch?.[1]?.trim() ||
                "Think about the key concepts involved",
              answer: answerMatch?.[1]?.trim() || "Model answer not available",
            };
          })
          .filter((q) => q.question);

        setQuestions(
          formattedQuestions.length
            ? formattedQuestions
            : [
                {
                  question:
                    "What are the core principles of " + decodedTopic + "?",
                  hint: "Consider both theoretical foundations and practical applications",
                  answer: "The core principles typically include...",
                },
              ]
        );
      } catch (error) {
        console.error("Generation error:", error);
        setQuestions([
          {
            question: "What experience do you have with " + decodedTopic + "?",
            hint: "Focus on relevant projects and measurable outcomes",
            answer: "In my previous role, I worked on...",
          },
        ]);
      } finally {
        setLoading(false);
        setTimeout(() => setProgreprimary);
      }
    };

    fetchQuestions();
  }, [decodedTopic]);

  const toggleHint = (index) => {
    setShowHint((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    // Clear feedback when answer changes
    setFeedback((prev) => {
      const newFeedback = { ...prev };
      delete newFeedback[index];
      return newFeedback;
    });
  };

  // Modified to process each answer individually and provide more granular feedback
  const checkAnswersWithAI = async () => {
    setFeedbackLoading(true);

    // Create a copy of processing state with all answered questions marked as processing
    const newProcessingState = {};
    Object.keys(answers).forEach((index) => {
      if (answers[index]?.trim()) {
        newProcessingState[index] = true;
      }
    });
    setProcessingFeedback(newProcessingState);

    try {
      // Process each answer individually for more reliable feedback mapping
      const newFeedback = { ...feedback };

      // Get all questions that have answers
      const answeredQuestions = Object.keys(answers)
        .filter((index) => answers[index]?.trim())
        .map((index) => parseInt(index));

      // Process each answered question in sequence
      for (const index of answeredQuestions) {
        const prompt = `You are an interview coach evaluating a candidate's response.
        
        Topic: ${decodedTopic}
        Question: ${questions[index].question}
        Model Answer: ${questions[index].answer}
        Candidate Answer: ${answers[index]}
        
        Provide specific constructive feedback on this answer. Highlight strengths and suggest improvements.
        Be concise but informative. Focus on content, structure, and relevance.
        Format your response as a paragraph of 2-4 sentences without any headers or prefixes.`;

        const response = await generateGeminiResponse(prompt);

        // Store the feedback for this specific question
        newFeedback[index] = response.trim();

        // Update the processing state to show this question is no longer being processed
        setProcessingFeedback((prev) => {
          const updated = { ...prev };
          delete updated[index];
          return updated;
        });

        // Update feedback state after each question is processed
        setFeedback({ ...newFeedback });
      }
    } catch (error) {
      console.error("Feedback error:", error);

      // Provide fallback feedback for any questions still being processed
      Object.keys(processingFeedback).forEach((index) => {
        setFeedback((prev) => ({
          ...prev,
          [index]:
            "AI feedback unavailable. Review your answer against the model solution.",
        }));
      });
    } finally {
      setFeedbackLoading(false);
      setProcessingFeedback({}); // Clear all processing indicators
    }
  };

  const getAnswerCompletionPercentage = () => {
    const answeredCount = Object.keys(answers).filter((key) =>
      answers[key]?.trim()
    ).length;
    return Math.round((answeredCount / questions.length) * 100);
  };

  // Function to generate placeholder answers when "View Model Answers" is clicked
  const populateModelAnswers = () => {
    const allAnswers = questions.reduce((acc, q, i) => {
      acc[i] = q.answer;
      return acc;
    }, {});
    // Clear existing feedback when model answers are populated
    setFeedback({});
    setAnswers(allAnswers);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 px-3 sm:px-6">
      {/* Premium Header */}
      <div className="relative mb-6 sm:mb-12 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-900 to-primary p-4 sm:p-8 text-white shadow-lg sm:shadow-2xl">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="relative z-10">
          <button
            onClick={() => window.history.back()}
            className="mb-4 sm:mb-6 flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to interviews
          </button>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-1 sm:mb-2">
            {decodedTopic} <span className="text-purple-300">Interview</span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-white/80">
            AI-powered simulation with real-time feedback and expert guidance
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 space-y-4 sm:space-y-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-primary animate-spin animation-delay-200"></div>
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-purple-300 animate-spin animation-delay-400"></div>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">
            Preparing Your Interview
          </h3>
          <p className="text-sm sm:text-base texprimary dark:text-gray-400">
            Generating personalized questions...
          </p>
          <div className="w-full max-w-xs h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Questions Panel */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center">
                  <BookOpen className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Interview Questions
                </h2>
                <div className="text-xs sm:text-sm texprimary dark:text-gray-400">
                  {questions.length}{" "}
                  {questions.length === 1 ? "question" : "questions"}
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50">
                          <span className="text-sm sm:text-base text-primary dark:text-purple-300 font-medium">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {q.question}
                        </h3>

                        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                          {/* Answer Input */}
                          <div className="relative">
                            <textarea
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                              rows="3"
                              placeholder="Type your answer here..."
                              value={answers[index] || ""}
                              onChange={(e) =>
                                handleAnswerChange(index, e.target.value)
                              }
                            />
                            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex space-x-1 sm:space-x-2">
                              <button className="p-1 sm:p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Mic className="h-3 w-3 sm:h-4 sm:w-4 texprimary dark:text-gray-400" />
                              </button>
                              <button
                                className="p-1 sm:p-1.5 rounded-full bg-primary text-white hover:bg-purple-700 transition-colors"
                                onClick={() => toggleHint(index)}
                              >
                                <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Hint Section */}
                          {showHint[index] && (
                            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                <span className="font-medium">Expert Tip:</span>{" "}
                                {q.hint}
                              </p>
                            </div>
                          )}

                          {/* Feedback Status Indicator */}
                          {processingFeedback[index] && (
                            <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 animate-pulse">
                              <div className="flex items-center space-x-2">
                                <svg
                                  className="animate-spin h-4 w-4 text-primary"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <p className="text-sm texprimary dark:text-gray-400">
                                  Analyzing your answer...
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Feedback Section */}
                          {feedback[index] && (
                            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/30">
                              <div className="flex items-start">
                                <CheckCircle className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 textprimary mt-0.5 mr-2" />
                                <div>
                                  <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-0.5 sm:mb-1">
                                    AI Analysis
                                  </h4>
                                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                                    {feedback[index]}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="text-sm px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Exit Session
              </Button>

              <Button
                onClick={checkAnswersWithAI}
                disabled={
                  feedbackLoading ||
                  Object.keys(answers).filter((key) => answers[key]?.trim())
                    .length === 0
                }
                className={`text-sm px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md sm:shadow-lg hover:shadow-xl transition-all group ${
                  feedbackLoading ||
                  Object.keys(answers).filter((key) => answers[key]?.trim())
                    .length === 0
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {feedbackLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                    Get Feedback
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analytics Panel */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center mb-4 sm:mb-6">
                <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                Performance Dashboard
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-xs sm:text-sm font-medium texprimary dark:text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">
                    Session Progress
                  </h3>
                  <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-indigo-600 transition-all duprimary"
                      style={{
                        width: `${getAnswerCompletionPercentage()}%`,
                        transitionProperty: "width",
                      }}
                    />
                  </div>
                  <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm texprimary dark:text-gray-400">
                    <span>Progress</span>
                    <span>
                      {
                        Object.keys(answers).filter((key) =>
                          answers[key]?.trim()
                        ).length
                      }
                      /{questions.length} answered
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                    <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1">
                      Hints Used
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-blue-800 dark:text-blue-200">
                      {Object.keys(showHint).filter((k) => showHint[k]).length}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                    <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 mb-0.5 sm:mb-1">
                      Feedback Received
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-green-800 dark:text-green-200">
                      {Object.keys(feedback).length}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-medium texprimary dark:text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center"
                      onClick={() => {
                        const allHints = questions.reduce((acc, _, i) => {
                          acc[i] = true;
                          return acc;
                        }, {});
                        setShowHint(allHints);
                      }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1 sm:mb-2">
                        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        Reveal All Hints
                      </span>
                    </button>

                    <button
                      className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center"
                      onClick={populateModelAnswers}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-1 sm:mb-2">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">
                        View Model Answers
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Guide Card with larger content */}
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center mb-5 sm:mb-6">
                <BookOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                Interview Guide
              </h2>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium mb-3">
                  Mastering {decodedTopic} Interviews
                </h3>
                <p className="text-sm sm:text-base mb-4">
                  Technical interviews for {decodedTopic} roles typically
                  assess:
                </p>

                <ul className="space-y-3 sm:space-y-4 mt-4 mb-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3 mt-0.5">
                      <CheckCircle className="h-full w-full" />
                    </div>
                    <span className="text-sm sm:text-base">
                      Your problem-solving methodology
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3 mt-0.5">
                      <CheckCircle className="h-full w-full" />
                    </div>
                    <span className="text-sm sm:text-base">
                      Depth of technical knowledge
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 text-primary mr-2 sm:mr-3 mt-0.5">
                      <CheckCircle className="h-full w-full" />
                    </div>
                    <span className="text-sm sm:text-base">
                      Ability to communicate complex ideas
                    </span>
                  </li>
                </ul>

                <div className="mt-5 sm:mt-6 p-4 sm:p-5 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-900/20">
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 sm:mb-3 text-base sm:text-lg">
                    Pro Tip
                  </h4>
                  <p className="text-sm sm:text-base text-yellow-700 dark:text-yellow-300">
                    When answering, structure your response with: Context →
                    Approach → Solution → Reflection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInterview;
