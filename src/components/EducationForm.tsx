import React, { useState } from 'react';
import type { Course, Employee, Experience, MainEducation } from '../../types';
import { CourseStatus, EducationLevel } from '../../types';
import { Button, Input, Select, TextArea, Card, CardBody } from './UI';
import { Plus, Trash2, GraduationCap, Book, Save, Briefcase } from 'lucide-react';

interface EducationFormProps {
  employee: Employee;
  onUpdate: (updatedEmployee: Employee) => void;
  readOnly?: boolean;
}

export const EducationForm: React.FC<EducationFormProps> = ({ employee, onUpdate, readOnly = false }) => {
  // State for new course addition
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    name: '',
    institution: '',
    status: CourseStatus.IN_PROGRESS,
    startDate: '',
    endDate: '',
    notes: ''
  });

  // State for new experience addition
  const [experienceForm, setExperienceForm] = useState<Partial<Experience>>({
    company: '',
    role: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // State for new main education addition
  const [newEducation, setNewEducation] = useState<Partial<MainEducation>>({
    degree: Object.values(EducationLevel)[0],
    courseName: '',
    institution: '',
    status: CourseStatus.IN_PROGRESS,
    cbo: '',
    startDate: '',
    endDate: ''
  });

  // --- Courses Logic ---
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.institution) return;

    const course: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCourse.name!,
      institution: newCourse.institution!,
      status: (newCourse.status as typeof CourseStatus[keyof typeof CourseStatus]) || CourseStatus.IN_PROGRESS,
      startDate: newCourse.startDate || '',
      endDate: newCourse.endDate || '',
      notes: newCourse.notes || ''
    };

    onUpdate({
      ...employee,
      courses: [...employee.courses, course]
    });

    setNewCourse({
      name: '',
      institution: '',
      status: CourseStatus.IN_PROGRESS,
      startDate: '',
      endDate: '',
      notes: ''
    });
  };

  const handleRemoveCourse = (courseId: string) => {
    onUpdate({
      ...employee,
      courses: employee.courses.filter(c => c.id !== courseId)
    });
  };

  // --- Main Education Logic ---
  const handleAddMainEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEducation.courseName || !newEducation.institution) return;

    const education: MainEducation = {
      degree: (newEducation.degree as typeof EducationLevel[keyof typeof EducationLevel]) || Object.values(EducationLevel)[0],
      courseName: newEducation.courseName!,
      institution: newEducation.institution!,
      status: (newEducation.status as typeof CourseStatus[keyof typeof CourseStatus]) || CourseStatus.IN_PROGRESS,
      cbo: newEducation.cbo || '',
      startDate: newEducation.startDate || '',
      endDate: newEducation.endDate || ''
    };

    onUpdate({
      ...employee,
      mainEducation: [...(employee.mainEducation || []), education]
    });

    setNewEducation({
      degree: Object.values(EducationLevel)[0],
      courseName: '',
      institution: '',
      status: CourseStatus.IN_PROGRESS,
      cbo: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleRemoveMainEducation = (index: number) => {
    onUpdate({
      ...employee,
      mainEducation: employee.mainEducation.filter((_, i) => i !== index)
    });
  };

  // --- Experience Logic ---
  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experienceForm.company || !experienceForm.role) return;

    const experience: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: experienceForm.company!,
      role: experienceForm.role!,
      field: experienceForm.field || '',
      startDate: experienceForm.startDate || '',
      endDate: experienceForm.endDate || '',
      description: experienceForm.description || ''
    };

    onUpdate({
      ...employee,
      experiences: [...(employee.experiences || []), experience]
    });

    // Reset form
    setExperienceForm({
      company: '',
      role: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleRemoveExperience = (expId: string) => {
    onUpdate({
      ...employee,
      experiences: employee.experiences.filter(e => e.id !== expId)
    });
  };

  return (
    <div className="space-y-10 pb-4">
      {/* --- Main Education Section --- */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Formação Acadêmica (Escolaridade Principal)
          </h4>
        </div>

        {(!employee.mainEducation || employee.mainEducation.length === 0) ? (
          <div className="p-8 text-center bg-indigo-50 rounded-lg border border-dashed border-indigo-200 mb-6">
            <p className="text-indigo-600">Nenhuma formação acadêmica registrada.</p>
          </div>
        ) : (
          <div className="grid gap-4 mb-8">
            {employee.mainEducation.map((edu, index) => (
              <Card 
                key={index} 
                className="bg-white !border-indigo-200 hover:shadow-md transition-shadow"
              >
                <CardBody className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg">{edu.courseName}</h5>
                      <p className="text-indigo-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-slate-500 mt-1">{edu.degree}</p>
                    </div>
                    {!readOnly && (
                      <button 
                        onClick={() => handleRemoveMainEducation(index)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Remover formação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="space-y-1">
                      <p><span className="text-slate-500">Status:</span> <span className={`font-medium ${
                        edu.status === CourseStatus.COMPLETED ? 'text-green-600' : 'text-blue-600'
                      }`}>{edu.status}</span></p>
                      <p><span className="text-slate-500">Período:</span> {edu.startDate} até {edu.endDate}</p>
                      {edu.cbo && <p><span className="text-slate-500">CBO:</span> {edu.cbo}</p>}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Add Main Education Form */}
        {!readOnly && (
          <form onSubmit={handleAddMainEducation} className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
            <h5 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar Formação Acadêmica
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Grau de Instituição"
                value={newEducation.degree || ''}
                onChange={e => setNewEducation({ ...newEducation, degree: e.target.value as typeof EducationLevel[keyof typeof EducationLevel] })}
                options={Object.values(EducationLevel).map(val => ({ value: val, label: val }))}
              />
              <Input
                label="Nome do Curso"
                value={newEducation.courseName}
                onChange={e => setNewEducation({ ...newEducation, courseName: e.target.value })}
                required
              />
              <Input
                label="Entidade / Instituição"
                value={newEducation.institution}
                onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })}
                required
              />
              <Select
                label="Andamento do Curso"
                value={newEducation.status || ''}
                onChange={e => setNewEducation({ ...newEducation, status: e.target.value as typeof CourseStatus[keyof typeof CourseStatus] })}
                options={Object.values(CourseStatus).map(val => ({ value: val, label: val }))}
              />
              <Input
                label="CBO da Formação"
                value={newEducation.cbo}
                onChange={e => setNewEducation({ ...newEducation, cbo: e.target.value })}
                placeholder="Ex: 2124-05"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Data de Início"
                  value={newEducation.startDate}
                  onChange={e => setNewEducation({ ...newEducation, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Data de Término"
                  value={newEducation.endDate}
                  onChange={e => setNewEducation({ ...newEducation, endDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" variant="secondary" className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Salvar Formação
              </Button>
            </div>
          </form>
        )}
      </section>

      {/* --- Professional Experience Section --- */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-500" />
            Experiência Profissional
          </h4>
        </div>

        {(!employee.experiences || employee.experiences.length === 0) ? (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 mb-6">
            <p className="text-slate-500">Nenhuma experiência profissional registrada.</p>
          </div>
        ) : (
          <div className="grid gap-4 mb-8">
            {employee.experiences.map(exp => (
              <Card 
                key={exp.id} 
                className="bg-white !border-slate-200 hover:shadow-md transition-shadow"
              >
                <CardBody className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg">{exp.role}</h5>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    {!readOnly && (
                      <button 
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Remover experiência"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm">
                    <div className="space-y-1">
                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-800">Área:</span> {exp.field}
                      </p>
                      <p className="text-slate-600">
                        <span className="font-semibold text-slate-800">Período:</span> {exp.startDate} até {exp.endDate || 'Atual'}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="bg-slate-50 p-3 rounded text-slate-700">
                        <p className="text-xs font-semibold text-slate-400 mb-1">Atividades Desenvolvidas:</p>
                        {exp.description}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Add Experience Form */}
        {!readOnly && (
          <form onSubmit={handleAddExperience} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar Experiência Profissional
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Empresa"
                value={experienceForm.company}
                onChange={e => setExperienceForm({ ...experienceForm, company: e.target.value })}
                required
              />
              <Input
                label="Último Cargo"
                value={experienceForm.role}
                onChange={e => setExperienceForm({ ...experienceForm, role: e.target.value })}
                required
              />
              <Input
                label="Área de Atuação"
                value={experienceForm.field}
                onChange={e => setExperienceForm({ ...experienceForm, field: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Data de Admissão"
                  value={experienceForm.startDate}
                  onChange={e => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Data de Demissão"
                  value={experienceForm.endDate}
                  onChange={e => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <TextArea
                  label="Atividades Desenvolvidas"
                  placeholder="Descreva as principais responsabilidades e conquistas..."
                  value={experienceForm.description}
                  onChange={e => setExperienceForm({ ...experienceForm, description: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" variant="secondary" className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Salvar Experiência
              </Button>
            </div>
          </form>
        )}
      </section>

      {/* --- Additional Courses Section --- */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
          <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Book className="w-5 h-5 text-slate-500" />
            Cursos Adicionais & Certificações
          </h4>
        </div>

        {employee.courses.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 mb-6">
            <p className="text-slate-500">Nenhum curso adicional registrado.</p>
          </div>
        ) : (
          <div className="grid gap-4 mb-8">
            {employee.courses.map(course => (
              <Card key={course.id} className="bg-white !border-slate-200 hover:shadow-md transition-shadow">
                <CardBody className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg">{course.name}</h5>
                      <p className="text-slate-600 font-medium">{course.institution}</p>
                    </div>
                    {!readOnly && (
                      <button 
                        onClick={() => handleRemoveCourse(course.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                        title="Remover curso"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="space-y-1">
                      <p><span className="text-slate-500">Status:</span> <span className={`font-medium ${
                        course.status === CourseStatus.COMPLETED ? 'text-green-600' : 'text-blue-600'
                      }`}>{course.status}</span></p>
                      <p><span className="text-slate-500">Período:</span> {course.startDate} até {course.endDate}</p>
                    </div>
                    {course.notes && (
                      <div className="bg-slate-50 p-2 rounded text-slate-600 italic">
                        " {course.notes} "
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Add Course Form */}
        {!readOnly && (
          <form onSubmit={handleAddCourse} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Adicionar Novo Curso
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Nome do Curso"
                value={newCourse.name}
                onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                required
              />
              <Input
                label="Instituição"
                value={newCourse.institution}
                onChange={e => setNewCourse({ ...newCourse, institution: e.target.value })}
                required
              />
              <Select
                label="Status"
                options={Object.values(CourseStatus).map(s => ({ value: s, label: s }))}
                value={newCourse.status}
                onChange={e => setNewCourse({ ...newCourse, status: e.target.value as typeof CourseStatus[keyof typeof CourseStatus] })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Início"
                  value={newCourse.startDate}
                  onChange={e => setNewCourse({ ...newCourse, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Término"
                  value={newCourse.endDate}
                  onChange={e => setNewCourse({ ...newCourse, endDate: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <TextArea
                  label="Observações"
                  placeholder="Detalhes adicionais sobre o curso..."
                  value={newCourse.notes}
                  onChange={e => setNewCourse({ ...newCourse, notes: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" variant="secondary" className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Salvar Curso
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};