import { useState } from 'react';
import type { UserRole, UserSession, Employee, Admin } from '../types';
import { LoginView } from './views/LoginView';
import { ProfileView } from './views/ProfileView';
import { AdminDashboard } from './views/AdminDashboard';
import { LogOut } from 'lucide-react';

const App = () => {
  const [session, setSession] = useState<UserSession>({ role: null, data: null });

  const handleLogin = (role: UserRole, data: Employee | Admin | null) => {
    setSession({ role, data });
  };

  const handleLogout = () => {
    setSession({ role: null, data: null });
  };

  const handleUpdateSelf = (updatedEmployee: Employee) => {
    // Only used when logged in as Employee to update local view state
    // In a real app, this would push to API
    setSession(prev => ({
      ...prev,
      data: updatedEmployee
    }));
  };

  if (!session.role) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (session.role === 'ADMIN') {
    return (
      <AdminDashboard 
        admin={session.data as Admin} 
        onLogout={handleLogout} 
      />
    );
  }

  // Employee View
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg font-bold text-sm">RH</div>
            <span className="font-semibold text-slate-700">Portal do Colaborador</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </nav>
      
      <div className="p-4">
        <ProfileView 
          employee={session.data as Employee} 
          isEditable={false} 
          onUpdate={handleUpdateSelf}
        />
      </div>
      
      <footer className="max-w-4xl mx-auto mt-12 mb-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} GestãoRH. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;