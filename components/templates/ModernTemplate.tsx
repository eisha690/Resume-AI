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

export default function ModernTemplate({ data, styling }: TemplateProps) {
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
      <div className={`${styling.primaryColor} text-white px-8 py-8 rounded-t-xl`}>
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 bg-white ${styling.primaryColor.replace('bg-', 'text-')} font-bold text-3xl flex items-center justify-center rounded-full`}>
            {data.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ fontSize: styling.headingSize + 6 }}
            >
              {data.name}
            </h1>
            <p className="text-lg opacity-90">{data.email}</p>
            {data.phone && <p className="text-sm opacity-80">{data.phone}</p>}
            {data.address && <p className="text-sm opacity-80">{data.address}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8" style={{ gap: styling.sectionSpacing, display: 'flex', flexDirection: 'column' }}>
        {/* Summary */}
        {data.summary && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
            <div style={{ gap: styling.paragraphSpacing, display: 'flex', flexDirection: 'column' }}>
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4" style={{ marginBottom: styling.paragraphSpacing }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{edu.degree}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{edu.year}</span>
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