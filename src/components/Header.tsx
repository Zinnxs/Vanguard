import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context';

export const Header: React.FC = () => {
  const { cart, currentUser, logout } = useStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-2xl tracking-tighter text-white">VANGUARD</span>
            </Link>
            <nav className="ml-12 hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-medium opacity-60">
              <Link to="/" className="transition-opacity hover:opacity-100 hover:text-white">Início</Link>
              <Link to="/catalogo" className="transition-opacity hover:opacity-100 hover:text-white">Catálogo</Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-6">
            {!currentUser ? (
               <Link to="/login" className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white transition flex items-center gap-2">
                 Entrar
               </Link>
            ) : (
               <div className="flex items-center space-x-6 hidden sm:flex">
                 {currentUser.isAdmin ? (
                   <Link to="/admin" className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white transition">Admin</Link>
                 ) : (
                   <Link to="/pedidos" className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white transition">Meus Pedidos</Link>
                 )}
                 <button onClick={() => logout()} className="text-[10px] uppercase tracking-widest text-[#555] hover:text-white transition cursor-pointer">Sair</button>
               </div>
            )}
            
            <Link to="/carrinho" className="group flex items-center gap-3 bg-white text-black px-4 py-2 rounded-full transition-transform hover:scale-105">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-[12px] font-bold tracking-tight">CARRINHO ({totalItems.toString().padStart(2, '0')})</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile nav quick links */}
      <div className="md:hidden border-t border-[#262626] py-3 px-4 flex justify-between overflow-x-auto text-[11px] uppercase tracking-widest font-medium opacity-60">
         <div className="flex gap-6">
           <Link to="/" className="whitespace-nowrap transition-opacity hover:opacity-100 hover:text-white">Início</Link>
           <Link to="/catalogo" className="whitespace-nowrap transition-opacity hover:opacity-100 hover:text-white">Catálogo</Link>
         </div>
         {currentUser && (
           <div className="flex gap-6">
             {currentUser.isAdmin ? (
                <Link to="/admin" className="whitespace-nowrap transition-opacity hover:opacity-100 hover:text-white">Admin</Link>
             ) : (
                <Link to="/pedidos" className="whitespace-nowrap transition-opacity hover:opacity-100 hover:text-white">Meus Pedidos</Link>
             )}
             <button onClick={() => logout()} className="whitespace-nowrap transition-opacity hover:opacity-100 hover:text-white cursor-pointer">Sair</button>
           </div>
         )}
      </div>
    </header>
  );
};
