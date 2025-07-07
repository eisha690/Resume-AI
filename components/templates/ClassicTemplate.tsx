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
}

export default function ClassicTemplate({ data, styling }: TemplateProps) {
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
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}
      </div>
    </div>
  );
} 