
import React from 'react';
import { CartItem, User } from '../types';
import { ICONS } from '../constants';

interface CartViewProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onFinalize: () => void;
  onClear: () => void;
  currentUser: User;
  isProcessing?: boolean;
}

const CartView: React.FC<CartViewProps> = ({ cart, onRemove, onFinalize, onClear, currentUser, isProcessing }) => {
  const isEmpty = cart.length === 0;

  if (isEmpty) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 space-y-6">
        <div className="bg-gray-100 p-8 rounded-[3rem] text-gray-200">
          {React.cloneElement(ICONS.Cart as React.ReactElement, { size: 80 })}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-gray-800 italic uppercase">Seu Pedido está Vazio</h2>
          <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-[0.2em]">
            Explore o Galinheiro e selecione itens
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col h-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-ativa-400 font-black italic text-2xl uppercase leading-none">Checkout</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Confirmação de Requisição</p>
        </div>
        <button 
          onClick={onClear}
          disabled={isProcessing}
          className="p-2 text-gray-300 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          {ICONS.Trash}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 border border-gray-50 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-ativa-50 rounded-2xl flex items-center justify-center text-ativa-400">
            {ICONS.User}
          </div>
          <div>
            <span className="block text-[8px] font-black text-gray-300 uppercase tracking-widest italic">Solicitante Responsável</span>
            <span className="text-sm font-bold text-gray-800">{currentUser.name}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 hide-scrollbar">
        {cart.map(item => (
          <div key={item.productId} className="bg-white p-4 rounded-3xl border border-gray-50 shadow-sm flex justify-between items-center group transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-ativa-400 overflow-hidden">
                {item.product.imageUrl ? (
                  <img src={item.product.imageUrl} className="w-full h-full object-cover" />
                ) : (
                  ICONS.Package
                )}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-800 truncate">{item.product.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-black text-ativa-400 uppercase italic">
                    {item.quantity} {item.product.unit}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onRemove(item.productId)}
              disabled={isProcessing}
              className="p-2 text-gray-100 hover:text-red-400 transition-colors bg-gray-50 rounded-xl"
            >
              {ICONS.Trash}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-ativa-400 p-8 rounded-[3.5rem] text-white space-y-6 shadow-2xl shadow-ativa-100 relative overflow-hidden">
        {/* Decorativo */}
        <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
          {React.cloneElement(ICONS.Cart as React.ReactElement, { size: 120 })}
        </div>

        <div className="flex justify-between items-center border-b border-white/20 pb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest italic opacity-80">Volume Total</span>
            <p className="text-xs font-bold text-ativa-50">Itens na requisição</p>
          </div>
          <span className="text-4xl font-black italic">{cart.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
        </div>
        
        <button 
          onClick={onFinalize}
          disabled={isProcessing}
          className={`w-full bg-white text-ativa-400 font-black py-5 rounded-[2rem] hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest shadow-xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <>
              {ICONS.Loading}
              Processando...
            </>
          ) : (
            <>
              Finalizar no WhatsApp
              <div className="bg-ativa-400 text-white p-1 rounded-full">
                {ICONS.Smartphone}
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartView;
