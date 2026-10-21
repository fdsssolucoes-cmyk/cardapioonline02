import React from 'react';
import { ShoppingBag, Flame } from 'lucide-react';

interface HeaderProps {
  activeTab: 'menu' | 'offers' | 'whatsapp' | 'operational' | 'catalog' | 'pricing';
  onNavigate: (tab: 'menu' | 'offers' | 'whatsapp' | 'operational' | 'catalog' | 'pricing') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('menu')}
          className="flex items-center gap-2 text-left group transition-opacity hover:opacity-90"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center text-neutral-950 shadow-inner shrink-0">
            <Flame className="w-5 h-5 fill-neutral-950 stroke-neutral-950" />
          </span>
          <span className="text-xl font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0">
            Brasa & Ponto
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => onNavigate('menu')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'menu' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
            }`}
          >
            Cardápio
          </button>
          <button
            onClick={() => onNavigate('offers')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'offers' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
            }`}
          >
            Combos & Ofertas
          </button>
          <button
            onClick={() => onNavigate('whatsapp')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'whatsapp' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
            }`}
          >
            Divulgação WhatsApp
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'catalog' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
            }`}
          >
            Tabela p/ Cadastro
          </button>
          <button
            onClick={() => onNavigate('operational')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'operational' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
            }`}
          >
            Guia Operacional
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="Abrir sacola de pedidos"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Sacola</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-neutral-950 text-amber-300 rounded font-bold text-[11px] tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
