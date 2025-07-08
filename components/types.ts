export interface ResumeData {
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
}

export interface TemplateStyling {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  headingSize: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  lineSpacing: number;
}

export interface TemplateConfig {
  id: string;
  name: string;
  component: React.ComponentType<{ 
    data: ResumeData; 
    styling: TemplateStyling;
    selectedSection?: string | null;
    setSelectedSection?: (section: string) => void;
    onEditSection?: (section: string) => void;
    onDeleteSection?: (section: string) => void;
    onMoveSection?: (section: string, direction: 'up' | 'down') => void;
  }>;
  preview: string;
} 