
import React from 'react';
import { User, UserRole } from '../types';
import { ICONS } from '../constants';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-ativa-400 p-1.5 rounded-lg text-white">
          {ICONS.Package}
        </div>
        <div>
          <h1 className="text-sm font-black text-ativa-400 leading-none italic uppercase">Galinheiro</h1>
          <p className="text-[9px] text-gray-400 font-bold tracking-tight uppercase">Ativa Hospitalar</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-gray-700">{user.name}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            user.role === UserRole.ADMIN ? 'bg-ativa-100 text-ativa-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {user.role}
          </span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
          title="Sair"
        >
          {ICONS.Logout}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
