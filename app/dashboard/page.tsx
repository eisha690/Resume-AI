"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('resumeai_user');
    setUsername(user || "User");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('resumeai_user');
    router.push('/login');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadResume = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 20 + 10;
      });
    }, 300);

    // Simulate processing time
    setTimeout(async () => {
      setIsUploading(false);
      setShowUploadModal(false);
      // Parse the uploaded file and extract content
      await parseResumeFile(uploadedFile);
      // Navigate to resume editor after parsing is done
      router.push('/resume-editor');
    }, 2000);
  };

  const parseResumeFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        // For PDF, use ArrayBuffer and parse with PDF.js
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        await parsePDFResume(typedarray);
      } else {
        // For text files
        const content = e.target?.result as string;
        parseTextResume(content);
      }
    };
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
    // Wait for FileReader to finish (wrap in a Promise)
    await new Promise(resolve => {
      reader.onloadend = resolve;
    });
  };

  // Helper: Load resume data from localStorage into state (for preview after refresh)
  const loadResumeFromStorage = () => {
    return {
      name: localStorage.getItem('resume_name') || '',
      email: localStorage.getItem('resume_email') || '',
      phone: localStorage.getItem('resume_phone') || '',
      address: localStorage.getItem('resume_address') || '',
      summary: localStorage.getItem('resume_summary') || '',
      skills: JSON.parse(localStorage.getItem('resume_skills') || '[]'),
      experience: JSON.parse(localStorage.getItem('resume_experience') || '[]'),
      education: JSON.parse(localStorage.getItem('resume_education') || '[]'),
    };
  };

  // Improved parsing logic
  const parseTextResume = (content: string) => {
    const lines = content.split(/\r?\n|\r/).map(line => line.trim()).filter(line => line);
    let name = "";
    let email = "";
    let phone = "";
    let address = "";
    let summary = "";
    let skills: string[] = [];
    let experience: any[] = [];
    let education: any[] = [];
    let certifications: string[] = [];
    let currentSection = "";
    let sectionBuffer: string[] = [];
    let headerParsed = false;

    // --- Header Extraction: Only use the first contiguous block before any section header ---
    let headerEndIdx = lines.findIndex(line =>
      /^(summary|objective|profile|skills|technologies|technical skills|experience|employment|work history|professional experience|education|degree|academic|certifications|awards)/i.test(line)
    );
    if (headerEndIdx === -1) headerEndIdx = Math.min(lines.length, 8); // fallback: first 8 lines
    const headerLines = lines.slice(0, headerEndIdx);
    for (let i = 0; i < headerLines.length; i++) {
      const line = headerLines[i];
      const lower = line.toLowerCase();
      // Email
      if (!email && lower.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)) {
        email = line;
        continue;
      }
      // Phone
      if (!phone && lower.match(/\+?\d[\d\s\-()]{7,}/)) {
        phone = line;
        continue;
      }
      // Address (very basic: has 'address' or looks like a location)
      if (!address && (lower.includes('address') || lower.match(/\d+\s+\w+/) || lower.match(/\b(street|road|city|state|turkey|istanbul)\b/))) {
        address = line;
        continue;
      }
      // Name: first non-empty, non-email, non-phone, non-address line at the top
      if (!name && i < 4 && !lower.includes('summary') && !lower.includes('objective') && !lower.includes('profile') && !lower.includes('skills') && !lower.includes('experience') && !lower.includes('education') && !lower.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/) && !lower.match(/\+?\d[\d\s\-()]{7,}/) && !lower.includes('address') && !lower.match(/\d+\s+\w+/)) {
        if (line.split(' ').length >= 2 && line.split(' ').length <= 4 && line.length < 40) {
          name = line;
          continue;
        }
      }
    }
    // Fallbacks
    if (!name) name = "FIRST NAME SURNAME";
    if (!email) email = "";
    if (!phone) phone = "";
    if (!address) address = "";

    // --- Section Extraction ---
    // Only parse lines after header block
    const sectionLines = lines.slice(headerEndIdx);
    const flushSection = () => {
      const text = sectionBuffer.join('\n').trim();
      if (!text) return;
      if (currentSection === "summary") summary = text;
      else if (currentSection === "skills") {
        skills = text.split(/[,;•\u2022\n]+/).map(s => s.trim()).filter(Boolean);
      } else if (currentSection === "experience") {
        const expBlocks = text.split(/\n{2,}|•|\u2022/).map(b => b.trim()).filter(Boolean);
        expBlocks.forEach(block => {
          const lines = block.split(/\n+/).map(l => l.trim()).filter(Boolean);
          let title = lines[0] || "";
          let company = lines[1] || "";
          let duration = lines[2] || "";
          let description = lines.slice(3);
          if (lines.length === 2) description = [];
          experience.push({ title, company, duration, description });
        });
      } else if (currentSection === "education") {
        const eduBlocks = text.split(/\n{2,}|•|\u2022/).map(b => b.trim()).filter(Boolean);
        eduBlocks.forEach(block => {
          const lines = block.split(/\n+/).map(l => l.trim()).filter(Boolean);
          let degree = lines[0] || "";
          let institution = lines[1] || "";
          let year = lines[2] || "";
          education.push({ degree, institution, year });
        });
      } else if (currentSection === "certifications") {
        certifications = text.split(/[,;•\u2022\n]+/).map(s => s.trim()).filter(Boolean);
      }
      sectionBuffer = [];
    };

    let sectionMap: { [key: string]: string } = {
      summary: "summary",
      objective: "summary",
      profile: "summary",
      skills: "skills",
      technologies: "skills",
      "technical skills": "skills",
      experience: "experience",
      employment: "experience",
      "work history": "experience",
      "professional experience": "experience",
      education: "education",
      degree: "education",
      academic: "education",
      certifications: "certifications",
      awards: "certifications"
    };

    for (let i = 0; i < sectionLines.length; i++) {
      const line = sectionLines[i];
      const lower = line.toLowerCase();
      const sectionHeader = Object.keys(sectionMap).find(key => lower.startsWith(key));
      if (sectionHeader) {
        flushSection();
        currentSection = sectionMap[sectionHeader];
        headerParsed = true;
        continue;
      }
      if (currentSection) sectionBuffer.push(line);
    }
    flushSection();
    // Save parsed data to localStorage
    localStorage.setItem('resume_name', name);
    localStorage.setItem('resume_email', email);
    localStorage.setItem('resume_phone', phone);
    localStorage.setItem('resume_address', address);
    localStorage.setItem('resume_summary', summary);
    localStorage.setItem('resume_skills', JSON.stringify(skills));
    localStorage.setItem('resume_experience', JSON.stringify(experience));
    localStorage.setItem('resume_education', JSON.stringify(education));
    localStorage.setItem('resume_certifications', JSON.stringify(certifications));
  };

  const parsePDFResume = async (typedarray: Uint8Array) => {
    try {
      // Dynamically import pdfjs-dist only when needed
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        // Join each text item with a line break to preserve section structure
        const strings = content.items.map((item: any) => item.str);
        fullText += strings.join('\n\n') + '\n\n';
      }
      console.log('PDF Extracted Text:', fullText); // <-- Add this line
      parseTextResume(fullText);
    } catch (err) {
      alert('Failed to parse PDF: ' + err);
    }
  };

  const parseGenericResume = (content: string) => {
    // Generic parsing for any file type
    parseTextResume(content);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Monogram/Logo */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 shadow-md">
                <span className="text-white text-2xl font-extrabold select-none">R</span>
              </div>
              <span className="text-2xl font-bold text-blue-700 tracking-tight select-none">ResumeAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg backdrop-blur-sm hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            Welcome to ResumeAI
            <span className="inline-block align-middle">
              {/* Hand wave SVG icon */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 19.5V10.75C27.5 8.67893 25.8211 7 23.75 7C21.6789 7 20 8.67893 20 10.75V19.5" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M20 19.5V8.75C20 6.67893 18.3211 5 16.25 5C14.1789 5 12.5 6.67893 12.5 8.75V19.5" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M12.5 19.5V13.75C12.5 11.6789 10.8211 10 8.75 10C6.67893 10 5 11.6789 5 13.75V23.5C5 28.1944 8.80558 32 13.5 32H22.5C27.1944 32 31 28.1944 31 23.5V19.5" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Ready to create your professional resume?
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Resume Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Resume</h3>
                <p className="text-gray-600">
                  Start from scratch with our professional templates and create a stunning resume
                </p>
              </div>
              
              {/* Resume Preview Design */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="bg-white rounded border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-16 h-4 bg-blue-600 rounded"></div>
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="w-20 h-3 bg-gray-300 rounded"></div>
                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/resume-editor')}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create Resume</span>
              </button>
            </div>
          </div>

          {/* Edit Resume Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h3>
                <p className="text-gray-600">
                  Upload your existing resume and we'll help you enhance it with our professional templates
                </p>
              </div>
              
              {/* Resume Preview Design */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="bg-white rounded border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-16 h-4 bg-green-600 rounded"></div>
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="w-20 h-3 bg-gray-300 rounded"></div>
                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowUploadModal(true)}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Upload Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download Resume</h4>
              <p className="text-sm text-gray-600">Get your resume in PDF format</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Resume</h4>
              <p className="text-sm text-gray-600">Share your resume with employers</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cover Letter</h4>
              <p className="text-sm text-gray-600">Generate matching cover letter</p>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Resume</h3>
              <p className="text-gray-600">Upload your existing resume file to get started</p>
            </div>

            {!isUploading ? (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX, or TXT files</p>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-green-800 font-medium">{uploadedFile.name}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadResume}
                    disabled={!uploadedFile}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upload & Continue
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Resume</h3>
                  <p className="text-gray-600 mb-4">Extracting content and preparing your resume...</p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">{uploadProgress}% Complete</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}