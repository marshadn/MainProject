import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router instead of Next.js router
import { FileUp, CheckCircle, AlertCircle, Download } from 'lucide-react';

// Note: You'd need to implement or import these UI components from a library like shadcn/ui
// I'm keeping the component imports as-is, assuming you'll handle the implementation
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import Progress from "../components/ui/Progress"; // ✅ Correct for default export

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
console.log("ResumePage Loaded");
export default function ResumePage() {
  const navigate = useNavigate(); // React Router hook instead of Next.js useRouter

  const handleStartBuildingClick = () => {
    navigate("/build-resume"); // React Router navigation
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Builder & Analysis</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Upload your resume for AI-powered analysis or build a new one from scratch. Get actionable suggestions to
        improve your resume and make it stand out.
      </p>

      <Tabs defaultValue="analysis" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="analysis">Resume Analysis</TabsTrigger>
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ResumeUploader />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Resume Analysis Results</h2>
              <div className="space-y-6">
                <OverallScore score={72} />
                <SectionAnalysis />
                <KeywordAnalysis />
                <RecommendedActions />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="builder">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create a professional resume using our guided builder. Choose from multiple templates and customize
                sections.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="cursor-pointer border-2 border-primary">
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] relative">
                      {/* Using img instead of Next.js Image component */}
                      <img
                        src="/placeholder.svg"
                        alt="Professional template"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center mt-2 font-medium">Professional</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer">
                  <CardContent className="p-4">
                    <div className="aspect-[8.5/11] relative">
                      {/* Using img instead of Next.js Image component */}
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
              <Button onClick={handleStartBuildingClick} className="w-full">Start Building</Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Resume Building Tips</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Tailor your resume to the job</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customize your resume for each position to highlight relevant skills and experience.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Use action verbs</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Begin bullet points with strong action verbs like "Implemented," "Developed," or "Managed."
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Quantify achievements</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Include specific numbers and metrics to demonstrate your impact.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Keep it concise</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aim for a one-page resume unless you have extensive relevant experience.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Proofread carefully</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Errors can eliminate you from consideration. Proofread multiple times.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResumeUploader() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>Upload your resume to get AI-powered analysis and suggestions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg p-6 w-full flex flex-col items-center justify-center">
          <FileUp className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-sm text-center mb-2">Drag and drop your PDF or DOCX file here</p>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4">Maximum file size: 5MB</p>
          <Button variant="outline" size="sm">
            Browse Files
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full">Analyze Resume</Button>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">We support PDF, DOCX, and TXT formats</p>
      </CardFooter>
    </Card>
  );
}

function OverallScore({ score }) {
  let scoreColor = "text-yellow-500";
  let scoreText = "Good";

  if (score >= 90) {
    scoreColor = "text-green-500";
    scoreText = "Excellent";
  } else if (score >= 80) {
    scoreColor = "text-green-400";
    scoreText = "Very Good";
  } else if (score < 60) {
    scoreColor = "text-red-500";
    scoreText = "Needs Improvement";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Overall Resume Score</span>
          <span className={`text-2xl ${scoreColor}`}>{score}%</span>
        </CardTitle>
        <CardDescription>{scoreText} - Your resume has been evaluated across several key dimensions</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={score} className="h-2 mb-2" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Needs Work</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Full Report
        </Button>
      </CardFooter>
    </Card>
  );
}

function SectionAnalysis() {
  const sections = [
    {
      name: "Professional Summary",
      score: 85,
      feedback: "Well-written, but could be more targeted to the specific job",
    },
    { name: "Work Experience", score: 70, feedback: "Good structure, but lacks quantifiable achievements" },
    { name: "Skills", score: 90, feedback: "Excellent match with industry requirements" },
    { name: "Education", score: 80, feedback: "Well-formatted, relevant coursework included" },
    { name: "Projects", score: 60, feedback: "Need more details about your role and technologies used" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Section Analysis</CardTitle>
        <CardDescription>Performance breakdown by section</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{section.name}</span>
                <span className="text-sm font-medium">{section.score}%</span>
              </div>
              <Progress value={section.score} className="h-2 mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">{section.feedback}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KeywordAnalysis() {
  const keywords = [
    { name: "JavaScript", present: true },
    { name: "React", present: true },
    { name: "Node.js", present: true },
    { name: "TypeScript", present: false },
    { name: "API Development", present: true },
    { name: "AWS", present: false },
    { name: "CI/CD", present: false },
    { name: "Agile", present: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Analysis</CardTitle>
        <CardDescription>Matching your resume with job market requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {keywords.map((keyword) => (
            <div
              key={keyword.name}
              className={`p-2 rounded-md border text-center text-sm ${
                keyword.present
                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {keyword.present ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-red-500" />
                )}
                <span>{keyword.name}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Our AI scanned job descriptions in your target industry and identified these keywords. Consider adding missing
          keywords to your resume where relevant.
        </p>
      </CardContent>
    </Card>
  );
}

function RecommendedActions() {
  const recommendations = [
    "Add more quantifiable achievements to your work experience section",
    "Include TypeScript in your skills section if you have experience with it",
    "Add some AWS experience or certifications if applicable",
    "Make your bullet points more concise and action-oriented",
    "Consider adding a projects section to showcase your hands-on experience",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Actions</CardTitle>
        <CardDescription>Key improvements to make your resume stand out</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary font-medium">{index + 1}</span>
              </div>
              <span className="text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply AI Suggestions</Button>
      </CardFooter>
    </Card>
  );
}