"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "../../../../components/templates";
import { ResumeData, TemplateStyling } from "../../../../components/types";

export default function EditSkillsSection() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary: "Experienced software developer...",
    skills: skills,
    experience: [],
    education: [],
    customSections: []
  });
  const handleChange = (value: string) => {
    const arr = value.split(",").map(s => s.trim()).filter(Boolean);
    setSkills(arr);
    setResumeData(rd => ({ ...rd, skills: arr }));
  };
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
      <div className="w-1/2 p-12 flex flex-col justify-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Edit Skills</h2>
        <input className="border rounded px-3 py-2 mb-4 w-full" placeholder="Skills (comma separated)" value={skills.join(", ")} onChange={e => handleChange(e.target.value)} />
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push("/resume-editor")}>Back</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => {
            localStorage.setItem('resume_skills', JSON.stringify(skills));
            router.push("/resume-editor");
          }}>Confirm</button>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="shadow-lg rounded-lg p-6" style={{ width: 700, minHeight: 800, background: "white" }}>
          <ClassicTemplate data={resumeData} styling={styling} />
        </div>
      </div>
    </div>
  );
} 