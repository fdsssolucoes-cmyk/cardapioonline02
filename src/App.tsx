import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CustomerMenu } from './components/CustomerMenu';
import { OffersSection } from './components/OffersSection';
import { WhatsAppHub } from './components/WhatsAppHub';
import { OperationalGuide } from './components/OperationalGuide';
import { CatalogExport } from './components/CatalogExport';
import { PricingSimulator } from './components/PricingSimulator';
import { QRCodePoster } from './components/QRCodePoster';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { MenuItem } from './data/menuData';
import { ShoppingBag, Flame, Utensils, Tag, MessageSquare, ClipboardList, Table, Calculator, QrCode } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'menu' | 'offers' | 'whatsapp' | 'operational' | 'catalog' | 'pricing' | 'qrcode'
  >('menu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Business settings (persisted in localStorage for convenience)
  const [businessName, setBusinessName] = useState(() => {
    return localStorage.getItem('bp_biz_name') || 'Espetinho Brasa & Ponto';
  });
  const [businessPhone, setBusinessPhone] = useState(() => {
    return localStorage.getItem('bp_biz_phone') || '11999998888';
  });
  const [pixKey, setPixKey] = useState(() => {
    return localStorage.getItem('bp_biz_pix') || '11999998888';
  });

  const handleUpdateBusinessConfig = (name: string, phone: string, pix: string) => {
    setBusinessName(name);
    setBusinessPhone(phone);
    setPixKey(pix);
    localStorage.setItem('bp_biz_name', name);
    localStorage.setItem('bp_biz_phone', phone);
    localStorage.setItem('bp_biz_pix', pix);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, doneness: 'Ao Ponto' }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleUpdateItemDetails = (itemId: string, doneness?: string, itemNotes?: string) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.item.id === itemId
          ? {
              ...ci,
              doneness: doneness ?? ci.doneness,
              itemNotes: itemNotes ?? ci.itemNotes,
            }
          : ci
      )
    );
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const cartItemCounts = cartItems.reduce<Record<string, number>>((acc, ci) => {
    acc[ci.item.id] = ci.quantity;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Primary Top Bar Contract Header */}
      <Header
        activeTab={activeTab === 'qrcode' || activeTab === 'pricing' ? 'operational' : activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Sub-Header Navigation Bar / Segmented Toolbar */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 sticky top-[57px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none text-xs font-medium">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'menu'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Cardápio Digital</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'offers'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Combos & Ofertas</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Divulgação no WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tabela p/ Cadastro</span>
            </button>

            <button
              onClick={() => setActiveTab('operational')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'operational'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Guia Operacional</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'pricing'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador de Margem</span>
            </button>

            <button
              onClick={() => setActiveTab('qrcode')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                activeTab === 'qrcode'
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Cartaz QR Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'menu' && (
          <CustomerMenu
            onAddToCart={handleAddToCart}
            cartItemCounts={cartItemCounts}
            onNavigateToOffers={() => setActiveTab('offers')}
          />
        )}

        {activeTab === 'offers' && (
          <OffersSection onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'whatsapp' && (
          <WhatsAppHub
            businessName={businessName}
            businessPhone={businessPhone}
            pixKey={pixKey}
            onUpdateBusinessConfig={handleUpdateBusinessConfig}
          />
        )}

        {activeTab === 'catalog' && <CatalogExport />}

        {activeTab === 'operational' && <OperationalGuide />}

        {activeTab === 'pricing' && <PricingSimulator />}

        {activeTab === 'qrcode' && (
          <QRCodePoster
            businessName={businessName}
            businessPhone={businessPhone}
            pixKey={pixKey}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onUpdateItemDetails={handleUpdateItemDetails}
        businessPhone={businessPhone}
      />

      {/* Floating Bottom Cart Bar on Mobile when items in cart (Max 15% height) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold p-3.5 rounded-xl shadow-2xl flex items-center justify-between transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-neutral-950 text-amber-300 text-xs flex items-center justify-center font-bold">
                {totalCartCount}
              </span>
              <span className="text-sm">Ver Sacola de Pedidos</span>
            </div>
            <span className="text-sm font-display font-extrabold">
              Abrir Pedido →
            </span>
          </button>
        </div>
      )}

      {/* Quiet, Professional Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 px-4 sm:px-6 mt-16 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-neutral-400 font-display">
              {businessName || 'Brasa & Ponto'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Cardápio Digital & Marketing Gastronômico</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <button
              onClick={() => setActiveTab('menu')}
              className="hover:text-white transition-colors"
            >
              Cardápio
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className="hover:text-white transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={() => setActiveTab('operational')}
              className="hover:text-white transition-colors"
            >
              Guia Operacional
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
