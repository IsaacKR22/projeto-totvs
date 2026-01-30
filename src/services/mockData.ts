import type { Admin, Company, Employee } from '../../types';
import { CivilStatus, EducationLevel, CourseStatus } from '../../types';

export const COMPANIES: Company[] = [
  { id: 'c1', name: 'Empresa 1 Ltda', cnpj: '12.345.678/0001-90' },
  { id: 'c2', name: 'Empresa para teste S.A.', cnpj: '98.765.432/0001-10' }
];

export const ADMINS: Admin[] = [
  {
    id: 'a1',
    username: 'admin',
    password: '123',
    managedCompanies: ['c1', 'c2']
  }
];

export const EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    companyId: 'c1',
    code: '1001',
    password: '123',
    fullName: 'Carlos Eduardo Silva',
    socialName: 'Cadu Silva',
    nickname: 'Cadu',
    gender: 'Masculino',
    isSmoker: false,
    race: 'Branca',
    bloodType: 'O+',
    email: 'carlos.silva@techsolutions.com',
    birthDate: '1990-05-15',
    birthState: 'SP',
    birthCity: 'São Paulo',
    nationality: 'Brasileira',
    civilStatus: CivilStatus.MARRIED,
    qualificationSummary: 'Engenheiro de Software com mais de 10 anos de experiência em desenvolvimento Full Stack, especializado em React e Node.js.',
    mainEducation: [
      {
        degree: EducationLevel.BACHELOR,
        courseName: 'Ciência da Computação',
        institution: 'USP - Universidade de São Paulo',
        status: CourseStatus.COMPLETED,
        cbo: '2124-05',
        startDate: '2008-02-01',
        endDate: '2012-12-15'
      }
    ],
    courses: [
      { 
        id: 'course1', 
        name: 'Arquitetura de Software', 
        institution: 'Alura', 
        status: CourseStatus.COMPLETED, 
        startDate: '2023-01-10',
        endDate: '2023-03-20',
        notes: 'Foco em microsserviços.'
      }
    ],
    experiences: [
      {
        id: 'exp1',
        company: 'WebDev Studio',
        role: 'Desenvolvedor Júnior',
        field: 'Tecnologia',
        startDate: '2013-02-01',
        endDate: '2015-05-30',
        description: 'Desenvolvimento de sites institucionais utilizando WordPress e PHP.'
      },
      {
        id: 'exp2',
        company: 'SoftHouse Sistemas',
        role: 'Desenvolvedor Pleno',
        field: 'Tecnologia',
        startDate: '2015-06-15',
        endDate: '2020-01-10',
        description: 'Manutenção de sistemas legados em Java e migração para arquitetura de microsserviços.'
      }
    ]
  },
  {
    id: 'e2',
    companyId: 'c1',
    code: '1002',
    password: '123',
    fullName: 'Ana Maria Oliveira',
    socialName: '',
    nickname: 'Aninha',
    gender: 'Feminino',
    isSmoker: false,
    race: 'Parda',
    bloodType: 'A-',
    email: 'ana.oliveira@techsolutions.com',
    birthDate: '1995-10-20',
    birthState: 'RJ',
    birthCity: 'Rio de Janeiro',
    nationality: 'Brasileira',
    civilStatus: CivilStatus.SINGLE,
    qualificationSummary: 'Especialista em Dados com foco em Big Data e Machine Learning.',
    mainEducation: [
      {
        degree: EducationLevel.MASTER,
        courseName: 'Ciência de Dados',
        institution: 'UFRJ',
        status: CourseStatus.COMPLETED,
        cbo: '2124-20',
        startDate: '2018-03-01',
        endDate: '2020-02-28'
      }
    ],
    courses: [],
    experiences: []
  },
  {
    id: 'e3',
    companyId: 'c2',
    code: '2001',
    password: '123',
    fullName: 'Roberto Santos',
    socialName: 'Beto',
    nickname: 'Beto',
    gender: 'Masculino',
    isSmoker: true,
    race: 'Negra',
    bloodType: 'B+',
    email: 'roberto.santos@global.com',
    birthDate: '1985-02-10',
    birthState: 'MG',
    birthCity: 'Belo Horizonte',
    nationality: 'Brasileira',
    civilStatus: CivilStatus.DIVORCED,
    qualificationSummary: 'Profissional de logística com experiência em gestão de frota.',
    mainEducation: [
      {
        degree: EducationLevel.SECONDARY,
        courseName: 'Ensino Médio',
        institution: 'Escola Estadual Central',
        status: CourseStatus.COMPLETED,
        cbo: '',
        startDate: '2000-02-01',
        endDate: '2002-12-10'
      }
    ],
    courses: [
      { 
        id: 'course3', 
        name: 'Técnico em Logística', 
        institution: 'SENAI', 
        status: CourseStatus.COMPLETED, 
        startDate: '2004-02-01',
        endDate: '2005-11-30',
        notes: 'Curso técnico profissionalizante.'
      }
    ],
    experiences: [
      {
        id: 'exp3',
        company: 'Transportadora Rápida',
        role: 'Motorista',
        field: 'Logística',
        startDate: '2006-01-10',
        endDate: '2015-12-20',
        description: 'Transporte de cargas estaduais e controle de notas fiscais.'
      }
    ]
  }
];

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));