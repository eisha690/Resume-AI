"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ClassicTemplate } from "../../../../../components/templates";
import { ResumeData, TemplateStyling } from "../../../../../components/types";

export default function EditCustomSection() {
  const router = useRouter();
  const params = useParams();
  const sectionId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [sectionName, setSectionName] = useState("Custom Section");
  const [content, setContent] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary: "Experienced software developer...",
    skills: [],
    experience: [],
    education: [],
    customSections: [{ id: sectionId, name: sectionName, content }]
  });
  const handleChange = (value: string) => {
    setContent(value);
    setResumeData(rd => ({ ...rd, customSections: [{ id: sectionId, name: sectionName, content: value }] }));
  };
  const handleNameChange = (value: string) => {
    setSectionName(value);
    setResumeData(rd => ({ ...rd, customSections: [{ id: sectionId, name: value, content }] }));
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
        <h2 className="text-2xl font-bold mb-6">Edit Custom Section</h2>
        <input className="border rounded px-3 py-2 mb-4 w-full" placeholder="Section Name" value={sectionName} onChange={e => handleNameChange(e.target.value)} />
        <textarea className="border rounded px-3 py-2 mb-4 w-full" placeholder="Description" rows={6} value={content} onChange={e => handleChange(e.target.value)} />
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push("/resume-editor")}>Back</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => {
            // Save custom section to localStorage
            const stored = localStorage.getItem('resume_customSections');
            let customSections = [];
            try {
              customSections = stored ? JSON.parse(stored) : [];
            } catch { customSections = []; }
            // Update or add this section
            const idx = customSections.findIndex((cs:any) => cs.id === sectionId);
            if (idx !== -1) {
              customSections[idx] = { id: sectionId, name: sectionName, content };
            } else {
              customSections.push({ id: sectionId, name: sectionName, content });
            }
            localStorage.setItem('resume_customSections', JSON.stringify(customSections));
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