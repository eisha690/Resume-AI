"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "../../../components/templates";
import { ResumeData, TemplateStyling } from "../../../components/types";

export default function EditExperienceSection() {
  const router = useRouter();
  // Initial blank state for experience
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: [""]
  });
  // Example resume data for preview (other fields static)
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary: "Experienced software developer...",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [experience],
    education: [
      { degree: "BSc Computer Science", institution: "University", year: "2020" }
    ],
    customSections: []
  });
  // Update preview as user types
  const handleChange = (field: string, value: string | string[]) => {
    const updated = { ...experience, [field]: value };
    setExperience(updated);
    setResumeData((rd: ResumeData) => ({ ...rd, experience: [updated] }));
  };
  // Styling for preview
  const styling: TemplateStyling = {
    primaryColor: "bg-red-600",
    fontFamily: "Arial",
    fontSize: 18,
    headingSize: 22,
    sectionSpacing: 18,
    paragraphSpacing: 10,
    lineSpacing: 1.2,
  };
  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Edit Experience</h2>
        <input className="border rounded px-3 py-2 mb-4 w-full" placeholder="Job Title" value={experience.title} onChange={e => handleChange("title", e.target.value)} />
        <input className="border rounded px-3 py-2 mb-4 w-full" placeholder="Employer" value={experience.company} onChange={e => handleChange("company", e.target.value)} />
        <input className="border rounded px-3 py-2 mb-4 w-full" placeholder="Duration" value={experience.duration} onChange={e => handleChange("duration", e.target.value)} />
        <textarea className="border rounded px-3 py-2 mb-4 w-full" placeholder="Description (one per line)" rows={4} value={experience.description.join("\n")} onChange={e => handleChange("description", e.target.value.split("\n"))} />
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => {
  localStorage.setItem('resume_experience', JSON.stringify([experience]));
  router.push("/resume-editor");
}}>Confirm</button>
      </div>
      {/* Right: Live Preview */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="shadow-lg rounded-lg p-6" style={{ width: 700, minHeight: 800, background: "white" }}>
          <ClassicTemplate data={resumeData} styling={styling} />
        </div>
      </div>
    </div>
  );
} 