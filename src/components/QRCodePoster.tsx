import React, { useState } from 'react';
import { QrCode, Printer, Flame, Sparkles, Phone, ShieldCheck } from 'lucide-react';

interface QRCodePosterProps {
  businessName: string;
  businessPhone: string;
  pixKey: string;
}

export const QRCodePoster: React.FC<QRCodePosterProps> = ({
  businessName,
  businessPhone,
  pixKey,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cardapio.espetinho';
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=FFFFFF&color=18181B&margin=2`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
            <span>Material Gratuito de Divulgação</span>
            <span aria-hidden="true">·</span>
            <span>Balcão & Mesas</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Display de Balcão & QR Code para Impressão
          </h1>
          <p className="text-sm text-neutral-400">
            Imprima e coloque no balcão ou nas mesinhas para os clientes abrirem o cardápio e pedirem sem precisar esperar.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all shadow-md active:scale-95 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Display de Balcão</span>
        </button>
      </div>

      {/* Visual Poster Preview Container */}
      <div className="flex justify-center p-4 sm:p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800">
        <div className="w-full max-w-sm bg-white text-neutral-950 rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200 text-center space-y-5 print:border-none print:shadow-none">
          {/* Header Brand */}
          <div className="space-y-1">
            <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center shadow-sm">
              <Flame className="w-7 h-7 fill-amber-400 stroke-amber-400" />
            </div>
            <h2 className="text-2xl font-black tracking-tight font-display text-neutral-950 pt-2">
              {businessName || 'Espetinho na Brasa'}
            </h2>
            <p className="text-xs text-neutral-600 font-medium">
              Churrasco Artesanal na Brasa Viva
            </p>
          </div>

          {/* QR Code Container */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 inline-block shadow-inner">
            <img
              src={qrCodeApiUrl}
              alt="QR Code para Cardápio Digital"
              referrerPolicy="no-referrer"
              className="w-48 h-48 mx-auto rounded-lg"
            />
          </div>

          {/* Call to action */}
          <div className="space-y-1">
            <p className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">
              Aponte a câmera do seu celular
            </p>
            <p className="text-xs text-neutral-600">
              Acesse o cardápio completo, monte seu pedido e envie direto no WhatsApp.
            </p>
          </div>

          {/* Payment & Contact Info Badge */}
          <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
            <div className="flex items-center justify-center gap-1.5 text-neutral-800 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: <strong>{businessPhone || '(11) 99999-8888'}</strong></span>
            </div>
            {pixKey && (
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] font-semibold">
                💳 Aceitamos Pix: <span className="font-mono">{pixKey}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
