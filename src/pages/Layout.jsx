import React from "react";
import "./styles.css";
import { ThemeProvider } from "../components/theme-provider";
import { Link } from "react-router-dom"; // Keep only Link
import { Button } from "../components/ui/Button";
import { ModeToggle } from "../components/mode-toggle";
import { Home, FileText, BrainCircuit, BarChart3, MessageSquare, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/Sheet";

function MobileNavItem({ href, icon, title }) {
  return (
    <Button variant="ghost" className="justify-start">
      <Link to={href}>
        {icon}
        {title}
      </Link>
    </Button>
  );
}

function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10 border-none shadow-none">
      <Link to="/" className="flex items-center space-x-2">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">AICareerPrep</span>
      </Link>
      <nav className="hidden gap-6 md:flex border-none shadow-none">
      <Link
          to="/"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Home
        </Link>
        <Link
          to="/mock-interview"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Mock Interviews
        </Link>
        <Link
          to="/resume"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Resume Analyzer
        </Link>
        <Link
          to="/quizzes"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Quizzes
        </Link>
        <Link
          to="/ask-ai"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Ask AI
        </Link>
        <Link
          to="/insights"
          className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Industry Insights
        </Link>
      </nav>
    </div>
  );
}


function Footer() {
  return (
    <footer className="w-full ">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 AICareerPrep All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ children }) {  
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          {/* <header className="sticky top-0 z-40 w-full border-b bg-background"> */}
            <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
              <MainNav />
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex">
                  <Button variant="ghost">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button>
                    <Link to="/register">Sign up</Link>
                  </Button>
                </div>
                <ModeToggle />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="grid gap-4 py-4">
                      <MobileNavItem href="/" icon={<Home className="mr-2 h-4 w-4" />} title="Home" />
                      <MobileNavItem href="/mock-interview" icon={<User className="mr-2 h-4 w-4" />} title="Mock Interviews" />
                      <MobileNavItem href="/resume" icon={<FileText className="mr-2 h-4 w-4" />} title="Resume Builder" />
                      <MobileNavItem href="/quizzes" icon={<BrainCircuit className="mr-2 h-4 w-4" />} title="Quizzes" />
                      <MobileNavItem href="/ask-ai" icon={<MessageSquare className="mr-2 h-4 w-4" />} title="Ask AI" />
                      <MobileNavItem href="/insights" icon={<BarChart3 className="mr-2 h-4 w-4" />} title="Industry Insights" />
                      <div className="flex flex-col space-y-2 mt-4 pt-4 border-t">
                        <Button variant="outline">
                          <Link to="/login">Log in</Link>
                        </Button>
                        <Button>
                          <Link to="/register">Sign up</Link>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          {/* </header> */}
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default HomePage;
