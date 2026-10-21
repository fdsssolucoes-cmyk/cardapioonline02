import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Sparkles, Send, PhoneCall, HeartHandshake, ShieldAlert } from 'lucide-react';
import { WELCOME_MESSAGES, WHATSAPP_COPY_SCRIPTS } from '../data/menuData';

interface WhatsAppHubProps {
  businessName: string;
  businessPhone: string;
  pixKey: string;
  onUpdateBusinessConfig: (name: string, phone: string, pix: string) => void;
}

export const WhatsAppHub: React.FC<WhatsAppHubProps> = ({
  businessName,
  businessPhone,
  pixKey,
  onUpdateBusinessConfig,
}) => {
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);
  const [localName, setLocalName] = useState(businessName);
  const [localPhone, setLocalPhone] = useState(businessPhone);
  const [localPix, setLocalPix] = useState(pixKey);

  const handleCopy = async (text: string, id: string) => {
    // Replace placeholders with real values
    const personalized = text
      .replaceAll('[LINK_DO_SEU_CARDAPIO]', window.location.href)
      .replaceAll('[COLE_AQUI_O_LINK_DO_CARDAPIO]', window.location.href)
      .replaceAll('Espetinho na Brasa', localName || 'Espetinho na Brasa')
      .replaceAll('[SUA_CHAVE_PIX]', localPix || 'seu-telefone-pix@email.com');

    try {
      await navigator.clipboard.writeText(personalized);
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleApplyConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBusinessConfig(localName, localPhone, localPix);
  };

  return (
    <div className="space-y-12">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <span>Comunicação Direta</span>
          <span aria-hidden="true">·</span>
          <span>Zero Custo de Anúncios</span>
          <span aria-hidden="true">·</span>
          <span>Conversão Rápida</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
          Mensagens de Boas-Vindas & Divulgação no WhatsApp
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Textos prontos, testados e persuasivos para transformar contatos de WhatsApp e vizinhos do bairro em clientes fiéis sem gastar R$ 1 com ferramentas pagas.
        </p>
      </div>

      {/* Quick Personalizer Toolbar */}
      <section className="p-5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white">
              Personalizar Textos com seus Dados Reais
            </h3>
            <p className="text-xs text-neutral-400">
              Preencha abaixo para que os botões de cópia já saiam prontos com o nome do seu espetinho e sua chave Pix.
            </p>
          </div>
        </div>

        <form onSubmit={handleApplyConfig} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Nome do seu Espetinho
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              placeholder="Ex: Espetinho do Zé"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              WhatsApp de Atendimento
            </label>
            <input
              type="text"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              placeholder="Ex: 11999998888"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-400 mb-1">
              Sua Chave Pix (sem taxa)
            </label>
            <input
              type="text"
              value={localPix}
              onChange={(e) => setLocalPix(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              placeholder="Ex: 11999998888 ou CNPJ"
            />
          </div>
        </form>
      </section>

      {/* 3. Mensagens de Boas-Vindas */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
          <HeartHandshake className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-display">
            3. Mensagens de Boas-Vindas por Canal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WELCOME_MESSAGES.map((msg, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-xl border border-neutral-800 p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {msg.channel}
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {msg.title}
                </h3>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 text-xs text-neutral-300 font-sans whitespace-pre-line leading-relaxed">
                  {msg.text
                    .replaceAll('[LINK_DO_SEU_CARDAPIO]', window.location.href)
                    .replaceAll('Espetinho na Brasa', localName || 'Espetinho na Brasa')}
                </div>
                <p className="text-[11px] text-neutral-400">
                  💡 {msg.note}
                </p>
              </div>

              <button
                onClick={() => handleCopy(msg.text, `welcome-${idx}`)}
                className="w-full py-2 px-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-xs font-medium text-neutral-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedScriptId === `welcome-${idx}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado para o Teclado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Mensagem</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Textos para Divulgar o Cardápio no WhatsApp */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-display">
            4. Textos para Divulgar o Cardápio no WhatsApp
          </h2>
        </div>

        <div className="space-y-6">
          {WHATSAPP_COPY_SCRIPTS.map((script) => (
            <div
              key={script.id}
              className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {script.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    📌 Quando usar: {script.occasion}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(script.text, script.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 active:scale-95 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 self-start sm:self-auto"
                >
                  {copiedScriptId === script.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Texto Pronto</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800/80 text-xs text-neutral-200 font-mono whitespace-pre-line leading-relaxed select-all">
                {script.text
                  .replaceAll('[COLE_AQUI_O_LINK_DO_CARDAPIO]', window.location.href)
                  .replaceAll('Espetinho na Brasa', localName || 'Espetinho na Brasa')
                  .replaceAll('[SUA_CHAVE_PIX]', localPix || 'sua-chave-pix@email.com')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
