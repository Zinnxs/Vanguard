import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mockProducts } from '../data';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="flex flex-col gap-24 w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border border-[#262626] bg-[#0E0E0E] px-6 py-24 sm:px-12 sm:py-32 lg:px-16 mx-auto w-full max-w-6xl text-center rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-luminosity"></div>
        <div className="relative z-20 mx-auto max-w-2xl text-white flex flex-col items-center">
          <p className="text-[#A1A1AA] text-[10px] uppercase tracking-[0.3em] mb-4">Nova Coleção</p>
          <h1 className="text-4xl sm:text-6xl font-serif mb-6 leading-tight font-light">LUMINA ETA<br/>WINTER 26</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA] font-light max-w-md mx-auto">
            Descubra as novas tendências de moda para a temporada. Peças selecionadas para você se destacar com conforto e elegância em qualquer ocasião.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/catalogo"
              className="bg-white text-black px-8 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              Comprar Agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-8 border-b border-[#262626] pb-4">
          <h2 className="text-[12px] font-medium tracking-[0.2em] uppercase text-white">Nossas Peças</h2>
          <Link to="/catalogo" className="text-[10px] uppercase tracking-widest text-[#A1A1AA] hover:text-white flex items-center gap-1">
            Ver tudo <ArrowRight className="h-3 w-3"/>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Category Callouts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 w-full">
        <div className="relative h-96 border border-[#262626] bg-[#1A1A1A] group cursor-pointer overflow-hidden rounded-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
          <img src="https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&w=800&q=80" alt="Masculino" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity" />
          <div className="relative z-20 flex flex-col justify-end h-full p-10">
            <h3 className="text-3xl font-serif text-white">Inverno</h3>
            <Link to="/catalogo" className="mt-4 text-[#A1A1AA] hover:text-white flex items-center gap-2 font-medium text-[10px] uppercase tracking-[0.2em] transition-colors">Explorar Coleção <ArrowRight className="h-4 w-4"/></Link>
          </div>
        </div>
        <div className="relative h-96 border border-[#262626] bg-[#1A1A1A] group cursor-pointer overflow-hidden rounded-sm">
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" alt="Acessórios" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity" />
          <div className="relative z-20 flex flex-col justify-end h-full p-10">
            <h3 className="text-3xl font-serif text-white">Leveza</h3>
            <Link to="/catalogo" className="mt-4 text-[#A1A1AA] hover:text-white flex items-center gap-2 font-medium text-[10px] uppercase tracking-[0.2em] transition-colors">Explorar Coleção <ArrowRight className="h-4 w-4"/></Link>
          </div>
        </div>
      </section>
    </div>
  );
};
