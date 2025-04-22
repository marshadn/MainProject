import React, { useState } from "react";
import { generateGeminiResponse } from "@/lib/Model3";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Loader2, FileText, Sparkles } from "lucide-react";

function ResumeMatch() {
  const [resumeText, setResumeText] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-primary bg-clip-text text-transparent">
          AI-Powered Interview Prep
        </h1>
        <p className="text-lg text-muted-foreground">
          Get personalized interview questions tailored to your resume
        </p>
      </div>

      {/* Resume Input Section */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Your Resume Content
          </label>
        </div>
        <Textarea
          className="min-h-[200px] p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-blue-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          placeholder="Paste your resume content here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      </div>

      {/* Generate Button */}
      <div className="flex justify-center mb-10">
        <Button
          onClick={generateInterviewQuestions}
          disabled={loading}
          className="px-8 py-6 text-lg font-semibold rounded-xl bg-primary hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Interview Questions
            </>
          )}
        </Button>
      </div>

      {/* Results Section */}
      {interviewQuestions.length > 0 && (
        <Card className="border-0 shadow-xl overflow-hidden transition-all duraprimary ease-in-out transform hover:shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-white" />
              <CardTitle className="text-white text-2xl font-bold">
                Your Personalized Interview Questions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              {interviewQuestions.map((q, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="flex items-start">
                    <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 dark:text-gray-200">{q}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      {interviewQuestions.length > 0 && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Pro Tips for Your Interview
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Practice answering each question out loud</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Use the STAR method for behavioral questions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>
                Prepare 2-3 examples from your experience for each question
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Research the company to tailor your answers</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeMatch;
