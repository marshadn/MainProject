import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Users, Building, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InterviewCard({ title, description, icon, level, time }) {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    const encodedTitle = encodeURIComponent(title); // Encode the topic for URL safety
    navigate(`/mock-interview/${encodedTitle}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Level</p>
            <p className="font-medium">{level}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Duration</p>
            <p className="font-medium">{time}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleStartInterview}>
          Start Interview <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function MockInterview() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Mock Interview Practice</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Practice with realistic interview scenarios tailored to your target role. Receive instant feedback and
        suggestions to improve your performance.
      </p>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="industry">Industry-Specific</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InterviewCard
              title="Data Structures & Algorithms"
              description="Practice common DSA interview questions with challenges."
              icon={<Code className="h-5 w-5" />}
              level="Intermediate"
              time="45 minutes"
            />
            <InterviewCard
              title="System Design"
              description="Design scalable systems and discuss architectural decisions."
              icon={<Code className="h-5 w-5" />}
              level="Advanced"
              time="60 minutes"
            />
            <InterviewCard
              title="Frontend Development"
              description="Build UI components and try to some solve JavaScript challenges."
              icon={<Code className="h-5 w-5" />}
              level="Beginner to Advanced"
              time="45 minutes"
            />
            <InterviewCard
              title="Backend Development"
              description="Database design, API architecture, and server-side concepts."
              icon={<Code className="h-5 w-5" />}
              level="Intermediate"
              time="50 minutes"
            />
            <InterviewCard
              title="Machine Learning"
              description="ML algorithms, data preprocessing, and model evaluation."
              icon={<Code className="h-5 w-5" />}
              level="Advanced"
              time="60 minutes"
            />
            <InterviewCard
              title="DevOps"
              description="CI/CD pipelines, containerization, and infrastructure as code."
              icon={<Code className="h-5 w-5" />}
              level="Intermediate"
              time="45 minutes"
            />
          </div>
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InterviewCard
              title="Leadership & Teamwork"
              description="Questions about team dynamics, conflict resolution, and leadership."
              icon={<Users className="h-5 w-5" />}
              level="All Levels"
              time="30 minutes"
            />
            <InterviewCard
              title="Problem Solving"
              description="Situational questions to assess your problem-solving approach."
              icon={<Users className="h-5 w-5" />}
              level="All Levels"
              time="30 minutes"
            />
            <InterviewCard
              title="Communication Skills"
              description="Assess and improve your ability to communicate complex ideas."
              icon={<Users className="h-5 w-5" />}
              level="All Levels"
              time="25 minutes"
            />
          </div>
        </TabsContent>

        <TabsContent value="hr" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InterviewCard
              title="General HR Questions"
              description="Common questions about your background, aspirations, and fit."
              icon={<Building className="h-5 w-5" />}
              level="All Levels"
              time="30 minutes"
            />
            <InterviewCard
              title="Salary Negotiations"
              description="Practice discussing compensation packages and benefits."
              icon={<Building className="h-5 w-5" />}
              level="All Levels"
              time="20 minutes"
            />
            <InterviewCard
              title="Company Research"
              description="Demonstrate your knowledge about target companies and industries."
              icon={<Building className="h-5 w-5" />}
              level="All Levels"
              time="25 minutes"
            />
          </div>
        </TabsContent>

        <TabsContent value="industry" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InterviewCard
              title="Healthcare Tech"
              description="Specialized questions for roles in healthcare technology."
              icon={<BookOpen className="h-5 w-5" />}
              level="Industry Specific"
              time="45 minutes"
            />
            <InterviewCard
              title="Fintech"
              description="Financial technology domain knowledge and applications."
              icon={<BookOpen className="h-5 w-5" />}
              level="Industry Specific"
              time="45 minutes"
            />
            <InterviewCard
              title="E-commerce"
              description="Online retail concepts, user experience, and conversions."
              icon={<BookOpen className="h-5 w-5" />}
              level="Industry Specific"
              time="40 minutes"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Select Interview Type</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose from different interview formats based on your target role
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Practice with AI</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Engage in a realistic interview with our AI interviewer
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Get Personalized Feedback</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive detailed feedback and suggestions for improvement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;