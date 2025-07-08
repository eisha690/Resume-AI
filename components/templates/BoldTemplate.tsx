import React from 'react';

interface TemplateProps {
  data: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    summary?: string;
    skills?: string[];
    experience?: Array<{
      title: string;
      company: string;
      duration: string;
      description: string[];
    }>;
    education?: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
    customSections?: Array<{
      id: string;
      name: string;
      content: string;
    }>;
  };
  styling: {
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    headingSize: number;
    sectionSpacing: number;
    paragraphSpacing: number;
    lineSpacing: number;
  };
  selectedSection?: string | null;
  setSelectedSection?: (section: string) => void;
  onEditSection?: (section: string) => void;
  onDeleteSection?: (section: string) => void;
  onMoveSection?: (section: string, direction: 'up' | 'down') => void;
}

export default function BoldTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection }: TemplateProps) {
  return (
    <div 
      className="bg-white w-full min-h-[800px] shadow-2xl border-2 border-red-400"
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className={`${styling.primaryColor} text-white px-10 py-10 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-6xl font-black mb-4 tracking-tight"
                style={{ fontSize: styling.headingSize + 12 }}
              >
                {data.name}
              </h1>
              <div className="space-y-1">
                <p className="text-xl font-semibold">{data.email}</p>
                {data.phone && <p className="text-lg">{data.phone}</p>}
                {data.address && <p className="text-lg">{data.address}</p>}
              </div>
            </div>
            <div className={`w-32 h-32 bg-white ${styling.primaryColor.replace('bg-', 'text-')} font-black text-5xl flex items-center justify-center rounded-full border-4 border-white`}>
              {data.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-8" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-black mb-4 ${styling.primaryColor.replace('bg-', 'text-')} text-3xl uppercase tracking-wider border-b-4 border-gray-300 pb-2`}
              style={{ fontSize: styling.headingSize + 4 }}
            >
              Professional Summary
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <p className="text-gray-800 text-lg leading-relaxed font-medium">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-black mb-4 ${styling.primaryColor.replace('bg-', 'text-')} text-3xl uppercase tracking-wider border-b-4 border-gray-300 pb-2`}
              style={{ fontSize: styling.headingSize + 4 }}
            >
              Core Skills
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <div className="grid grid-cols-3 gap-3">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`${styling.primaryColor} text-white font-bold px-4 py-3 rounded-lg text-center text-lg`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-black mb-6 ${styling.primaryColor.replace('bg-', 'text-')} text-3xl uppercase tracking-wider border-b-4 border-gray-300 pb-2`}
              style={{ fontSize: styling.headingSize + 4 }}
            >
              Work Experience
            </h2>
            <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg border-l-8 border-red-500" style={{ marginBottom: styling.paragraphSpacing }}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black text-gray-800 text-2xl">{exp.title}</h3>
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-4 py-2 rounded-full">{exp.duration}</span>
                  </div>
                  <p className="text-red-600 font-bold text-xl mb-4">{exp.company}</p>
                  <ul className="space-y-3 text-gray-700">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-red-500 mr-3 mt-2 text-xl">▶</span>
                        <span className="leading-relaxed font-medium">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div
            className={selectedSection && selectedSection.includes('education') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('education')}
          >
            {selectedSection && selectedSection.includes('education') && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <button onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('education', 'up'); }} title="Move Up" className="cursor-pointer">↑</button>
                <span className="flex gap-2">
                  <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('education'); }} title="Edit" className="cursor-pointer">✏️</button>
                  <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('education'); }} title="Delete" className="cursor-pointer">🗑️</button>
                </span>
                <button onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('education', 'down'); }} title="Move Down" className="cursor-pointer">↓</button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-2 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                Education
              </h2>
              <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
                {data.education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: styling.paragraphSpacing }}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.year}</span>
                    </div>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.map((section) => (
          <section key={section.id} style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-black mb-4 ${styling.primaryColor.replace('bg-', 'text-')} text-3xl uppercase tracking-wider border-b-4 border-gray-300 pb-2`}
              style={{ fontSize: styling.headingSize + 4 }}
            >
              {section.name}
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <div className="bg-gray-100 p-6 rounded-lg border-l-8 border-red-500">
                <p className="text-gray-800 text-lg leading-relaxed font-medium">{section.content}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 