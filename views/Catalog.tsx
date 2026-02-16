
import React, { useState, useMemo } from 'react';
import { Product, CartItem, ProductStatus } from '../types';
import { ICONS, INITIAL_CATEGORIES } from '../constants';

interface CatalogProps {
  products: Product[];
  onAddToCart: (p: Product, q: number) => void;
  cartItems: CartItem[];
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart, cartItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tudo');

  const filtered = useMemo(() => products.filter(p => {
    const match = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.internalCode?.includes(searchTerm);
    return match && (activeCategory === 'Tudo' || p.category === activeCategory) && p.status === ProductStatus.ACTIVE;
  }), [products, searchTerm, activeCategory]);

  return (
    <div className="p-4 space-y-6 animate-in fade-in">
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">{ICONS.Search}</span>
          <input type="text" placeholder="Buscar no estoque..." className="w-full pl-12 pr-4 py-4 bg-white border border-gray-50 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-ativa-400/20" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['Tudo', ...INITIAL_CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat ? 'bg-ativa-400 border-ativa-400 text-white shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-3xl p-4 border border-gray-50 shadow-sm flex gap-4 items-center">
            <div className="w-20 h-20 bg-ativa-50 rounded-2xl flex items-center justify-center text-ativa-400 flex-shrink-0">
              {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover rounded-2xl" /> : ICONS.Package}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm truncate">{p.name}</h3>
              <div className="flex gap-1.5 mt-1">
                <span className="text-[8px] font-black bg-ativa-400 text-white px-2 py-0.5 rounded-full uppercase">ID #{p.internalCode || '---'}</span>
                {p.conversionFactor && <span className="text-[8px] font-black text-ativa-400 bg-ativa-50 px-2 py-0.5 rounded-full uppercase italic">{p.conversionFactor}L / {p.unit}</span>}
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="text-[11px] font-black italic text-gray-900">
                  {p.stock} {p.unit.toUpperCase()} 
                  {p.conversionFactor && <span className="ml-1 text-gray-400">({(p.stock * p.conversionFactor).toFixed(1)}L)</span>}
                </div>
                <button 
                  onClick={() => onAddToCart(p, 1)} 
                  disabled={p.stock <= 0}
                  className={`p-2.5 rounded-xl transition-all ${cartItems.some(i => i.productId === p.id) ? 'bg-green-500 text-white' : 'bg-ativa-400 text-white shadow-lg shadow-ativa-100 active:scale-90'}`}
                >
                  {cartItems.some(i => i.productId === p.id) ? ICONS.Check : ICONS.Plus}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
