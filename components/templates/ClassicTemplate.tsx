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

export default function ClassicTemplate({ data, styling, selectedSection, setSelectedSection, onEditSection, onDeleteSection, onMoveSection }: TemplateProps) {
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
      <div className={`${styling.primaryColor} text-white px-8 py-6`}>
        <div className="text-center">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ fontSize: styling.headingSize + 4 }}
          >
            {data.name}
          </h1>
          <p className="text-lg">{data.email}</p>
          {data.phone && <p className="text-sm">{data.phone}</p>}
          {data.address && <p className="text-sm">{data.address}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <div
            className={selectedSection && selectedSection.includes('summary') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('summary')}
          >
            {selectedSection && selectedSection.includes('summary') && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('summary', 'up'); }} title="Move" className="cursor-pointer"><DotsHorizontalIcon /></Button>
                <span className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onEditSection && onEditSection('summary'); }} title="Edit" className="cursor-pointer"><Pencil1Icon /></Button>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('summary'); }} title="Delete" className="cursor-pointer"><TrashIcon /></Button>
                </span>
              </div>
            )}
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
            className={selectedSection && selectedSection.includes('skill') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('skills')}
          >
            {selectedSection && selectedSection.includes('skill') && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('skills', 'up'); }} title="Move" className="cursor-pointer"><DotsHorizontalIcon /></Button>
                <span className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onEditSection && onEditSection('skills'); }} title="Edit" className="cursor-pointer"><Pencil1Icon /></Button>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('skills'); }} title="Delete" className="cursor-pointer"><TrashIcon /></Button>
                </span>
              </div>
            )}
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
            className={selectedSection && selectedSection.includes('experience') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('experience')}
          >
            {selectedSection && selectedSection.includes('experience') && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('experience', 'up'); }} title="Move" className="cursor-pointer"><DotsHorizontalIcon /></Button>
                <span className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onEditSection && onEditSection('experience'); }} title="Edit" className="cursor-pointer"><Pencil1Icon /></Button>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('experience'); }} title="Delete" className="cursor-pointer"><TrashIcon /></Button>
                </span>
              </div>
            )}
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
          <div
            className={selectedSection && selectedSection.includes('education') ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection('education')}
          >
            {selectedSection && selectedSection.includes('education') && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection('education', 'up'); }} title="Move" className="cursor-pointer"><DotsHorizontalIcon /></Button>
                <span className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onEditSection && onEditSection('education'); }} title="Edit" className="cursor-pointer"><Pencil1Icon /></Button>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection('education'); }} title="Delete" className="cursor-pointer"><TrashIcon /></Button>
                </span>
              </div>
            )}
            <section>
              <h2 
                className={`font-bold mb-3 ${styling.primaryColor.replace('bg-', 'text-')}`}
                style={{ fontSize: styling.headingSize }}
              >
                EDUCATION
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
          <div
            key={section.id}
            className={selectedSection && selectedSection.includes(section.name.toLowerCase()) ? 'border-2 border-blue-600 rounded-lg relative group' : ''}
            style={{ marginBottom: styling.sectionSpacing, cursor: 'pointer' }}
            onClick={() => setSelectedSection && setSelectedSection(section.name.toLowerCase())}
          >
            {selectedSection && selectedSection.includes(section.name.toLowerCase()) && (
              <div className="absolute left-0 top-0 w-full flex justify-between items-center px-2 py-1 bg-blue-50 rounded-t-lg z-10">
                <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onMoveSection && onMoveSection(section.name.toLowerCase(), 'up'); }} title="Move" className="cursor-pointer"><DotsHorizontalIcon /></Button>
                <span className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onEditSection && onEditSection(section.name.toLowerCase()); }} title="Edit" className="cursor-pointer"><Pencil1Icon /></Button>
                  <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); onDeleteSection && onDeleteSection(section.name.toLowerCase()); }} title="Delete" className="cursor-pointer"><TrashIcon /></Button>
                </span>
              </div>
            )}
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