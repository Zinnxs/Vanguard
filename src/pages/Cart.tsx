import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context';
import { formatPrice } from '../lib/utils';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="w-full flex justify-center py-24 px-4 bg-[#0E0E0E] border border-[#262626]">
        <div className="text-center max-w-md flex flex-col items-center">
          <div className="w-16 h-16 border border-[#262626] rounded-full flex items-center justify-center mb-6 text-[#A1A1AA] bg-[#151515]">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-serif mb-4 text-white uppercase">Seu carrinho está vazio</h2>
          <p className="text-xs text-[#A1A1AA] mb-8 font-light uppercase tracking-widest">Nenhum item selecionado.</p>
          <Link
            to="/catalogo"
            className="flex items-center justify-center bg-white text-black px-8 py-4 text-[11px] font-bold tracking-widest uppercase transition-opacity hover:opacity-90 w-full"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-0 sm:px-6">
      <h1 className="text-3xl font-serif tracking-tight text-white mb-10 uppercase">CARRINHO</h1>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 border-t border-[#262626] pt-10">
        <section className="lg:col-span-7">
          <ul role="list" className="divide-y divide-[#262626]">
            {cart.map((item) => (
              <li key={item.cartItemId} className="flex py-8 items-center flex-col sm:flex-row gap-6">
                <div className="shrink-0 rounded-sm border border-[#262626] overflow-hidden w-24 h-32 sm:w-32 sm:h-40 bg-[#1A1A1A]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center mix-blend-luminosity"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between w-full h-full py-2">
                  <div className="relative flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white uppercase tracking-wider max-w-[200px] truncate">
                        <Link to={`/produto/${item.product.id}`}>{item.product.name}</Link>
                      </h3>
                      <p className="mt-2 text-[10px] text-[#A1A1AA] uppercase tracking-widest">
                        Tam. {item.size} • {item.color}
                      </p>
                    </div>
                    <p className="text-sm font-light text-white ml-4">{formatPrice(item.product.price)}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-[#262626] rounded-sm bg-[#151515]">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-2 text-[#A1A1AA] hover:text-white transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-[11px] font-medium text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-2 text-[#A1A1AA] hover:text-white transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white flex items-center gap-2 p-2 transition"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="hidden sm:inline">Remover</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section className="mt-16 bg-[#0D0D0D] border border-[#262626] p-6 lg:p-8 lg:col-span-5 lg:mt-0">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white mb-6 flex justify-between">
             Resumo do Pedido <span className="opacity-40">{cart.length} ITENS</span>
          </h3>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">Subtotal</dt>
              <dd className="text-sm text-white">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#262626] pt-4">
              <dt className="flex items-center text-[10px] uppercase tracking-widest text-[#A1A1AA]">Frete Estimado</dt>
              <dd className="text-xs font-medium text-[#D4AF37] uppercase tracking-widest">Cortesia</dd>
            </div>
            <div className="flex items-center justify-between border-t border-[#262626] pt-4">
              <dt className="text-sm font-bold uppercase tracking-widest text-white">Total</dt>
              <dd className="text-xl font-light text-white">{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <Link
              to="/checkout"
              className="flex w-full items-center justify-center bg-white px-6 py-4 text-[11px] font-bold tracking-widest text-black uppercase hover:bg-neutral-200 transition-all gap-2"
            >
              Ir para Checkout
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/catalogo" className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white transition">
              ou continuar comprando
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
