"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "../../../../components/templates";
import { ResumeData, TemplateStyling } from "../../../../components/types";

export default function EditHeaderSection() {
  const router = useRouter();
  
  // Initial header state
  const [header, setHeader] = useState({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345"
  });

  // Example resume data for preview (other fields static)
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary: "Experienced software developer...",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        description: [
          "Led development of microservices architecture serving 1M+ users",
          "Mentored junior developers and conducted code reviews",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
        ],
      }
    ],
    education: [
      { degree: "BSc Computer Science", institution: "University", year: "2020" }
    ],
    customSections: []
  });

  // Load existing header data from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('resume_name');
    const savedEmail = localStorage.getItem('resume_email');
    const savedPhone = localStorage.getItem('resume_phone');
    const savedAddress = localStorage.getItem('resume_address');

    if (savedName || savedEmail || savedPhone || savedAddress) {
      const updatedHeader = {
        name: savedName || header.name,
        email: savedEmail || header.email,
        phone: savedPhone || header.phone,
        address: savedAddress || header.address
      };
      setHeader(updatedHeader);
      setResumeData(rd => ({ ...rd, ...updatedHeader }));
    }
  }, []);

  // Update preview as user types
  const handleChange = (field: string, value: string) => {
    const updated = { ...header, [field]: value };
    setHeader(updated);
    setResumeData(rd => ({ ...rd, ...updated }));
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
        <h2 className="text-2xl font-bold mb-6">Edit Header</h2>
        <input 
          className="border rounded px-3 py-2 mb-4 w-full" 
          placeholder="Full Name" 
          value={header.name} 
          onChange={e => handleChange("name", e.target.value)} 
        />
        <input 
          className="border rounded px-3 py-2 mb-4 w-full" 
          placeholder="Email Address" 
          value={header.email} 
          onChange={e => handleChange("email", e.target.value)} 
        />
        <input 
          className="border rounded px-3 py-2 mb-4 w-full" 
          placeholder="Phone Number" 
          value={header.phone} 
          onChange={e => handleChange("phone", e.target.value)} 
        />
        <textarea 
          className="border rounded px-3 py-2 mb-4 w-full" 
          placeholder="Address" 
          rows={3} 
          value={header.address} 
          onChange={e => handleChange("address", e.target.value)} 
        />
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" 
          onClick={() => {
            localStorage.setItem('resume_name', header.name);
            localStorage.setItem('resume_email', header.email);
            localStorage.setItem('resume_phone', header.phone);
            localStorage.setItem('resume_address', header.address);
            router.push("/resume-editor");
          }}
        >
          Confirm
        </button>
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