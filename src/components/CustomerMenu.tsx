import React, { useState } from 'react';
import { Search, Flame, Plus, Check, Sparkles, Clock, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, ECONOMIC_COMBOS, MenuItem } from '../data/menuData';
import { formatCurrency } from '../utils/format';

interface CustomerMenuProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemCounts: Record<string, number>;
  onNavigateToOffers: () => void;
}

export const CustomerMenu: React.FC<CustomerMenuProps> = ({
  onAddToCart,
  cartItemCounts,
  onNavigateToOffers,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 1200);
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
        <div className="relative min-h-[380px] sm:min-h-[440px] flex items-end">
          {/* Hero Backdrop Image */}
          <img
            src="/src/assets/images/hero_espetinho_grill_1792502132177.jpg"
            alt="Espetinhos artesanais na brasa viva com carvão em brasa"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-75 scale-102"
          />

          {/* Measured Scrim for WCAG AA Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
            {/* Editorial Metadata (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <span>Espetinho Artesanal</span>
              <span aria-hidden="true">·</span>
              <span>Braseiro Vivo na Hora</span>
              <span aria-hidden="true">·</span>
              <span>Zero Taxas de App</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              A autêntica carne na brasa, feita com respeito e sabor de verdade.
            </h1>

            {/* Mensagem de Boas-Vindas Oficial */}
            <div className="p-4 bg-neutral-900/80 backdrop-blur-md rounded-xl border border-neutral-700/60 text-sm text-neutral-300 leading-relaxed">
              <p className="font-medium text-amber-300 mb-1">
                👋 Bem-vindo ao nosso cantinho do churrasco!
              </p>
              <p>
                Aqui a carne é selecionada, o tempero é caseiro e a brasa está sempre acesa para você.
                Escolha seus espetinhos favoritos, monte seu prato e envie seu pedido direto para o nosso WhatsApp sem burocracia nem taxas ocultas.
              </p>
            </div>

            {/* Quick Operational Highlights */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Assado no carvão vegetal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Preparo rápido: 15–30 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pagamento facilitado no Pix</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Economic Combos Banner */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Sugestões da Casa</span>
              <span aria-hidden="true">·</span>
              <span>Economia Real</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Combos Econômicos em Destaque
            </h2>
          </div>
          <button
            onClick={onNavigateToOffers}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Ver todas as ofertas →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {ECONOMIC_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="p-5 bg-neutral-900/90 rounded-xl border border-neutral-800 hover:border-amber-400/40 transition-colors flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>{combo.tag}</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    Economize {formatCurrency(combo.savings)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {combo.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {combo.subtitle}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-neutral-300">
                  {combo.items.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 line-through tabular-nums block">
                    {formatCurrency(combo.regularPrice)}
                  </span>
                  <span className="text-lg font-bold text-amber-400 font-display tabular-nums">
                    {formatCurrency(combo.promoPrice)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleAdd({
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
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-neutral-950 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Pedir Combo</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="cardapio" className="space-y-6">
        {/* Search & Filter Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>Cardápio Completo</span>
                <span aria-hidden="true">·</span>
                <span>Preços Diretos</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-display">
                Escolha seus Espetinhos & Acompanhamentos
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar espeto, combo, bebida..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-700/80 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Interactive Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-xs'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-neutral-900/50 rounded-xl border border-neutral-800 space-y-2">
            <UtensilsCrossed className="w-8 h-8 mx-auto text-neutral-600" />
            <p className="text-sm font-semibold text-neutral-300">Nenhum produto encontrado</p>
            <p className="text-xs text-neutral-500">
              Tente buscar por outro termo ou selecione a categoria "Todos os Itens".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const currentCount = cartItemCounts[item.id] || 0;
              const isAdded = addedItemAnim === item.id;

              return (
                <article
                  key={item.id}
                  className="bg-neutral-900 rounded-xl border border-neutral-800/80 hover:border-neutral-700 flex flex-col justify-between overflow-hidden group transition-all duration-200"
                >
                  {/* Visual Frame */}
                  {item.image ? (
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                      />
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-neutral-950/80 backdrop-blur-xs text-[11px] font-semibold text-amber-300 rounded border border-neutral-700/50">
                          {item.badge}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-950/40 border-b border-neutral-800/50 flex items-center justify-between">
                      <div className="text-[11px] text-neutral-400 font-medium">
                        {item.categoryLabel}
                      </div>
                      {item.badge && (
                        <span className="text-[11px] font-semibold text-amber-400">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                      {item.portionNote && (
                        <div className="text-[11px] text-neutral-500 pt-1">
                          {item.portionNote}
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-neutral-800/70 flex items-center justify-between">
                      <div>
                        {item.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through tabular-nums block">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                        <span className="text-base font-bold text-amber-400 font-display tabular-nums">
                          {formatCurrency(item.price)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-500 text-neutral-950'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-3" />
                            <span>Adicionado!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                            {currentCount > 0 && (
                              <span className="ml-1 w-4 h-4 rounded bg-amber-400 text-neutral-950 text-[10px] flex items-center justify-center font-bold">
                                {currentCount}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
