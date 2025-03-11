import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateGeminiResponse } from "@/lib/Model2";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const MyInterview = () => {
  const { topic } = useParams();
  const decodedTopic = decodeURIComponent(topic);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState({});
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const prompt = `Generate 10 interview questions for the topic: "${decodedTopic}". Provide hints and correct answers.
        
        Format:
        1. Question?
           Hint: Hint text here.
           Answer: Correct answer here.
        2. Another question?
           Hint: Another hint here.
           Answer: Correct answer here.`;

        const response = await generateGeminiResponse(prompt);
        
        const questionList = response.split(/\n\d+\./).filter(q => q.trim() !== "");
        const formattedQuestions = questionList.map(q => {
          const parts = q.split("Hint:");
          const answerParts = parts[1]?.split("Answer:");
          return {
            question: parts[0].trim(),
            hint: answerParts?.[0]?.trim() || "No hint available.",
            answer: answerParts?.[1]?.trim() || "No answer provided.",
          };
        });

        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([{ question: "Failed to generate questions. Please try again.", hint: "", answer: "" }]);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [decodedTopic]);

  const toggleHint = (index) => {
    setShowHint((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const checkAnswersWithAI = async () => {
    setLoading(true);
    try {
      const aiPrompt = `Evaluate the user's answers for the topic "${decodedTopic}". Compare with the correct answers and provide feedback.

      Format:
      Question: (Question Text)
      Correct Answer: (Expected Answer)
      User's Answer: (User's Response)
      Feedback: (Detailed feedback on how well the answer matches, suggest improvements if needed)

      ${questions.map((q, i) => `
      Question: ${q.question}
      Correct Answer: ${q.answer}
      User's Answer: ${answers[i] || "Not answered"}
      Feedback:`).join("\n\n")}`;

      const response = await generateGeminiResponse(aiPrompt);
      
      // Splitting feedback properly for each question
      const feedbackArray = response.split("Feedback:").slice(1).map(fb => fb.trim());
      const newFeedback = {};
      feedbackArray.forEach((fb, i) => {
        newFeedback[i] = fb;
      });

      setFeedback(newFeedback);
    } catch (error) {
      console.error("Error generating feedback:", error);
      setFeedback({ error: "Failed to get AI feedback. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Mock Interview: {decodedTopic}</h1>
      {loading ? (
        <p className="text-gray-500">Generating questions...</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="p-4 border rounded">
              <p className="font-medium">{index + 1}. {q.question}</p>
              
              {/* Toggle Hint Button */}
              <button 
                onClick={() => toggleHint(index)} 
                className="flex items-center mt-2 text-blue-600"
              >
                {showHint[index] ? "Hide Hint" : "Show Hint"}
                {showHint[index] ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
              </button>
              
              {/* Hint (Shown only if toggled) */}
              {showHint[index] && <p className="text-gray-600 mt-2"><strong>Hint:</strong> {q.hint}</p>}

              {/* Answer Input Field */}
              <textarea
  className="w-full mt-3 p-2 border rounded text-gray-900 dark:text-white"
  rows="3"
  placeholder="Write your answer here..."
  value={answers[index] || ""}
  onChange={(e) => handleAnswerChange(index, e.target.value)}
/>

              {/* AI Feedback (Correctly shown per question) */}
              {feedback[index] && (
                <p className="text-green-600 mt-2"><strong>AI Feedback:</strong> {feedback[index]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <Button className="mt-6" onClick={checkAnswersWithAI}>Submit Answers & Get Feedback</Button>
      <Button className="mt-4 ml-4" variant="outline" onClick={() => window.history.back()}>Go Back</Button>
    </div>
  );
};

export default MyInterview;


