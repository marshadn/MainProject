import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Send, Bot, Lightbulb, Bookmark } from "lucide-react";
import { generateGeminiResponse } from "../lib/GeminiAI";

function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI career assistant. Ask me anything about interviews, job applications, or career advice. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateGeminiResponse(input);

      const formattedResponse = aiResponse
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
        .replace(/\n- /g, "<br />• ") // Convert bullet points
        .replace(/\n/g, "<br />"); // Preserve line breaks

      let index = 0;
      setIsLoading(false);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "" }, // Start empty for typing effect
      ]);

      const interval = setInterval(() => {
        if (index < formattedResponse.length) {
          setMessages((prevMessages) => {
            let lastMessage = prevMessages[prevMessages.length - 1];
            let newMessages = [
              ...prevMessages.slice(0, -1),
              {
                ...lastMessage,
                content: formattedResponse.slice(0, index + 1),
              },
            ];
            return newMessages;
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 5); // Adjust speed here
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "An error occurred. Please try again later.",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container px-4 py-6 md:py-10 max-w-screen-xl mx-auto">
      {/* Main grid layout - reorganized for desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8">
        {/* Main Chat Area */}
        <div className="lg:col-span-6">
          <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] max-h-[800px]">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">
                Ask AI Career Assistant
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 md:mt-2">
                Get instant answers to your career and interview questions
              </p>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          {message.role === "user" ? (
                            <>
                              <AvatarFallback>U</AvatarFallback>
                              <AvatarImage src="/placeholder.svg" />
                            </>
                          ) : (
                            <>
                              <AvatarFallback>AI</AvatarFallback>
                              <AvatarImage
                                className="h-10 w-20"
                                src="/robo.png"
                              />
                            </>
                          )}
                        </Avatar>

                        <div
                          className={`rounded-lg px-4 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div
                            className="overflow-hidden"
                            dangerouslySetInnerHTML={{
                              __html: message.content,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback>AI</AvatarFallback>
                          <AvatarImage src="/placeholder.svg" />
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 bg-muted">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div
                              className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-0">
                <div className="flex w-full gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about interviews, resumes, or career advice..."
                    className="min-h-[60px] flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="h-[60px] w-[60px]"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Suggested Questions - Now on the right side for desktop */}
        <div className="lg:col-span-4 mt-12">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              Suggested Questions
            </h2>
            <div className="space-y-2 md:space-y-3">
              <SuggestedQuestion
                icon={<Bot className="h-4 w-4" />}
                question="How should I prepare for a technical interview?"
                setInput={setInput}
              />
              <SuggestedQuestion
                icon={<Bot className="h-4 w-4" />}
                question="What are the most common behavioral interview questions?"
                setInput={setInput}
              />
              <SuggestedQuestion
                icon={<Bot className="h-4 w-4" />}
                question="How do I negotiate a higher salary?"
                setInput={setInput}
              />
              <SuggestedQuestion
                icon={<Bot className="h-4 w-4" />}
                question="What skills are most in-demand for software engineers?"
                setInput={setInput}
              />
              <SuggestedQuestion
                icon={<Bot className="h-4 w-4" />}
                question="How can I make my resume stand out?"
                setInput={setInput}
              />
            </div>
          </div>
        </div>

        {/* AI Career Tips - Now below the chat area for desktop */}
        <div className="lg:col-span-12">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
            AI Career Tips
          </h2>
          {/* Grid layout for the tip cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TipCard
              icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
              title="Research the Company"
              content="Always research the company before an interview. Understanding their values, products, and culture will help you tailor your answers and demonstrate genuine interest."
            />
            <TipCard
              icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
              title="Prepare for Common Questions"
              content="Have answers ready for questions like 'Tell me about yourself'. Structure your response with your background, relevant experience, and why you're interested in the position."
            />
            <TipCard
              icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
              title="Practice Technical Skills"
              content="Regularly practice coding problems to stay sharp. Focus on data structures, algorithms, and system design principles that are commonly tested in technical interviews."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestedQuestion({ icon, question, setInput }) {
  return (
    <Button
      variant="outline"
      className="w-full justify-start text-left h-auto py-2 md:py-3"
      onClick={() => setInput(question)}
    >
      {icon}
      <span className="ml-2 text-sm line-clamp-1">{question}</span>
    </Button>
  );
}

function TipCard({ icon, title, content }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm md:text-base">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">{content}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="w-full gap-1">
          <Bookmark className="h-4 w-4" />
          Save Tip
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AskAI;
