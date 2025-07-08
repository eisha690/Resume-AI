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

export default function ElegantTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection }: TemplateProps) {
  // Helper to get text color from bg color
  const getTextColor = (bg: string) => bg.replace('bg-', 'text-');
  // Helper to get light bg color from main color
  const getLightBg = (bg: string) => {
    if (bg.includes('red')) return 'bg-red-50';
    if (bg.includes('blue')) return 'bg-blue-50';
    if (bg.includes('green')) return 'bg-green-50';
    if (bg.includes('black')) return 'bg-gray-100';
    if (bg.includes('purple')) return 'bg-purple-50';
    if (bg.includes('teal')) return 'bg-teal-50';
    if (bg.includes('orange')) return 'bg-orange-50';
    return 'bg-gray-50';
  };
  // Helper to get border color from main color
  const getBorderColor = (bg: string) => {
    if (bg.includes('red')) return 'border-red-300';
    if (bg.includes('blue')) return 'border-blue-300';
    if (bg.includes('green')) return 'border-green-300';
    if (bg.includes('black')) return 'border-gray-300';
    if (bg.includes('purple')) return 'border-purple-300';
    if (bg.includes('teal')) return 'border-teal-300';
    if (bg.includes('orange')) return 'border-orange-300';

    return 'border-gray-300';
  };
  // Helper to get gradient from main color
  const getGradient = (bg: string) => {
    if (bg.includes('red')) return 'bg-gradient-to-r from-red-600 to-red-800';
    if (bg.includes('blue')) return 'bg-gradient-to-r from-blue-600 to-blue-800';
    if (bg.includes('green')) return 'bg-gradient-to-r from-green-600 to-green-800';
    if (bg.includes('black')) return 'bg-gradient-to-r from-gray-700 to-black';
    if (bg.includes('purple')) return 'bg-gradient-to-r from-purple-600 to-purple-800';
    if (bg.includes('teal')) return 'bg-gradient-to-r from-teal-600 to-teal-800';
    if (bg.includes('orange')) return 'bg-gradient-to-r from-orange-600 to-orange-800';


    return 'bg-gradient-to-r from-gray-400 to-gray-700';
  };

  return (
    <div 
      className={`bg-white w-full min-h-[800px] shadow-2xl rounded-2xl ${getBorderColor(styling.primaryColor)} border-2`}
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className={`${styling.primaryColor} text-white px-10 py-10 rounded-t-2xl relative overflow-hidden`}>
        <div className={`absolute inset-0 ${getGradient(styling.primaryColor)} opacity-90`}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-8">
            <div className={`w-24 h-24 bg-white ${getTextColor(styling.primaryColor)} font-bold text-4xl flex items-center justify-center rounded-full shadow-lg`}>
              {data.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 
                className="text-5xl font-bold mb-3"
                style={{ fontSize: styling.headingSize + 8 }}
              >
                {data.name}
              </h1>
              <p className="text-xl opacity-90 mb-1">{data.email}</p>
              {data.phone && <p className="text-lg opacity-80">{data.phone}</p>}
              {data.address && <p className="text-lg opacity-80">{data.address}</p>}
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
              className={`font-bold mb-4 ${getTextColor(styling.primaryColor)} ${getBorderColor(styling.primaryColor)} border-b-2 pb-3`}
              style={{ fontSize: styling.headingSize }}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-bold mb-4 ${getTextColor(styling.primaryColor)} ${getBorderColor(styling.primaryColor)} border-b-2 pb-3`}
              style={{ fontSize: styling.headingSize }}
            >
              CORE COMPETENCIES
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <div className="grid grid-cols-2 gap-3">
                {data.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className={`${getLightBg(styling.primaryColor)} ${getBorderColor(styling.primaryColor)} border px-4 py-2 rounded-lg`}
                  >
                    <span className={`${getTextColor(styling.primaryColor)} font-medium`}>{skill}</span>
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
              className={`font-bold mb-4 ${getTextColor(styling.primaryColor)} ${getBorderColor(styling.primaryColor)} border-b-2 pb-3`}
              style={{ fontSize: styling.headingSize }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl" style={{ marginBottom: styling.paragraphSpacing }}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800 text-xl">{exp.title}</h3>
                    <span className={`text-sm ${getTextColor(styling.primaryColor)} ${getLightBg(styling.primaryColor)} px-3 py-1 rounded-full font-medium`}>{exp.duration}</span>
                  </div>
                  <p className={`${getTextColor(styling.primaryColor)} font-semibold mb-3 text-lg`}>{exp.company}</p>
                  <ul className="space-y-2 text-gray-700">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className={`${getTextColor(styling.primaryColor)} mr-3 mt-1`}>▸</span>
                        <span className="leading-relaxed">{desc}</span>
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
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                EDUCATION & CERTIFICATIONS
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
              className={`font-bold mb-4 ${getTextColor(styling.primaryColor)} ${getBorderColor(styling.primaryColor)} border-b-2 pb-3`}
              style={{ fontSize: styling.headingSize }}
            >
              {section.name.toUpperCase()}
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 