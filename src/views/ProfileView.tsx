import React, { useState } from 'react';
import type { Employee } from '../../types';
import { CivilStatus } from '../../types';
import { EducationForm } from '../components/EducationForm';
import { Button, Input, Select, TextArea, Card, CardBody, CardHeader, Modal } from '../components/UI';
import { ArrowLeft, User, Save, BookOpen } from 'lucide-react';

interface ProfileViewProps {
  employee: Employee;
  isEditable: boolean; // True for admin
  onBack?: () => void;
  onUpdate: (updatedEmp: Employee) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ employee, isEditable, onBack, onUpdate }) => {
  const [formData, setFormData] = useState<Employee>(employee);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  // Sync local state when prop changes (e.g., selecting different row in admin)
  React.useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (field: keyof Employee, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    // In a real app, show a toast here
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
          )}
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditable ? `Editando: ${formData.fullName}` : 'Meu Perfil'}
          </h1>
        </div>
        
        {isEditable && (
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Salvar Alterações
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Avatar & Quick Actions */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardBody className="flex flex-col items-center text-center p-8">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 border-4 border-white shadow-lg">
                <User className="w-16 h-16" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 leading-tight">{formData.fullName}</h2>
              {formData.socialName && <p className="text-sm text-slate-500 mt-1">({formData.socialName})</p>}
              <p className="text-slate-500 font-mono text-sm mt-2 bg-slate-100 px-2 py-1 rounded">{formData.code}</p>
              
              <div className="mt-8 w-full">
                <button
                  onClick={() => setIsEducationModalOpen(true)}
                  className="w-full bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-5 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 group text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <BookOpen className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">Carreira & Educação</p>
                    <p className="text-lg font-bold leading-tight mb-1">{formData.mainEducation?.[0]?.degree || 'Não informado'}</p>
                    <p className="text-sm text-indigo-100 opacity-90">{formData.mainEducation?.[0]?.courseName || 'Sem formação'}</p>
                    <div className="mt-4 flex items-center text-xs font-medium bg-white/20 w-fit px-3 py-1.5 rounded-full">
                      Gerenciar Histórico &rarr;
                    </div>
                  </div>
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Detailed Form */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader title="Informações Pessoais" subtitle="Dados cadastrais completos do funcionário" />
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Row 1 */}
                <Input
                  label="Código do Usuário"
                  value={formData.code}
                  onChange={e => handleChange('code', e.target.value)}
                  disabled={!isEditable}
                />
                 <Input
                  label="Email Corporativo"
                  type="email"
                  className="md:col-span-2"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  disabled={!isEditable}
                />

                {/* Row 2 */}
                <Input
                  label="Nome Completo"
                  className="md:col-span-2"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  disabled={!isEditable}
                />
                <Input
                  label="Nome Social"
                  value={formData.socialName || ''}
                  onChange={e => handleChange('socialName', e.target.value)}
                  disabled={!isEditable}
                />

                {/* Row 3 */}
                <Input
                  label="Apelido"
                  value={formData.nickname}
                  onChange={e => handleChange('nickname', e.target.value)}
                  disabled={!isEditable}
                />
                <Input
                  label="Data de Nascimento"
                  type="date"
                  value={formData.birthDate}
                  onChange={e => handleChange('birthDate', e.target.value)}
                  disabled={!isEditable}
                />
                <Select
                  label="Estado Civil"
                  options={Object.values(CivilStatus).map(s => ({ value: s, label: s }))}
                  value={formData.civilStatus}
                  onChange={e => handleChange('civilStatus', e.target.value)}
                  disabled={!isEditable}
                />

                {/* Row 4 - New Fields */}
                <Select
                  label="Sexo"
                  options={[
                    { value: 'Masculino', label: 'Masculino' },
                    { value: 'Feminino', label: 'Feminino' },
                    { value: 'Outro', label: 'Outro' },
                    { value: 'Prefiro não informar', label: 'Prefiro não informar' }
                  ]}
                  value={formData.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                  disabled={!isEditable}
                />
                <Input
                  label="Cor / Raça"
                  value={formData.race}
                  onChange={e => handleChange('race', e.target.value)}
                  disabled={!isEditable}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Tipo Sanguíneo"
                    value={formData.bloodType}
                    onChange={e => handleChange('bloodType', e.target.value)}
                    disabled={!isEditable}
                    placeholder="Ex: O+"
                  />
                  <Select
                    label="Fumante"
                    options={[
                      { value: 'false', label: 'Não' },
                      { value: 'true', label: 'Sim' }
                    ]}
                    value={String(formData.isSmoker)}
                    onChange={e => handleChange('isSmoker', e.target.value === 'true')}
                    disabled={!isEditable}
                  />
                </div>

                {/* Row 5 */}
                <Input
                  label="Naturalidade (Cidade)"
                  value={formData.birthCity}
                  onChange={e => handleChange('birthCity', e.target.value)}
                  disabled={!isEditable}
                />
                <Input
                  label="Estado Natal (UF)"
                  maxLength={2}
                  value={formData.birthState}
                  onChange={e => handleChange('birthState', e.target.value)}
                  disabled={!isEditable}
                />
                <Input
                  label="Nacionalidade"
                  value={formData.nationality}
                  onChange={e => handleChange('nationality', e.target.value)}
                  disabled={!isEditable}
                />
                
                {/* Full Width */}
                <div className="md:col-span-3">
                  <TextArea
                    label="Resumo da Qualificação"
                    value={formData.qualificationSummary}
                    onChange={e => handleChange('qualificationSummary', e.target.value)}
                    disabled={!isEditable}
                    rows={4}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        title="Gestão de Formação & Experiência Profissional"
      >
        <EducationForm
          employee={formData}
          onUpdate={(updated) => {
            setFormData(updated);
            if (!isEditable) {
               onUpdate(updated);
            }
          }}
          readOnly={false} 
        />
        <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
           <Button variant="ghost" onClick={() => setIsEducationModalOpen(false)}>Cancelar</Button>
           <Button onClick={() => {
             // If manual save is needed or just close
             if(isEditable) handleSave(); // Optional: auto-save on close if admin
             setIsEducationModalOpen(false);
           }}>
             Concluir & Fechar
           </Button>
        </div>
      </Modal>
    </div>
  );
};