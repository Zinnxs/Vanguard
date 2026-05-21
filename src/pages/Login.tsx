import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context';
import { UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, currentUser } = useStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.isAdmin) navigate('/admin');
      else navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    login(email, name);
    
    // Check if there was a redirect intended (e.g. from checkout)
    const state = location.state as { from?: string };
    if (state?.from) {
      navigate(state.from);
    } else {
      if (email.toLowerCase() === 'admin@lumina.com') {
         navigate('/admin');
      } else {
         navigate('/');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-24 bg-[#0E0E0E] border border-[#262626] p-8">
      <div className="flex flex-col items-center mb-8">
        <UserCircle className="w-12 h-12 text-[#A1A1AA] mb-4" />
        <h1 className="text-2xl font-serif text-white uppercase tracking-tight">Acesso Lumina</h1>
        <p className="text-[10px] uppercase tracking-widest text-[#555] mt-2 text-center">
          Dica: Use admin@lumina.com para acessar o painel administrativo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Nome Completo</label>
          <input required type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" placeholder="Seu nome" />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">E-mail</label>
          <input required type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" placeholder="seu@email.com" />
        </div>
        
        <button
          type="submit"
          className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all mt-4"
        >
          Entrar no Sistema
        </button>
      </form>
    </div>
  );
};
