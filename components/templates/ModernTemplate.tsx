import React from 'react';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

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
    certifications?: string[];
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

export default function ModernTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection, onEditHeader }: TemplateProps) {
  return (
    <div 
      className="bg-white w-full min-h-[800px] shadow-xl rounded-xl border-2 border-gray-200"
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className="flex items-center px-0 py-0" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
        <div className={`${styling.primaryColor} w-3 h-28 rounded-l-xl`} />
        <div className="flex-1 flex flex-row justify-between items-center bg-white px-8 py-8 border-b border-gray-200 rounded-tr-xl">
          <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: '#1a1a1a', fontSize: styling.headingSize + 8 }}>{data.name}</h1>
          <div className="flex flex-col items-end text-base text-gray-700 font-medium gap-1">
            <span>Email: {data.email}</span>
            {data.phone && <span>Phone: {data.phone}</span>}
            {data.address && <span>Address: {data.address}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <div
            className={selectedSection && selectedSection.includes('summary') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('summary')}
          >
            {selectedSection && selectedSection.includes('summary') && (
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('summary'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
                <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('summary'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
                style={{ fontSize: styling.headingSize }}
              >
                SUMMARY
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>
            </section>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div
            className={selectedSection && selectedSection.includes('skills') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('skills')}
          >
            {selectedSection && selectedSection.includes('skills') && (
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('skills'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
                <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('skills'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
                style={{ fontSize: styling.headingSize }}
              >
                SKILLS
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${styling.primaryColor} text-white`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div
            className={selectedSection && selectedSection.includes('experience') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('experience')}
          >
            {selectedSection && selectedSection.includes('experience') && (
              <div className="absolute right-2 top-2 flex gap-2 z-10">
                <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('experience'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
                <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('experience'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
                style={{ fontSize: styling.headingSize }}
              >
                EXPERIENCE
              </h2>
              <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4" style={{ marginBottom: styling.paragraphSpacing }}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">{exp.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-3 font-medium">{exp.company}</p>
                    <ul className="space-y-2 text-gray-700">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
              style={{ fontSize: styling.headingSize }}
            >
              EDUCATION
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-semibold text-gray-800">{edu.degree}</div>
                  <div className="text-gray-600">{edu.institution} | {edu.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
            <h2 
              className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
              style={{ fontSize: styling.headingSize }}
            >
              CERTIFICATIONS
            </h2>
            <div style={{ marginBottom: styling.paragraphSpacing }}>
              <ul className="list-disc list-inside text-gray-700">
                {data.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          </section>
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
                <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection(section.name.toLowerCase()); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
                <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection(section.id); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-4 ${styling.primaryColor.replace('bg-', 'text-')} border-b-2 border-gray-200 pb-2`}
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