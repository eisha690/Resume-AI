# ResumeAI - Multi-Template Resume Builder

A modern resume builder with multiple professional templates and real-time preview.

## Features

### Multiple Resume Templates

- **Classic**: Traditional layout with clean typography
- **Modern**: Contemporary design with rounded corners and modern spacing
- **Minimal**: Clean and simple design with minimal visual elements
- **Elegant**: Sophisticated design with purple accents and elegant typography
- **Bold**: High-contrast design with strong visual elements
- **Professional**: Business-oriented layout with green accents

### Template Features

- **Real-time Preview**: See changes instantly as you select different templates
- **Color Customization**: Choose from 6 different color schemes
- **Typography Control**: Adjust font family, sizes, and spacing
- **Responsive Design**: All templates work across different screen sizes
- **Consistent Data**: All templates accept the same data structure

## Template System Architecture

### Template Components

Each template is a separate React component located in `components/templates/`:

- `ClassicTemplate.tsx` - Traditional resume layout
- `ModernTemplate.tsx` - Contemporary design
- `MinimalTemplate.tsx` - Clean and simple
- `ElegantTemplate.tsx` - Sophisticated design
- `BoldTemplate.tsx` - High-contrast design
- `ProfessionalTemplate.tsx` - Business-oriented layout

### Data Interface

All templates accept the same data structure defined in `components/types.ts`:

```typescript
interface ResumeData {
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
}
```

### Styling Interface

Templates also accept styling props for customization:

```typescript
interface TemplateStyling {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  headingSize: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  lineSpacing: number;
}
```

## How to Add New Templates

1. Create a new template component in `components/templates/`
2. Follow the existing template structure and interface
3. Export the component from `components/templates/index.ts`
4. Add the template to the `TEMPLATES` array in `app/resume-editor/page.tsx`

### Template Component Structure

```typescript
import React from "react";

interface TemplateProps {
  data: ResumeData;
  styling: TemplateStyling;
}

export default function YourTemplate({ data, styling }: TemplateProps) {
  return (
    <div className="bg-white w-full min-h-[800px] shadow-xl">
      {/* Header Section */}
      <div className={`${styling.primaryColor} text-white px-8 py-6`}>
        {/* Template-specific header design */}
      </div>

      {/* Content Section */}
      <div className="px-8 py-6">{/* Template-specific content layout */}</div>
    </div>
  );
}
```

## Usage

1. **Select Template**: Choose from the available templates in the left sidebar
2. **Customize Colors**: Use the color palette to change the primary color
3. **Adjust Formatting**: Modify font styles, sizes, and spacing in the Format tab
4. **Add Sections**: Create custom sections in the Sections tab
5. **Real-time Preview**: See changes instantly in the center preview area

## Development

### Running the Application

```bash
npm run dev
```

### Type Checking

```bash
npx tsc --noEmit
```

### Project Structure

```
ResumeAI/
├── app/
│   └── resume-editor/
│       └── page.tsx          # Main editor component
├── components/
│   ├── templates/            # Template components
│   │   ├── index.ts         # Template exports
│   │   ├── ClassicTemplate.tsx
│   │   ├── ModernTemplate.tsx
│   │   ├── MinimalTemplate.tsx
│   │   ├── ElegantTemplate.tsx
│   │   ├── BoldTemplate.tsx
│   │   └── ProfessionalTemplate.tsx
│   └── types.ts             # TypeScript interfaces
└── package.json
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **React Hooks**: State management

## Contributing

To add a new template:

1. Create a new template component following the existing pattern
2. Ensure it accepts the standard `ResumeData` and `TemplateStyling` props
3. Add proper TypeScript types
4. Test with different data scenarios
5. Update the template list in the main editor

## License

MIT License - feel free to use this project for your resume building needs!
