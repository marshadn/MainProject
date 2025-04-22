import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileUp,
  CheckCircle,
  AlertCircle,
  Download,
  ClipboardList,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Progress from "../components/ui/Progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import Page from "../components/Page";
import ResumeMatch from "../components/ResumeMatch";
import { generateGeminiResponse } from "../lib/GeminiAI";

console.log("ResumePage Loaded");

export default function ResumePage() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartBuildingClick = () => {
    window.location.href = "https://resumebuildrr.netlify.app/";
  };

  // Function to call Gemini API and generate questions
  const callGeminiApi = async (jobDesc, expLevel) => {
    try {
      setIsGenerating(true);

      // Construct the prompt
      let prompt = "Generate 5-7 interview questions based on:\n\n";
      if (jobDesc) prompt += `Job Description: ${jobDesc}\n\n`;
      prompt += `Experience Level: ${expLevel || "Not specified"}\n\n`;
      prompt += "Format the response as a numbered list of questions only.";

      const content = await generateGeminiResponse(prompt);
      const questionLines = content
        .split(/\d+\.\s+/)
        .filter((line) => line.trim().length > 0)
        .map((line) => line.trim());

      setGeneratedQuestions(questionLines);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setGeneratedQuestions([
        "Error generating questions. Please try again later.",
      ]);
    } finally {
      setIsGenerating(false);
    }
  };
  // Handler for both Generate Questions buttons
  const handleGenerateQuestionsClick = () => {
    callGeminiApi(jobDescription, experienceLevel);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Builder & Analysis</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Upload your resume for AI-powered analysis or build a new one from
        scratch. Get actionable suggestions to improve your resume and make it
        stand out.
      </p>

      {/* First Section (already okay) */}
      <Page />

      {/* Second Section - Resume Builder */}
      <Tabs defaultValue="builder" className="w-full mb-12">
        <TabsList className="mb-8"></TabsList>

        <TabsContent value="builder">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create a professional resume using our guided builder. Choose
                from multiple templates and customize sections.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="cursor-pointer border-2 border-primary">
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] relative">
                      <img
                        src="/placeholder.svg"
                        alt="Professional template"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center mt-2 font-medium">Professional</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer border-primary">
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] relative">
                      <img
                        src="/placeholder.svg"
                        alt="Modern template"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center mt-2 font-medium">Modern</p>
                  </CardContent>
                </Card>
              </div>
              <Button onClick={handleStartBuildingClick} className="w-full">
                Start Building
              </Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4">
                Resume Building Tips
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Tailor your resume to the job</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customize your resume for each position to highlight
                      relevant skills and experience.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Use action verbs</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Begin bullet points with strong action verbs like
                      "Implemented," "Developed," or "Managed."
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Quantify achievements</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Include specific numbers and metrics to demonstrate your
                      impact.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Keep it concise</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aim for a one-page resume unless you have extensive
                      relevant experience.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Proofread carefully</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Errors can eliminate you from consideration. Proofread
                      multiple times.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Highlight relevant experience</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Focus on the most relevant work experience, even if it's
                      from internships, volunteering, or freelance work.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Choose the right format</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Use a clean and professional format, choosing between
                      chronological, functional, or hybrid based on your career
                      stage.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ResumeMatch />

      {/* Third Section - Generate Interview Questions */}
      <div className="w-full mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card */}
          <Card className="shadow-xl transition-all transform hover:shadow-2xl border-0 rounded-2xl">
            <CardHeader className="bg-primary rounded-t-2xl p-6">
              <CardTitle className="flex items-center gap-2 text-white text-xl font-bold">
                <ClipboardList className="h-6 w-6" />
                Generate Interview Questions
              </CardTitle>
              <CardDescription className="text-white/90">
                Get personalized interview questions based on your resume and
                job description
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="job-description"
                >
                  Job Description (optional)
                </label>
                <textarea
                  id="job-description"
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-blue-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[100px]"
                  placeholder="Paste the job description here to get tailored questions..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="experience-level"
                >
                  Experience Level
                </label>
                <select
                  id="experience-level"
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:border-blue-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="">Select your level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Career</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {generatedQuestions.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
                    Generated Interview Questions:
                  </h4>
                  <ul className="space-y-2">
                    {generatedQuestions.map((question, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-primary font-semibold">
                          {index + 1}.
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {question}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button
                onClick={handleGenerateQuestionsClick}
                className="w-full px-6 py-4 text-lg font-semibold rounded bg-primary hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Questions"}
              </Button>
            </CardFooter>
          </Card>

          {/* Right Tips Box */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-gray-700 shadow-md transition-shadow hover:shadow-xl">
            <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-white">
              Interview Preparation Tips
            </h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Research the company",
                  desc: "Understand the company's mission, values, and recent news to show your interest.",
                },
                {
                  title: "Practice common questions",
                  desc: `Prepare answers for "Tell me about yourself", "Why this company?" and similar.`,
                },
                {
                  title: "Prepare your own questions",
                  desc: "Have thoughtful questions ready to ask the interviewer about the role and company.",
                },
                {
                  title: "Use the STAR method",
                  desc: "Structure behavioral answers with Situation, Task, Action, and Result.",
                },
                {
                  title: "Dress appropriately",
                  desc: "Research the company culture to determine the right attire for your interview.",
                },
              ].map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {tip.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tip.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
