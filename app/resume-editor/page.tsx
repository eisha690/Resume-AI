"use client";
import React, { useState } from "react";
import {
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  ElegantTemplate,
  BoldTemplate,
  ProfessionalTemplate,
} from "../../components/templates";
import { ResumeData, TemplateStyling, TemplateConfig } from "../../components/types";
import ZoomController from "../../components/ZoomController";
import Button from "../../Button";

const COLORS = [
  { name: "Red", value: "bg-red-600", text: "text-red-600" },
  { name: "Blue", value: "bg-blue-600", text: "text-blue-600" },
  { name: "Green", value: "bg-green-600", text: "text-green-600" },
  { name: "Black", value: "bg-black", text: "text-black" },
  { name: "Purple", value: "bg-purple-600", text: "text-purple-600" },
  { name: "Teal", value: "bg-teal-600", text: "text-teal-600" },
  { name: "Orange", value: "bg-orange-600", text: "text-orange-600" },
];

const TEMPLATES: TemplateConfig[] = [
  { id: "classic", name: "Classic", component: ClassicTemplate, preview: "" },
  { id: "modern", name: "Modern", component: ModernTemplate, preview: "" },
  { id: "minimal", name: "Minimal", component: MinimalTemplate, preview: "" },
  { id: "elegant", name: "Elegant", component: ElegantTemplate, preview: "" },
  { id: "bold", name: "Bold", component: BoldTemplate, preview: "" },
  { id: "professional", name: "Professional", component: ProfessionalTemplate, preview: "" },
];

const FONT_STYLES = ["Arial", "Times New Roman", "Roboto", "Georgia", "Montserrat", "Inter"];

