export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function generateWhatsAppMessage(
  businessPhone: string,
  customerName: string,
  deliveryType: 'retirada' | 'entrega',
  address: string,
  paymentMethod: string,
  changeFor: string,
  notes: string,
  cartItems: Array<{
    name: string;
    quantity: number;
    price: number;
    doneness?: string;
    itemNotes?: string;
  }>,
  total: number
): string {
  const dateStr = new Date().toLocaleDateString('pt-BR');
  const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let text = `🔥 *NOVO PEDIDO - ESPETINHO NA BRASA* 🔥\n`;
  text += `📅 Data/Hora: ${dateStr} às ${timeStr}\n\n`;

  text += `👤 *Cliente:* ${customerName.trim() || 'Cliente WhatsApp'}\n`;
  text += `🛵 *Tipo:* ${deliveryType === 'entrega' ? 'Entrega no Endereço' : 'Retirada no Balcão'}\n`;
  if (deliveryType === 'entrega' && address) {
    text += `📍 *Endereço:* ${address}\n`;
  }
  text += `💳 *Forma de Pagamento:* ${paymentMethod}\n`;
  if (paymentMethod === 'Dinheiro' && changeFor) {
    text += `💵 *Troco para:* R$ ${changeFor}\n`;
  }
  text += `\n📋 *ITENS DO PEDIDO:*\n`;
  text += `--------------------------------\n`;

  cartItems.forEach((item, index) => {
    const itemSubtotal = (item.quantity * item.price).toFixed(2).replace('.', ',');
    text += `${index + 1}. *${item.quantity}x* ${item.name} - R$ ${itemSubtotal}\n`;
    if (item.doneness) {
      text += `   ↳ Ponto: ${item.doneness}\n`;
    }
    if (item.itemNotes) {
      text += `   ↳ Obs: ${item.itemNotes}\n`;
    }
  });

  text += `--------------------------------\n`;
  text += `💰 *TOTAL DO PEDIDO:* R$ ${total.toFixed(2).replace('.', ',')}\n`;

  if (notes.trim()) {
    text += `\n📝 *Observações Gerais:* ${notes.trim()}\n`;
  }

  text += `\n_Por favor, confirme se o pedido foi recebido e o tempo estimado para preparo! Obrigado!_`;

  return text;
}
