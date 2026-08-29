export interface Project {
  id: string;
  title: string;
  category: 'Embedded & IoT' | 'VLSI & Hardware' | 'AI & Software';
  badge: string;
  tech: string[];
  summary: string;
  description: string;
  features: string[];
  simulationType: 'solar' | 'smoke' | 'none';
  schematicDetails: string;
  pinout: { pin: string; function: string }[];
  likesCount?: number;
}

export interface Skill {
  name: string;
  category: 'Technical Skills' | 'Tools & Platforms' | 'Soft Skills' | 'Domains';
  level: number;
  color: string;
  iconName: string;
  details: string;
  codeSnippet?: string;
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  mapsUrl?: string;
  period: string;
  status: string;
  cgpa: string;
  semesters: {
    semester: string;
    gpa: string;
    type: 'SGPA' | 'CGPA';
    highlight: string;
  }[];
  highlights: string[];
}

export interface Achievement {
  title: string;
  badge: string;
  issuer: string;
  year: string;
  description: string;
  skillsAcquired: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BackendStats {
  visitorCount: number;
  totalMessages: number;
  unreadMessages: number;
  projectLikes: Record<string, number>;
  recentEvents?: { id: string; type: string; timestamp: string; detail?: string }[];
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
  ip?: string;
}
