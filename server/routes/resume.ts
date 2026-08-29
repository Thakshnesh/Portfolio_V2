import { Router, Request, Response } from 'express';
import { db } from '../database.js';

export const resumeRouter = Router();

export const resumeData = {
  name: 'Thakshnesh B',
  title: 'Electronics Engineering Undergraduate (VLSI D&T)',
  email: 'thakshnesh@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thakshnesh-b-585928381',
  careerObjective:
    'Driven and curious Electronics Engineering undergraduate and active NSS Volunteer with interests in Business Analytics, Project Management, and Artificial Intelligence. Passionate about combining analytical thinking, technology, and community-driven creativity to build innovative solutions while continuously growing both technically and professionally.',
  education: {
    degree: 'B.E. Electronics Engineering (VLSI Design & Technology)',
    period: '2025 - 2029 (Present)',
    cgpa: '8.5 (upto 1st/2nd semester)',
    institution: 'K. S. Rangasamy College of Technology',
    location: 'Tiruchengode, Tamil Nadu, India',
  },
  projects: [
    {
      id: 'solar-tracker',
      title: 'Solar Tracking System using Arduino and LDR Sensors',
      tech: ['Arduino', 'LDR Sensors', 'Embedded Systems', 'C', 'Servo Control'],
      description:
        'Developed an automatic solar tracking system using Arduino and LDR (Light Dependent Resistor) sensors to maximize solar energy absorption. The system continuously monitors sunlight intensity and dynamically adjusts the position of the solar panel to align with the direction of maximum sunlight, improving energy efficiency.',
    },
    {
      id: 'smoke-detector',
      title: 'Smoke Detection System using MQ-2 Sensor and Arduino',
      tech: ['MQ-2 Gas Sensor', 'Arduino', 'IoT', 'Safety Systems', 'C++'],
      description:
        'Developed a real-time smoke and harmful gas detection system using an MQ-2 sensor and Arduino. The system provides immediate alert notifications through LED indicators and buzzer alarms upon detecting hazardous gas concentrations, strengthening skills in sensor calibration and embedded safety monitoring.',
    },
  ],
  skills: {
    softSkills: ['Communication', 'Leadership', 'Problem Solving', 'Analytical Thinking', 'NSS Community Service'],
    technicalSkills: [
      { name: 'Python', level: 80 },
      { name: 'C', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'VLSI Design & Architecture', level: 75 },
      { name: 'Embedded Systems & Arduino', level: 85 },
    ],
    toolsAndPlatforms: ['Eclipse IDE', 'Visual Studio Code', 'Canva', 'MIT App Inventor'],
  },
  achievements: [
    {
      title: 'NPTEL Certification in Soft Skill Development',
      badge: 'Elite + Silver Certificates',
      issuedBy: 'NPTEL (IIT Madras)',
      year: '2026',
    },
    {
      title: 'National Service Scheme (NSS) Volunteer',
      badge: 'Community Leadership & Social Service',
      issuedBy: 'NSS Cell - KSRCT & Anna University',
      year: '2025 – Present',
    },
  ],
};

// GET /api/resume - Structured resume JSON
resumeRouter.get('/', (_req: Request, res: Response) => {
  db.recordEvent('resume_download', 'Resume JSON viewed');
  res.json({
    success: true,
    data: resumeData,
  });
});

// GET /api/resume/download - Download plain text resume summary
resumeRouter.get('/download', (_req: Request, res: Response) => {
  db.recordEvent('resume_download', 'Resume text download requested');
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', 'attachment; filename="Thakshnesh_B_Resume.txt"');

  const text = `
============================================================
                     THAKSHNESH B
  Electronics Engineering Undergraduate (VLSI D&T)
  Email: ${resumeData.email}
  LinkedIn: ${resumeData.linkedin}
============================================================

CAREER OBJECTIVE:
${resumeData.careerObjective}

EDUCATION:
- ${resumeData.education.degree}
  ${resumeData.education.institution} (${resumeData.education.period})
  CGPA: ${resumeData.education.cgpa} | Location: ${resumeData.education.location}

PROJECTS:
1. ${resumeData.projects[0].title}
   Tech: ${resumeData.projects[0].tech.join(', ')}
   Details: ${resumeData.projects[0].description}

2. ${resumeData.projects[1].title}
   Tech: ${resumeData.projects[1].tech.join(', ')}
   Details: ${resumeData.projects[1].description}

SKILLS:
- Technical: ${resumeData.skills.technicalSkills.map((s) => `${s.name} (${s.level}%)`).join(', ')}
- Tools: ${resumeData.skills.toolsAndPlatforms.join(', ')}
- Soft Skills: ${resumeData.skills.softSkills.join(', ')}

ACHIEVEMENTS:
- ${resumeData.achievements[0].title} (${resumeData.achievements[0].badge}) - ${resumeData.achievements[0].issuedBy}
- ${resumeData.achievements[1].title} (${resumeData.achievements[1].badge}) - ${resumeData.achievements[1].issuedBy}
============================================================
`;
  return res.send(text.trim());
});
