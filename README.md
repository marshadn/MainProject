# 🎯 AICareerPrep - Complete AI-Powered Career Preparation Platform

AICareerPrep is a modern, AI-enhanced career preparation platform designed to help students and professionals excel in interviews, build impressive resumes, and explore industry insights — all in one place.

![AICareerPrep Banner](public/int2.jpg)


## 🚀 Features

- 🤖 **AI Mock Interviews** - Practice with smart, interactive mock interview sessions powered by Google Gemini API.
- 🧠 **Quiz Generator** - Automatically generate quizzes to sharpen your skills.
- 📝 **Resume Analyzer & Builder** - Get AI-generated job matches and interview questions based on your resume.
- 💬 **Ask AI Chatbot** - Ask career-related questions and get real-time AI responses.
- 📊 **Industry Insights** - Stay informed with AI-curated data on top industries and companies.


## 🧑‍💻 Tech Stack

- **Frontend**: React.js + Tailwind CSS + ShadCN UI
- **Backend/API**: Google Gemini API (via serverless functions)
- **Validation**: Zod + React Hook Form
- **Authentication**: Firebase Auth
- **Routing**: React Router
- **State Management**: React Hooks
- **Data Handling**: Local state, Firebase (in progress)
- **Icons**: Lucide-react
- **Deployment**: Both Netlify & Vite (Dev Server)

## 📂 Folder Structure
```
mock-interview-platform/
├── public/               # Static assets
├── src/
│   ├── api/
│   │   ├── Model.js  # Handles AI-generated interview questions
│   ├── app/
│   │   ├── AskAi/
│   │   ├── Insights/
│   │   ├── MockInterview/
│   │   ├── Quizzes/
│   │   ├── Resume/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions & services
│   ├── styles/           # Tailwind CSS configurations
│   ├── tailwind.config.js  # Tailwind CSS setup [no]
├── README.md             # Project documentation
```

## 🚀 Getting Started
### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **npm or yarn** (Package manager)

### **Installation**
```bash
git clone https://github.com/marshadn/aicareerprep.git
cd aicareerprep
npm install   # or yarn install
```

### **Run the Development Server**
```bash
npm run dev   # or yarn dev
```
The app will be available at `http://localhost:5173/`.

