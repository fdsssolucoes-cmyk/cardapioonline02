import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertCircle, Percent, PieChart } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export const PricingSimulator: React.FC = () => {
  // Simulator inputs
  const [meatKgCost, setMeatKgCost] = useState<number>(36.00); // R$ 36/kg de alcatra/contrafilé
  const [portionWeightGrams, setPortionWeightGrams] = useState<number>(110); // 110g por espeto
  const [packagingAndStickCost, setPackagingAndStickCost] = useState<number>(0.60); // palito, guardanapo, saquinho
  const [charcoalAndSeasoningCost, setCharcoalAndSeasoningCost] = useState<number>(0.70); // carvão + sal/alho/vinagrete
  const [salePrice, setSalePrice] = useState<number>(10.00); // preço de venda sugerido
  const [dailyQuantity, setDailyQuantity] = useState<number>(50); // meta diária de espetos

  // Calculations
  const meatUnitCost = (meatKgCost / 1000) * portionWeightGrams;
  const totalUnitCost = meatUnitCost + packagingAndStickCost + charcoalAndSeasoningCost;
  const unitProfit = salePrice - totalUnitCost;
  const marginPercent = salePrice > 0 ? (unitProfit / salePrice) * 100 : 0;
  const markupPercent = totalUnitCost > 0 ? (unitProfit / totalUnitCost) * 100 : 0;

  const dailyRevenue = salePrice * dailyQuantity;
  const dailyCost = totalUnitCost * dailyQuantity;
  const dailyProfit = unitProfit * dailyQuantity;
  const monthlyProfitEst = dailyProfit * 24; // 24 dias de funcionamento por mês

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <span>Ferramenta Financeira</span>
          <span aria-hidden="true">·</span>
          <span>Cálculo de Custo Real</span>
          <span aria-hidden="true">·</span>
          <span>Margem Saudável</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
          Simulador de Precificação & Margem de Lucro
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Ajuste o valor do quilo da carne no açougue da sua região e veja exatamente quanto sobra no seu bolso por cada espetinho vendido.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters Form */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-display">
              Custos de Produção por Espeto
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Preço do Kg da Carne no Açougue (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-semibold">R$</span>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={meatKgCost}
                  onChange={(e) => setMeatKgCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Ex: Alcatra R$ 36 a R$ 42 / Frango R$ 20 a R$ 24
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Gramatura de Carne Crua por Espeto
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="5"
                  min="50"
                  max="200"
                  value={portionWeightGrams}
                  onChange={(e) => setPortionWeightGrams(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500">gramas</span>
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Padrão profissional: 100g a 110g por espeto
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Palito + Saquinho Térmico + Guardanapo (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-semibold">R$</span>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  value={packagingAndStickCost}
                  onChange={(e) => setPackagingAndStickCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Custo de embalagem por unidade
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Rateio Carvão + Sal + Temperos (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-semibold">R$</span>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  value={charcoalAndSeasoningCost}
                  onChange={(e) => setCharcoalAndSeasoningCost(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Média de carvão e especiarias por espetinho
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">
                Preço de Venda do Espetinho (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-semibold">R$</span>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={salePrice}
                  onChange={(e) => setSalePrice(parseFloat(e.target.value) || 0)}
                  className="w-full pl-9 pr-3 py-2 text-base font-bold bg-neutral-950 border border-amber-400/80 rounded-lg text-amber-300 font-mono focus:outline-none"
                />
              </div>
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Preço que o cliente paga no cardápio
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">
                Espetinhos Vendidos por Noite
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="5"
                  min="1"
                  value={dailyQuantity}
                  onChange={(e) => setDailyQuantity(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-base font-bold bg-neutral-950 border border-neutral-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500">espetos</span>
              </div>
              <span className="text-[11px] text-neutral-400 mt-1 block">
                Média esperada de vendas diárias
              </span>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800 text-amber-400">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-base font-bold text-white font-display">
                Resultado Financeiro Unitário
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Custo da Carne (110g):</span>
                <span className="text-white font-mono tabular-nums">{formatCurrency(meatUnitCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">Embalagem + Carvão:</span>
                <span className="text-white font-mono tabular-nums">
                  {formatCurrency(packagingAndStickCost + charcoalAndSeasoningCost)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800/60 font-semibold">
                <span className="text-neutral-300">Custo Total de Produção:</span>
                <span className="text-red-400 font-mono tabular-nums">{formatCurrency(totalUnitCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800/60 font-bold text-sm">
                <span className="text-white">Lucro Bruto por Espeto:</span>
                <span className="text-emerald-400 font-mono tabular-nums">{formatCurrency(unitProfit)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold">
                <span className="text-white">Margem de Lucro Bruta:</span>
                <span className="text-amber-400 font-mono tabular-nums">{marginPercent.toFixed(1)}%</span>
              </div>
            </div>

            {/* Health Indicator */}
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-[11px] leading-relaxed">
              {marginPercent >= 50 ? (
                <span className="text-emerald-400 font-medium">
                  ✅ Margem excelente (&gt;50%). Cobre custos fixos e gera capital de giro saudável para reposição diária.
                </span>
              ) : marginPercent >= 35 ? (
                <span className="text-amber-300 font-medium">
                  ⚠️ Margem moderada (35%–50%). Compense incentivando a venda de combos com farofa e mandioca.
                </span>
              ) : (
                <span className="text-red-400 font-medium">
                  🚨 Margem perigosa (&lt;35%). Negocie carne mais em conta ou ajuste o preço de venda para não ter prejuízo.
                </span>
              )}
            </div>
          </div>

          {/* Monthly Projection */}
          <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
              Projeção Mensal ({dailyQuantity} espetos/dia · 24 dias):
            </span>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Faturamento Bruto:</span>
              <span className="text-white font-mono font-bold tabular-nums">{formatCurrency(dailyRevenue * 24)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-400">Lucro Bruto Estimado:</span>
              <span className="text-emerald-400 font-mono font-bold text-sm tabular-nums">
                {formatCurrency(monthlyProfitEst)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
