import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useStore } from '../context';

export const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useStore();

  useEffect(() => {
    if (sessionId) {
      // In a real app we'd verify the session on the server
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="w-full max-w-lg mx-auto my-24 bg-[#0E0E0E] border border-[#262626] p-12 text-center flex flex-col items-center">
      <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-8 opacity-80" />
      <h1 className="text-3xl font-serif tracking-tight mb-4 text-white uppercase">Pagamento Aprovado</h1>
      <p className="text-sm text-[#A1A1AA] mb-8 font-light leading-relaxed">
        Seu pedido foi processado com sucesso via Stripe!
      </p>
      <div className="flex gap-4 w-full">
        <Link to="/pedidos" className="flex-1 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all">
          Meus Pedidos
        </Link>
        <Link to="/catalogo" className="flex-1 py-4 border border-[#262626] text-white text-[11px] font-bold uppercase tracking-widest hover:border-gray-500 transition-all">
          Continuar
        </Link>
      </div>
    </div>
  );
};

export const CheckoutCancel: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto my-24 bg-[#0E0E0E] border border-[#262626] p-12 text-center flex flex-col items-center">
      <XCircle className="w-16 h-16 text-red-500 mb-8 opacity-80" />
      <h1 className="text-3xl font-serif tracking-tight mb-4 text-white uppercase">Pagamento Cancelado</h1>
      <p className="text-sm text-[#A1A1AA] mb-8 font-light leading-relaxed">
        O processo de pagamento foi interrompido. Nenhuma cobrança foi realizada.
      </p>
      <Link to="/checkout" className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all">
        Tentar Novamente
      </Link>
    </div>
  );
};
