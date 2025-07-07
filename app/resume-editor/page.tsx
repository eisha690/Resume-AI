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
                  {sections.map((section) => (
                    <li key={section.id} className="flex items-center gap-2 group">
                      {editingSection === section.id ? (
                        <>
                          <input
                            className="border rounded px-2 py-1 text-sm flex-1"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEditSection(section.id);
                              else if (e.key === "Escape") {
                                setEditingSection(null);
                                setEditingValue("");
                              }
                            }}
                            onBlur={() => handleSaveEditSection(section.id)}
                            autoFocus
                          />
                          <button
                            className="text-green-600 text-sm"
                            onClick={() => handleSaveEditSection(section.id)}
                          >
                            ✔️
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1">{section.name}</span>
                          <button
                            className="text-blue-600 text-sm"
                            onClick={() => handleEditSection(section.id, section.name)}
                          >
                            ✏️
                          </button>
                          <button
                            className="text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
                            onClick={() => handleRemoveSection(section.id)}
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
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
            setFitToWidth={() => setFitToWidth((v) => !v)}
            style={{}}
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

              return <TemplateComponent data={resumeData} styling={styling} />;
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
