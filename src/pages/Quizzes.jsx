import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, ArrowRight, Trophy, BookOpen, Layers, FileBarChart, Webhook } from "lucide-react";
import { useNavigate } from "react-router-dom";


function QuizCard({ title, icon, description, questions, time, difficulty }) {
  const navigate = useNavigate();
  
 
  const handleStartQuiz = () => {
    const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    navigate(`/quizzes/${formattedTitle}`, { state: { topic: title } });
  };
  
  

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          {icon}
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">{difficulty}</span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>{questions} Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleStartQuiz} className="w-full gap-1" >
          Start Quiz <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function QuizResult({ title, score, date, improvement }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">{score}%</span>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full">
          {improvement}
        </span>
        <Button variant="ghost" size="sm" className="ml-2">
          View
        </Button>
      </div>
    </div>
  );
}

function SkillBar({ skill, percentage }) {
  let barColor = "bg-yellow-500";

  if (percentage >= 90) {
    barColor = "bg-green-500";
  } else if (percentage >= 80) {
    barColor = "bg-green-400";
  } else if (percentage < 60) {
    barColor = "bg-red-500";
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function Quizzes() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Placement Quizzes & Analysis</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Test your knowledge with our comprehensive quizzes designed for technical and HR rounds. Get detailed analysis
        of your performance to identify strengths and areas for improvement.
      </p>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-2 mb-8">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="hr">HR & Aptitude</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuizCard
              title="Data Structures & Algorithms"
              icon={<Layers className="h-6 w-6 text-primary" />}
              description="Arrays, linked lists, trees, graphs, and common algorithms"
              questions={30}
              time="45 minutes"
              difficulty="Medium"
            />
            <QuizCard
              title="JavaScript Fundamentals"
              icon={<Webhook className="h-6 w-6 text-primary" />}
              description="Core concepts, ES6 features, closures, promises, and more"
              questions={25}
              time="30 minutes"
              difficulty="Easy to Medium"
            />
            <QuizCard
              title="React & Frontend"
              icon={<Webhook className="h-6 w-6 text-primary" />}
              description="Components, hooks, state and performance optimization"
              questions={20}
              time="25 minutes"
              difficulty="Medium"
            />
            <QuizCard
              title="Database & SQL"
              icon={<FileBarChart className="h-6 w-6 text-primary" />}
              description="Relational databases, queries, indexes, and normalization"
              questions={25}
              time="30 minutes"
              difficulty="Medium"
            />
            <QuizCard
              title="System Design"
              icon={<FileBarChart className="h-6 w-6 text-primary" />}
              description="Architecture, scalability, databases, and distributed systems"
              questions={15}
              time="45 minutes"
              difficulty="Hard"
            />
            <QuizCard
              title="Operating Systems"
              icon={<Layers className="h-6 w-6 text-primary" />}
              description="Processes, threads, scheduling, memory and file systems"
              questions={30}
              time="40 minutes"
              difficulty="Medium to Hard"
            />
          </div>
        </TabsContent>

        <TabsContent value="hr" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuizCard
              title="Aptitude & Reasoning"
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              description="Quantitative aptitude, logical reasoning, and problem-solving"
              questions={30}
              time="30 minutes"
              difficulty="Medium"
            />
            <QuizCard
              title="Verbal & Communication"
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              description="English grammar, vocabulary, and effective communication"
              questions={25}
              time="25 minutes"
              difficulty="Easy to Medium"
            />
            <QuizCard
              title="Behavioral Questions"
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              description="Common HR questions and scenarios to test your responses"
              questions={20}
              time="30 minutes"
              difficulty="Medium"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Your Quiz Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
              <CardDescription>View performance trends across different quiz categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <QuizResult title="JavaScript Fundamentals" score={85} date="1 day ago" improvement="+7%" />
                <QuizResult title="Data Structures & Algorithms" score={72} date="3 days ago" improvement="+12%" />
                <QuizResult title="Aptitude & Reasoning" score={90} date="1 week ago" improvement="+5%" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Quiz History
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Your strengths and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <SkillBar skill="Problem Solving" percentage={85} />
                <SkillBar skill="Algorithms" percentage={70} />
                <SkillBar skill="Front-end Development" percentage={92} />
                <SkillBar skill="Database" percentage={65} />
                <SkillBar skill="Communication" percentage={80} />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Detailed Analysis
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-3">Practice Makes Perfect</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Our quizzes are designed to simulate actual placement tests. Regular practice will improve your speed,
              accuracy, and confidence. Start with topics where you need the most improvement.
            </p>
            <Button className="mt-2">Create Custom Quiz</Button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Top 10%</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your ranking among all users in JavaScript quizzes
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">18 Quizzes</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed in the last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quizzes;