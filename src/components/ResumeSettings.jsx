"use client"

import React from "react";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Card, CardContent } from "@/components/ui/Card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

const templateOptions = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimal", label: "Minimal" },
];

const colorOptions = [
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "green", label: "Green", className: "bg-green-500" },
  { value: "purple", label: "Purple", className: "bg-purple-500" },
  { value: "red", label: "Red", className: "bg-red-500" },
  { value: "gray", label: "Gray", className: "bg-gray-500" },
];

const fontOptions = [
  { value: "sans", label: "Sans-serif", className: "font-sans" },
  { value: "serif", label: "Serif", className: "font-serif" },
  { value: "mono", label: "Monospace", className: "font-mono" },
];

const sectionLabels = {
  summary: "Professional Summary",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  interests: "Interests",
};

export default function ResumeSettings({ settings = {}, setSettings, resumeData = {} }) {
  const sectionOrder = Array.isArray(settings?.sectionOrder) ? settings.sectionOrder : [];
  
  const availableSections = sectionOrder.filter((section) => {
    if (section === "summary") return resumeData?.personalInfo?.summary;
    if (section === "skills") return resumeData?.skills?.length > 0;
    if (section === "interests") return resumeData?.interests?.length > 0;
    return resumeData?.[section]?.length > 0;
  });

  const handleTemplateChange = (value) => {
    setSettings((prev) => ({ ...prev, template: value }));
  };

  const handleColorChange = (value) => {
    setSettings((prev) => ({ ...prev, colorTheme: value }));
  };

  const handleFontChange = (value) => {
    setSettings((prev) => ({ ...prev, fontStyle: value }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(availableSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the full section order while preserving hidden sections
    const newSectionOrder = [...settings.sectionOrder];
    availableSections.forEach((section, oldIndex) => {
      const newIndex = items.indexOf(section);
      if (oldIndex !== newIndex) {
        const sectionIndex = newSectionOrder.indexOf(section);
        newSectionOrder.splice(sectionIndex, 1);

        // Find the insertion point
        let insertionIndex = 0;
        if (newIndex > 0) {
          const prevSection = items[newIndex - 1];
          insertionIndex = newSectionOrder.indexOf(prevSection) + 1;
        }

        newSectionOrder.splice(insertionIndex, 0, section);
      }
    });

    setSettings((prev) => ({ ...prev, sectionOrder: newSectionOrder }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Template Style</h3>
        <RadioGroup
          value={settings.template}
          onValueChange={handleTemplateChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {templateOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`template-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`template-${option.value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="w-full h-32 mb-2 border rounded flex items-center justify-center">
                  {option.value === "modern" && (
                    <div className="w-full h-full p-2 flex flex-col">
                      <div className="h-6 bg-primary/20 mb-2 rounded"></div>
                      <div className="flex flex-1 gap-2">
                        <div className="w-1/3 bg-primary/10 rounded"></div>
                        <div className="w-2/3 flex flex-col gap-1">
                          <div className="h-3 bg-primary/10 rounded"></div>
                          <div className="h-3 bg-primary/10 rounded"></div>
                          <div className="h-3 bg-primary/10 rounded"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {option.value === "classic" && (
                    <div className="w-full h-full p-2 flex flex-col">
                      <div className="h-8 bg-primary/20 mb-2 rounded flex items-center justify-center">
                        <div className="w-1/2 h-3 bg-white/50 rounded"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="h-4 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                      </div>
                    </div>
                  )}
                  {option.value === "minimal" && (
                    <div className="w-full h-full p-2 flex flex-col">
                      <div className="h-6 flex justify-between items-center mb-2">
                        <div className="w-1/3 h-4 bg-primary/20 rounded"></div>
                        <div className="w-1/3 h-3 bg-primary/10 rounded"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                        <div className="h-3 bg-primary/10 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Color Theme</h3>
        <RadioGroup
          value={settings.colorTheme}
          onValueChange={handleColorChange}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {colorOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`color-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`color-${option.value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className={`w-8 h-8 rounded-full mb-2 ${option.className}`}></div>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Font Style</h3>
        <RadioGroup
          value={settings.fontStyle}
          onValueChange={handleFontChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {fontOptions.map((option) => (
            <div key={option.value}>
              <RadioGroupItem value={option.value} id={`font-${option.value}`} className="peer sr-only" />
              <Label
                htmlFor={`font-${option.value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className={`text-xl mb-2 ${option.className}`}>Aa</span>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Section Order</h3>
        <Card>
          <CardContent className="p-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {availableSections.map((section, index) => (
                      <Draggable key={section} draggableId={section} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center p-3 bg-muted rounded-md"
                          >
                            <div {...provided.dragHandleProps} className="mr-2">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            {sectionLabels[section] || section}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}