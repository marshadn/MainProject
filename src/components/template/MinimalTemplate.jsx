import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function MinimalTemplate({ resumeData, colorTheme, settings }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages, interests } = resumeData;

  // Color theme classes
  const themeColors = {
    blue: {
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-600",
    },
    green: {
      primary: "bg-green-600",
      secondary: "bg-green-100",
      text: "text-green-600",
      border: "border-green-600",
    },
    purple: {
      primary: "bg-purple-600",
      secondary: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-600",
    },
    red: {
      primary: "bg-red-600",
      secondary: "bg-red-100",
      text: "text-red-600",
      border: "border-red-600",
    },
    gray: {
      primary: "bg-gray-600",
      secondary: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-600",
    },
  }[colorTheme];

  // Function to render sections in the correct order
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case "summary":
        return personalInfo.summary ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
            <p className="text-sm">{personalInfo.summary}</p>
          </div>
        ) : null;

      case "experience":
        return experience.some((exp) => exp.company || exp.position) ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) =>
                exp.company || exp.position ? (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">{exp.position || "Position"}</h4>
                        <h5 className="text-gray-700">{exp.company || "Company"}</h5>
                      </div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate && (
                          <>
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </>
                        )}
                      </div>
                    </div>
                    {exp.description && <p className="text-sm whitespace-pre-line">{exp.description}</p>}
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        {exp.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null
              )}
            </div>
          </div>
        ) : null;

      case "education":
        return education.some((edu) => edu.institution || edu.degree) ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <div className="space-y-4">
              {education.map((edu) =>
                edu.institution || edu.degree ? (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-medium">
                          {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                        </h4>
                        <h5 className="text-gray-700">{edu.institution}</h5>
                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate && (
                          <>
                            {edu.startDate} - {edu.endDate}
                          </>
                        )}
                      </div>
                    </div>
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                ) : null
              )}
            </div>
          </div>
        ) : null;

      case "skills":
        return skills.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 border rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Projects</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm ${themeColors.text} hover:underline`}
                        >
                          {project.url}
                        </a>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {project.startDate && (
                        <>
                          {project.startDate} - {project.current ? "Present" : project.endDate}
                        </>
                      )}
                    </div>
                  </div>
                  {project.description && <p className="text-sm">{project.description}</p>}
                  {project.highlights.length > 0 && (
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "certifications":
        return certifications.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                  </div>
                  <div className="text-sm text-gray-600">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "languages":
        return languages.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{lang.language}</span>
                  <span className="text-sm text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "interests":
        return interests.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span key={interest} className="px-3 py-1 border rounded text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[850px] mx-auto font-sans p-8 text-black printing:p-0">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">{personalInfo.name || "Your Name"}</h1>
          <h2 className="text-xl text-gray-700">{personalInfo.title || "Professional Title"}</h2>
        </div>
        <div className="text-right text-sm">
          {personalInfo.email && (
            <div className="flex items-center justify-end gap-1 mb-1">
              <span>{personalInfo.email}</span>
              <Mail className="h-4 w-4" />
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center justify-end gap-1 mb-1">
              <span>{personalInfo.phone}</span>
              <Phone className="h-4 w-4" />
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center justify-end gap-1 mb-1">
              <span>{personalInfo.location}</span>
              <MapPin className="h-4 w-4" />
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center justify-end gap-1 mb-1">
              <span>{personalInfo.website}</span>
              <Globe className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div>{settings.sectionOrder.map((section) => renderSection(section))}</div>
    </div>
  );
}