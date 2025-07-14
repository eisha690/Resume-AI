import React from 'react';
import { DotsHorizontalIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";

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

export default function ClassicTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection, onEditHeader }: TemplateProps) {
  return (
    <div 
      className="bg-white w-full min-h-[800px] shadow-xl"
      style={{
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
        lineHeight: styling.lineSpacing,
      }}
    >
      {/* Header */}
      <div className="bg-white pt-10 pb-4 px-8 border-b-2 border-gray-300 text-center" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
        <h1 className="text-5xl font-bold mb-2 tracking-wide" style={{ color: '#222', fontSize: styling.headingSize + 12 }}>{data.name}</h1>
        <div className="text-base text-gray-700 font-medium flex flex-col items-center gap-1">
          <span>Email: {data.email}</span>
          {data.phone && <span>Phone: {data.phone}</span>}
          {data.address && <span>Address: {data.address}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <div
            className={'group relative rounded-lg'}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('summary')}
          >
            <div className="absolute right-2 top-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('summary'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
              <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('summary'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <section>
              <h2 
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                SUMMARY
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <p className="text-gray-700">{data.summary}</p>
              </div>
            </section>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div
            className={'group relative rounded-lg' + ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('skills')}
          >
            <div className="absolute right-2 top-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('skills'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
              <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('skills'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <section>
              <h2 
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                SKILLS
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <p className="text-gray-700">{data.skills.join(', ')}</p>
              </div>
            </section>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div
            className={'group relative rounded-lg' + ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('experience')}
          >
            <div className="absolute right-2 top-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection('experience'); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
              <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('experience'); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <section>
              <h2 
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                EXPERIENCE
              </h2>
              <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
                {data.experience.map((exp, index) => (
                  <div key={index} style={{ marginBottom: styling.paragraphSpacing }}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {exp.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
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
              className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
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
              className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
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
            className={'group relative rounded-lg' + ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection(section.name.toLowerCase())}
          >
            <div className="absolute right-2 top-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={e => { e.stopPropagation(); onEditSection && onEditSection(section.name.toLowerCase()); }} title="Edit"><Pencil1Icon className="w-4 h-4" /></button>
              <button onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection(section.id); }} title="Delete"><TrashIcon className="w-4 h-4" /></button>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <section>
              <h2 
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                {section.name.toUpperCase()}
              </h2>
              <div style={{ marginBottom: styling.paragraphSpacing }}>
                <p className="text-gray-700">{section.content}</p>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
} 