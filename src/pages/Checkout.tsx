import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context';
import { formatPrice, cn } from '../lib/utils';
import { CreditCard, QrCode, CheckCircle2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder, currentUser } = useStore();
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix'>('pix');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    cpf: '',
    address: '',
    ccNumber: '',
    ccName: '',
    ccExpiry: '',
    ccCvc: ''
  });

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderId = `LUM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      addOrder({
        id: orderId,
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
        customer: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          address: formData.address,
        },
        items: [...cart],
        total: subtotal,
        status: 'Pago',
        paymentMethod: paymentMethod === 'pix' ? 'PIX' : 'Cartão'
      });
      
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => navigate('/'), 3000);
    }, 1500);
  };

  if (cart.length === 0 && !isSuccess) {
    navigate('/carrinho');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-8 opacity-80" />
        <h1 className="text-3xl font-serif tracking-tight mb-4 text-white uppercase">Transação Aprovada</h1>
        <p className="text-sm text-[#A1A1AA] max-w-md mx-auto mb-8 font-light leading-relaxed">
          Obrigado, {formData.name.split(' ')[0]}. Seu pedido foi processado com sucesso.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#555]">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-0 sm:px-4 lg:px-8">
      <h1 className="text-2xl font-serif tracking-tight text-white mb-10 hidden lg:block uppercase border-b border-[#262626] pb-4">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row-reverse gap-12 w-full">
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 h-fit">
          <div className="bg-[#0D0D0D] border border-[#262626] p-6 lg:p-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6 flex justify-between">
               Resumo <span className="opacity-40">{cart.length} ITENS</span>
            </h3>
            
            <ul className="divide-y divide-[#262626]">
              {cart.map((item) => (
                <li key={item.cartItemId} className="py-4 flex gap-4">
                  <div className="w-12 h-16 bg-[#1A1A1A] border border-[#262626] shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover mix-blend-luminosity grayscale" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-xs font-medium text-white line-clamp-1 uppercase tracking-wider">{item.product.name}</p>
                    <p className="text-[10px] text-[#A1A1AA] mt-1 uppercase tracking-wider">
                      {item.color} • {item.size} <span className="text-[#555]">x{item.quantity}</span>
                    </p>
                  </div>
                  <div className="text-xs font-light text-white mt-auto mb-auto">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-[#262626] mt-6 pt-6 space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">Subtotal</span>
                 <span className="text-sm text-white">{formatPrice(subtotal)}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">Frete</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Cortesia</span>
               </div>
               <div className="flex justify-between items-center border-t border-[#262626] pt-4 text-base font-light text-white">
                 <span className="text-[11px] font-bold uppercase tracking-widest">Total</span>
                 <span>{formatPrice(subtotal)}</span>
               </div>
            </div>
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="flex-1 lg:max-w-2xl text-white">
          <form onSubmit={handleCheckout} className="space-y-12">
            {/* Customer info */}
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Nome Completo</label>
                  <input required type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">E-mail</label>
                  <input required type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">CPF</label>
                  <input required type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleInputChange} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Endereço Completo</label>
                  <input required type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm" />
                </div>
              </div>
            </div>

            <hr className="border-[#262626]" />
            
            {/* Payment Method */}
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                Pagamento
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 border transition-all text-[#A1A1AA]",
                    paymentMethod === 'pix' ? "border-white text-white bg-[#1A1A1A]" : "border-[#262626] hover:border-gray-500 bg-[#0A0A0A]"
                  )}
                >
                  <QrCode className="h-6 w-6 mb-3" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">PIX</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 border transition-all text-[#A1A1AA]",
                    paymentMethod === 'credit_card' ? "border-white text-white bg-[#1A1A1A]" : "border-[#262626] hover:border-gray-500 bg-[#0A0A0A]"
                  )}
                >
                  <CreditCard className="h-6 w-6 mb-3" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Cartão</span>
                </button>
              </div>

              {/* Dynamic Payment Body */}
              <div className="mt-8">
                {paymentMethod === 'pix' ? (
                  <div className="bg-[#0E0E0E] border border-[#262626] p-8 flex flex-col items-center text-center">
                    <div className="p-4 bg-white mb-6">
                       <img 
                         src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                         alt="QR Code" 
                         className="w-32 h-32" 
                       />
                    </div>
                    <strong className="text-lg font-light text-white mb-2 uppercase tracking-widest">Via PIX</strong>
                    <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-8 max-w-sm leading-relaxed">Escaneie o código para concluir a transferência de forma segura.</p>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={cn(
                        "w-full sm:w-auto px-8 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all",
                        isProcessing && "opacity-50 cursor-wait"
                      )}
                    >
                      {isProcessing ? "Processando..." : "Testar Aprovação PIX"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 bg-[#0E0E0E] border border-[#262626] p-8">
                    <div>
                      <label htmlFor="ccNumber" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Número do Cartão</label>
                      <input required={paymentMethod === 'credit_card'} type="text" id="ccNumber" name="ccNumber" placeholder="0000 0000 0000 0000" className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm font-mono placeholder:text-[#555]" />
                    </div>
                    <div>
                      <label htmlFor="ccName" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Titular</label>
                      <input required={paymentMethod === 'credit_card'} type="text" id="ccName" name="ccName" className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm placeholder:text-[#555]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="ccExpiry" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">Validade</label>
                        <input required={paymentMethod === 'credit_card'} type="text" id="ccExpiry" name="ccExpiry" placeholder="MM/AA" className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm font-mono placeholder:text-[#555]" />
                      </div>
                      <div>
                        <label htmlFor="ccCvc" className="block text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-2">CVC</label>
                        <input required={paymentMethod === 'credit_card'} type="text" id="ccCvc" name="ccCvc" placeholder="123" className="block w-full bg-[#151515] border border-[#262626] text-white px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm font-mono placeholder:text-[#555]" />
                      </div>
                    </div>
                    <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={cn(
                            "w-full px-8 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all",
                            isProcessing && "opacity-50 cursor-wait"
                          )}
                        >
                          {isProcessing ? "Processando..." : `Liquidar ${formatPrice(subtotal)}`}
                        </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
