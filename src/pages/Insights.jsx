import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BarChart, TrendingUp, Award, Download, LinkIcon, Building } from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Insights() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Industry Insights</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
        Stay updated with the latest industry trends, in-demand skills, and hiring patterns. Make data-driven decisions
        to advance your career.
      </p>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="skills">Skills in Demand</TabsTrigger>
          <TabsTrigger value="salary">Salary Insights</TabsTrigger>
          <TabsTrigger value="companies">Top Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Hiring Trends by Industry (2025)</CardTitle>
                <CardDescription>Job market growth across major tech sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={hiringTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="growth" fill="#4f46e5" name="Growth %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <p className="text-xs text-gray-500 dark:text-gray-400">Source: Industry Analysis, January 2025</p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>What's driving the tech job market</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">AI & Machine Learning Growth</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      27% increase in AI roles, with particular demand in healthcare and finance sectors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Remote Work Transformation</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      65% of tech companies now offer permanent remote or hybrid positions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Cybersecurity Skills Gap</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Critical shortage of qualified cybersecurity professionals continues.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Web3 & Blockchain</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Despite market fluctuations, demand for blockchain developers remains strong.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Full Industry Report</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <StatCard title="Tech Job Growth" value="12.4%" description="Year-over-year increase" trend="up" />
            <StatCard
              title="Average Interview Process"
              value="3.2 weeks"
              description="From application to offer"
              trend="down"
            />
            <StatCard title="Remote Work Positions" value="65%" description="Of new tech job postings" trend="up" />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Industry News & Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NewsCard
                title="Tech Giants Expand Hiring for AI Divisions"
                summary="Major tech companies are significantly expanding their AI research and development teams."
                source="Tech Chronicle"
                date="February 28, 2025"
              />
              <NewsCard
                title="Remote Work Policies Evolve Post-Pandemic"
                summary="Companies are refining their remote work policies with new hybrid models becoming standard."
                source="Business Insider"
                date="February 15, 2025"
              />
              <NewsCard
                title="New Certification Programs Address Skills Gap"
                summary="Industry leaders collaborate on new certification programs to address the growing tech skills gap."
                source="Education Technology"
                date="January 30, 2025"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>In-Demand Technical Skills (2025)</CardTitle>
                <CardDescription>Most requested skills in job postings across tech sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={technicalSkillsData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="skill" />
                      <Tooltip />
                      <Bar dataKey="demand" fill="#4f46e5" name="Demand Score" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explore Skills in Detail</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soft Skills Breakdown</CardTitle>
                <CardDescription>Non-technical skills valued by employers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={softSkillsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {softSkillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500 dark:text-gray-400 w-full text-center">
                  Based on analysis of 10,000+ job descriptions
                </p>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Trending Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CertificationCard
                title="AWS Certified Solutions Architect"
                organization="Amazon Web Services"
                difficulty="Intermediate"
                popularity="Very High"
              />
              <CertificationCard
                title="Google Data Analytics Professional"
                organization="Google"
                difficulty="Beginner to Intermediate"
                popularity="High"
              />
              <CertificationCard
                title="Azure AI Engineer Associate"
                organization="Microsoft"
                difficulty="Advanced"
                popularity="Very High"
              />
              <CertificationCard
                title="Certified Information Security Manager"
                organization="ISACA"
                difficulty="Advanced"
                popularity="High"
              />
            </div>
          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-3">Skill Gap Analysis</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Compare your skills against current market demands. Our AI analysis will identify your strongest areas
                  and opportunities for growth based on real job market data.
                </p>
                <Button className="mt-2">Analyze My Skills</Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="salary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Salary Ranges by Experience (Software Engineering)</CardTitle>
                <CardDescription>Average annual compensation in USD, based on experience level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={salaryRangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="min" fill="#818cf8" name="Minimum" />
                      <Bar dataKey="max" fill="#4f46e5" name="Maximum" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500 dark:text-gray-400 w-full text-center">
                  Data sourced from industry surveys and job postings as of March 2025
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Negotiation Tips</CardTitle>
                <CardDescription>How to secure the best compensation package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Research Thoroughly</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Know the salary range for your role, location, and experience level.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Highlight Value</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Clearly articulate how your skills will benefit the company.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Consider the Full Package</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Evaluate benefits, stock options, work-life balance, and growth opportunities.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Personalized Advice</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Salary Insights by Role</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SalaryCard role="Software Engineer" median="$120,000" range="$90,000 - $160,000" growth="+8% YoY" />
              <SalaryCard role="Data Scientist" median="$135,000" range="$110,000 - $180,000" growth="+12% YoY" />
              <SalaryCard role="DevOps Engineer" median="$125,000" range="$100,000 - $165,000" growth="+10% YoY" />
              <SalaryCard role="Product Manager" median="$140,000" range="$115,000 - $190,000" growth="+7% YoY" />
            </div>
          </div>

          <div className="mt-8 p-6 bg-primary text-white rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-3">Personalized Salary Calculator</h2>
                <p className="text-primary-foreground mb-4">
                  Get an accurate salary estimate based on your skills, experience, location, and current market
                  conditions.
                </p>
                <Button variant="secondary" className="mt-2">
                  Calculate Your Worth
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-white/10 flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Top Hiring Companies</h2>
              <div className="space-y-4">
                <CompanyCard
                  name="TechInnovate Inc."
                  industry="Software & Cloud Services"
                  openings={120}
                  rating={4.7}
                  growth="Rapid growth"
                />
                <CompanyCard
                  name="DataSphere Analytics"
                  industry="Data & AI"
                  openings={85}
                  rating={4.5}
                  growth="Established leader"
                />
                <CompanyCard
                  name="NextGen Health Tech"
                  industry="Healthcare Technology"
                  openings={65}
                  rating={4.3}
                  growth="Expanding"
                />
                <CompanyCard
                  name="SecureNet Systems"
                  industry="Cybersecurity"
                  openings={40}
                  rating={4.6}
                  growth="Fast-growing"
                />
                <CompanyCard
                  name="Quantum Finance"
                  industry="Fintech"
                  openings={55}
                  rating={4.2}
                  growth="Stable growth"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Emerging Startups to Watch</h2>
              <div className="space-y-4">
                <StartupCard
                  name="AI Copilot"
                  focus="AI productivity tools"
                  funding="$25M Series A"
                  founded="2023"
                  location="San Francisco, CA"
                />
                <StartupCard
                  name="BlockSecure"
                  focus="Blockchain security"
                  funding="$12M Seed"
                  founded="2024"
                  location="Austin, TX"
                />
                <StartupCard
                  name="HealthSync"
                  focus="Healthcare data interoperability"
                  funding="$18M Series A"
                  founded="2023"
                  location="Boston, MA"
                />
                <StartupCard
                  name="EcoTech Solutions"
                  focus="Sustainable technology"
                  funding="$15M Series A"
                  founded="2022"
                  location="Seattle, WA"
                />
                <StartupCard
                  name="EdTech Innovators"
                  focus="AI-powered education"
                  funding="$10M Seed"
                  founded="2024"
                  location="New York, NY"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Company Culture & Benefits Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TrendCard
                title="Flexible Work Arrangements"
                description="85% of top tech companies now offer permanent flexible work options, including remote, hybrid, and 4-day workweek pilots."
                icon={<TrendingUp className="h-5 w-5" />}
              />
              <TrendCard
                title="Mental Health Benefits"
                description="Comprehensive mental health support is becoming standard, with 72% of companies expanding their wellness programs."
                icon={<TrendingUp className="h-5 w-5" />}
              />
              <TrendCard
                title="Continuous Learning"
                description="Companies are investing more in employee development, with average education stipends increasing by 35% since 2023."
                icon={<TrendingUp className="h-5 w-5" />}
              />
            </div>
          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-3">Company Research Tool</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Get comprehensive insights on any company, including culture, interview process, and compensation
                  details from real employees.
                </p>
                <Button className="mt-2">Research Companies</Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components

function StatCard({ title, value, description, trend }) {
  const trendIcon =
    trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
    );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
          {trendIcon}
        </div>
      </CardContent>
    </Card>
  );
}

function NewsCard({ title, summary, source, date }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{summary}</p>
        <div className="flex justify-between items-center text-xs">
          <span className="font-medium">{source}</span>
          <span className="text-gray-500 dark:text-gray-400">{date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full gap-1">
          <LinkIcon className="h-3 w-3" />
          Read Full Article
        </Button>
      </CardFooter>
    </Card>
  );
}

function CertificationCard({ title, organization, difficulty, popularity }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{organization}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
            <p className="font-medium">{difficulty}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Demand</p>
            <p className="font-medium">{popularity}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full gap-1">
          <Award className="h-3 w-3" />
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}

function SalaryCard({ role, median, range, growth }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{role}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Median Salary</p>
            <p className="text-2xl font-bold">{median}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Range</p>
            <p className="font-medium">{range}</p>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">{growth}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CompanyCard({ name, industry, openings, rating, growth }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{industry}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Open Positions</p>
            <p className="font-medium">{openings}+</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Rating</p>
            <p className="font-medium flex items-center gap-1">
              {rating} <Award className="h-3 w-3 text-yellow-500" />
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Status</p>
            <p className="font-medium">{growth}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View Jobs
        </Button>
      </CardFooter>
    </Card>
  );
}

function StartupCard({ name, focus, funding, founded, location }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{focus}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Funding</p>
            <p className="font-medium">{funding}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Founded</p>
            <p className="font-medium">{founded}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Location</p>
            <p className="font-medium">{location}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Company Profile
        </Button>
      </CardFooter>
    </Card>
  );
}

function TrendCard({ title, description, icon }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}

// Data for charts and visualizations

const hiringTrendsData = [
  { industry: "AI & ML", growth: 27 },
  { industry: "Cloud Computing", growth: 18 },
  { industry: "Cybersecurity", growth: 22 },
  { industry: "Data Science", growth: 20 },
  { industry: "Web3", growth: 15 },
  { industry: "DevOps", growth: 17 },
  { industry: "AR/VR", growth: 12 },
];

const technicalSkillsData = [
  { skill: "Python", demand: 92 },
  { skill: "Cloud (AWS/Azure/GCP)", demand: 85 },
  { skill: "Machine Learning", demand: 78 },
  { skill: "JavaScript", demand: 75 },
  { skill: "Data Engineering", demand: 72 },
  { skill: "DevOps/CI/CD", demand: 68 },
  { skill: "Cybersecurity", demand: 65 },
];

const softSkillsData = [
  { name: "Communication", value: 28 },
  { name: "Problem Solving", value: 22 },
  { name: "Teamwork", value: 18 },
  { name: "Adaptability", value: 16 },
  { name: "Leadership", value: 12 },
  { name: "Time Management", value: 4 },
];

const COLORS = ["#4f46e5", "#818cf8", "#c4b5fd", "#ddd6fe", "#ede9fe", "#f5f3ff"];

const salaryRangeData = [
  { level: "Junior (0-2 yrs)", min: 80000, max: 120000 },
  { level: "Mid (3-5 yrs)", min: 110000, max: 160000 },
  { level: "Senior (6-9 yrs)", min: 140000, max: 210000 },
  { level: "Lead (10+ yrs)", min: 180000, max: 280000 },
]