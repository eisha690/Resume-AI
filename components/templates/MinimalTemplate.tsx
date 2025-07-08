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

export default function MinimalTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection }: TemplateProps) {
  return (
    <div 
      className="bg-white w-full min-h-[800px] shadow-lg border border-gray-300"
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="text-center">
          <h1 
            className="text-3xl font-light mb-2 text-gray-800"
            style={{ fontSize: styling.headingSize + 4 }}
          >
            {data.name}
          </h1>
          <p className="text-gray-600">{data.email}</p>
          {data.phone && <p className="text-gray-500 text-sm">{data.phone}</p>}
          {data.address && <p className="text-gray-500 text-sm">{data.address}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-medium mb-3 ${styling.primaryColor.replace('bg-', 'text-')} uppercase tracking-wide`}
              style={{ fontSize: styling.headingSize }}
            >
              Summary
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
              className={`font-medium mb-3 ${styling.primaryColor.replace('bg-', 'text-')} uppercase tracking-wide`}
              style={{ fontSize: styling.headingSize }}
            >
              Skills
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <p className="text-gray-700">{data.skills.join(' • ')}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-medium mb-4 ${styling.primaryColor.replace('bg-', 'text-')} uppercase tracking-wide`}
              style={{ fontSize: styling.headingSize }}
            >
              Experience
            </h2>
            <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((exp, index) => (
                <div key={index} style={{ marginBottom: styling.paragraphSpacing }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-800">{exp.title}</h3>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                  <div className="text-gray-700 text-sm space-y-1">
                    {exp.description.map((desc, idx) => (
                      <p key={idx} className="leading-relaxed">• {desc}</p>
                    ))}
                  </div>
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
              className={`font-medium mb-3 ${styling.primaryColor.replace('bg-', 'text-')} uppercase tracking-wide`}
              style={{ fontSize: styling.headingSize }}
            >
              {section.name}
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 