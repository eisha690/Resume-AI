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
  onEditHeader?: () => void;
}

export default function ProfessionalTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection, onEditHeader }: TemplateProps) {
  return (
    <div 
      className="bg-white w-full min-h-[800px] shadow-xl rounded-xl border-2 border-green-300"
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className="bg-gray-100 px-10 py-8 border-b-2 border-gray-300 rounded-t-xl">
        <h1 className="text-4xl font-bold mb-2 tracking-wide" style={{ color: '#222', fontSize: styling.headingSize + 8 }}>{data.name}</h1>
        <div className="flex flex-wrap gap-8 text-base font-medium text-gray-700">
          <span>Email: {data.email}</span>
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.address && <span>Address: {data.address}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-green-200 pb-2`}
              style={{ fontSize: styling.headingSize }}
            >
              EXECUTIVE SUMMARY
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-green-200 pb-2`}
              style={{ fontSize: styling.headingSize }}
            >
              PROFESSIONAL SKILLS
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex items-center"
                  >
                    <div className={`w-2 h-2 ${styling.primaryColor} rounded-full mr-3`}></div>
                    <span className="text-gray-700 font-medium">{skill}</span>
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
              className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-green-200 pb-2`}
              style={{ fontSize: styling.headingSize }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: styling.paragraphSpacing }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
                      <p className="text-green-600 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">{exp.duration}</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="leading-relaxed">{desc}</li>
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
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-green-200 pb-2`}
                style={{ fontSize: styling.headingSize }}
              >
                EDUCATION & CERTIFICATIONS
              </h2>
              <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
                {data.education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: styling.paragraphSpacing }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{edu.degree}</h3>
                        <p className="text-green-600 font-semibold">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.map((section) => (
          <div
            key={section.id}
            className={selectedSection && selectedSection.includes(section.name.toLowerCase()) ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection(section.name.toLowerCase())}
          >
            {selectedSection && selectedSection.includes(section.name.toLowerCase()) && (
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection(section.name.toLowerCase()); }} title="Edit">✏️</button>
                <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection(section.id); }} title="Delete">🗑️</button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-green-200 pb-2`}
                style={{ fontSize: styling.headingSize }}
              >
                {section.name.toUpperCase()}
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
} 