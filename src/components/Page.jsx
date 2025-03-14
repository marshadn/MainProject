"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import ResumeSettings from "../components/ResumeSettings";
import { Download, Settings, Save, FileUp } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      website: "",
      location: "",
      summary: "",
    },
    experience: [
      {
        id: "1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        highlights: [],
      },
    ],
    education: [
      {
        id: "1",
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
        gpa: "",
      },
    ],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
  });

  const [settings, setSettings] = useState({
    template: "modern",
    colorTheme: "blue",
    fontStyle: "sans",
    sectionOrder: [
      "summary",
      "experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "languages",
      "interests",
    ],
  });

  const [activeTab, setActiveTab] = useState("edit");
  const resumePreviewRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleExportPDF = async () => {
    if (!resumePreviewRef.current) return;

    setActiveTab("preview");

    setTimeout(() => {
      const element = resumePreviewRef.current;
      if (!element) return;

      const opt = {
        margin: [0.5, 0.5],
        filename: `${resumeData.personalInfo.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      element.classList.add("printing");

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          element.classList.remove("printing");
          toast({
            title: "Resume Downloaded",
            description: "Your resume has been downloaded as a PDF.",
          });
        })
        .catch((error) => {
          console.error("PDF generation failed:", error);
          element.classList.remove("printing");
          toast({
            variant: "destructive",
            title: "Download Failed",
            description: "There was an error downloading your resume.",
          });
        });
    }, 100);
  };

  const saveResumeData = () => {
    try {
      const data = JSON.stringify({ resumeData, settings });
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeData.personalInfo.name || "resume"}-data.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Resume Saved",
        description: "Your resume data has been saved to a file.",
      });
    } catch (error) {
      console.error("Error saving resume data:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "There was an error saving your resume data.",
      });
    }
  };

  const loadResumeData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const { resumeData: loadedData, settings: loadedSettings } = JSON.parse(content);
        setResumeData(loadedData);
        setSettings(loadedSettings);
        toast({
          title: "Resume Loaded",
          description: "Your resume data has been loaded successfully.",
        });
      } catch (error) {
        console.error("Error parsing resume data:", error);
        toast({
          variant: "destructive",
          title: "Load Failed",
          description: "There was an error loading your resume data.",
        });
      }
    };
    reader.readAsText(file);
    if (event.target) {
      event.target.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleExportPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button onClick={saveResumeData} variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Data
          </Button>
          <Button onClick={triggerFileInput} variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Load Data
          </Button>
          <input type="file" ref={fileInputRef} onChange={loadResumeData} accept=".json" className="hidden" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card className="p-4 md:p-6">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="p-4 md:p-6 bg-white">
            <div ref={resumePreviewRef} className="bg-white">
              <ResumePreview resumeData={resumeData} settings={settings} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-4 md:p-6">
            <ResumeSettings settings={settings} setSettings={setSettings} resumeData={resumeData} />
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
