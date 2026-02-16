
import React, { useState } from 'react';
import { Product, ProductUnit, ProductStatus } from '../types';
import { ICONS, INITIAL_CATEGORIES, UNITS } from '../constants';

interface AdminPanelProps {
  products: Product[];
  onAdd: (p: Omit<Product, 'id' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<Product>) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ sku: '', internalCode: '', name: '', description: '', category: INITIAL_CATEGORIES[0], stock: 0, unit: ProductUnit.UN, conversionFactor: 0, status: ProductStatus.ACTIVE, imageUrl: '' });

  const handleEdit = (p: Product) => {
    setEditing(p);
    setFormData({ ...p, internalCode: p.internalCode || '', conversionFactor: p.conversionFactor || 0, imageUrl: p.imageUrl || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...formData, conversionFactor: formData.conversionFactor > 0 ? formData.conversionFactor : undefined };
    editing ? onUpdate(editing.id, data) : onAdd(data);
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-black italic text-ativa-400 uppercase">Estoque Ativa</h2>
        <button onClick={() => { setEditing(null); setIsModalOpen(true); }} className="bg-ativa-400 text-white p-3 rounded-2xl shadow-lg">{ICONS.Plus}</button>
      </div>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-3xl border border-gray-50 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-ativa-50 rounded-xl flex items-center justify-center text-ativa-400">
                {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover rounded-xl" /> : ICONS.Package}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold truncate">{p.name}</h4>
                <p className="text-[10px] text-gray-400 uppercase font-black">{p.category} • {p.stock} {p.unit}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => handleEdit(p)} className="p-2 text-ativa-400">{ICONS.Edit}</button>
              <button onClick={() => confirm('Excluir?') && onDelete(p.id)} className="p-2 text-red-200 hover:text-red-400">{ICONS.Trash}</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-black text-ativa-400 italic uppercase">{editing ? 'Editar' : 'Novo'} Suprimento</h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <input type="text" placeholder="Nome do Produto" required className="w-full p-4 bg-gray-50 rounded-2xl text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 ml-1 uppercase">Categoria</label>
                <select className="w-full p-3 bg-gray-50 rounded-xl text-xs" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {INITIAL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 ml-1 uppercase">Fator (Litros)</label>
                <input type="number" step="0.1" className="w-full p-3 bg-gray-50 rounded-xl text-xs" value={formData.conversionFactor} onChange={e => setFormData({...formData, conversionFactor: parseFloat(e.target.value) || 0})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Estoque" required className="p-4 bg-gray-50 rounded-2xl text-sm" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
              <select className="p-4 bg-gray-50 rounded-2xl text-sm" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value as ProductUnit})}>
                {UNITS.map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
              </select>
            </div>

            <button type="submit" className="w-full bg-ativa-400 text-white font-black italic py-4 rounded-2xl shadow-xl uppercase tracking-widest active:scale-95 transition-all">Salvar Alterações</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
