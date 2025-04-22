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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    const imageInterval = setInterval(() => {
      setIndexx((prevIndexx) => (prevIndexx + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(wordInterval);
      clearInterval(imageInterval);
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
      {/* Hero Section with Parallax */}
      <section
        ref={ref}
        className="relative w-full h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
      >
        {/* Parallax background elements */}
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

        <div className="container px-4 md:px-6">
          <div className="text-center space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
            >
              Comprehensive Interview Preparation
            </motion.h2>
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

      <TestimonialsSection />
    </div>
  );
}

// Enhanced FeatureCard with staggered animations
function FeatureCard({ icon, title, description, link, delay = 0 }) {
  return (
    <Link to={link} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ y: -5, scale: 1.02 }}
        className="flex flex-col items-center rounded-lg border bg-lightCard dark:bg-darkCard p-6 text-center shadow-sm hover:shadow-lg transition-all dark:border-gray-800 group"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="h-20 w-20 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors"
        >
          {icon}
        </motion.div>
        <h3 className="mt-4 text-xl font-semibold text-lightText dark:text-darkText">
          {title}
        </h3>
        <p className="mt-2 text-sm text-lightSecondary dark:text-darkSecondary">
          {description}
        </p>
      </motion.div>
    </Link>
  );
}

// Enhanced TestimonialsSection with 3D card effect
function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const testimonialsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={testimonialsRef}>
      {/* Testimonials Section */}
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
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-[900px] mx-auto text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400"
          >
            See how our platform has helped candidates land their dream jobs.
          </motion.p>
        </div>

        {/* Enhanced Scrolling Testimonials */}
        <div className="relative w-full mt-12 overflow-hidden py-8">
          <motion.div
            className="flex w-max gap-8 px-4"
            initial={{ x: "10%" }}
            animate={{ x: isHovered ? "0%" : "-100%" }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0 : 25,
              ease: "linear",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              )
            )}
          </motion.div>
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
            Join thousands of candidates who have successfully prepared with our
            platform.
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

// Enhanced TestimonialCard with 3D tilt effect
function TestimonialCard({ name, company, quote, image }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="w-72 h-80 flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-800 dark:bg-gray-950 hover:shadow-xl transition-all"
    >
      <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary/20">
        <img
          src="/placeholder.svg"
          alt="User"
          className="object-cover rounded-full w-full h-full"
        />
      </div>
      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-400">
        "{quote}"
      </p>
      <h4 className="mt-4 text-base font-semibold">{name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{company}</p>
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
    link: "/insights",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Software Engineer at Google",
    quote:
      "The mock interviews were incredibly realistic. I felt prepared for every question in my actual interviews.",
    image: "/placeholder.svg",
  },
  {
    name: "David Chen",
    company: "Product Manager at Amazon",
    quote:
      "The resume analysis helped me highlight the right skills. I received multiple interview calls after the revisions.",
    image: "/placeholder.svg",
  },
  {
    name: "Priya Sharma",
    company: "Data Scientist at Microsoft",
    quote:
      "The technical quizzes helped me identify my weak areas and focus my preparation. Highly recommended!",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Rodriguez",
    company: "UX Designer at Apple",
    quote:
      "The AI assistant answered all my career questions instantly. Saved me hours of research!",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Wilson",
    company: "Marketing Specialist at Netflix",
    quote:
      "The industry insights helped me tailor my skills to exactly what employers were looking for.",
    image: "/placeholder.svg",
  },
];
