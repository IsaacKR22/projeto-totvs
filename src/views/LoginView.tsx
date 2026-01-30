import React, { useState } from 'react';
import { Button, Input, Card, CardBody } from '../components/UI';
import type { UserRole, Employee, Admin } from '../../types';
import { ADMINS, EMPLOYEES } from '../services/mockData';
import { LayoutGrid, UserCircle, Users } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: UserRole, data: Employee | Admin) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'EMPLOYEE' | 'ADMIN'>('EMPLOYEE');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'EMPLOYEE') {
      const employee = EMPLOYEES.find(emp => emp.code === code && emp.password === password);
      if (employee) {
        onLogin('EMPLOYEE', employee);
      } else {
        setError('Código ou senha inválidos.');
      }
    } else {
      const admin = ADMINS.find(adm => adm.username === username && adm.password === password);
      if (admin) {
        onLogin('ADMIN', admin);
      } else {
        setError('Usuário ou senha inválidos.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-indigo-600">
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('EMPLOYEE')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'EMPLOYEE' ? 'text-indigo-600 bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <UserCircle className="w-5 h-5" />
            Colaborador
          </button>
          <button
            onClick={() => setActiveTab('ADMIN')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'ADMIN' ? 'text-indigo-600 bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Administrador
          </button>
        </div>

        <CardBody className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Bem-vindo(a)</h2>
            <p className="text-slate-500 mt-2">
              {activeTab === 'EMPLOYEE' ? 'Acesse seu portal do colaborador' : 'Painel de gestão administrativa'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {activeTab === 'EMPLOYEE' ? (
              <Input
                label="Código do Funcionário"
                placeholder="Ex: 1001"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
              />
            ) : (
              <Input
                label="Usuário Admin"
                placeholder="admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            )}
            
            <Input
              label="Senha"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-2" size="lg">
              Entrar
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};