const DEFAULT_SECTIONS = [
  { id: 1, name: "Summary" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Experience" },
  { id: 4, name: "Education and Training" },
];

const SIDEBAR_TABS = [
  { key: "templates", label: "Templates", icon: <Squares2X2Icon className="w-6 h-6" /> },
  { key: "sections", label: "Sections", icon: <ListBulletIcon className="w-6 h-6" /> },
  { key: "format", label: "Format", icon: <AdjustmentsHorizontalIcon className="w-6 h-6" /> },
  { key: "spell", label: "Spell check", icon: <CheckBadgeIcon className="w-6 h-6" /> },
];

export default function ResumeEditor() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState("templates");
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [newSection, setNewSection] = useState("");
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [fontStyle, setFontStyle] = useState(FONT_STYLES[0]);
  const [fontSize, setFontSize] = useState(18);
  const [headingSize, setHeadingSize] = useState(22);
  const [sectionSpacing, setSectionSpacing] = useState(18);
  const [paragraphSpacing, setParagraphSpacing] = useState(10);
  const [lineSpacing, setLineSpacing] = useState(1.2);
  const [zoom, setZoom] = useState(1);
  const [fitToWidth, setFitToWidth] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [sectionFonts, setSectionFonts] = useState<{ [key: number]: string }>(
    () => Object.fromEntries(DEFAULT_SECTIONS.map((s) => [s.id, FONT_STYLES[0]]))
  );
  const [spellCheckStatus, setSpellCheckStatus] = useState<'idle' | 'checking' | 'done'>("idle");
  const [spellCheckProgress, setSpellCheckProgress] = useState(0);
  const [spellCheckResult, setSpellCheckResult] = useState<{ section: string; error: string }[]>([]);
  const [selectedPreviewSection, setSelectedPreviewSection] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "FIRST NAME SURNAME",
    email: "sherazzafar148@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    summary:
      "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "Git",
      "TypeScript",
    ],
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
      },
      {
        title: "Full Stack Developer",
        company: "Digital Innovations",
        duration: "2020 - 2022",
        description: [
          "Built responsive web applications using React and Node.js",
          "Collaborated with design team to implement UI/UX improvements",
          "Optimized database queries improving performance by 40%",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2020",
      },
      {
        degree: "Master of Science in Software Engineering",
        institution: "Tech University",
        year: "2022",
      },
    ],
  });

  // Calculate preview style
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  React.useEffect(() => {
    if (fitToWidth && previewRef.current) {
      const parent = previewRef.current.parentElement;
      if (parent) {
        // 700px is the base width of the preview
        setZoom(Math.max(0.5, Math.min(2, parent.clientWidth / 700)));
      }
    }
  }, [fitToWidth]);

  React.useEffect(() => {
    if (!fitToWidth) setZoom((z) => Math.max(0.5, Math.min(2, z)));
  }, [fitToWidth]);

  const handleAddSection = () => {
    if (newSection.trim()) {
      setSections([...sections, { id: Date.now(), name: newSection.trim() }]);
      setNewSection("");
    }
  };
  const handleEditSection = (id: number, name: string) => {
    setEditingSection(id);
    setEditingValue(name);
  };
  const handleSaveEditSection = (id: number) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, name: editingValue } : s)));
    setEditingSection(null);
    setEditingValue("");
  };
  const handleRemoveSection = (id: number) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  // Trigger spell check when Spell tab is activated
  React.useEffect(() => {
    if (activeTab === "spell") {
      setSpellCheckStatus("checking");
      setSpellCheckProgress(0);
      setSpellCheckResult([{ section: "Summary", error: "Spelling mistake in 'Experinced'" }]);
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          // Simulate result: you can set errors here for demo
          // Example: setSpellCheckResult([{ section: "Summary", error: "Spelling mistake in 'Experinced'" }]);
          setSpellCheckResult([]); // Empty means no errors
          setSpellCheckStatus("done");
        }
        setSpellCheckProgress(progress);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setSpellCheckStatus("idle");
      setSpellCheckProgress(0);
      setSpellCheckResult([]);
    }
  }, [activeTab]);

  const handlePreviewSectionEdit = (section: string) => {
    // Optionally, open the sidebar editor for this section
    setSelectedSectionId(
      sections.find(s => s.name.toLowerCase().includes(section.toLowerCase()))?.id || null
    );
  };
  const handlePreviewSectionDelete = (section: string) => {
    // Remove section from sidebar and preview
    const sec = sections.find(s => s.name.toLowerCase().includes(section.toLowerCase()));
    if (sec) handleRemoveSection(sec.id);
  };
  const handlePreviewSectionMove = (section: string, direction: 'up' | 'down') => {
    const idx = sections.findIndex(s => s.name.toLowerCase().includes(section.toLowerCase()));
    if (idx === -1) return;
    const newSections = [...sections];
    if (direction === 'up' && idx > 0) {
      [newSections[idx - 1], newSections[idx]] = [newSections[idx], newSections[idx - 1]];
      setSections(newSections);
    } else if (direction === 'down' && idx < newSections.length - 1) {
      [newSections[idx], newSections[idx + 1]] = [newSections[idx + 1], newSections[idx]];
      setSections(newSections);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center justify-between bg-white shadow px-8 py-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-xl">Resume Now.</span>
          <input
            className="font-semibold text-gray-700 bg-transparent outline-none border-b border-gray-300 w-32"
            defaultValue="Resume_1"
          />
          <button className="ml-2 px-3 py-1 text-sm bg-gray-200 rounded">More Options ▼</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save & Next</button>
          <button className="px-3 py-1 border rounded">Download</button>
          <button className="px-3 py-1 border rounded">Print</button>
          <button className="px-3 py-1 border rounded">Email</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-16 bg-white border-r flex flex-col items-center py-4 gap-2">
          {SIDEBAR_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg mb-2 transition-all ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
              title={tab.label}
            >
              {tab.icon}
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <aside className="w-64 bg-white border-r flex flex-col p-0 overflow-y-auto">
          <div className="flex-1 p-4">
            {activeTab === "templates" && (
              <div>
                <h3 className="font-bold mb-2">Templates</h3>

                <div className="flex gap-2 mb-3">
                  {COLORS.map((color) => (
                    <span
                      key={color.value}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-150 ${color.value} ${
                        selectedColor.value === color.value
                          ? "ring-2 ring-offset-2 ring-blue-400 border-blue-600"
                          : "border-gray-300"
                      }`}
                      title={color.name}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 overflow-x-hidden pr-1">
                  {TEMPLATES.map((tpl) => {
                    const MiniTemplate = tpl.component;
                    return (
                      <div
                        key={tpl.id}
                        className={`overflow-hidden rounded border bg-white shadow cursor-pointer transition-all flex flex-col items-center justify-start ${
                          selectedTemplate.id === tpl.id
                            ? "border-blue-500 ring-2 ring-blue-200 shadow-md"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        title={tpl.name}
                        onClick={() => setSelectedTemplate(tpl)}
                      >
                        <div className="w-[120px] h-[120px] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                          <div
                            className="absolute top-0 left-0"
                            style={{
                              transform: "scale(0.17)",
                              transformOrigin: "top left",
                              width: "700px",
                              height: "900px",
                              pointerEvents: "none",
                            }}
                          >
                            <MiniTemplate
                              data={resumeData}
                              styling={{
                                primaryColor: selectedColor.value,
                                fontFamily: fontStyle,
                                fontSize: fontSize,
                                headingSize: headingSize,
                                sectionSpacing: sectionSpacing,
                                paragraphSpacing: paragraphSpacing,
                                lineSpacing: lineSpacing,
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-[11px] text-center text-gray-700 font-medium truncate w-full p-1">
                          {tpl.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "sections" && (
              <div>
                <h3 className="font-bold mb-2">Sections</h3>
                <div className="mb-3 flex gap-2 items-center">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 text-sm flex-1"
                    placeholder="Add A New Section"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
                  />
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    onClick={handleAddSection}
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-2">
                  {sections.map((section, idx) => {
                    const isSelected = selectedSectionId === section.id;
                    return (
                      <li
                        key={section.id}
                        className={`relative group flex items-center gap-2 rounded transition-all ${isSelected ? "border-2 border-blue-600 shadow-lg bg-blue-50" : "border border-gray-200 bg-white"} p-2`}
                        style={{ minHeight: 40, cursor: 'pointer' }}
                        onClick={() => setSelectedSectionId(section.id)}
                      >
                        {editingSection === section.id ? (
                          <div className="flex-1 flex flex-col gap-1">
                            <input
                              className="border rounded px-2 py-1 text-sm w-full"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveEditSection(section.id);
                                else if (e.key === "Escape") {
                                  setEditingSection(null);
                                  setEditingValue("");
                                }
                              }}
                              autoFocus
                            />
                            <button
                              className="mt-1 px-2 py-1 bg-blue-600 text-white rounded text-xs self-end"
                              onClick={() => handleSaveEditSection(section.id)}
                            >
                              Done
                            </button>
                          </div>
                        ) : (
                          <>
                            <span
                              className={`flex-1 ${isSelected ? "font-bold text-blue-600" : ""}`}
                            >
                              {section.name}
                            </span>
                            {/* Only show action buttons if selected */}
                            {isSelected && (
                              <div className="flex gap-1 ml-2">
                                {/* Move Up */}
                                <button
                                  className="p-1 rounded hover:bg-blue-100 text-gray-500 hover:text-blue-600 border border-transparent hover:border-blue-200"
                                  onClick={e => { e.stopPropagation(); if (idx > 0) { const newSections = [...sections]; [newSections[idx - 1], newSections[idx]] = [newSections[idx], newSections[idx - 1]]; setSections(newSections); }}}
                                  disabled={idx === 0}
                                  title="Move Up"
                                >
                                  ↑
                                </button>
                                {/* Move Down */}
                                <button
                                  className="p-1 rounded hover:bg-blue-100 text-gray-500 hover:text-blue-600 border border-transparent hover:border-blue-200"
                                  onClick={e => { e.stopPropagation(); if (idx < sections.length - 1) { const newSections = [...sections]; [newSections[idx], newSections[idx + 1]] = [newSections[idx + 1], newSections[idx]]; setSections(newSections); }}}
                                  disabled={idx === sections.length - 1}
                                  title="Move Down"
                                >
                                  ↓
                                </button>
                                {/* Edit */}
                                <button
                                  className="p-1 rounded hover:bg-yellow-100 text-yellow-600 hover:text-yellow-800 border border-transparent hover:border-yellow-200"
                                  onClick={e => { e.stopPropagation(); handleEditSection(section.id, section.name); }}
                                  title="Edit section name"
                                >
                                  ✏️
                                </button>
                                {/* Delete */}
                                <button
                                  className="p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700 border border-transparent hover:border-red-200"
                                  onClick={e => { e.stopPropagation(); handleRemoveSection(section.id); }}
                                  title="Delete section"
                                >
                                  🗑️
                                </button>
                              </div>
                            )}
                            {/* Font style dropdown for selected section */}
                            {isSelected && editingSection !== section.id && (
                              <div className="ml-2 max-w-[120px] overflow-x-auto">
                                <select
                                  className="border rounded px-1 py-0.5 text-xs w-full min-w-[100px]"
                                  style={{ maxWidth: 120 }}
                                  value={sectionFonts[section.id] || FONT_STYLES[0]}
                                  onChange={e => {
                                    setSectionFonts({ ...sectionFonts, [section.id]: e.target.value });
                                  }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {FONT_STYLES.map(f => (
                                    <option key={f} value={f}>{f}</option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {/* Live editing panel for selected section */}
                {selectedSectionId && (() => {
                  const section = sections.find(s => s.id === selectedSectionId);
                  if (!section) return null;
                  if (section.name.toLowerCase().includes("summary")) {
                    return (
                      <div className="mt-4">
                        <label className="block text-xs font-semibold mb-1">Edit Summary</label>
                        <textarea
                          className="border rounded px-2 py-1 w-full text-sm"
                          rows={4}
                          value={resumeData.summary}
                          onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}
                        />
                        <button
                          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs float-right"
                          onClick={() => setSelectedSectionId(null)}
                        >
                          Done
                        </button>
                      </div>
                    );
                  }
                  if (section.name.toLowerCase().includes("skill")) {
                    return (
                      <div className="mt-4">
                        <label className="block text-xs font-semibold mb-1">Edit Skills (comma separated)</label>
                        <input
                          className="border rounded px-2 py-1 w-full text-sm"
                          value={resumeData.skills?.join(", ") || ""}
                          onChange={e => setResumeData({ ...resumeData, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        />
                        <button
                          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs float-right"
                          onClick={() => setSelectedSectionId(null)}
                        >
                          Done
                        </button>
                      </div>
                    );
                  }
                  if (section.name.toLowerCase().includes("experience")) {
                    return (
                      <div className="mt-4">
                        <label className="block text-xs font-semibold mb-1">Edit Experience</label>
                        {(resumeData.experience || []).map((exp, idx) => (
                          <div key={idx} className="mb-2 border rounded p-2">
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={exp.title}
                              onChange={e => {
                                const updated = [...(resumeData.experience || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setResumeData({ ...resumeData, experience: updated });
                              }}
                              placeholder="Job Title"
                            />
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={exp.company}
                              onChange={e => {
                                const updated = [...(resumeData.experience || [])];
                                updated[idx] = { ...updated[idx], company: e.target.value };
                                setResumeData({ ...resumeData, experience: updated });
                              }}
                              placeholder="Company"
                            />
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={exp.duration}
                              onChange={e => {
                                const updated = [...(resumeData.experience || [])];
                                updated[idx] = { ...updated[idx], duration: e.target.value };
                                setResumeData({ ...resumeData, experience: updated });
                              }}
                              placeholder="Duration"
                            />
                            <textarea
                              className="border w-full text-sm"
                              rows={2}
                              value={exp.description.join("\n")}
                              onChange={e => {
                                const updated = [...(resumeData.experience || [])];
                                updated[idx] = { ...updated[idx], description: e.target.value.split("\n") };
                                setResumeData({ ...resumeData, experience: updated });
                              }}
                              placeholder="Description (one per line)"
                            />
                          </div>
                        ))}
                        <button
                          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs float-right"
                          onClick={() => setSelectedSectionId(null)}
                        >
                          Done
                        </button>
                      </div>
                    );
                  }
                  if (section.name.toLowerCase().includes("education")) {
                    return (
                      <div className="mt-4">
                        <label className="block text-xs font-semibold mb-1">Edit Education</label>
                        {(resumeData.education || []).map((edu, idx) => (
                          <div key={idx} className="mb-2 border rounded p-2">
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={edu.degree}
                              onChange={e => {
                                const updated = [...(resumeData.education || [])];
                                updated[idx] = { ...updated[idx], degree: e.target.value };
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              placeholder="Degree"
                            />
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={edu.institution}
                              onChange={e => {
                                const updated = [...(resumeData.education || [])];
                                updated[idx] = { ...updated[idx], institution: e.target.value };
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              placeholder="Institution"
                            />
                            <input
                              className="border-b w-full mb-1 text-sm"
                              value={edu.year}
                              onChange={e => {
                                const updated = [...(resumeData.education || [])];
                                updated[idx] = { ...updated[idx], year: e.target.value };
                                setResumeData({ ...resumeData, education: updated });
                              }}
                              placeholder="Year"
                            />
                          </div>
                        ))}
                        <button
                          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs float-right"
                          onClick={() => setSelectedSectionId(null)}
                        >
                          Done
                        </button>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}

            {activeTab === "format" && (
              <div>
                <h3 className="font-bold mb-2">Formatting</h3>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Font Style</label>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={fontStyle}
                    onChange={e => setFontStyle(e.target.value)}
                  >
                    {FONT_STYLES.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Font Size</label>
                  <input
                    type="range"
                    min={12}
                    max={32}
                    value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{fontSize}px</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Heading Size</label>
                  <input
                    type="range"
                    min={16}
                    max={40}
                    value={headingSize}
                    onChange={e => setHeadingSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{headingSize}px</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Section Spacing</label>
                  <input
                    type="range"
                    min={8}
                    max={40}
                    value={sectionSpacing}
                    onChange={e => setSectionSpacing(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{sectionSpacing}px</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Paragraph Spacing</label>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={paragraphSpacing}
                    onChange={e => setParagraphSpacing(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{paragraphSpacing}px</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Line Spacing</label>
                  <input
                    type="range"
                    min={1}
                    max={2}
                    step={0.05}
                    value={lineSpacing}
                    onChange={e => setLineSpacing(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-xs">{lineSpacing}</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Top & Bottom Margin</label>
                  <input
                    type="range"
                    min={0}
                    max={64}
                    value={0} // Not yet implemented in state
                    disabled
                    className="w-full opacity-50 cursor-not-allowed"
                  />
                  <span className="text-xs text-gray-400">(Coming soon)</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Side Margins</label>
                  <input
                    type="range"
                    min={0}
                    max={64}
                    value={0} // Not yet implemented in state
                    disabled
                    className="w-full opacity-50 cursor-not-allowed"
                  />
                  <span className="text-xs text-gray-400">(Coming soon)</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1">Paragraph Indent</label>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    value={0} // Not yet implemented in state
                    disabled
                    className="w-full opacity-50 cursor-not-allowed"
                  />
                  <span className="text-xs text-gray-400">(Coming soon)</span>
                </div>
                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1 text-gray-400">Line Weight</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={1}
                    disabled
                    className="w-full opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {activeTab === "spell" && (
              <div>
                <h3 className="font-bold mb-2">Spell Check</h3>
                {spellCheckStatus === "checking" && (
                  <div className="mb-3">
                    <div className="font-semibold text-lg">Hang in there!</div>
                    <div className="text-xs mb-2">Checking for spelling mistakes ... {spellCheckProgress}%</div>
                    <div className="w-full bg-gray-200 rounded h-2 mb-2">
                      <div
                        className="bg-green-400 h-2 rounded transition-all duration-300"
                        style={{ width: `${spellCheckProgress}%` }}
                      />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded mt-2 text-sm font-medium border border-blue-100">
                      <span className="bg-blue-200 rounded-full p-1">🔄</span>
                      Try a different resume design
                    </button>
                  </div>
                )}
                {spellCheckStatus === "done" && (
                  <div className="mb-3">
                    {spellCheckResult.length === 0 ? (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block">
                            <svg width="32" height="32" fill="none"><rect width="32" height="32" rx="8" fill="#E6F4EA"/><path d="M10 16l5 5 7-9" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                          <span className="font-bold text-lg">Spell check complete</span>
                        </div>
                        <div className="text-sm mb-2">No errors found.</div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded text-sm font-medium border border-blue-100">
                          <span className="bg-blue-200 rounded-full p-1">🔄</span>
                          Try a different resume design
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-lg mb-2 text-red-600">Spelling mistakes found:</div>
                        <ul className="mb-2 list-disc pl-5 text-sm">
                          {spellCheckResult.map((err, idx) => (
                            <li key={idx}><b>{err.section}:</b> {err.error}</li>
                          ))}
                        </ul>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded text-sm font-medium border border-blue-100">
                          <span className="bg-blue-200 rounded-full p-1">🔄</span>
                          Try a different resume design
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 flex items-center justify-center overflow-auto p-8 relative">
          {/* ZoomController floating left of preview, vertically centered */}
          <ZoomController
            zoom={zoom}
            setZoom={(z) => {
              setZoom(z);
              setFitToWidth(false);
            }}
            fitToWidth={fitToWidth}
            setFitToWidth={setFitToWidth}
            style={{ position: 'fixed', left: 320, top: '50%', transform: 'translateY(-50%)', zIndex: 30 }}
          />
          <div
            ref={previewRef}
            className="w-[700px] min-h-[800px] transition-all duration-200 origin-top mx-auto"
            style={{
              transform: `scale(${zoom})`,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
              background: "white",
              marginLeft: 70, // leave space for controller
            }}
          >
            {(() => {
              const TemplateComponent = selectedTemplate.component;
              const styling: TemplateStyling = {
                primaryColor: selectedColor.value,
                fontFamily: fontStyle,
                fontSize: fontSize,
                headingSize: headingSize,
                sectionSpacing: sectionSpacing,
                paragraphSpacing: paragraphSpacing,
                lineSpacing: lineSpacing,
              };

              // Find the selected section name from selectedSectionId
              let selectedSection: string | null = null;
              if (selectedSectionId) {
                const sec = sections.find(s => s.id === selectedSectionId);
                selectedSection = sec ? sec.name.toLowerCase() : null;
              }

              return <TemplateComponent 
                data={resumeData} 
                styling={styling} 
                selectedSection={selectedSection}
                setSelectedSection={(section: string) => {
                  // Find section by name and set selectedSectionId
                  const sec = sections.find(s => s.name.toLowerCase() === section.toLowerCase());
                  if (sec) setSelectedSectionId(sec.id);
                }}
              />;
            })()}
          </div>
        </main>

        <aside className="w-80 bg-white border-l flex flex-col p-6 gap-6 overflow-y-auto">
          <div>
            <h3 className="font-bold text-lg mb-2">💡 Suggestions</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-3 text-sm">
              Generate a cover letter—<b>fast!</b>
              <br />
              Use your resume to instantly create a tailored cover letter.
            </div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>✔️ Save time. Apply faster.</li>
              <li>✔️ Let AI do the work</li>
              <li>✔️ Create as many as you need</li>
            </ul>
            <button className="w-full py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500">
              Generate cover letter
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Tips: Candidates who send custom cover letters get noticed!
          </div>
        </aside>
      </div>
    </div>
  );
}
