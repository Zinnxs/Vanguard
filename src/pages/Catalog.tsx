import React, { useState, useMemo } from 'react';
import { mockProducts } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    mockProducts.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.categories.includes(selectedCategory) : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row gap-12 w-full max-w-7xl mx-auto">
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 space-y-10">
          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-4 block md:hidden">Filtros</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
              <input
                type="text"
                placeholder="BUSCAR PRODUTOS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#151515] border border-[#262626] text-[10px] uppercase tracking-widest text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>
              
          <div className="hidden md:block">
            <h3 className="text-[10px] uppercase tracking-widest text-[#A1A1AA] mb-4">Categorias</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-[11px] uppercase tracking-wider w-full text-left transition-colors ${
                    selectedCategory === null ? 'text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  Todos
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`text-[11px] uppercase tracking-wider w-full text-left transition-colors ${
                      selectedCategory === category ? 'text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
              
          <div className="md:hidden overflow-x-auto pb-2 flex gap-3 no-scrollbar">
              <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2 border whitespace-nowrap text-[10px] uppercase tracking-widest transition-colors ${
                    selectedCategory === null ? 'bg-white text-black border-white' : 'bg-[#151515] text-[#A1A1AA] border-[#262626]'
                  }`}
                >
                  Todos
              </button>
              {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 border whitespace-nowrap text-[10px] uppercase tracking-widest transition-colors ${
                      selectedCategory === category ? 'bg-white text-black border-white' : 'bg-[#151515] text-[#A1A1AA] border-[#262626]'
                    }`}
                  >
                    {category}
                </button>
              ))}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between border-b border-[#262626] pb-4">
          <h1 className="text-2xl font-serif tracking-tight text-white uppercase">CATÁLOGO</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#A1A1AA]">{filteredProducts.length} produtos</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-[#262626] bg-[#0E0E0E]">
            <p className="text-[#A1A1AA] text-sm uppercase tracking-widest">Nenhum produto encontrado com os filtros atuais.</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory(null);
              }}
              className="mt-6 text-white text-[10px] uppercase tracking-widest border-b border-white hover:opacity-70 transition-opacity"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
