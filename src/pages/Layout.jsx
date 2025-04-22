import React, { useState } from "react";
import { Link } from "react-router-dom"; // Keep only Link
import { Button } from "../components/ui/Button";
import { ModeToggle } from "../components/mode-toggle";
import {
  Home,
  FileText,
  BrainCircuit,
  BarChart3,
  MessageSquare,
  User,
  Menu,
  Bot,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/Sheet";
import { useLocation } from "react-router-dom"; // Import useLocation
import { ThemeProvider } from "../components/ThemeProvider"; // Ensure ThemeProvider is correctly imported
import "./styles.css"; // Make sure styles.css exists

function MobileNavItem({ href, icon, title, onNavigate }) {
  return (
    <Button
      variant="ghost"
      className="justify-start w-full"
      onClick={onNavigate}
    >
      <Link to={href} className="flex items-left w-full">
        {icon}
        <span className="ml-2">{title}</span>
      </Link>
    </Button>
  );
}

const navItems = [
  { path: "/", label: "Home" },
  { path: "/mock-interview", label: "Mock Interviews" },
  { path: "/resume", label: "Resume Analyzer" },
  { path: "/quizzes", label: "Quizzes" },
  { path: "/ask-ai", label: "Ask AI" },
  { path: "/insights", label: "Industry Insights" },
];

function MainNav() {
  const location = useLocation(); // Correct useLocation usage

  return (
    <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 border-none shadow-none w-full">
      <Link to="/" className="flex items-center space-x-2 group">
        <Bot className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
        <span className="inline-block font-bold text-base group-hover:text-primary transition-colors duration-300">
          AICareerPrep
        </span>
      </Link>

      <nav className="hidden gap-6 md:flex items-center justify-center w-full border-none shadow-none">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative flex items-center text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                location.pathname === item.path
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Bot className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 AICareerPrep All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy
          </Link>
          <Link
            to="/contact"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ children }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Add useState for managing sheet open state
  const [isScrolled, setIsScrolled] = useState(false); // Add useState for scroll state

  // Function to close mobile menu when navigation occurs
  const handleMobileNavigation = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ${
              isScrolled
                ? "border-b bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60"
                : "bg-background"
            }`}
          >
            <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
              <MainNav />
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    className="hover:scale-105 transition-transform duration-300"
                  >
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button className="hover:scale-105 transition-transform duration-300">
                    <Link to="/register">Sign up</Link>
                  </Button>
                </div>
                <ModeToggle />
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="grid gap-4 py-4">
                      {navItems.map((item) => (
                        <MobileNavItem
                          key={item.path}
                          href={item.path}
                          icon={<Home className="h-4 w-4" />}
                          title={item.label}
                          onNavigate={handleMobileNavigation}
                        />
                      ))}
                      <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleMobileNavigation}
                        >
                          <Link to="/login" className="w-full">
                            Log in
                          </Link>
                        </Button>
                        <Button
                          className="w-full"
                          onClick={handleMobileNavigation}
                        >
                          <Link to="/register" className="w-full">
                            Sign up
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default HomePage;
