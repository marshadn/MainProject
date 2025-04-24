import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  ChevronRight,
  CheckCircle,
  FileText,
  BrainCircuit,
  BarChart3,
  MessageSquare,
  Plus,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

const images = [
  "/res2.svg",
  "/resume.svg",
  "/int3.svg",
  "/int5.svg",
  "/int6.svg",
];

export default function Home() {
  const words = ["confidently.", "effortlessly.", "like a pro."];
  const [index, setIndex] = useState(0);
  const [indexx, setIndexx] = useState(0);
  const [currentText, setCurrentText] = useState(
    "Comprehensive Interview Preparation"
  );
  const textArray = [
    "Comprehensive Interview Preparation",
    "Personalized Mock Interviews",
    "Resume Analyzer & Builder",
    "Real-Time Industry Insights",
    "AI-Powered Career Advice",
    "Skills Assessment and Development",
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    const imageInterval = setInterval(() => {
      setIndexx((prevIndexx) => (prevIndexx + 1) % images.length);
    }, 5000);

    const textInterval = setInterval(() => {
      setCurrentText((prevText) => {
        const nextIndex = (textArray.indexOf(prevText) + 1) % textArray.length;
        return textArray[nextIndex];
      });
    }, 3000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(imageInterval);
      clearInterval(textInterval);
    };
  }, []);

  const [resumeData] = useState({
    personalInfo: {},
    experience: [],
    projects: [],
    education: [],
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <section
        ref={ref}
        className="relative w-full h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: yBg,
            backgroundImage: "url('/grid-pattern.svg')",
            backgroundSize: "cover",
            opacity: 0.1,
          }}
        />

        <div className="container px-4 md:px-6 relative z-10 h-full flex items-center">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-primary"
              >
                Ace Your Next Interview{" "}
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-blue-500 bg-clip-text  bg-gradient-to-r from-blue-400 to-indigo-600"
                >
                  {words[index]}
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400"
              >
                <Typewriter
                  words={[
                    "Prepare for success with AI-Powered mock interviews that help you stay confident and composed.",
                    "Get resume analysis and personalized feedback tailored to your strengths and areas for improvement.",
                    "Boost your confidence with our AI expert guidance and actionable insights to ace your next opportunity.",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={40}
                  deleteSpeed={10}
                  delaySpeed={800}
                />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Button size="lg" className="gap-1 group">
                  <Link to="/mock-interview" className="flex items-center">
                    Start Practice
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Link to="/features">Learn More</Link>
                </Button>
              </motion.div>
            </div>

            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[500px] h-[340px] overflow-hidden rounded-xl shadow-2xl">
                <motion.img
                  key={images[indexx]}
                  src={images[indexx]}
                  alt="Interview preparation"
                  className="absolute object-cover w-full h-full rounded-xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    duration: 1.2,
                    ease: [0.2, 0.8, 0.4, 1],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-gray-900/30 dark:to-gray-800/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-[length:80px_80px] opacity-5 dark:opacity-10"></div>
        </div>

        <div className="container px-20 md:px-16">
          <div className="text-center space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
            >
              {currentText}
            </motion.h2>{" "}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-[900px] text-gray-500 md:text-xl mx-auto dark:text-gray-400"
            >
              Everything you need to land your dream job in one platform.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Showcase Section  */}
      <FeaturesShowcase />
    </div>
  );
}

// Enhanced FeatureCard with staggered animations
function FeatureCard({ icon, title, description, link, delay = 0 }) {
  return (
    <Link to={link} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.03 }}
        className="group relative flex flex-col items-center rounded-2xl border-2 border-transparent p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="h-16 w-16 mb-4 flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-full transition-colors"
        >
          {icon}
        </motion.div>

        <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Running border effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-running-border"></div>
      </motion.div>
    </Link>
  );
}
// Features Showcase Section
function FeaturesShowcase() {
  const showcaseRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={showcaseRef}>
      {/* Features Showcase Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y }}>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 dark:opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-gray-800/30"></div>
        </motion.div>

        <div className="container px-4 md:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-4"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-[900px] mx-auto text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400 mb-12"
          >
            Discover how our platform helps you prepare for interviews and land
            your dream job
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {featureShowcases.map((feature, index) => (
              <FeatureShowcaseCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-primary dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-gray-900/30 dark:to-gray-800/30"></div>
        </div>

        <div className="container px-4 md:px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
          >
            Ready to Ace Your Interviews?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-[900px] mx-auto text-white/90  mt-4 md:text-xl lg:text-base xl:text-xl"
          >
            Accelerate your career journey with the platform future
            professionals trust
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-8"
          >
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="gap-1 group hover:scale-105 transition-transform"
              >
                Get Started For Free
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Feature Showcase Card Component
function FeatureShowcaseCard({ title, description, icon, mobileIcon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="hidden md:block p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {icon}
        </div>
        <div className="md:hidden p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          {mobileIcon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
}

const features = [
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Mock Interviews",
    description: "Interactive practice sessions with personalized feedback",
    link: "/mock-interview",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Resume Analysis",
    description: "AI-powered resume review with actionable suggestions",
    link: "/resume",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "Placement Quizzes",
    description: "Technical and HR quizzes with performance analysis",
    link: "/quizzes",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Ask AI Assistant",
    description: "Get instant answers to career and interview questions",
    link: "/ask-ai",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Industry Insights",
    description: "Stay updated with industry trends and hiring patterns",
    link: "/insights",
  },
  {
    icon: <Plus className="h-10 w-10 text-primary" />,
    title: "More Coming Soon",
    description: "We're constantly adding new features to help you succeed",
    link: "/more",
  },
];

const featureShowcases = [
  {
    title: "AI-Powered Mock Interviews",
    description:
      "Practice with our realistic AI interviewer that adapts to your responses and provides detailed feedback on your performance.",
    icon: (
      <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    ),
    mobileIcon: (
      <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    title: "Resume Optimization",
    description:
      "Get your resume analyzed by our AI to identify strengths and weaknesses with specific improvement suggestions.",
    icon: <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    mobileIcon: (
      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    title: "Technical Question Bank",
    description:
      "Access thousands of interview questions categorized by company, role, and difficulty level.",
    icon: <BrainCircuit className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    mobileIcon: (
      <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    title: "Behavioral Interview Prep",
    description:
      "Master the STAR method and common behavioral questions with our guided practice sessions.",
    icon: <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    mobileIcon: (
      <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    title: "Performance Analytics",
    description:
      "Track your progress over time with detailed metrics and personalized improvement recommendations.",
    icon: <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    mobileIcon: (
      <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    ),
  },
  {
    title: "Mobile-Friendly Practice",
    description:
      "Prepare anytime, anywhere with our mobile-optimized platform that works across all devices.",
    icon: <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
    mobileIcon: <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
  },
];
