import { useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
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
            let newMessages = [...prevMessages.slice(0, -1), { ...lastMessage, content: formattedResponse.slice(0, index + 1) }];
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
        { role: "assistant", content: "An error occurred. Please try again later." },
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

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col h-[calc(100vh-150px)] max-h-[800px]">
              <div className="mb-4">
                <h1 className="text-3xl font-bold">Ask AI Career Assistant</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Get instant answers to your career and interview questions
                </p>
              </div>

              <Card className="flex-1 flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((message, index) => (
    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div 
        className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
      >
        <Avatar className="h-8 w-8">
          {message.role === "user" ? (
            <>
              <AvatarFallback>U</AvatarFallback>
              <AvatarImage src="/placeholder.svg" />
            </>
          ) : (
            <>
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/placeholder.svg" />
            </>
          )}
        </Avatar>

       
        <div 
  className={`rounded-lg px-4 py-2 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
  style={{ 
    maxWidth: "100%",  
    maxHeight: "150px",  
    overflowY: "auto",  
    wordBreak: "break-word",  
    overflowWrap: "break-word",  
    whiteSpace: "pre-wrap",  
    scrollbarWidth: "none", /* Firefox */
    msOverflowStyle: "none", /* IE */
  }}
>
  <div className="hide-scrollbar" dangerouslySetInnerHTML={{ __html: message.content }} />
</div>

      </div>
    </div>
  ))}

 
  {isLoading && (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[80%]">
        <Avatar className="h-8 w-8">
          <AvatarFallback>AI</AvatarFallback>
          <AvatarImage src="/placeholder.svg" />
        </Avatar>
        <div className="rounded-lg px-4 py-2 bg-muted">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )}
</CardContent>



                <CardFooter className="p-4 pt-0">
                  <div className="flex w-full gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask a question about interviews, resumes, or career advice..."
                      className="min-h-[60px] flex-1"
                    />
                    <Button onClick={handleSend} disabled={!input.trim() || isLoading} size="icon" className="h-[60px] w-[60px]">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Suggested Questions</h2>
            <div className="space-y-3">
              <SuggestedQuestion icon={<Bot className="h-4 w-4" />} question="How should I prepare for a technical interview?" setInput={setInput} />
              <SuggestedQuestion icon={<Bot className="h-4 w-4" />} question="What are the most common behavioral interview questions?" setInput={setInput} />
              <SuggestedQuestion icon={<Bot className="h-4 w-4" />} question="How do I negotiate a higher salary?" setInput={setInput} />
              <SuggestedQuestion icon={<Bot className="h-4 w-4" />} question="What skills are most in-demand for software engineers?" setInput={setInput} />
              <SuggestedQuestion icon={<Bot className="h-4 w-4" />} question="How can I make my resume stand out?" setInput={setInput} />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">AI Career Tips</h2>
              <div className="space-y-4">
                <TipCard icon={<Lightbulb className="h-5 w-5 text-yellow-500" />} title="Research the Company" content="Always research the company before an interview." />
                <TipCard icon={<Lightbulb className="h-5 w-5 text-yellow-500" />} title="Prepare for Common Questions" content="Have answers ready for questions like 'Tell me about yourself'." />
                <TipCard icon={<Lightbulb className="h-5 w-5 text-yellow-500" />} title="Practice Technical Skills" content="Regularly practice coding problems to stay sharp." />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function SuggestedQuestion({ icon, question, setInput }) {
  return (
    <Button variant="outline" className="w-full justify-start text-left h-auto py-3" onClick={() => setInput(question)}>
      {icon}
      <span className="ml-2 text-sm">{question}</span>
    </Button>
  );
}

function TipCard({ icon, title, content }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
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