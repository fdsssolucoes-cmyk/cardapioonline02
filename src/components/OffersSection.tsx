import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, TrendingUp, Users, Calendar } from 'lucide-react';
import { ECONOMIC_COMBOS, SPECIAL_OFFERS, MenuItem } from '../data/menuData';
import { formatCurrency } from '../utils/format';

interface OffersSectionProps {
  onAddToCart: (item: MenuItem) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onAddToCart }) => {
  const [copiedOfferIndex, setCopiedOfferIndex] = useState<number | null>(null);

  const handleCopyCopyText = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedOfferIndex(index);
      setTimeout(() => setCopiedOfferIndex(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <span>Marketing Gastronômico</span>
          <span aria-hidden="true">·</span>
          <span>Estratégia de Alta Conversão</span>
          <span aria-hidden="true">·</span>
          <span>Ticket Médio Elevado</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
          Combos Econômicos & Seção de Ofertas
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Estratégias testadas para pequenos espetinhos: combinam acompanhamentos de baixo custo e alta percepção de valor para atrair clientes vizinhos e manter a churrasqueira cheia todos os dias.
        </p>
      </div>

      {/* Part 1: Sugestões de Combos Econômicos com Análise de Margem */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-display">
            1. Sugestões de Combos Econômicos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ECONOMIC_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold">{combo.tag}</span>
                  <span className="text-emerald-400 font-medium tabular-nums">
                    Economia de {formatCurrency(combo.savings)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  {combo.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {combo.subtitle}
                </p>

                {/* Items in Combo */}
                <div className="p-3 bg-neutral-950/70 rounded-lg border border-neutral-800/80 space-y-1.5 text-xs text-neutral-300">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                    Composição do Combo:
                  </div>
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Entrepreneur Advice / Margin Strategy */}
                <div className="text-xs text-neutral-400 space-y-1.5 pt-2">
                  <div className="text-neutral-300 font-medium">🎯 Público-Alvo:</div>
                  <p>{combo.targetAudience}</p>
                  <div className="text-amber-300 font-medium pt-1">💡 Dica de Margem:</div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    {combo.marginAdvice}
                  </p>
                </div>
              </div>

              {/* Price and Action */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 line-through tabular-nums block">
                    {formatCurrency(combo.regularPrice)}
                  </span>
                  <span className="text-xl font-bold text-amber-400 font-display tabular-nums">
                    {formatCurrency(combo.promoPrice)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onAddToCart({
                      id: combo.id,
                      name: combo.title,
                      category: 'combos-1p',
                      categoryLabel: 'Combos Econômicos',
                      price: combo.promoPrice,
                      costEstimate: combo.regularPrice * 0.45,
                      description: combo.items.join(' + '),
                      portionNote: combo.subtitle,
                      badge: combo.tag,
                    })
                  }
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-neutral-950 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Pedir Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 2: Seção de Ofertas Programadas por Dia */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-display">
            2. Seção de Ofertas Semanais (Calendário de Vendas)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((offer, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {offer.day}
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {offer.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {offer.rule}
                </p>

                <div className="p-3 bg-neutral-950/50 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                  <span className="font-semibold text-neutral-300 block">Objetivo Comercial:</span>
                  <span>{offer.objective}</span>
                </div>
              </div>

              {/* Ready Copy for WhatsApp Broadcast */}
              <div className="pt-3 border-t border-neutral-800 space-y-2">
                <div className="text-[11px] font-medium text-neutral-400 flex items-center justify-between">
                  <span>Texto para Disparo no WhatsApp:</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg text-xs text-neutral-300 font-mono leading-relaxed select-all">
                  {offer.copyText}
                </div>
                <button
                  onClick={() => handleCopyCopyText(offer.copyText, idx)}
                  className="w-full py-2 px-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-xs font-medium text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedOfferIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Texto Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto para Enviar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
