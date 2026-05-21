import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Link to={`/produto/${product.id}`} className="group relative block overflow-hidden bg-[#0A0A0A] transition-all">
      <div className="aspect-[3/4] w-full overflow-hidden bg-[#1A1A1A] border border-[#262626] rounded-sm relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
        />
      </div>
      <div className="pt-4 flex flex-col gap-1">
        <h3 className="text-xs font-medium text-[#F3F4F6] uppercase tracking-wider truncate">{product.name}</h3>
        <p className="text-[10px] text-[#A1A1AA] uppercase tracking-widest line-clamp-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-light text-white">{formatPrice(product.price)}</p>
          <span className="text-[#A1A1AA] group-hover:text-white transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};
