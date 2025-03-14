import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { ThemeProvider } from "./theme-provider";

const defaultResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  interests: [],
};

export default function ResumeForm({ resumeData = defaultResumeData, setResumeData }) {
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [activeExperienceId, setActiveExperienceId] = useState(null);
  const [newProjectHighlight, setNewProjectHighlight] = useState("");
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [activeSections, setActiveSections] = useState(["personal-info"]);

  const toggleSection = (section) => {
    if (activeSections.includes(section)) {
      setActiveSections(activeSections.filter((s) => s !== section));
    } else {
      setActiveSections([...activeSections, section]);
    }
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  // Experience methods
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [],
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExp],
    });
    setActiveExperienceId(newExp.id);
  };

  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addExperienceHighlight = (e) => {
    e.preventDefault();
    if (!activeExperienceId || !newHighlight.trim()) return;

    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === activeExperienceId
          ? { ...exp, highlights: [...exp.highlights, newHighlight.trim()] }
          : exp
      ),
    });
    setNewHighlight("");
  };

  const removeExperienceHighlight = (expId, highlight) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, highlights: exp.highlights.filter((h) => h !== highlight) }
          : exp
      ),
    });
  };

  // Education methods
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
          gpa: "",
        },
      ],
    });
  };

  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills methods
  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((s) => s !== skill),
    });
  };

  // Projects methods
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      url: "",
      highlights: [],
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
    setActiveProjectId(newProject.id);
  };

  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    });
  };

  const addProjectHighlight = (e) => {
    e.preventDefault();
    if (!activeProjectId || !newProjectHighlight.trim()) return;

    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) =>
        proj.id === activeProjectId
          ? {
              ...proj,
              highlights: [...proj.highlights, newProjectHighlight.trim()],
            }
          : proj
      ),
    });
    setNewProjectHighlight("");
  };

  const removeProjectHighlight = (projId, highlight) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map((proj) =>
        proj.id === projId
          ? { ...proj, highlights: proj.highlights.filter((h) => h !== highlight) }
          : proj
      ),
    });
  };

  // Certifications methods
  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
          url: "",
        },
      ],
    });
  };

  const updateCertification = (id, field, value) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((cert) => cert.id !== id),
    });
  };

  // Languages methods
  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        {
          language: "",
          proficiency: "Intermediate",
        },
      ],
    });
  };

  const updateLanguage = (index, field, value) => {
    const updatedLanguages = [...resumeData.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setResumeData({
      ...resumeData,
      languages: updatedLanguages,
    });
  };

  const removeLanguage = (index) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index),
    });
  };

  // Interests methods
  const addInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !resumeData.interests.includes(newInterest.trim())) {
      setResumeData({
        ...resumeData,
        interests: [...resumeData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setResumeData({
      ...resumeData,
      interests: resumeData.interests.filter((i) => i !== interest),
    });
  };

  // UI Components
  const Button = ({ children, onClick, variant, size, className, disabled, type }) => {
    let buttonClass = "px-4 py-2 rounded font-medium ";
    
    if (variant === "ghost") {
      buttonClass += "bg-transparent hover:bg-gray-100 ";
    } else if (variant === "outline") {
      buttonClass += "bg-white border border-gray-300 hover:bg-gray-50 ";
    } else {
      buttonClass += "bg-blue-600 text-white hover:bg-blue-700 ";
    }
    
    if (size === "icon") {
      buttonClass += "p-1 ";
    }
    
    if (className) {
      buttonClass += className;
    }
    
    return (
      <button 
        onClick={onClick} 
        className={buttonClass}
        disabled={disabled}
        type={type || "button"}
      >
        {children}
      </button>
    );
  };

  const Input = ({ id, value, onChange, placeholder, type, disabled }) => {
    return (
      <ThemeProvider>
      <input
        id={id}
        type={type || "text"}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 texdt-grey-00"
      />
      </ThemeProvider>
    );
  };

  const Textarea = ({ id, value, onChange, placeholder, rows }) => {
    return (
      <ThemeProvider>
      <textarea
        id={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows || 3}
        className="w-full px-3 py-2 border border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      </ThemeProvider>
    );
  };

  const Label = ({ htmlFor, children }) => {
    return (
      <ThemeProvider>
      <label htmlFor={htmlFor} className="font-medium text-gray-900 ">
        {children}
      </label>
      </ThemeProvider>
    );
  };

  const Switch = ({ id, checked, onCheckedChange }) => {
    return (
      <div className="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={() => onCheckedChange(!checked)}
          className="opacity-0 w-0 h-0"
        />
        <label
          htmlFor={id}
          className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white transform transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          ></span>
        </label>
      </div>
    );
  };

  const Badge = ({ children, variant, className }) => {
    let badgeClass = "inline-flex items-center rounded text-sm ";
    
    if (variant === "secondary") {
      badgeClass += "bg-gray-100 text-gray-800 ";
    } else {
      badgeClass += "bg-blue-100 text-blue-800 ";
    }
    
    if (className) {
      badgeClass += className;
    }
    
    return <span className={badgeClass}>{children}</span>;
  };

  const Select = ({ value, onValueChange, children }) => {
    return (
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    );
  };

  // Accordion components
  const AccordionSection = ({ title, id, children }) => {
    const isActive = activeSections.includes(id);
    
    return (
      <div className="border rounded-md overflow-hidden mb-4">
        <button
          className="flex justify-between w-full px-4 py-3 font-medium text-left bg-gray-50 hover:bg-gray-100"
          onClick={() => toggleSection(id)}
        >
          <span>{title}</span>
          <span className={`transform transition-transform ${isActive ? "rotate-180" : ""}`}>▼</span>
        </button>
        {isActive && <div className="p-4 bg-white">{children}</div>}
      </div>
    );
  };

  // Accordion components
  const Accordion = ({ children, type, collapsible, defaultValue }) => {
    const [activeItem, setActiveItem] = useState(defaultValue);
    
    const toggleItem = (itemValue) => {
      if (type === "single") {
        if (collapsible && activeItem === itemValue) {
          setActiveItem(null);
        } else {
          setActiveItem(itemValue);
        }
      }
    };
    
    const items = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          isActive: activeItem === child.props.value,
          onToggle: () => toggleItem(child.props.value)
        });
      }
      return child;
    });
    
    return <div className="space-y-2">{items}</div>;
  };

  const AccordionItem = ({ value, children, isActive, onToggle }) => {
    return (
      <div className="border rounded-md overflow-hidden">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type.name === "AccordionTrigger") {
              return React.cloneElement(child, { isActive, onToggle });
            }
            if (child.type.name === "AccordionContent") {
              return React.cloneElement(child, { isActive });
            }
          }
          return child;
        })}
      </div>
    );
  };

  const AccordionTrigger = ({ children, isActive, onToggle }) => {
    return (
      <button
        className="flex justify-between w-full px-4 py-3 font-medium text-left bg-gray-50 hover:bg-gray-100"
        onClick={onToggle}
      >
        {children}
        <span className={`transform transition-transform ${isActive ? "rotate-180" : ""}`}>▼</span>
      </button>
    );
  };

  const AccordionContent = ({ children, isActive }) => {
    if (!isActive) return null;
    
    return <div className="p-4 bg-white">{children}</div>;
  };
  
  return (
    <div className="space-y-8">
      <Accordion type="single" collapsible defaultValue="personal-info">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo("title", e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="https://johndoe.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  placeholder="Experienced software engineer with a passion for..."
                  rows={4}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="p-4 border rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeExperience(exp.id)}
                    disabled={resumeData.experience.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`position-${exp.id}`}>Position</Label>
                        <Input
                          id={`position-${exp.id}`}
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                        <Input
                          id={`start-date-${exp.id}`}
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`current-${exp.id}`}
                              checked={exp.current}
                              onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                            />
                            <Label htmlFor={`current-${exp.id}`}>Current</Label>
                          </div>
                        </div>
                        <Input
                          id={`end-date-${exp.id}`}
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          placeholder="Present"
                          disabled={exp.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Key Achievements/Highlights</Label>
                      <form
                        className="flex gap-2"
                        onSubmit={addExperienceHighlight}
                        onFocus={() => setActiveExperienceId(exp.id)}
                      >
                        <Input
                          value={activeExperienceId === exp.id ? newHighlight : ""}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          placeholder="Led a team of 5 developers..."
                        />
                        <Button type="submit">Add</Button>
                      </form>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {highlight}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-2 p-0"
                              onClick={() => removeExperienceHighlight(exp.id, highlight)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {(resumeData.education || []).map((edu) => (
                <div key={edu.id} className="p-4 border rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeEducation(edu.id)}
                    disabled={resumeData.education.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                        <Input
                          id={`degree-${edu.id}`}
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${edu.id}`}
                          value={edu.field}
                          onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                          placeholder="Computer Science"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                        <Input
                          id={`edu-start-date-${edu.id}`}
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                          placeholder="Sep 2016"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                        <Input
                          id={`edu-end-date-${edu.id}`}
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          placeholder="May 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                        <Input
                          id={`gpa-${edu.id}`}
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</Label>
                      <Textarea
                        id={`edu-description-${edu.id}`}
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                        placeholder="Relevant coursework, achievements, etc."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <form onSubmit={addSkill} className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., JavaScript)"
                />
                <Button type="submit">Add</Button>
              </form>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                    <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 p-0" onClick={() => removeSkill(skill)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {resumeData.skills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet.</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="p-4 border rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeProject(project.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
                        <Input
                          id={`project-name-${project.id}`}
                          value={project.name}
                          onChange={(e) => updateProject(project.id, "name", e.target.value)}
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`project-url-${project.id}`}>Project URL (Optional)</Label>
                        <Input
                          id={`project-url-${project.id}`}
                          value={project.url}
                          onChange={(e) => updateProject(project.id, "url", e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`project-start-date-${project.id}`}>Start Date</Label>
                        <Input
                          id={`project-start-date-${project.id}`}
                          value={project.startDate}
                          onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`project-end-date-${project.id}`}>End Date</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`project-current-${project.id}`}
                              checked={project.current}
                              onCheckedChange={(checked) => updateProject(project.id, "current", checked)}
                            />
                            <Label htmlFor={`project-current-${project.id}`}>Ongoing</Label>
                          </div>
                        </div>
                        <Input
                          id={`project-end-date-${project.id}`}
                          value={project.endDate}
                          onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                          placeholder="Present"
                          disabled={project.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`project-description-${project.id}`}>Description</Label>
                      <Textarea
                        id={`project-description-${project.id}`}
                        value={project.description}
                        onChange={(e) => updateProject(project.id, "description", e.target.value)}
                        placeholder="Describe the project, technologies used, and your role..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Key Features/Highlights</Label>
                      <form
                        className="flex gap-2"
                        onSubmit={addProjectHighlight}
                        onFocus={() => setActiveProjectId(project.id)}
                      >
                        <Input
                          value={activeProjectId === project.id ? newProjectHighlight : ""}
                          onChange={(e) => setNewProjectHighlight(e.target.value)}
                          placeholder="Implemented real-time chat..."
                        />
                        <Button type="submit">Add</Button>
                      </form>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {highlight}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-2 p-0"
                              onClick={() => removeProjectHighlight(project.id, highlight)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addProject} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certifications">
          <AccordionTrigger>Certifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="p-4 border rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                      <Input
                        id={`cert-name-${cert.id}`}
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`cert-issuer-${cert.id}`}>Issuing Organization</Label>
                        <Input
                          id={`cert-issuer-${cert.id}`}
                          value={cert.issuer}
                          onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`cert-date-${cert.id}`}>Date</Label>
                        <Input
                          id={`cert-date-${cert.id}`}
                          value={cert.date}
                          onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                          placeholder="May 2020"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`cert-url-${cert.id}`}>URL (Optional)</Label>
                      <Input
                        id={`cert-url-${cert.id}`}
                        value={cert.url}
                        onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
                        placeholder="https://www.credential.net/..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addCertification} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Certification
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="languages">
          <AccordionTrigger>Languages</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              {resumeData.languages.map((lang, index) => (
                <div key={index} className="p-4 border rounded-md relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeLanguage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`language-${index}`}>Language</Label>
                      <Input
                        id={`language-${index}`}
                        value={lang.language}
                        onChange={(e) => updateLanguage(index, "language", e.target.value)}
                        placeholder="English"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                      >
                        <SelectTrigger id={`proficiency-${index}`}>
                          <SelectValue placeholder="Select proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Native">Native</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addLanguage} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Language
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interests">
          <AccordionTrigger>Interests</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <form onSubmit={addInterest} className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest (e.g., Photography)"
                />
                <Button type="submit">Add</Button>
              </form>
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="px-3 py-1">
                    {interest}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2 p-0"
                      onClick={() => removeInterest(interest)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {resumeData.interests.length === 0 && (
                  <p className="text-sm text-muted-foreground">No interests added yet.</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// import React, { useState } from "react";
// import { X, Plus } from "lucide-react";
// const defaultResumeData = {
//   personalInfo: {
//     name: "",
//     title: "",
//     email: "",
//     phone: "",
//     website: "",
//     location: "",
//     summary: "",
//   },
//   experience: [],
//   education: [],
//   skills: [],
//   projects: [],
//   certifications: [],
//   languages: [],
//   interests: [],
// };

// export default function ResumeForm({ resumeData = defaultResumeData, setResumeData }) {
  
//   const [newSkill, setNewSkill] = useState("");
//   const [newInterest, setNewInterest] = useState("");
//   const [newHighlight, setNewHighlight] = useState("");
//   const [activeExperienceId, setActiveExperienceId] = useState(null);
//   const [newProjectHighlight, setNewProjectHighlight] = useState("");
//   const [activeProjectId, setActiveProjectId] = useState(null);

//   const updatePersonalInfo = (field, value) => {
//     setResumeData({
//       ...resumeData,
//       personalInfo: {
//         ...resumeData.personalInfo,
//         [field]: value,
//       },
//     });
//   };

//   // Experience methods
//   const addExperience = () => {
//     const newExp = {
//       id: Date.now().toString(),
//       company: "",
//       position: "",
//       startDate: "",
//       endDate: "",
//       current: false,
//       description: "",
//       highlights: [],
//     };
//     setResumeData({
//       ...resumeData,
//       experience: [...resumeData.experience, newExp],
//     });
//     setActiveExperienceId(newExp.id);
//   };

//   const updateExperience = (id, field, value) => {
//     setResumeData({
//       ...resumeData,
//       experience: resumeData.experience.map((exp) =>
//         exp.id === id ? { ...exp, [field]: value } : exp
//       ),
//     });
//   };

//   const removeExperience = (id) => {
//     setResumeData({
//       ...resumeData,
//       experience: resumeData.experience.filter((exp) => exp.id !== id),
//     });
//   };

//   const addExperienceHighlight = (e) => {
//     e.preventDefault();
//     if (!activeExperienceId || !newHighlight.trim()) return;

//     setResumeData({
//       ...resumeData,
//       experience: resumeData.experience.map((exp) =>
//         exp.id === activeExperienceId
//           ? { ...exp, highlights: [...exp.highlights, newHighlight.trim()] }
//           : exp
//       ),
//     });
//     setNewHighlight("");
//   };

//   const removeExperienceHighlight = (expId, highlight) => {
//     setResumeData({
//       ...resumeData,
//       experience: resumeData.experience.map((exp) =>
//         exp.id === expId
//           ? { ...exp, highlights: exp.highlights.filter((h) => h !== highlight) }
//           : exp
//       ),
//     });
//   };

//   // Education methods
//   const addEducation = () => {
//     setResumeData({
//       ...resumeData,
//       education: [
//         ...resumeData.education,
//         {
//           id: Date.now().toString(),
//           institution: "",
//           degree: "",
//           field: "",
//           startDate: "",
//           endDate: "",
//           description: "",
//           gpa: "",
//         },
//       ],
//     });
//   };

//   const updateEducation = (id, field, value) => {
//     setResumeData({
//       ...resumeData,
//       education: resumeData.education.map((edu) =>
//         edu.id === id ? { ...edu, [field]: value } : edu
//       ),
//     });
//   };

//   const removeEducation = (id) => {
//     setResumeData({
//       ...resumeData,
//       education: resumeData.education.filter((edu) => edu.id !== id),
//     });
//   };

//   // Skills methods
//   const addSkill = (e) => {
//     e.preventDefault();
//     if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
//       setResumeData({
//         ...resumeData,
//         skills: [...resumeData.skills, newSkill.trim()],
//       });
//       setNewSkill("");
//     }
//   };

//   const removeSkill = (skill) => {
//     setResumeData({
//       ...resumeData,
//       skills: resumeData.skills.filter((s) => s !== skill),
//     });
//   };

//   // Projects methods
//   const addProject = () => {
//     const newProject = {
//       id: Date.now().toString(),
//       name: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//       current: false,
//       url: "",
//       highlights: [],
//     };
//     setResumeData({
//       ...resumeData,
//       projects: [...resumeData.projects, newProject],
//     });
//     setActiveProjectId(newProject.id);
//   };

//   const updateProject = (id, field, value) => {
//     setResumeData({
//       ...resumeData,
//       projects: resumeData.projects.map((proj) =>
//         proj.id === id ? { ...proj, [field]: value } : proj
//       ),
//     });
//   };

//   const removeProject = (id) => {
//     setResumeData({
//       ...resumeData,
//       projects: resumeData.projects.filter((proj) => proj.id !== id),
//     });
//   };

//   const addProjectHighlight = (e) => {
//     e.preventDefault();
//     if (!activeProjectId || !newProjectHighlight.trim()) return;

//     setResumeData({
//       ...resumeData,
//       projects: resumeData.projects.map((proj) =>
//         proj.id === activeProjectId
//           ? {
//               ...proj,
//               highlights: [...proj.highlights, newProjectHighlight.trim()],
//             }
//           : proj
//       ),
//     });
//     setNewProjectHighlight("");
//   };

//   const removeProjectHighlight = (projId, highlight) => {
//     setResumeData({
//       ...resumeData,
//       projects: resumeData.projects.map((proj) =>
//         proj.id === projId
//           ? { ...proj, highlights: proj.highlights.filter((h) => h !== highlight) }
//           : proj
//       ),
//     });
//   };

//   // Certifications methods
//   const addCertification = () => {
//     setResumeData({
//       ...resumeData,
//       certifications: [
//         ...resumeData.certifications,
//         {
//           id: Date.now().toString(),
//           name: "",
//           issuer: "",
//           date: "",
//           url: "",
//         },
//       ],
//     });
//   };

//   const updateCertification = (id, field, value) => {
//     setResumeData({
//       ...resumeData,
//       certifications: resumeData.certifications.map((cert) =>
//         cert.id === id ? { ...cert, [field]: value } : cert
//       ),
//     });
//   };

//   const removeCertification = (id) => {
//     setResumeData({
//       ...resumeData,
//       certifications: resumeData.certifications.filter((cert) => cert.id !== id),
//     });
//   };

//   // Languages methods
//   const addLanguage = () => {
//     setResumeData({
//       ...resumeData,
//       languages: [
//         ...resumeData.languages,
//         {
//           language: "",
//           proficiency: "Intermediate",
//         },
//       ],
//     });
//   };

//   const updateLanguage = (index, field, value) => {
//     const updatedLanguages = [...resumeData.languages];
//     updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
//     setResumeData({
//       ...resumeData,
//       languages: updatedLanguages,
//     });
//   };

//   const removeLanguage = (index) => {
//     setResumeData({
//       ...resumeData,
//       languages: resumeData.languages.filter((_, i) => i !== index),
//     });
//   };

//   // Interests methods
//   const addInterest = (e) => {
//     e.preventDefault();
//     if (newInterest.trim() && !resumeData.interests.includes(newInterest.trim())) {
//       setResumeData({
//         ...resumeData,
//         interests: [...resumeData.interests, newInterest.trim()],
//       });
//       setNewInterest("");
//     }
//   };

//   const removeInterest = (interest) => {
//     setResumeData({
//       ...resumeData,
//       interests: resumeData.interests.filter((i) => i !== interest),
//     });
//   };

//   // UI Components
//   const Button = ({ children, onClick, variant, size, className, disabled, type }) => {
//     let buttonClass = "px-4 py-2 rounded font-medium ";
    
//     if (variant === "ghost") {
//       buttonClass += "bg-transparent hover:bg-gray-100 ";
//     } else if (variant === "outline") {
//       buttonClass += "bg-white border border-gray-300 hover:bg-gray-50 ";
//     } else {
//       buttonClass += "bg-blue-600 text-white hover:bg-blue-700 ";
//     }
    
//     if (size === "icon") {
//       buttonClass += "p-1 ";
//     }
    
//     if (className) {
//       buttonClass += className;
//     }
    
//     return (
//       <button 
//         onClick={onClick} 
//         className={buttonClass}
//         disabled={disabled}
//         type={type || "button"}
//       >
//         {children}
//       </button>
//     );
//   };

//   const Input = ({ id, value, onChange, placeholder, type, disabled }) => {
//     return (
//       <input
//         id={id}
//         type={type || "text"}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     );
//   };

//   const Textarea = ({ id, value, onChange, placeholder, rows }) => {
//     return (
//       <textarea
//         id={id}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         rows={rows || 3}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     );
//   };

//   const Label = ({ htmlFor, children }) => {
//     return (
//       <label htmlFor={htmlFor} className="font-medium text-gray-700">
//         {children}
//       </label>
//     );
//   };

//   const Switch = ({ id, checked, onCheckedChange }) => {
//     return (
//       <div className="relative inline-block w-10 mr-2 align-middle select-none">
//         <input
//           type="checkbox"
//           id={id}
//           checked={checked}
//           onChange={() => onCheckedChange(!checked)}
//           className="opacity-0 w-0 h-0"
//         />
//         <label
//           htmlFor={id}
//           className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
//             checked ? "bg-blue-500" : "bg-gray-300"
//           }`}
//         >
//           <span
//             className={`block h-5 w-5 rounded-full bg-white transform transition-transform ${
//               checked ? "translate-x-5" : "translate-x-0"
//             }`}
//           ></span>
//         </label>
//       </div>
//     );
//   };

//   const Badge = ({ children, variant, className }) => {
//     let badgeClass = "inline-flex items-center rounded text-sm ";
    
//     if (variant === "secondary") {
//       badgeClass += "bg-gray-100 text-gray-800 ";
//     } else {
//       badgeClass += "bg-blue-100 text-blue-800 ";
//     }
    
//     if (className) {
//       badgeClass += className;
//     }
    
//     return <span className={badgeClass}>{children}</span>;
//   };

//   const Select = ({ children, value, onValueChange }) => {
//     return (
//       <select
//         value={value}
//         onChange={(e) => onValueChange(e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {children}
//       </select>
//     );
//   };

//   const SelectItem = ({ value, children }) => {
//     return <option value={value}>{children}</option>;
//   };

//   const SelectTrigger = ({ id, children }) => {
//     return <div id={id}>{children}</div>;
//   };

//   const SelectValue = ({ placeholder }) => {
//     return <span>{placeholder}</span>;
//   };

//   const SelectContent = ({ children }) => {
//     return <>{children}</>;
//   };

//   // Accordion components
//   const Accordion = ({ children, type, collapsible, defaultValue }) => {
//     const [activeItem, setActiveItem] = useState(defaultValue);
    
//     const toggleItem = (itemValue) => {
//       if (type === "single") {
//         if (collapsible && activeItem === itemValue) {
//           setActiveItem(null);
//         } else {
//           setActiveItem(itemValue);
//         }
//       }
//     };
    
//     const items = React.Children.map(children, child => {
//       if (React.isValidElement(child)) {
//         return React.cloneElement(child, {
//           isActive: activeItem === child.props.value,
//           onToggle: () => toggleItem(child.props.value)
//         });
//       }
//       return child;
//     });
    
//     return <div className="space-y-2">{items}</div>;
//   };

//   const AccordionItem = ({ value, children, isActive, onToggle }) => {
//     return (
//       <div className="border rounded-md overflow-hidden">
//         {React.Children.map(children, child => {
//           if (React.isValidElement(child)) {
//             if (child.type.name === "AccordionTrigger") {
//               return React.cloneElement(child, { isActive, onToggle });
//             }
//             if (child.type.name === "AccordionContent") {
//               return React.cloneElement(child, { isActive });
//             }
//           }
//           return child;
//         })}
//       </div>
//     );
//   };

//   const AccordionTrigger = ({ children, isActive, onToggle }) => {
//     return (
//       <button
//         className="flex justify-between w-full px-4 py-3 font-medium text-left bg-gray-50 hover:bg-gray-100"
//         onClick={onToggle}
//       >
//         {children}
//         <span className={`transform transition-transform ${isActive ? "rotate-180" : ""}`}>▼</span>
//       </button>
//     );
//   };

//   const AccordionContent = ({ children, isActive }) => {
//     if (!isActive) return null;
    
//     return <div className="p-4 bg-white">{children}</div>;
//   };
  
//   return (
//     <div className="space-y-8">
//       <Accordion type="single" collapsible defaultValue="personal-info">
//         <AccordionItem value="personal-info">
//           <AccordionTrigger>Personal Information</AccordionTrigger>
//           <AccordionContent>
//             <div className="grid gap-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     value={resumeData.personalInfo.name}
//                     onChange={(e) => updatePersonalInfo("name", e.target.value)}
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Professional Title</Label>
//                   <Input
//                     id="title"
//                     value={resumeData.personalInfo.title}
//                     onChange={(e) => updatePersonalInfo("title", e.target.value)}
//                     placeholder="Software Engineer"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={resumeData.personalInfo.email}
//                     onChange={(e) => updatePersonalInfo("email", e.target.value)}
//                     placeholder="john.doe@example.com"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     value={resumeData.personalInfo.phone}
//                     onChange={(e) => updatePersonalInfo("phone", e.target.value)}
//                     placeholder="(123) 456-7890"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="website">Website/Portfolio</Label>
//                   <Input
//                     id="website"
//                     value={resumeData.personalInfo.website}
//                     onChange={(e) => updatePersonalInfo("website", e.target.value)}
//                     placeholder="https://johndoe.com"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <Input
//                     id="location"
//                     value={resumeData.personalInfo.location}
//                     onChange={(e) => updatePersonalInfo("location", e.target.value)}
//                     placeholder="New York, NY"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="summary">Professional Summary</Label>
//                 <Textarea
//                   id="summary"
//                   value={resumeData.personalInfo.summary}
//                   onChange={(e) => updatePersonalInfo("summary", e.target.value)}
//                   placeholder="Experienced software engineer with a passion for..."
//                   rows={4}
//                 />
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="experience">
//           <AccordionTrigger>Work Experience</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.experience.map((exp) => (
//                 <div key={exp.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeExperience(exp.id)}
//                     disabled={resumeData.experience.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`company-${exp.id}`}>Company</Label>
//                         <Input
//                           id={`company-${exp.id}`}
//                           value={exp.company}
//                           onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
//                           placeholder="Company Name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`position-${exp.id}`}>Position</Label>
//                         <Input
//                           id={`position-${exp.id}`}
//                           value={exp.position}
//                           onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
//                           placeholder="Job Title"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
//                         <Input
//                           id={`start-date-${exp.id}`}
//                           value={exp.startDate}
//                           onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
//                           placeholder="Jan 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
//                           <div className="flex items-center space-x-2">
//                             <Switch
//                               id={`current-${exp.id}`}
//                               checked={exp.current}
//                               onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
//                             />
//                             <Label htmlFor={`current-${exp.id}`}>Current</Label>
//                           </div>
//                         </div>
//                         <Input
//                           id={`end-date-${exp.id}`}
//                           value={exp.endDate}
//                           onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
//                           placeholder="Present"
//                           disabled={exp.current}
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`description-${exp.id}`}>Description</Label>
//                       <Textarea
//                         id={`description-${exp.id}`}
//                         value={exp.description}
//                         onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
//                         placeholder="Describe your responsibilities and achievements..."
//                         rows={3}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Key Achievements/Highlights</Label>
//                       <form
//                         className="flex gap-2"
//                         onSubmit={addExperienceHighlight}
//                         onFocus={() => setActiveExperienceId(exp.id)}
//                       >
//                         <Input
//                           value={activeExperienceId === exp.id ? newHighlight : ""}
//                           onChange={(e) => setNewHighlight(e.target.value)}
//                           placeholder="Led a team of 5 developers..."
//                         />
//                         <Button type="submit">Add</Button>
//                       </form>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {exp.highlights.map((highlight, index) => (
//                           <Badge key={index} variant="secondary" className="px-3 py-1">
//                             {highlight}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 p-0"
//                               onClick={() => removeExperienceHighlight(exp.id, highlight)}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addExperience} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Experience
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="education">
//           <AccordionTrigger>Education</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {(resumeData.education || []).map((edu) => (
//                 <div key={edu.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeEducation(edu.id)}
//                     disabled={resumeData.education.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
//                       <Input
//                         id={`institution-${edu.id}`}
//                         value={edu.institution}
//                         onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
//                         placeholder="University Name"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
//                         <Input
//                           id={`degree-${edu.id}`}
//                           value={edu.degree}
//                           onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
//                           placeholder="Bachelor of Science"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
//                         <Input
//                           id={`field-${edu.id}`}
//                           value={edu.field}
//                           onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
//                           placeholder="Computer Science"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
//                         <Input
//                           id={`edu-start-date-${edu.id}`}
//                           value={edu.startDate}
//                           onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
//                           placeholder="Sep 2016"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
//                         <Input
//                           id={`edu-end-date-${edu.id}`}
//                           value={edu.endDate}
//                           onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
//                           placeholder="May 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
//                         <Input
//                           id={`gpa-${edu.id}`}
//                           value={edu.gpa}
//                           onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
//                           placeholder="3.8/4.0"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</Label>
//                       <Textarea
//                         id={`edu-description-${edu.id}`}
//                         value={edu.description}
//                         onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
//                         placeholder="Relevant coursework, achievements, etc."
//                         rows={2}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addEducation} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Education
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="skills">
//           <AccordionTrigger>Skills</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4">
//               <form onSubmit={addSkill} className="flex gap-2">
//                 <Input
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="Add a skill (e.g., JavaScript)"
//                 />
//                 <Button type="submit">Add</Button>
//               </form>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.skills.map((skill) => (
//                   <Badge key={skill} variant="secondary" className="px-3 py-1">
//                     {skill}
//                     <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 p-0" onClick={() => removeSkill(skill)}>
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//                 {resumeData.skills.length === 0 && (
//                   <p className="text-sm text-muted-foreground">No skills added yet.</p>
//                 )}
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="projects">
//           <AccordionTrigger>Projects</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.projects.map((project) => (
//                 <div key={project.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeProject(project.id)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
//                         <Input
//                           id={`project-name-${project.id}`}
//                           value={project.name}
//                           onChange={(e) => updateProject(project.id, "name", e.target.value)}
//                           placeholder="Project Name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-url-${project.id}`}>Project URL (Optional)</Label>
//                         <Input
//                           id={`project-url-${project.id}`}
//                           value={project.url}
//                           onChange={(e) => updateProject(project.id, "url", e.target.value)}
//                           placeholder="https://github.com/username/project"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-start-date-${project.id}`}>Start Date</Label>
//                         <Input
//                           id={`project-start-date-${project.id}`}
//                           value={project.startDate}
//                           onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
//                           placeholder="Jan 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <Label htmlFor={`project-end-date-${project.id}`}>End Date</Label>
//                           <div className="flex items-center space-x-2">
//                             <Switch
//                               id={`project-current-${project.id}`}
//                               checked={project.current}
//                               onCheckedChange={(checked) => updateProject(project.id, "current", checked)}
//                             />
//                             <Label htmlFor={`project-current-${project.id}`}>Ongoing</Label>
//                           </div>
//                         </div>
//                         <Input
//                           id={`project-end-date-${project.id}`}
//                           value={project.endDate}
//                           onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
//                           placeholder="Present"
//                           disabled={project.current}
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`project-description-${project.id}`}>Description</Label>
//                       <Textarea
//                         id={`project-description-${project.id}`}
//                         value={project.description}
//                         onChange={(e) => updateProject(project.id, "description", e.target.value)}
//                         placeholder="Describe the project, technologies used, and your role..."
//                         rows={3}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Key Features/Highlights</Label>
//                       <form
//                         className="flex gap-2"
//                         onSubmit={addProjectHighlight}
//                         onFocus={() => setActiveProjectId(project.id)}
//                       >
//                         <Input
//                           value={activeProjectId === project.id ? newProjectHighlight : ""}
//                           onChange={(e) => setNewProjectHighlight(e.target.value)}
//                           placeholder="Implemented real-time chat..."
//                         />
//                         <Button type="submit">Add</Button>
//                       </form>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {project.highlights.map((highlight, index) => (
//                           <Badge key={index} variant="secondary" className="px-3 py-1">
//                             {highlight}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 p-0"
//                               onClick={() => removeProjectHighlight(project.id, highlight)}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addProject} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Project
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="certifications">
//           <AccordionTrigger>Certifications</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.certifications.map((cert) => (
//                 <div key={cert.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeCertification(cert.id)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
//                       <Input
//                         id={`cert-name-${cert.id}`}
//                         value={cert.name}
//                         onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
//                         placeholder="AWS Certified Solutions Architect"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`cert-issuer-${cert.id}`}>Issuing Organization</Label>
//                         <Input
//                           id={`cert-issuer-${cert.id}`}
//                           value={cert.issuer}
//                           onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
//                           placeholder="Amazon Web Services"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`cert-date-${cert.id}`}>Date</Label>
//                         <Input
//                           id={`cert-date-${cert.id}`}
//                           value={cert.date}
//                           onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
//                           placeholder="May 2020"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`cert-url-${cert.id}`}>URL (Optional)</Label>
//                       <Input
//                         id={`cert-url-${cert.id}`}
//                         value={cert.url}
//                         onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
//                         placeholder="https://www.credential.net/..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addCertification} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Certification
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="languages">
//           <AccordionTrigger>Languages</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.languages.map((lang, index) => (
//                 <div key={index} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeLanguage(index)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`language-${index}`}>Language</Label>
//                       <Input
//                         id={`language-${index}`}
//                         value={lang.language}
//                         onChange={(e) => updateLanguage(index, "language", e.target.value)}
//                         placeholder="English"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
//                       <Select
//                         value={lang.proficiency}
//                         onValueChange={(value) => updateLanguage(index, "proficiency", value)}
//                       >
//                         <SelectTrigger id={`proficiency-${index}`}>
//                           <SelectValue placeholder="Select proficiency" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Native">Native</SelectItem>
//                           <SelectItem value="Fluent">Fluent</SelectItem>
//                           <SelectItem value="Advanced">Advanced</SelectItem>
//                           <SelectItem value="Intermediate">Intermediate</SelectItem>
//                           <SelectItem value="Basic">Basic</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addLanguage} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Language
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="interests">
//           <AccordionTrigger>Interests</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4">
//               <form onSubmit={addInterest} className="flex gap-2">
//                 <Input
//                   value={newInterest}
//                   onChange={(e) => setNewInterest(e.target.value)}
//                   placeholder="Add an interest (e.g., Photography)"
//                 />
//                 <Button type="submit">Add</Button>
//               </form>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.interests.map((interest) => (
//                   <Badge key={interest} variant="secondary" className="px-3 py-1">
//                     {interest}
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-4 w-4 ml-2 p-0"
//                       onClick={() => removeInterest(interest)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//                 {resumeData.interests.length === 0 && (
//                   <p className="text-sm text-muted-foreground">No interests added yet.</p>
//                 )}
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { X, Plus } from "lucide-react";

// export default function ResumeForm({ resumeData, setResumeData }) {
//   const ResumeFormContent = ({ resumeData }) => {
//     const [newSkill, setNewSkill] = useState("");
//     const [newInterest, setNewInterest] = useState("");
//     const [newHighlight, setNewHighlight] = useState("");
//     const [activeExperienceId, setActiveExperienceId] = useState(null);
//     const [newProjectHighlight, setNewProjectHighlight] = useState("");
//     const [activeProjectId, setActiveProjectId] = useState(null);

//     const updatePersonalInfo = (field, value) => {
//       setResumeData({
//         ...resumeData,
//         personalInfo: {
//           ...resumeData.personalInfo,
//           [field]: value,
//         },
//       });
//     };

//     // Experience methods
//     const addExperience = () => {
//       const newExp = {
//         id: Date.now().toString(),
//         company: "",
//         position: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//         description: "",
//         highlights: [],
//       };
//       setResumeData({
//         ...resumeData,
//         experience: [...resumeData.experience, newExp],
//       });
//       setActiveExperienceId(newExp.id);
//     };

//     const updateExperience = (id, field, value) => {
//       setResumeData({
//         ...resumeData,
//         experience: resumeData.experience.map((exp) =>
//           exp.id === id ? { ...exp, [field]: value } : exp
//         ),
//       });
//     };

//     const removeExperience = (id) => {
//       setResumeData({
//         ...resumeData,
//         experience: resumeData.experience.filter((exp) => exp.id !== id),
//       });
//     };

//     const addExperienceHighlight = (e) => {
//       e.preventDefault();
//       if (!activeExperienceId || !newHighlight.trim()) return;

//       setResumeData({
//         ...resumeData,
//         experience: resumeData.experience.map((exp) =>
//           exp.id === activeExperienceId
//             ? { ...exp, highlights: [...exp.highlights, newHighlight.trim()] }
//             : exp
//         ),
//       });
//       setNewHighlight("");
//     };

//     const removeExperienceHighlight = (expId, highlight) => {
//       setResumeData({
//         ...resumeData,
//         experience: resumeData.experience.map((exp) =>
//           exp.id === expId
//             ? { ...exp, highlights: exp.highlights.filter((h) => h !== highlight) }
//             : exp
//         ),
//       });
//     };

//     // Education methods
//     const addEducation = () => {
//       setResumeData({
//         ...resumeData,
//         education: [
//           ...resumeData.education,
//           {
//             id: Date.now().toString(),
//             institution: "",
//             degree: "",
//             field: "",
//             startDate: "",
//             endDate: "",
//             description: "",
//             gpa: "",
//           },
//         ],
//       });
//     };

//     const updateEducation = (id, field, value) => {
//       setResumeData({
//         ...resumeData,
//         education: resumeData.education.map((edu) =>
//           edu.id === id ? { ...edu, [field]: value } : edu
//         ),
//       });
//     };

//     const removeEducation = (id) => {
//       setResumeData({
//         ...resumeData,
//         education: resumeData.education.filter((edu) => edu.id !== id),
//       });
//     };

//     // Skills methods
//     const addSkill = (e) => {
//       e.preventDefault();
//       if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
//         setResumeData({
//           ...resumeData,
//           skills: [...resumeData.skills, newSkill.trim()],
//         });
//         setNewSkill("");
//       }
//     };

//     const removeSkill = (skill) => {
//       setResumeData({
//         ...resumeData,
//         skills: resumeData.skills.filter((s) => s !== skill),
//       });
//     };

//     // Projects methods
//     const addProject = () => {
//       const newProject = {
//         id: Date.now().toString(),
//         name: "",
//         description: "",
//         startDate: "",
//         endDate: "",
//         current: false,
//         url: "",
//         highlights: [],
//       };
//       setResumeData({
//         ...resumeData,
//         projects: [...resumeData.projects, newProject],
//       });
//       setActiveProjectId(newProject.id);
//     };

//     const updateProject = (id, field, value) => {
//       setResumeData({
//         ...resumeData,
//         projects: resumeData.projects.map((proj) =>
//           proj.id === id ? { ...proj, [field]: value } : proj
//         ),
//       });
//     };

//     const removeProject = (id) => {
//       setResumeData({
//         ...resumeData,
//         projects: resumeData.projects.filter((proj) => proj.id !== id),
//       });
//     };

//     const addProjectHighlight = (e) => {
//       e.preventDefault();
//       if (!activeProjectId || !newProjectHighlight.trim()) return;

//       setResumeData({
//         ...resumeData,
//         projects: resumeData.projects.map((proj) =>
//           proj.id === activeProjectId
//             ? {
//                 ...proj,
//                 highlights: [...proj.highlights, newProjectHighlight.trim()],
//               }
//             : proj
//         ),
//       });
//       setNewProjectHighlight("");
//     };

//     const removeProjectHighlight = (projId, highlight) => {
//       setResumeData({
//         ...resumeData,
//         projects: resumeData.projects.map((proj) =>
//           proj.id === projId
//             ? { ...proj, highlights: proj.highlights.filter((h) => h !== highlight) }
//             : proj
//         ),
//       });
//     };

//     // Certifications methods
//     const addCertification = () => {
//       setResumeData({
//         ...resumeData,
//         certifications: [
//           ...resumeData.certifications,
//           {
//             id: Date.now().toString(),
//             name: "",
//             issuer: "",
//             date: "",
//             url: "",
//           },
//         ],
//       });
//     };

//     const updateCertification = (id, field, value) => {
//       setResumeData({
//         ...resumeData,
//         certifications: resumeData.certifications.map((cert) =>
//           cert.id === id ? { ...cert, [field]: value } : cert
//         ),
//       });
//     };

//     const removeCertification = (id) => {
//       setResumeData({
//         ...resumeData,
//         certifications: resumeData.certifications.filter((cert) => cert.id !== id),
//       });
//     };

//     // Languages methods
//     const addLanguage = () => {
//       setResumeData({
//         ...resumeData,
//         languages: [
//           ...resumeData.languages,
//           {
//             language: "",
//             proficiency: "Intermediate",
//           },
//         ],
//       });
//     };

//     const updateLanguage = (index, field, value) => {
//       const updatedLanguages = [...resumeData.languages];
//       updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
//       setResumeData({
//         ...resumeData,
//         languages: updatedLanguages,
//       });
//     };

//     const removeLanguage = (index) => {
//       setResumeData({
//         ...resumeData,
//         languages: resumeData.languages.filter((_, i) => i !== index),
//       });
//     };

//     // Interests methods
//     const addInterest = (e) => {
//       e.preventDefault();
//       if (newInterest.trim() && !resumeData.interests.includes(newInterest.trim())) {
//         setResumeData({
//           ...resumeData,
//           interests: [...resumeData.interests, newInterest.trim()],
//         });
//         setNewInterest("");
//       }
//     };

//     const removeInterest = (interest) => {
//       setResumeData({
//         ...resumeData,
//         interests: resumeData.interests.filter((i) => i !== interest),
//       });
//     };


//   // UI Components
//   // Since we're converting from Next.js with shadcn/ui to React without those dependencies,
//   // we'll create simple component replacements

//   const Button = ({ children, onClick, variant, size, className, disabled, type }) => {
//     // Basic button styling based on variant
//     let buttonClass = "px-4 py-2 rounded font-medium ";
    
//     if (variant === "ghost") {
//       buttonClass += "bg-transparent hover:bg-gray-100 ";
//     } else if (variant === "outline") {
//       buttonClass += "bg-white border border-gray-300 hover:bg-gray-50 ";
//     } else {
//       // Default primary button
//       buttonClass += "bg-blue-600 text-white hover:bg-blue-700 ";
//     }
    
//     if (size === "icon") {
//       buttonClass += "p-1 ";
//     }
    
//     if (className) {
//       buttonClass += className;
//     }
    
//     return (
//       <button 
//         onClick={onClick} 
//         className={buttonClass}
//         disabled={disabled}
//         type={type || "button"}
//       >
//         {children}
//       </button>
//     );
//   };

//   const Input = ({ id, value, onChange, placeholder, type, disabled }) => {
//     return (
//       <input
//         id={id}
//         type={type || "text"}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     );
//   };

//   const Textarea = ({ id, value, onChange, placeholder, rows }) => {
//     return (
//       <textarea
//         id={id}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         rows={rows || 3}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     );
//   };

//   const Label = ({ htmlFor, children }) => {
//     return (
//       <label htmlFor={htmlFor} className="font-medium text-gray-700">
//         {children}
//       </label>
//     );
//   };

//   const Switch = ({ id, checked, onCheckedChange }) => {
//     return (
//       <div className="relative inline-block w-10 mr-2 align-middle select-none">
//         <input
//           type="checkbox"
//           id={id}
//           checked={checked}
//           onChange={() => onCheckedChange(!checked)}
//           className="opacity-0 w-0 h-0"
//         />
//         <label
//           htmlFor={id}
//           className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
//             checked ? "bg-blue-500" : "bg-gray-300"
//           }`}
//         >
//           <span
//             className={`block h-5 w-5 rounded-full bg-white transform transition-transform ${
//               checked ? "translate-x-5" : "translate-x-0"
//             }`}
//           ></span>
//         </label>
//       </div>
//     );
//   };

//   const Badge = ({ children, variant, className }) => {
//     let badgeClass = "inline-flex items-center rounded text-sm ";
    
//     if (variant === "secondary") {
//       badgeClass += "bg-gray-100 text-gray-800 ";
//     } else {
//       badgeClass += "bg-blue-100 text-blue-800 ";
//     }
    
//     if (className) {
//       badgeClass += className;
//     }
    
//     return <span className={badgeClass}>{children}</span>;
//   };

//   const Select = ({ children, value, onValueChange }) => {
//     return (
//       <select
//         value={value}
//         onChange={(e) => onValueChange(e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {children}
//       </select>
//     );
//   };

//   const SelectItem = ({ value, children }) => {
//     return <option value={value}>{children}</option>;
//   };

//   const SelectTrigger = ({ id, children }) => {
//     return <div id={id}>{children}</div>;
//   };

//   const SelectValue = ({ placeholder }) => {
//     return <span>{placeholder}</span>;
//   };

//   const SelectContent = ({ children }) => {
//     return <>{children}</>;
//   };

//   // Accordion components
//   const Accordion = ({ children, type, collapsible, defaultValue }) => {
//     const [activeItem, setActiveItem] = useState(defaultValue);
    
//     const toggleItem = (itemValue) => {
//       if (type === "single") {
//         if (collapsible && activeItem === itemValue) {
//           setActiveItem(null);
//         } else {
//           setActiveItem(itemValue);
//         }
//       }
//     };
    
//     // Clone children and pass necessary props
//     const items = React.Children.map(children, child => {
//       if (React.isValidElement(child)) {
//         return React.cloneElement(child, {
//           isActive: activeItem === child.props.value,
//           onToggle: () => toggleItem(child.props.value)
//         });
//       }
//       return child;
//     });
    
//     return <div className="space-y-2">{items}</div>;
//   };

//   const AccordionItem = ({ value, children, isActive, onToggle }) => {
//     return (
//       <div className="border rounded-md overflow-hidden">
//         {React.Children.map(children, child => {
//           if (React.isValidElement(child)) {
//             if (child.type.name === "AccordionTrigger") {
//               return React.cloneElement(child, { isActive, onToggle });
//             }
//             if (child.type.name === "AccordionContent") {
//               return React.cloneElement(child, { isActive });
//             }
//           }
//           return child;
//         })}
//       </div>
//     );
//   };

//   const AccordionTrigger = ({ children, isActive, onToggle }) => {
//     return (
//       <button
//         className="flex justify-between w-full px-4 py-3 font-medium text-left bg-gray-50 hover:bg-gray-100"
//         onClick={onToggle}
//       >
//         {children}
//         <span className={`transform transition-transform ${isActive ? "rotate-180" : ""}`}>▼</span>
//       </button>
//     );
//   };

//   const AccordionContent = ({ children, isActive }) => {
//     if (!isActive) return null;
    
//     return <div className="p-4 bg-white">{children}</div>;
//   };
  
//   return (
//     <div className="space-y-8">
//       <Accordion type="single" collapsible defaultValue="personal-info">
//         <AccordionItem value="personal-info">
//           <AccordionTrigger>Personal Information</AccordionTrigger>
//           <AccordionContent>
//             <div className="grid gap-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     value={resumeData.personalInfo.name}
//                     onChange={(e) => updatePersonalInfo("name", e.target.value)}
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Professional Title</Label>
//                   <Input
//                     id="title"
//                     value={resumeData.personalInfo.title}
//                     onChange={(e) => updatePersonalInfo("title", e.target.value)}
//                     placeholder="Software Engineer"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={resumeData.personalInfo.email}
//                     onChange={(e) => updatePersonalInfo("email", e.target.value)}
//                     placeholder="john.doe@example.com"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     value={resumeData.personalInfo.phone}
//                     onChange={(e) => updatePersonalInfo("phone", e.target.value)}
//                     placeholder="(123) 456-7890"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="website">Website/Portfolio</Label>
//                   <Input
//                     id="website"
//                     value={resumeData.personalInfo.website}
//                     onChange={(e) => updatePersonalInfo("website", e.target.value)}
//                     placeholder="https://johndoe.com"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Location</Label>
//                   <Input
//                     id="location"
//                     value={resumeData.personalInfo.location}
//                     onChange={(e) => updatePersonalInfo("location", e.target.value)}
//                     placeholder="New York, NY"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="summary">Professional Summary</Label>
//                 <Textarea
//                   id="summary"
//                   value={resumeData.personalInfo.summary}
//                   onChange={(e) => updatePersonalInfo("summary", e.target.value)}
//                   placeholder="Experienced software engineer with a passion for..."
//                   rows={4}
//                 />
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="experience">
//           <AccordionTrigger>Work Experience</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.experience.map((exp) => (
//                 <div key={exp.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeExperience(exp.id)}
//                     disabled={resumeData.experience.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`company-${exp.id}`}>Company</Label>
//                         <Input
//                           id={`company-${exp.id}`}
//                           value={exp.company}
//                           onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
//                           placeholder="Company Name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`position-${exp.id}`}>Position</Label>
//                         <Input
//                           id={`position-${exp.id}`}
//                           value={exp.position}
//                           onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
//                           placeholder="Job Title"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
//                         <Input
//                           id={`start-date-${exp.id}`}
//                           value={exp.startDate}
//                           onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
//                           placeholder="Jan 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
//                           <div className="flex items-center space-x-2">
//                             <Switch
//                               id={`current-${exp.id}`}
//                               checked={exp.current}
//                               onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
//                             />
//                             <Label htmlFor={`current-${exp.id}`}>Current</Label>
//                           </div>
//                         </div>
//                         <Input
//                           id={`end-date-${exp.id}`}
//                           value={exp.endDate}
//                           onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
//                           placeholder="Present"
//                           disabled={exp.current}
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`description-${exp.id}`}>Description</Label>
//                       <Textarea
//                         id={`description-${exp.id}`}
//                         value={exp.description}
//                         onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
//                         placeholder="Describe your responsibilities and achievements..."
//                         rows={3}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Key Achievements/Highlights</Label>
//                       <form
//                         className="flex gap-2"
//                         onSubmit={addExperienceHighlight}
//                         onFocus={() => setActiveExperienceId(exp.id)}
//                       >
//                         <Input
//                           value={activeExperienceId === exp.id ? newHighlight : ""}
//                           onChange={(e) => setNewHighlight(e.target.value)}
//                           placeholder="Led a team of 5 developers..."
//                         />
//                         <Button type="submit">Add</Button>
//                       </form>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {exp.highlights.map((highlight, index) => (
//                           <Badge key={index} variant="secondary" className="px-3 py-1">
//                             {highlight}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 p-0"
//                               onClick={() => removeExperienceHighlight(exp.id, highlight)}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addExperience} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Experience
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="education">
//           <AccordionTrigger>Education</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//                 {(resumeData.education || []).map((edu) => (

//                 <div key={edu.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeEducation(edu.id)}
//                     disabled={resumeData.education.length === 1}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
//                       <Input
//                         id={`institution-${edu.id}`}
//                         value={edu.institution}
//                         onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
//                         placeholder="University Name"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
//                         <Input
//                           id={`degree-${edu.id}`}
//                           value={edu.degree}
//                           onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
//                           placeholder="Bachelor of Science"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
//                         <Input
//                           id={`field-${edu.id}`}
//                           value={edu.field}
//                           onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
//                           placeholder="Computer Science"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
//                         <Input
//                           id={`edu-start-date-${edu.id}`}
//                           value={edu.startDate}
//                           onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
//                           placeholder="Sep 2016"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
//                         <Input
//                           id={`edu-end-date-${edu.id}`}
//                           value={edu.endDate}
//                           onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
//                           placeholder="May 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
//                         <Input
//                           id={`gpa-${edu.id}`}
//                           value={edu.gpa}
//                           onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
//                           placeholder="3.8/4.0"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</Label>
//                       <Textarea
//                         id={`edu-description-${edu.id}`}
//                         value={edu.description}
//                         onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
//                         placeholder="Relevant coursework, achievements, etc."
//                         rows={2}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addEducation} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Education
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="skills">
//           <AccordionTrigger>Skills</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4">
//               <form onSubmit={addSkill} className="flex gap-2">
//                 <Input
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="Add a skill (e.g., JavaScript)"
//                 />
//                 <Button type="submit">Add</Button>
//               </form>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.skills.map((skill) => (
//                   <Badge key={skill} variant="secondary" className="px-3 py-1">
//                     {skill}
//                     <Button variant="ghost" size="icon" className="h-4 w-4 ml-2 p-0" onClick={() => removeSkill(skill)}>
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//                 {resumeData.skills.length === 0 && (
//                   <p className="text-sm text-muted-foreground">No skills added yet.</p>
//                 )}
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="projects">
//           <AccordionTrigger>Projects</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.projects.map((project) => (
//                 <div key={project.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeProject(project.id)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="grid grid-cols-1 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
//                         <Input
//                           id={`project-name-${project.id}`}
//                           value={project.name}
//                           onChange={(e) => updateProject(project.id, "name", e.target.value)}
//                           placeholder="Project Name"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-url-${project.id}`}>Project URL (Optional)</Label>
//                         <Input
//                           id={`project-url-${project.id}`}
//                           value={project.url}
//                           onChange={(e) => updateProject(project.id, "url", e.target.value)}
//                           placeholder="https://github.com/username/project"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`project-start-date-${project.id}`}>Start Date</Label>
//                         <Input
//                           id={`project-start-date-${project.id}`}
//                           value={project.startDate}
//                           onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
//                           placeholder="Jan 2020"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <div className="flex items-center justify-between">
//                           <Label htmlFor={`project-end-date-${project.id}`}>End Date</Label>
//                           <div className="flex items-center space-x-2">
//                             <Switch
//                               id={`project-current-${project.id}`}
//                               checked={project.current}
//                               onCheckedChange={(checked) => updateProject(project.id, "current", checked)}
//                             />
//                             <Label htmlFor={`project-current-${project.id}`}>Ongoing</Label>
//                           </div>
//                         </div>
//                         <Input
//                           id={`project-end-date-${project.id}`}
//                           value={project.endDate}
//                           onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
//                           placeholder="Present"
//                           disabled={project.current}
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`project-description-${project.id}`}>Description</Label>
//                       <Textarea
//                         id={`project-description-${project.id}`}
//                         value={project.description}
//                         onChange={(e) => updateProject(project.id, "description", e.target.value)}
//                         placeholder="Describe the project, technologies used, and your role..."
//                         rows={3}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Key Features/Highlights</Label>
//                       <form
//                         className="flex gap-2"
//                         onSubmit={addProjectHighlight}
//                         onFocus={() => setActiveProjectId(project.id)}
//                       >
//                         <Input
//                           value={activeProjectId === project.id ? newProjectHighlight : ""}
//                           onChange={(e) => setNewProjectHighlight(e.target.value)}
//                           placeholder="Implemented real-time chat..."
//                         />
//                         <Button type="submit">Add</Button>
//                       </form>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {project.highlights.map((highlight, index) => (
//                           <Badge key={index} variant="secondary" className="px-3 py-1">
//                             {highlight}
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-4 w-4 ml-2 p-0"
//                               onClick={() => removeProjectHighlight(project.id, highlight)}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addProject} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Project
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="certifications">
//           <AccordionTrigger>Certifications</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.certifications.map((cert) => (
//                 <div key={cert.id} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeCertification(cert.id)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
//                       <Input
//                         id={`cert-name-${cert.id}`}
//                         value={cert.name}
//                         onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
//                         placeholder="AWS Certified Solutions Architect"
//                       />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`cert-issuer-${cert.id}`}>Issuing Organization</Label>
//                         <Input
//                           id={`cert-issuer-${cert.id}`}
//                           value={cert.issuer}
//                           onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
//                           placeholder="Amazon Web Services"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor={`cert-date-${cert.id}`}>Date</Label>
//                         <Input
//                           id={`cert-date-${cert.id}`}
//                           value={cert.date}
//                           onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
//                           placeholder="May 2020"
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`cert-url-${cert.id}`}>URL (Optional)</Label>
//                       <Input
//                         id={`cert-url-${cert.id}`}
//                         value={cert.url}
//                         onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
//                         placeholder="https://www.credential.net/..."
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addCertification} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Certification
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="languages">
//           <AccordionTrigger>Languages</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-6">
//               {resumeData.languages.map((lang, index) => (
//                 <div key={index} className="p-4 border rounded-md relative">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2"
//                     onClick={() => removeLanguage(index)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor={`language-${index}`}>Language</Label>
//                       <Input
//                         id={`language-${index}`}
//                         value={lang.language}
//                         onChange={(e) => updateLanguage(index, "language", e.target.value)}
//                         placeholder="English"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor={`proficiency-${index}`}>Proficiency</Label>
//                       <Select
//                         value={lang.proficiency}
//                         onValueChange={(value) => updateLanguage(index, "proficiency", value)}
//                       >
//                         <SelectTrigger id={`proficiency-${index}`}>
//                           <SelectValue placeholder="Select proficiency" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Native">Native</SelectItem>
//                           <SelectItem value="Fluent">Fluent</SelectItem>
//                           <SelectItem value="Advanced">Advanced</SelectItem>
//                           <SelectItem value="Intermediate">Intermediate</SelectItem>
//                           <SelectItem value="Basic">Basic</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addLanguage} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" /> Add Language
//               </Button>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="interests">
//           <AccordionTrigger>Interests</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4">
//               <form onSubmit={addInterest} className="flex gap-2">
//                 <Input
//                   value={newInterest}
//                   onChange={(e) => setNewInterest(e.target.value)}
//                   placeholder="Add an interest (e.g., Photography)"
//                 />
//                 <Button type="submit">Add</Button>
//               </form>
//               <div className="flex flex-wrap gap-2">
//                 {resumeData.interests.map((interest) => (
//                   <Badge key={interest} variant="secondary" className="px-3 py-1">
//                     {interest}
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-4 w-4 ml-2 p-0"
//                       onClick={() => removeInterest(interest)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//                 {resumeData.interests.length === 0 && (
//                   <p className="text-sm text-muted-foreground">No interests added yet.</p>
//                 )}
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   )
// }

// }
