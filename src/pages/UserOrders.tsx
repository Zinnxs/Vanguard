import React from 'react';
import { useStore } from '../context';
import { formatPrice } from '../lib/utils';
import { Package, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserOrders: React.FC = () => {
  const { orders, currentUser } = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const userOrders = orders.filter(o => o.customer.email === currentUser.email);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full max-w-5xl">
          <div className="mb-10 text-center border-b border-[#262626] pb-8">
            <h1 className="text-3xl font-serif tracking-tight text-white uppercase mt-4">Meus Pedidos</h1>
            <h3 className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center justify-center gap-2">
              Histórico de Compras de {currentUser.name}
            </h3>
          </div>
          
          {userOrders.length === 0 ? (
            <div className="text-center py-20 bg-[#0E0E0E] border border-[#262626]">
              <Package className="mx-auto h-8 w-8 text-[#555] mb-4" />
              <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">Você ainda não realizou nenhum pedido.</p>
            </div>
          ) : (
            <div className="bg-[#070707] border border-[#262626] overflow-hidden flex flex-col">
              <div className="bg-[#151515] p-6 text-[9px] uppercase tracking-widest font-bold border-b border-[#262626] grid grid-cols-4 sm:grid-cols-5 text-[#A1A1AA] gap-4">
                 <span className="col-span-1">ID / Data</span>
                 <span className="col-span-2">Itens</span>
                 <span className="col-span-1 hidden sm:block">Total</span>
                 <span className="col-span-1 text-right">Status</span>
              </div>
              <div className="divide-y divide-[#262626]">
                {userOrders.map((order) => (
                  <div key={order.id} className="p-6 grid grid-cols-4 sm:grid-cols-5 items-center hover:bg-[#0A0A0A] transition-colors gap-4">
                    <div className="col-span-1">
                      <p className="text-[11px] font-mono text-white mb-2">{order.id}</p>
                      <p className="text-[9px] text-[#555] flex items-center gap-1 uppercase tracking-wider h-4"><Clock className="w-3 h-3"/> {order.date}</p>
                    </div>
                    
                    <div className="col-span-2 space-y-1">
                      <p className="text-[9px] text-[#A1A1AA] uppercase tracking-widest mb-2 block">{order.paymentMethod} • {order.items.length} ITENS</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                          {order.items.map((item, idx) => (
                              <span key={idx} className="text-[9px] uppercase tracking-wider text-[#A1A1AA] bg-[#1A1A1A] border border-[#262626] px-2 py-1 truncate max-w-full" title={`${item.product.name}`}>
                                  {item.quantity}x {item.product.name.split(' ')[0]} {item.product.name.split(' ')[1] || ''}
                              </span>
                          ))}
                      </div>
                    </div>
                    
                    <div className="col-span-1 hidden sm:block text-sm font-light text-white">
                        {formatPrice(order.total)}
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <span className="px-3 py-1 bg-[#151515] border border-[#262626] text-white text-[9px] uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
