import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data';
import { useStore } from '../context';
import { formatPrice, cn } from '../lib/utils';
import { Check, ChevronLeft } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);
  const { addToCart, currentUser } = useStore();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="py-24 text-center border border-[#262626] bg-[#0E0E0E] w-full">
        <h2 className="text-xl font-serif text-white uppercase">Produto não encontrado</h2>
        <Link to="/catalogo" className="text-[#A1A1AA] text-[10px] uppercase tracking-widest hover:text-white mt-6 inline-block border-b border-transparent hover:border-white transition-colors">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    if (!currentUser) {
        navigate('/login', { state: { from: `/produto/${id}` } });
        return;
    }

    addToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isAddDisabled = !selectedSize || !selectedColor;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white transition w-fit"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
      </button>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-[#0E0E0E] border border-[#262626]">
        {/* Images */}
        <div className="relative bg-[#1A1A1A] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#262626] min-h-[40vh] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center opacity-90 transition-opacity hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
          />
          <div className="absolute bottom-8 left-8 flex gap-2 z-20">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-[#A1A1AA] text-[10px] uppercase tracking-[0.3em] mb-4">
            Nova Coleção / {product.categories[0]}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight uppercase text-white">
            {product.name}
          </h1>
          <p className="text-2xl text-white font-light mb-8">{formatPrice(product.price)}</p>

          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-70">Cor</p>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color) => {
                  let bgColor = "#1A1A1A"; 
                  const lcColor = color.toLowerCase();
                  if (lcColor.includes('bran') || lcColor.includes('clar')) bgColor = "#E5E7EB";
                  else if (lcColor.includes('cinz') || lcColor.includes('mescla') || lcColor.includes('chumbo')) bgColor = "#4B5563";
                  else if (lcColor.includes('azul') || lcColor.includes('marin')) bgColor = "#1E3A8A";
                  else if (lcColor.includes('verd') || lcColor.includes('oliv')) bgColor = "#4A4A35"; // Olive/Moss
                  else if (lcColor.includes('amarel')) bgColor = "#D4AF37";
                  else if (lcColor.includes('bord') || lcColor.includes('vinh') || lcColor.includes('vermelh')) bgColor = "#7F1D1D";
                  else if (lcColor.includes('bege') || lcColor.includes('aren')) bgColor = "#D2B48C";

                  return (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full transition-all flex items-center justify-center",
                      selectedColor === color 
                        ? "ring-1 ring-offset-2 ring-offset-[#0E0E0E] ring-white" 
                        : "ring-1 ring-offset-2 ring-offset-[#0E0E0E] ring-transparent hover:ring-[#A1A1AA]"
                    )}
                    style={{ backgroundColor: bgColor }}
                  />
                )})}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-70">Selecione o Tamanho</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-12 h-12 flex items-center justify-center border rounded-full text-xs transition-all uppercase tracking-wider",
                      selectedSize === size
                        ? "border-white bg-white text-black font-medium"
                        : "border-[#262626] text-[#A1A1AA] hover:border-white hover:text-white"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              type="button"
              className={cn(
                "w-full py-5 text-[12px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2",
                isAddDisabled 
                  ? "bg-[#151515] border border-[#262626] text-[#A1A1AA] cursor-not-allowed" 
                  : isAdded ? "bg-[#151515] border border-green-500 text-green-500" : "bg-white text-black hover:bg-neutral-200"
              )}
              disabled={isAddDisabled || isAdded}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Adicionado
                </>
              ) : (
                <>
                  Adicionar ao Carrinho
                </>
              )}
            </button>
          </div>
          
          <div className="border-t border-[#262626] pt-8 mt-auto">
            <h3 className="text-[10px] uppercase tracking-widest mb-3 opacity-50">Descrição do Produto</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed font-light">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
