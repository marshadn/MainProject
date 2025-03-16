import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button"; // Ensure correct path
import {
  ChevronRight,
  CheckCircle,
  FileText,
  BrainCircuit,
  BarChart3,
  MessageSquare,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
const images = [
  "/res2.svg",
  "/resume.svg",
  "/int3.svg",
  "/int5.svg",
  "/int6.svg",
];
export default function Home() {
  const words = ["confidently.", "effortlessly.", "like a pro."]; // Words to cycle through
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const [indexx, setIndexx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexx((prevIndexx) => {
        console.log("Current image:", images[(prevIndexx + 1) % images.length]);
        return (prevIndexx + 1) % images.length;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    experience: [],
    projects: [],
    education: [], // ✅ Add education to prevent undefined errors
  });
  return (
    <div className="flex flex-col min-h-screen ">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }} // Start invisible & slightly below
                animate={{ opacity: 1, y: 0 }} // Fade in & move up
                transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-primary"
              >
                Ace Your Next Interview{" "}
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }} // Starts lower for more effect
                  animate={{ opacity: 1, y: 0 }} // Moves up naturally
                  exit={{ opacity: 0, y: 30 }} // Moves down before disappearing
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-blue-500"
                >
                  {words[index]}
                </motion.span>
              </motion.h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                <Typewriter
                  words={[
                    "Prepare for success with AI-Powered mock interviews that  helping you stay confident and composed.",
                    "Get resume analysis and personalized feedback tailored to your strengths and areas for improvement, ensuring you stand out to recruiters.",
                    "Boost your confidence with our AI expert guidance, structured learning, and actionable insights to help you ace your next big opportunity.",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={40} // Normal typing speed
                  deleteSpeed={10} // Much faster deletion
                  delaySpeed={800} // Shorter pause before typing next sentence
                />
              </p>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  <Link to="/mock-interview" className="flex items-center">
                    Start Practice <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[500px] h-[340px] overflow-hidden rounded-xl shadow-xl">
                <motion.img
                  key={images[indexx]}
                  src={images[indexx]}
                  alt="Interview preparation"
                  className="absolute object-cover w-full h-full rounded-xl"
                  initial={{ x: "100%" }} // Start offscreen (right)
                  animate={{ x: 0 }} // Move to center
                  exit={{ x: "-100%" }} // Move offscreen (left)
                  transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth effect
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }} // Ensures animation runs once when 30% is visible
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
            >
              Comprehensive Interview Preparation
            </motion.h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl mx-auto dark:text-gray-400">
              Everything you need to land your dream job in one platform.
            </p>
          </div>
          <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      {/* ✅ Add the missing Testimonials and CTA sections here */}
      <TestimonialsSection />
    </div>
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
    description:
      "Stay updated with industry trends, skills in demand, and hiring patterns",
    link: "/insights",
  },
  {
    icon: <Plus className="h-10 w-10 text-primary" />,
    title: "More Coming Soon",
    description:
      "Stay updated with more, we are constanly updating new features",
    link: "/insights",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Software Engineer at Google",
    quote:
      "The mock interviews were incredibly realistic. I felt prepared for every question in my actual interviews.",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "David Chen",
    company: "Product Manager at Amazon",
    quote:
      "The resume analysis helped me highlight the right skills and experiences. I received multiple interview calls after the revisions.",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Priya Sharma",
    company: "Data Scientist at Microsoft",
    quote:
      "The technical quizzes helped me identify my weak areas and focus my preparation. Highly recommended!",
    image: "/placeholder.svg?height=64&width=64",
  },
];

function TestimonialsSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Success Stories
          </h2>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
            See how our platform has helped candidates land their dream jobs.
          </p>
        </div>

        {/* Full-Width Scrolling Testimonials */}
        <div className="relative w-full mt-12 overflow-hidden">
          <motion.div
            className="flex w-max gap-6"
            initial={{ x: "10%" }}
            animate={{ x: isHovered ? "0%" : "-100%" }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 0 : 25, // Slower movement, stops on hover
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

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary dark:bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Ready to Ace Your Interviews?
          </h2>
          <p className="max-w-[900px] mx-auto text-white md:text-xl lg:text-base xl:text-xl">
            Join thousands of candidates who have successfully prepared with our
            platform.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="gap-1">
                Get Started For Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
function TestimonialCard({ name, company, quote, image }) {
  return (
    <div className="w-64 h-64 flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="relative h-16 w-14 rounded-full   overflow-hidden">
        <img
          src="/placeholder.svg"
          alt="User"
          className="object-cover rounded-full w-16 h-16"
        />
      </div>
      <p className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
        "{quote}"
      </p>
      <h4 className="mt-2 text-base font-semibold">{name}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{company}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Link to={link} className="block">
      <div className="flex flex-col items-center rounded-lg border bg-lightCard dark:bg-darkCard p-6 text-center shadow-sm hover:shadow-md transition-all dark:border-gray-800">
        <div className="h-20 w-20 flex items-center justify-center bg-primary/10 rounded-full">
          {icon}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-lightText dark:text-darkText">
          {title}
        </h3>
        <p className="mt-2 text-sm text-lightSecondary dark:text-darkSecondary">
          {description}
        </p>
      </div>
    </Link>
  );
}
