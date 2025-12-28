export interface Education {
  degree: string;
  institute: string;
  year: string;
  score: string;
  location?: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  location: string;
  points: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  tech?: string;
  duration: string;
  points: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Education[];
  achievements: Achievement[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
}