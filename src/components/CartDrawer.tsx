import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Check, Phone, MapPin, CreditCard, Banknote, QrCode } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { formatCurrency, generateWhatsAppMessage } from '../utils/format';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  doneness?: string;
  itemNotes?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onUpdateItemDetails: (id: string, doneness?: string, itemNotes?: string) => void;
  businessPhone: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onUpdateItemDetails,
  businessPhone,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix');
  const [changeFor, setChangeFor] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  if (!isOpen) return null;

  const total = items.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0);

  const handleSendWhatsApp = () => {
    const formattedMessage = generateWhatsAppMessage(
      businessPhone,
      customerName,
      deliveryType,
      address,
      paymentMethod,
      changeFor,
      generalNotes,
      items.map(i => ({
        name: i.item.name,
        quantity: i.quantity,
        price: i.item.price,
        doneness: i.doneness,
        itemNotes: i.itemNotes,
      })),
      total
    );

    const cleanPhone = businessPhone.replace(/\D/g, '');
    const encoded = encodeURIComponent(formattedMessage);
    const url = cleanPhone.length >= 10
      ? `https://wa.me/55${cleanPhone}?text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;

    window.open(url, '_blank');
  };

  const handleCopyOrderText = async () => {
    const formattedMessage = generateWhatsAppMessage(
      businessPhone,
      customerName,
      deliveryType,
      address,
      paymentMethod,
      changeFor,
      generalNotes,
      items.map(i => ({
        name: i.item.name,
        quantity: i.quantity,
        price: i.item.price,
        doneness: i.doneness,
        itemNotes: i.itemNotes,
      })),
      total
    );

    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
      <div
        className="w-full max-w-lg bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90">
          <div>
            <h2 className="text-lg font-bold text-white font-display">Sacola de Pedidos</h2>
            <p className="text-xs text-neutral-400">
              {items.length === 0 ? 'Nenhum item selecionado' : `${items.length} ${items.length === 1 ? 'item' : 'itens'} adicionados`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar sacola"
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                <CreditCard className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-base font-semibold text-neutral-300">Sua sacola está vazia</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Explore o cardápio e adicione seus espetinhos, combos e acompanhamentos favoritos para fazer o pedido.
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-1 border-b border-neutral-800">
                  <span>Itens Selecionados</span>
                  <button
                    onClick={onClearCart}
                    className="text-neutral-400 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Limpar</span>
                  </button>
                </div>

                {items.map((cartItem) => {
                  const isSkewer = cartItem.item.category === 'tradicionais' || cartItem.item.category === 'especiais';
                  return (
                    <div
                      key={cartItem.item.id}
                      className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/60 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {cartItem.item.name}
                          </h4>
                          <p className="text-xs text-neutral-400">
                            {formatCurrency(cartItem.item.price)} cada
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="w-7 h-7 rounded-md bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white tabular-nums">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="w-7 h-7 rounded-md bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(cartItem.item.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 transition-colors ml-1"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Meat doneness option for skewers */}
                      {isSkewer && (
                        <div className="flex items-center gap-2 pt-1 text-xs text-neutral-300">
                          <span className="text-neutral-400 text-[11px]">Ponto:</span>
                          {(['Ao Ponto', 'Bem Passado', 'Mal Passado'] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => onUpdateItemDetails(cartItem.item.id, opt, cartItem.itemNotes)}
                              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                                cartItem.doneness === opt
                                  ? 'bg-amber-400 text-neutral-950 font-semibold'
                                  : 'bg-neutral-700/60 text-neutral-300 hover:bg-neutral-700'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Item subtotal */}
                      <div className="text-right text-xs font-semibold text-amber-300 tabular-nums">
                        Subtotal: {formatCurrency(cartItem.item.price * cartItem.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Details Form */}
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Dados para o Pedido
                </h3>

                {/* Delivery Option */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                    Como deseja receber?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('retirada')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        deliveryType === 'retirada'
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Retirar no Balcão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('entrega')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        deliveryType === 'entrega'
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-semibold'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Entrega no Bairro</span>
                    </button>
                  </div>
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full px-3 py-2 text-sm bg-neutral-800/80 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Delivery Address if delivery */}
                {deliveryType === 'entrega' && (
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Endereço de Entrega (Rua, Nº, Bairro e Ponto de Ref.)
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Rua das Flores, 142, Apto 102 - Bairro Centro"
                      className="w-full px-3 py-2 text-sm bg-neutral-800/80 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Pix')}
                      className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                        paymentMethod === 'Pix'
                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Pix (Grátis)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cartão')}
                      className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                        paymentMethod === 'Cartão'
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-semibold'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Cartão</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Dinheiro')}
                      className={`p-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                        paymentMethod === 'Dinheiro'
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-semibold'
                          : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      <Banknote className="w-3.5 h-3.5" />
                      <span>Dinheiro</span>
                    </button>
                  </div>
                </div>

                {/* Change For (if cash) */}
                {paymentMethod === 'Dinheiro' && (
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Precisa de troco para quanto?
                    </label>
                    <input
                      type="text"
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      placeholder="Ex: Troco para R$ 50,00 (ou Sem troco)"
                      className="w-full px-3 py-2 text-sm bg-neutral-800/80 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                )}

                {/* General Observation */}
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Observações do Pedido (Opcional)
                  </label>
                  <input
                    type="text"
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Ex: Mandioca bem quentinha, vinagrete à parte..."
                    className="w-full px-3 py-2 text-sm bg-neutral-800/80 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-950/90 space-y-3">
            <div className="flex items-center justify-between text-base font-bold text-white">
              <span>Total Estimado:</span>
              <span className="text-xl text-amber-400 font-display tabular-nums">
                {formatCurrency(total)}
              </span>
            </div>

            <div className="text-[11px] text-neutral-400">
              ⚡ Pedido enviado direto para o WhatsApp do espetinho sem taxas de aplicativos intermediários.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleCopyOrderText}
                className="w-full py-2.5 px-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Texto Copiado!</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Copiar Texto</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Enviar no WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
