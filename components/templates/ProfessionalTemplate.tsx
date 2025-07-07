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

export default function ProfessionalTemplate({ data, styling }: TemplateProps) {
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
      <div className={`${styling.primaryColor} text-white px-8 py-8 rounded-t-xl`}>
        <div className="flex items-center gap-8">
          <div className={`w-20 h-20 bg-white ${styling.primaryColor.replace('bg-', 'text-')} font-bold text-3xl flex items-center justify-center rounded-lg shadow-lg`}>
            {data.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h1 
              className="text-4xl font-bold mb-3"
              style={{ fontSize: styling.headingSize + 6 }}
            >
              {data.name}
            </h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1">Email</p>
                <p className="opacity-90">{data.email}</p>
              </div>
              {data.phone && (
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <p className="opacity-90">{data.phone}</p>
                </div>
              )}
              {data.address && (
                <div className="col-span-2">
                  <p className="font-semibold mb-1">Address</p>
                  <p className="opacity-90">{data.address}</p>
                </div>
              )}
            </div>
          </div>
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
          <section style={{ marginBottom: styling.sectionSpacing }}>
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
        )}
      </div>
    </div>
  );
} 