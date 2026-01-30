import React, { useState } from 'react';
import type { Employee, Admin } from '../../types';
import { Button, Card, } from '../components/UI';
import { EMPLOYEES } from '../services/mockData';

import { COMPANIES } from '../services/mockData';import { Building2, Search, Filter, Briefcase, ChevronRight } from 'lucide-react';
import { ProfileView } from './ProfileView';

interface AdminDashboardProps {
  admin: Admin;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES); // Local state for updates
  
  // Filter state: key is field name, value is search term
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Derived state
  const managedCompanies = COMPANIES.filter(c => admin.managedCompanies.includes(c.id));
  
  const currentCompanyEmployees = employees.filter(e => e.companyId === selectedCompanyId);
  
  const filteredEmployees = currentCompanyEmployees.filter(emp => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      // Handle nested property for education level filter
      if (key === 'educationLevel') {
        const degree = emp.mainEducation?.[0]?.degree || '';
        return String(degree || '').toLowerCase().includes(value.toLowerCase());
      }

      const empValue = (emp as unknown as Record<string, unknown>)[key];
      return String(empValue || '').toLowerCase().includes(value.toLowerCase());
    });
  });

  const handleUpdateEmployee = (updatedEmp: Employee) => {
    setEmployees(prev => prev.map(e => e.id === updatedEmp.id ? updatedEmp : e));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // --- View: Employee Detail (Editable) ---
  if (selectedEmployeeId) {
    const emp = employees.find(e => e.id === selectedEmployeeId);
    if (!emp) return <div>Funcionário não encontrado</div>;
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <ProfileView 
          employee={emp} 
          isEditable={true} 
          onBack={() => setSelectedEmployeeId(null)}
          onUpdate={handleUpdateEmployee}
        />
      </div>
    );
  }

  // --- View: Company Selection ---
  if (!selectedCompanyId) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Painel Administrativo</h1>
            <Button variant="ghost" onClick={onLogout}>Sair</Button>
          </div>
          
          <h2 className="text-lg font-semibold text-slate-600 mb-4">Selecione uma Empresa para Gerenciar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {managedCompanies.map(company => (
              <button
                key={company.id}
                onClick={() => setSelectedCompanyId(company.id)}
                className="group flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all text-left"
              >
                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{company.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">CNPJ: {company.cnpj}</p>
                  <p className="text-indigo-600 text-sm font-medium mt-3 flex items-center">
                    Acessar Funcionários <ChevronRight className="w-4 h-4 ml-1" />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- View: Employee Grid ---
  const company = managedCompanies.find(c => c.id === selectedCompanyId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">{company?.name}</h1>
            <p className="text-xs text-slate-500">Gestão de Colaboradores</p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="secondary" size="sm" onClick={() => setSelectedCompanyId(null)}>Trocar Empresa</Button>
           <Button variant="ghost" size="sm" onClick={onLogout}>Sair</Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-hidden flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg border-0">
           <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
             <Filter className="w-4 h-4 text-slate-500" />
             <span className="text-sm font-medium text-slate-700">Filtros Avançados: Digite nos campos abaixo para buscar</span>
           </div>
          
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  {[
                    { key: 'code', label: 'Código', width: 'w-24' },
                    { key: 'fullName', label: 'Nome Completo', width: 'w-64' },
                    { key: 'birthDate', label: 'Data Nasc.', width: 'w-32' },
                    { key: 'birthState', label: 'UF', width: 'w-16' },
                    { key: 'birthCity', label: 'Naturalidade', width: 'w-40' },
                    { key: 'educationLevel', label: 'Escolaridade', width: 'w-48' },
                  ].map(col => (
                    <th key={col.key} className={`p-4 border-b border-r border-slate-200 bg-slate-50 align-top ${col.width}`}>
                      <div className="font-semibold text-slate-700 mb-2">{col.label}</div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Filtrar..."
                          className="w-full px-2 py-1 text-xs bg-white text-slate-900 border border-slate-300 rounded focus:outline-none focus:border-indigo-500"
                          value={filters[col.key] || ''}
                          onChange={(e) => handleFilterChange(col.key, e.target.value)}
                        />
                        <Search className="w-3 h-3 text-slate-400 absolute right-2 top-1.5 pointer-events-none" />
                      </div>
                    </th>
                  ))}
                  <th className="p-4 border-b border-slate-200 bg-slate-50 w-24 align-middle">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">Nenhum funcionário encontrado com estes filtros.</td>
                  </tr>
                ) : (
                  filteredEmployees.map(emp => (
                    <tr 
                      key={emp.id} 
                      onClick={() => setSelectedEmployeeId(emp.id)}
                      className="hover:bg-indigo-50/50 cursor-pointer transition-colors group"
                    >
                      <td className="p-4 text-slate-600 font-mono">{emp.code}</td>
                      <td className="p-4 font-medium text-slate-900">{emp.fullName}</td>
                      <td className="p-4 text-slate-600">{emp.birthDate}</td>
                      <td className="p-4 text-slate-600">{emp.birthState}</td>
                      <td className="p-4 text-slate-600">{emp.birthCity}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                          {emp.mainEducation?.[0]?.degree || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                          Editar &rarr;
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
             Total: {filteredEmployees.length} registros
          </div>
        </Card>
      </main>
    </div>
  );
};