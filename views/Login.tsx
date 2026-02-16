
import React, { useState } from 'react';
import { User, UserRole, UserStatus } from '../types';
import { ICONS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  users: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, users }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isRegisterMode) {
      if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        return setError('Este usuário já existe.');
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        username: username.toLowerCase(),
        password,
        role: UserRole.USER,
        status: UserStatus.PENDING
      };
      onRegister(newUser);
      setSuccess('Cadastro enviado! Peça para o administrador ativar seu acesso.');
      setIsRegisterMode(false);
      setUsername('');
      setPassword('');
      setName('');
    } else {
      const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      if (user) {
        if (user.status !== UserStatus.ACTIVE) {
          return setError('Sua conta ainda não foi ativada pelo Administrador.');
        }
        onLogin(user);
      } else {
        setError('Acesso negado. Usuário ou senha inválidos.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header Visual */}
      <div className="bg-ativa-400 p-12 flex flex-col items-center justify-center rounded-b-[4rem] shadow-xl">
        <div className="bg-white p-4 rounded-3xl shadow-inner mb-6">
          <div className="text-ativa-400 scale-150">
            {React.cloneElement(ICONS.Package as React.ReactElement, { size: 40 })}
          </div>
        </div>
        <h1 className="text-white font-black italic text-3xl leading-none uppercase tracking-tight">Galinheiro</h1>
        <span className="text-[10px] font-bold text-ativa-100 tracking-[0.4em] uppercase mt-2">Ativa Hospitalar</span>
      </div>
      
      <div className="flex-1 -mt-10 px-6 pb-12">
        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest italic">
              {isRegisterMode ? 'Novo Acesso' : 'Entrar no Sistema'}
            </h2>
            <p className="text-gray-400 font-medium text-xs mt-1">
              {isRegisterMode ? 'Preencha seus dados para começar' : 'Bem-vindo de volta!'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-[10px] font-bold p-4 rounded-2xl border border-red-100 flex items-center gap-3 animate-pulse">
                {ICONS.Error}
                <span className="uppercase">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 text-[10px] font-bold p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                {ICONS.Success}
                <span className="uppercase">{success}</span>
              </div>
            )}
            
            {isRegisterMode && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2 italic">Nome Completo</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{ICONS.User}</span>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-ativa-400 outline-none transition-all shadow-sm"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2 italic">Usuário</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">@</span>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-ativa-400 outline-none transition-all shadow-sm"
                  placeholder="Seu login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-2 italic">Senha de Acesso</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{ICONS.Settings}</span>
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm focus:bg-white focus:ring-2 focus:ring-ativa-400 outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-ativa-400 hover:bg-ativa-500 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-ativa-100 transition-all flex items-center justify-center gap-3 mt-6 active:scale-95 uppercase tracking-[0.2em] italic"
            >
              {isRegisterMode ? 'Finalizar Cadastro' : 'Acessar Galinheiro'}
              {ICONS.ArrowRight}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-[8px] font-bold text-gray-300 uppercase tracking-widest bg-white px-2">Ou</div>
            </div>

            <button 
              type="button"
              onClick={() => { setIsRegisterMode(!isRegisterMode); setError(''); setSuccess(''); }}
              className="w-full text-ativa-400 text-[10px] font-black py-2 hover:bg-ativa-50 rounded-xl transition-all tracking-[0.2em] uppercase italic"
            >
              {isRegisterMode ? 'Já tenho uma conta' : 'Solicitar Novo Acesso'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-gray-300 text-[8px] font-black text-center tracking-[0.3em] uppercase">
          <p>© 2024 Galinheiro Pro v2.0</p>
          <p className="mt-1">Ativa Hospitalar - Gestão Interna</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
