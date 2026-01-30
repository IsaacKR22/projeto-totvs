export const CivilStatus = {
  SINGLE: 'Solteiro(a)',
  MARRIED: 'Casado(a)',
  DIVORCED: 'Divorciado(a)',
  WIDOWED: 'Viúvo(a)',
  SEPARATED: 'Separado(a)'
}

export const EducationLevel = {
  PRIMARY: 'Ensino Fundamental',
  SECONDARY: 'Ensino Médio',
  TECHNICAL: 'Ensino Técnico',
  BACHELOR: 'Graduação',
  MASTER: 'Mestrado',
  DOCTORATE: 'Doutorado',
  PHD: 'Pós-Doutorado'
}

export const CourseStatus = {
  COMPLETED: 'Concluído',
  IN_PROGRESS: 'Em Andamento',
  PAUSED: 'Trancado'
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  status: typeof CourseStatus[keyof typeof CourseStatus];
  startDate: string; 
  endDate: string;   
  notes: string;     
}

// New interface for Professional Experience
export interface Experience {
  id: string;
  company: string;
  role: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string; // Atividades desenvolvidas
}

// New interface for detailed Main Education
export interface MainEducation {
  degree: typeof EducationLevel[keyof typeof EducationLevel];
  courseName: string;
  institution: string;
  status: typeof CourseStatus[keyof typeof CourseStatus];
  cbo: string;
  startDate: string;
  endDate: string;
}

export interface Employee {
  id: string; // Internal ID
  code: string; // Employee Login Code
  password: string; 
  companyId: string;
  
  // Personal Info
  fullName: string;
  socialName?: string; 
  nickname: string;
  gender: string; 
  isSmoker: boolean; 
  race: string; 
  bloodType: string; 
  email: string; 
  
  birthDate: string; 
  birthState: string;
  birthCity: string; 
  nationality: string;
  civilStatus: typeof CivilStatus[keyof typeof CivilStatus];
  qualificationSummary: string; 
  
  // Education & Career
  mainEducation: MainEducation[]; 
  courses: Course[];
  experiences: Experience[]; // New field
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  managedCompanies: string[]; 
}

export type UserRole = 'ADMIN' | 'EMPLOYEE' | null;

export interface UserSession {
  role: UserRole;
  data: Employee | Admin | null;
}