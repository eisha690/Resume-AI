"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "../../../../components/templates";
import { ResumeData, TemplateStyling } from "../../../../components/types";

export default function EditEducationSection() {
  const router = useRouter();
  const [education, setEducation] = useState({
    schoolName: "",
    schoolLocation: "",
    degree: "",
    fieldOfStudy: "",
    gradMonth: "",
    gradYear: "",
    stillEnrolled: false
  });
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "email@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary: "Experienced software developer...",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [],
    education: [{
      degree: education.degree,
      institution: education.schoolName + (education.schoolLocation ? ", " + education.schoolLocation : ""),
      year: education.stillEnrolled ? "Present" : (education.gradMonth && education.gradYear ? education.gradMonth + " " + education.gradYear : "")
    }],
    customSections: []
  });
  const handleChange = (field: string, value: string | boolean) => {
    const updated = { ...education, [field]: value };
    setEducation(updated);
    setResumeData(rd => ({
      ...rd,
      education: [{
        degree: updated.degree,
        institution: updated.schoolName + (updated.schoolLocation ? ", " + updated.schoolLocation : ""),
        year: updated.stillEnrolled ? "Present" : (updated.gradMonth && updated.gradYear ? updated.gradMonth + " " + updated.gradYear : "")
      }]
    }));
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({length: 50}, (_, i) => (new Date().getFullYear() - i).toString());
  const degrees = ["Select", "High School", "Associate", "Bachelor's", "Master's", "PhD", "Diploma", "Certificate", "Other"];
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
        <h2 className="text-3xl font-black mb-8">Let's talk about your education</h2>
        <div className="flex gap-4 mb-4">
          <input className="border rounded px-3 py-2 w-1/2" placeholder="School Name" value={education.schoolName} onChange={e => handleChange("schoolName", e.target.value)} />
          <input className="border rounded px-3 py-2 w-1/2" placeholder="School Location" value={education.schoolLocation} onChange={e => handleChange("schoolLocation", e.target.value)} />
        </div>
        <div className="flex gap-4 mb-4">
          <select className="border rounded px-3 py-2 w-1/2" value={education.degree} onChange={e => handleChange("degree", e.target.value)}>
            {degrees.map(d => <option key={d} value={d === "Select" ? "" : d}>{d}</option>)}
          </select>
          <input className="border rounded px-3 py-2 w-1/2" placeholder="Field of Study" value={education.fieldOfStudy} onChange={e => handleChange("fieldOfStudy", e.target.value)} />
        </div>
        <div className="flex gap-4 mb-4 items-center">
          <label className="text-gray-700 font-semibold">Graduation Date</label>
          <select className="border rounded px-2 py-2" value={education.gradMonth} onChange={e => handleChange("gradMonth", e.target.value)}>
            <option value="">Month</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="border rounded px-2 py-2" value={education.gradYear} onChange={e => handleChange("gradYear", e.target.value)}>
            <option value="">Year</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <label className="flex items-center ml-4">
            <input type="checkbox" className="mr-2" checked={education.stillEnrolled} onChange={e => handleChange("stillEnrolled", e.target.checked)} />
            I'm still enrolled
          </label>
        </div>
        <div className="flex gap-4 mt-8">
          <button className="px-6 py-2 bg-gray-200 rounded font-semibold" onClick={() => router.push("/resume-editor")}>Back</button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded font-semibold" onClick={() => {
            localStorage.setItem('resume_education', JSON.stringify([{ degree: education.degree, institution: education.schoolName + (education.schoolLocation ? ", " + education.schoolLocation : ""), year: education.stillEnrolled ? "Present" : (education.gradMonth && education.gradYear ? education.gradMonth + " " + education.gradYear : "") }]));
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