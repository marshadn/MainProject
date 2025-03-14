import React from "react";
import ModernTemplate from "./template/ModernTemplate";
import ClassicTemplate from "./template/ClassicTemplate";
import MinimalTemplate from "./template/MinimalTemplate";

export default function ResumePreview({ resumeData, settings = {} }) {
  const { template = "modern", colorTheme = "blue", fontStyle = "sans" } = settings;

  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  }[fontStyle] || "font-sans"; // Default to sans if undefined

  return (
    <div className={`max-w-[850px] mx-auto ${fontClass}`}>
      {template === "modern" && <ModernTemplate resumeData={resumeData} colorTheme={colorTheme} settings={settings} />}
      {template === "classic" && <ClassicTemplate resumeData={resumeData} colorTheme={colorTheme} settings={settings} />}
      {template === "minimal" && <MinimalTemplate resumeData={resumeData} colorTheme={colorTheme} settings={settings} />}
    </div>
  );
}
