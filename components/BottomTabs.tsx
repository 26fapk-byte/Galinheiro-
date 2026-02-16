
import React from 'react';
import { ICONS } from '../constants';
import { UserRole } from '../types';

interface BottomTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  cartCount: number;
  userRole: UserRole;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, setActiveTab, cartCount, userRole }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-3 px-2 z-40">
      <TabButton 
        active={activeTab === 'catalog'} 
        onClick={() => setActiveTab('catalog')}
        icon={ICONS.Home}
        label="Itens"
      />
      
      <TabButton 
        active={activeTab === 'cart'} 
        onClick={() => setActiveTab('cart')}
        icon={ICONS.Cart}
        label="Pedido"
        badge={cartCount > 0 ? cartCount : undefined}
      />

      {userRole === UserRole.ADMIN && (
        <>
          <TabButton 
            active={activeTab === 'admin'} 
            onClick={() => setActiveTab('admin')}
            icon={ICONS.Package}
            label="Estoque"
          />
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
            icon={ICONS.User}
            label="Equipe"
          />
        </>
      )}
    </nav>
  );
};

const TabButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  badge?: number;
}> = ({ active, onClick, icon, label, badge }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center flex-1 transition-all ${active ? 'text-ativa-400' : 'text-gray-300'}`}
  >
    <div className="relative">
      {icon}
      {badge && (
        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-black px-1 rounded-full min-w-[14px] h-3.5 flex items-center justify-center border-2 border-white">
          {badge}
        </span>
      )}
    </div>
    <span className="text-[9px] mt-1 font-black uppercase tracking-tighter italic">{label}</span>
  </button>
);

export default BottomTabs;
