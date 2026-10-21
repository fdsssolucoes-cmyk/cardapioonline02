import React from 'react';
import { ClipboardList, CheckCircle2, DollarSign, Smartphone, Flame, ArrowUpRight } from 'lucide-react';
import { OPERATIONAL_GUIDELINES } from '../data/menuData';

export const OperationalGuide: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <span>Gestão Eficiente</span>
          <span aria-hidden="true">·</span>
          <span>Zero Mensalidade</span>
          <span aria-hidden="true">·</span>
          <span>Simplicidade Operacional</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
          5. Sugestões de Organização para Facilitar os Pedidos
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Manual prático para o início da operação: como organizar os pedidos, a fila da churrasqueira e os recebimentos sem contratar nenhum software pago.
        </p>
      </div>

      {/* Zero Monthly Fee Stack Card */}
      <section className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-900/90 rounded-xl border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <DollarSign className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white font-display">
            A Regra de Ouro: Economia Total no Início (Custo Fixo Zero)
          </h2>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed max-w-3xl">
          Muitos pequenos espetinhos cometem o erro de assinar plataformas com mensalidades de R$ 150 a R$ 300 (Goomer, Anota AI, iFood com comissão de 12% a 27%) antes de terem clientela consolidada.
          No início, cada real economizado deve ir para <strong>comprar carne de melhor qualidade, carvão de alto rendimento e embalagens térmicas que mantêm o espeto quente</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
            <span className="text-[11px] text-neutral-500 font-medium">Atendimento & Pedidos</span>
            <div className="text-sm font-bold text-white">WhatsApp Business</div>
            <div className="text-[11px] text-emerald-400 font-semibold">100% Gratuito</div>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
            <span className="text-[11px] text-neutral-500 font-medium">Cardápio Interativo</span>
            <div className="text-sm font-bold text-white">Cardápio Web Direto</div>
            <div className="text-[11px] text-emerald-400 font-semibold">Zero Taxa por Pedido</div>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
            <span className="text-[11px] text-neutral-500 font-medium">Recebimento</span>
            <div className="text-sm font-bold text-white">Chave Pix Banco Digital</div>
            <div className="text-[11px] text-emerald-400 font-semibold">0% Taxa de Maquininha</div>
          </div>
          <div className="p-3.5 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
            <span className="text-[11px] text-neutral-500 font-medium">Controle de Fila</span>
            <div className="text-sm font-bold text-white">Etiquetas + Grupo Brasa</div>
            <div className="text-[11px] text-emerald-400 font-semibold">Sem Falhas de Comunicação</div>
          </div>
        </div>
      </section>

      {/* The 5 Operational Rules */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
          <ClipboardList className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-display">
            Passo a Passo Operacional para Não Se Perder na Hora do Rush
          </h2>
        </div>

        <div className="space-y-5">
          {OPERATIONAL_GUIDELINES.map((guide) => (
            <div
              key={guide.step}
              className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 flex flex-col md:flex-row gap-5 items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-neutral-950 font-display font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm">
                0{guide.step}
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium pt-0.5">
                    {guide.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {guide.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 text-xs text-neutral-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routine Checklist: Abertura e Fechamento */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Flame className="w-5 h-5" />
            <h3 className="text-base font-bold text-white font-display">
              Checklist de Abertura (16h às 17h30)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Acender o carvão com 40 minutos de antecedência para formar brasa viva sem fumaça preta.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Conferir contagem dos espetinhos montados e separados por tipo (carne, frango, medalhão).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Abastecer os potinhos de vinagrete e a mandioca já na manteiga de garrafa aquecida.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Conferir geladeira de bebidas (refrigerantes e cervejas bem geladas).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span>Conectar o WhatsApp Business no computador ou deixar celular carregado no suporte do balcão.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Smartphone className="w-5 h-5" />
            <h3 className="text-base font-bold text-white font-display">
              Checklist de Fechamento (22h30 às 23h30)
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Somar as entradas do Pix e conferir os comprovantes do dia (fechamento de caixa rápido).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Contar sobras de espetinhos crus para planejar as compras de carne do dia seguinte.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Abafar o braseiro com segurança para reaproveitar restos de carvão limpo.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Higienizar a grelha com escova de cerdas de latão enquanto ainda está morna.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>Mudar a etiqueta de todos os pedidos finalizados no WhatsApp para "Concluído".</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
