import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ModeToggle } from "../components/mode-toggle";
import {
  Home,
  MessageSquare,
  Menu,
  Bot,
  Mic,
  FileSearch,
  Cpu,
  X,
  ChevronRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/Sheet";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "../components/ThemeProvider";

const iconMap = {
  "/": <Home className="h-5 w-5" />,
  "/mock-interview": <Mic className="h-5 w-5" />,
  "/resume": <FileSearch className="h-5 w-5" />,
  "/quizzes": <Cpu className="h-5 w-5" />,
  "/ask-ai": <MessageSquare className="h-5 w-5" />,
};

function MainNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/mock-interview", label: "Mock Interviews" },
    { path: "/resume", label: "Resume Analyzer" },
    { path: "/quizzes", label: "Quizzes" },
    { path: "/ask-ai", label: "Ask AI" },
  ];

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

function MobileNav({ isScrolled, navbarVisible, setIsSheetOpen, isSheetOpen }) {
  const location = useLocation();

  const handleNavClose = () => {
    setIsSheetOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/mock-interview", label: "Mock Interviews" },
    { path: "/resume", label: "Resume Analyzer" },
    { path: "/quizzes", label: "Quizzes" },
    { path: "/ask-ai", label: "Ask AI" },
  ];

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 md:hidden ${
        isScrolled
          ? "bg-background/90 backdrop-blur-sm border-b shadow-sm"
          : "bg-background"
      } ${navbarVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 group z-50">
          <Bot className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="inline-block font-bold text-base group-hover:text-primary transition-colors duration-300">
            AICareerPrep
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <ModeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-colors duration-300 hover:bg-primary/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5 max-w-xs p-0">
              <div className="flex flex-col h-full">
                <div className="pt-6 pb-2 px-4 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    onClick={handleNavClose}
                  ></Button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-4">
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent text-foreground"
                        }`}
                        onClick={handleNavClose}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-md ${
                              location.pathname === item.path
                                ? "bg-primary/20"
                                : "bg-muted"
                            }`}
                          >
                            {iconMap[item.path]}
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 ${
                            location.pathname === item.path
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-4 border-t">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={handleNavClose}
                    >
                      <Link to="/login" className="w-full flex justify-center">
                        Log in
                      </Link>
                    </Button>
                    <Button
                      className="w-full justify-center"
                      onClick={handleNavClose}
                    >
                      <Link
                        to="/register"
                        className="w-full flex justify-center"
                      >
                        Sign up
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function DesktopNav({ isScrolled, navbarVisible }) {
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 hidden md:block ${
        isScrolled
          ? "bg-background/90 backdrop-blur-sm border-b shadow-sm"
          : "bg-background"
      } ${navbarVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
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
        </div>
      </div>
    </header>
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  // Handle scroll behavior for both navbars
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // At the top of the page - show navbar
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down past threshold - hide navbar
        setNavbarVisible(false);
        if (isSheetOpen) setIsSheetOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isSheetOpen]);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <DesktopNav isScrolled={isScrolled} navbarVisible={navbarVisible} />

          <MobileNav
            isScrolled={isScrolled}
            navbarVisible={navbarVisible}
            setIsSheetOpen={setIsSheetOpen}
            isSheetOpen={isSheetOpen}
          />

          <main className="flex-1 pt-12">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default HomePage;
