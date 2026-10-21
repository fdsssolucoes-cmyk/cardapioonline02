import React, { useState } from 'react';
import { Download, Copy, Check, Filter, Search, FileSpreadsheet, Sparkles, ExternalLink } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '../data/menuData';
import { formatCurrency } from '../utils/format';

export const CatalogExport: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedType, setCopiedType] = useState<'text' | 'json' | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = filterCategory === 'todos' || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadCSV = () => {
    const headers = ['Categoria', 'Nome do Produto', 'Preço (R$)', 'Custo Est. (R$)', 'Margem (%)', 'Descrição Persuasiva', 'Porção'];
    const rows = filteredItems.map((item) => {
      const margin = (((item.price - item.costEstimate) / item.price) * 100).toFixed(1);
      return [
        `"${item.categoryLabel}"`,
        `"${item.name}"`,
        `"${item.price.toFixed(2)}"`,
        `"${item.costEstimate.toFixed(2)}"`,
        `"${margin}%"`,
        `"${item.description.replace(/"/g, '""')}"`,
        `"${item.portionNote || ''}"`,
      ].join(';');
    });

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'cardapio_espetinho_cadastro.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyFormattedText = async () => {
    let output = `📋 *CATÁLOGO OFICIAL DE PRODUTOS E PREÇOS*\n`;
    output += `_Formato para cadastro e envio rápido_\n\n`;

    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach((it) => {
      if (!groups[it.categoryLabel]) groups[it.categoryLabel] = [];
      groups[it.categoryLabel].push(it);
    });

    Object.entries(groups).forEach(([catTitle, items]) => {
      output += `▪️ *${catTitle.toUpperCase()}*\n`;
      items.forEach((item) => {
        output += `• *${item.name}* - ${formatCurrency(item.price)}\n`;
        output += `  _${item.description}_\n`;
        if (item.portionNote) output += `  (Porção: ${item.portionNote})\n`;
      });
      output += `\n`;
    });

    try {
      await navigator.clipboard.writeText(output);
      setCopiedType('text');
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyJSON = async () => {
    const jsonStr = JSON.stringify(
      filteredItems.map((item) => ({
        categoria: item.categoryLabel,
        nome: item.name,
        preco: item.price,
        custo_estimado: item.costEstimate,
        descricao: item.description,
        porcao: item.portionNote || '',
      })),
      null,
      2
    );

    try {
      await navigator.clipboard.writeText(jsonStr);
      setCopiedType('json');
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <span>Pronto para Cadastro</span>
          <span aria-hidden="true">·</span>
          <span>WhatsApp Business</span>
          <span aria-hidden="true">·</span>
          <span>Plataformas Digitais</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
          Tabela Formatada para Cadastro em Plataformas Digitais
        </h1>
        <p className="text-sm text-neutral-400 max-w-3xl">
          Todos os produtos organizados por categoria, com preços de venda, estimativa de custo, margem e descrições apetitosas prontas para copiar ou exportar em CSV para qualquer cardápio digital (como o Catálogo Grátis do WhatsApp Business, OlaClick, Kyte ou Cardápio Web).
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800">
        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Filtrar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-200 focus:outline-none focus:border-amber-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyFormattedText}
            className="px-3 py-1.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-xs font-medium text-neutral-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            {copiedType === 'text' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Texto Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Texto Formatado</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Planilha CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Descrição Persuasiva</th>
                <th className="py-3 px-4 text-right">Preço Venda</th>
                <th className="py-3 px-4 text-right">Custo Est.</th>
                <th className="py-3 px-4 text-right">Margem Bruta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredItems.map((item) => {
                const marginPercent = ((item.price - item.costEstimate) / item.price) * 100;

                return (
                  <tr key={item.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-amber-400/90">
                      {item.categoryLabel}
                    </td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      {item.name}
                      {item.portionNote && (
                        <span className="block text-[11px] font-normal text-neutral-500">
                          {item.portionNote}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-neutral-300 max-w-md leading-relaxed">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white tabular-nums whitespace-nowrap">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right text-neutral-400 tabular-nums whitespace-nowrap">
                      {formatCurrency(item.costEstimate)}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums whitespace-nowrap">
                      <span className="font-semibold text-emerald-400">
                        {marginPercent.toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer Count */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <span>
            Mostrando <strong>{filteredItems.length}</strong> produtos
          </span>
          <span className="text-neutral-500">
            Formato pronto para cadastro manual ou importação direta
          </span>
        </div>
      </div>

      {/* Guide: How to register into WhatsApp Business Catalog (100% Free) */}
      <section className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
        <h3 className="text-base font-bold text-white font-display">
          💡 Como Cadastrar estes Produtos no Catálogo Grátis do WhatsApp Business
        </h3>
        <p className="text-xs text-neutral-400">
          Você não precisa pagar R$ 150/mês por plataformas terceiras. O Catálogo do WhatsApp Business é 100% gratuito e já fica disponível dentro do aplicativo do seu cliente:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1.5 text-xs">
            <span className="text-amber-400 font-bold">Passo 1</span>
            <p className="text-neutral-300">Abra o WhatsApp Business &gt; toque nos 3 pontinhos &gt; <strong>Ferramentas Comerciais</strong> &gt; <strong>Catálogo</strong>.</p>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1.5 text-xs">
            <span className="text-amber-400 font-bold">Passo 2</span>
            <p className="text-neutral-300">Toque em <strong>Adicionar Novo Item</strong> e tire uma foto caprichada do seu espetinho dourando na grelha.</p>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1.5 text-xs">
            <span className="text-amber-400 font-bold">Passo 3</span>
            <p className="text-neutral-300">Cole o <strong>Nome</strong>, o <strong>Preço</strong> e a <strong>Descrição Persuasiva</strong> copiados desta tabela.</p>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1.5 text-xs">
            <span className="text-amber-400 font-bold">Passo 4</span>
            <p className="text-neutral-300">Crie <strong>Coleções</strong> com os mesmos nomes das categorias: <em>Tradicionais, Especiais, Combos, Acompanhamentos e Bebidas</em>.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
