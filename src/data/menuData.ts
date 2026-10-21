export interface MenuItem {
  id: string;
  name: string;
  category: 'tradicionais' | 'especiais' | 'combos-1p' | 'combos-2p' | 'acompanhamentos' | 'bebidas';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  costEstimate: number; // Para cálculo de margem do empreendedor
  description: string;
  image?: string;
  badge?: string;
  portionNote?: string;
  isPopular?: boolean;
  isOffer?: boolean;
}

export interface SpecialComboOffer {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  regularPrice: number;
  promoPrice: number;
  savings: number;
  targetAudience: string;
  marginAdvice: string;
  tag: string;
}

export const CATEGORIES = [
  { id: 'todos', label: 'Todos os Itens' },
  { id: 'tradicionais', label: 'Espetinhos Tradicionais' },
  { id: 'especiais', label: 'Espetinhos Especiais' },
  { id: 'combos-1p', label: 'Combos para 1 Pessoa' },
  { id: 'combos-2p', label: 'Combos para 2 Pessoas' },
  { id: 'acompanhamentos', label: 'Acompanhamentos' },
  { id: 'bebidas', label: 'Bebidas' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // --- ESPETINHOS TRADICIONAIS ---
  {
    id: 'esp-carne',
    name: 'Espetinho de Carne Bovina',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 10.00,
    costEstimate: 4.20,
    description: 'Cubos selecionados de alcatra e contrafilé marinados em tempero suave e assados no braseiro alto.',
    portionNote: 'Aprox. 110g in natura',
    isPopular: true,
    image: '/src/assets/images/espetinho_tradicional_1792502132178.jpg',
  },
  {
    id: 'esp-frango',
    name: 'Espetinho de Peito de Frango',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 9.00,
    costEstimate: 3.10,
    description: 'Peito de frango suculento marinado no limão, alho e ervas finas. Macio e dourado por fora.',
    portionNote: 'Aprox. 110g in natura',
    isPopular: false,
  },
  {
    id: 'esp-linguica',
    name: 'Espetinho de Linguiça Toscana',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 9.00,
    costEstimate: 3.30,
    description: 'Linguiça toscana artesanal com tempero clássico, assada até estalar a pele e manter o recheio macio.',
    portionNote: 'Aprox. 110g in natura',
    isPopular: true,
  },
  {
    id: 'esp-kafta',
    name: 'Espetinho de Kafta com Ervas',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 10.00,
    costEstimate: 3.80,
    description: 'Carne bovina moída fresca temperada com cebola ralada, toque de hortelã e mix de especiarias da casa.',
    portionNote: 'Aprox. 120g moldado no espeto',
    isPopular: false,
  },
  {
    id: 'esp-coracao',
    name: 'Espetinho de Coração de Frango',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 11.00,
    costEstimate: 4.80,
    description: 'Corações limpos e temperados no chimichurri suave. Ponto firme e suculento na brasa viva.',
    portionNote: 'Aprox. 110g in natura',
    isPopular: false,
  },
  {
    id: 'esp-queijo',
    name: 'Espetinho de Queijo Coalho',
    category: 'tradicionais',
    categoryLabel: 'Espetinhos Tradicionais',
    price: 10.00,
    costEstimate: 4.00,
    description: 'Queijo coalho tostado na brasa com casquinha crocante dourada. Opcional com fio de melado de cana.',
    portionNote: 'Espeto padrão 90g',
    isPopular: true,
  },

  // --- ESPETINHOS ESPECIAIS ---
  {
    id: 'esp-medalhao-frango',
    name: 'Medalhão de Frango com Bacon',
    category: 'especiais',
    categoryLabel: 'Espetinhos Especiais',
    price: 13.00,
    costEstimate: 4.90,
    description: 'Cubos nobres de peito de frango envolvidos em fatia generosa de bacon defumado crocante.',
    portionNote: 'Aprox. 130g in natura',
    badge: 'Campeão de Vendas',
    isPopular: true,
    image: '/src/assets/images/espetinho_especial_1792502133513.jpg',
  },
  {
    id: 'esp-alcatra-bacon',
    name: 'Medalhão de Alcatra com Bacon',
    category: 'especiais',
    categoryLabel: 'Espetinhos Especiais',
    price: 15.00,
    costEstimate: 6.20,
    description: 'Alcatra macia envolta em tiras de bacon crocante, unindo a maciez da carne vermelha com a fumaça do bacon.',
    portionNote: 'Aprox. 130g in natura',
    isPopular: true,
  },
  {
    id: 'esp-picanha',
    name: 'Espetinho Nobre de Picanha',
    category: 'especiais',
    categoryLabel: 'Espetinhos Especiais',
    price: 16.00,
    costEstimate: 7.50,
    description: 'Picanha fatiada com capa de gordura perfeita, temperada apenas com sal grosso para realçar o sabor autêntico.',
    portionNote: 'Aprox. 120g in natura',
    badge: 'Corte Nobre',
    isPopular: true,
  },
  {
    id: 'esp-panceta',
    name: 'Panceta Suína Crocante',
    category: 'especiais',
    categoryLabel: 'Espetinhos Especiais',
    price: 13.00,
    costEstimate: 4.50,
    description: 'Barriga de porco marinada na cachaça e limão, assada lentamente na brasa até pururucar a pele.',
    portionNote: 'Aprox. 120g in natura',
    isPopular: false,
  },
  {
    id: 'esp-pao-alho',
    name: 'Pão de Alho Especial Recheado',
    category: 'especiais',
    categoryLabel: 'Espetinhos Especiais',
    price: 9.00,
    costEstimate: 3.20,
    description: 'Pãozinho crocante recheado com pasta de alho artesanal cremosa, queijo e ervas frescas tostado na grelha.',
    portionNote: 'Pão baguetinha recheado',
    isPopular: true,
  },

  // --- COMBOS PARA UMA PESSOA ---
  {
    id: 'combo-solo-classico',
    name: 'Combo Solo Clássico',
    category: 'combos-1p',
    categoryLabel: 'Combos para 1 Pessoa',
    price: 24.00,
    originalPrice: 28.00,
    costEstimate: 9.50,
    description: '2 espetinhos tradicionais à sua escolha + 1 porção de mandioca com manteiga + farofa torrada + vinagrete.',
    portionNote: 'Refeição completa individual',
    badge: 'Mais Pedido Individual',
    isPopular: true,
    image: '/src/assets/images/combo_completo_1792502134225.jpg',
  },
  {
    id: 'combo-solo-premium',
    name: 'Combo Solo Premium da Brasa',
    category: 'combos-1p',
    categoryLabel: 'Combos para 1 Pessoa',
    price: 29.00,
    originalPrice: 34.00,
    costEstimate: 11.50,
    description: '1 espetinho especial + 1 espetinho tradicional + mandioca na manteiga + farofa crocante + vinagrete da casa.',
    portionNote: 'Refeição individual reforçada',
    isPopular: false,
  },
  {
    id: 'combo-fome-de-espeto',
    name: 'Combo Fome de Espeto (3 Espetos)',
    category: 'combos-1p',
    categoryLabel: 'Combos para 1 Pessoa',
    price: 33.00,
    originalPrice: 38.00,
    costEstimate: 13.20,
    description: '3 espetinhos tradicionais à sua escolha + arroz branco soltinho + farofa da casa + vinagrete fresco.',
    portionNote: 'Para quem quer prato reforçado',
    isPopular: true,
  },

  // --- COMBOS PARA DUAS PESSOAS ---
  {
    id: 'combo-dupla-brasa',
    name: 'Combo Dupla na Brasa',
    category: 'combos-2p',
    categoryLabel: 'Combos para 2 Pessoas',
    price: 49.00,
    originalPrice: 58.00,
    costEstimate: 19.00,
    description: '4 espetinhos tradicionais à escolha + porção dupla de mandioca + farofa artesanal + vinagrete da casa.',
    portionNote: 'Serve 2 pessoas com fartura',
    badge: 'Melhor Custo-Benefício',
    isPopular: true,
  },
  {
    id: 'combo-casal-churrasqueiro',
    name: 'Combo Casal Churrasqueiro Gourmet',
    category: 'combos-2p',
    categoryLabel: 'Combos para 2 Pessoas',
    price: 58.00,
    originalPrice: 69.00,
    costEstimate: 23.50,
    description: '2 espetinhos especiais (medalhão ou picanha) + 2 tradicionais + 1 pão de alho + porção completa de acompanhamentos.',
    portionNote: 'Experiência completa para 2 pessoas',
    badge: 'Gourmet Casal',
    isPopular: true,
  },
  {
    id: 'combo-galera-petisco',
    name: 'Combo Petisco Amigos (6 Espetos)',
    category: 'combos-2p',
    categoryLabel: 'Combos para 2 Pessoas',
    price: 66.00,
    originalPrice: 77.00,
    costEstimate: 26.00,
    description: '6 espetinhos variados à escolha + 1 pão de alho recheado + porção dupla de farofa temperada e vinagrete.',
    portionNote: 'Ideal para dividir e petiscar',
    isPopular: false,
  },

  // --- ACOMPANHAMENTOS ---
  {
    id: 'acomp-mandioca',
    name: 'Mandioca Cozida na Manteiga',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 8.00,
    costEstimate: 2.20,
    description: 'Mandioca macia cozida no ponto de desmanchar, finalizada com manteiga derretida e cheiro-verde fresco.',
    portionNote: 'Porção 200g',
    isPopular: true,
  },
  {
    id: 'acomp-farofa',
    name: 'Farofa Artesanal Crocante',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 5.00,
    costEstimate: 1.10,
    description: 'Farinha de mandioca torradinha com tempero da casa, alho tostado e pedacinhos de linguiça e cebola.',
    portionNote: 'Porção 120g',
    isPopular: true,
  },
  {
    id: 'acomp-vinagrete',
    name: 'Vinagrete Fresco da Casa',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 5.00,
    costEstimate: 1.20,
    description: 'Tomates maduros, cebola e cheiro-verde picadinhos, temperados com azeite, vinagre e pitada de sal.',
    portionNote: 'Pote 150ml',
    isPopular: true,
  },
  {
    id: 'acomp-arroz',
    name: 'Arroz Branco Soltinho',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 7.00,
    costEstimate: 1.40,
    description: 'Arroz tipo 1 fresquinho, refogado no alho e cebola douradinhos. Solto e quentinho.',
    portionNote: 'Porção 250g',
    isPopular: false,
  },
  {
    id: 'acomp-molho-alho',
    name: 'Pote de Molho Especial de Alho',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    price: 4.00,
    costEstimate: 0.90,
    description: 'Molho cremoso de alho assado com ervas, receita própria que combina perfeitamente com carnes na brasa.',
    portionNote: 'Potinho 50ml',
    isPopular: true,
  },

  // --- BEBIDAS ---
  {
    id: 'beb-refri-lata',
    name: 'Refrigerante em Lata (350ml)',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 6.00,
    costEstimate: 3.10,
    description: 'Coca-Cola (Normal ou Zero), Guaraná Antarctica ou Fanta Laranja. Servido bem gelado.',
    portionNote: 'Lata 350ml',
    isPopular: true,
  },
  {
    id: 'beb-refri-2l',
    name: 'Refrigerante 2 Litros',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 13.00,
    costEstimate: 7.50,
    description: 'Garrafa pet de 2 litros gelada (Coca-Cola ou Guaraná Antarctica). Perfeito para combos familiares.',
    portionNote: 'Garrafa 2 Litros',
    isPopular: false,
  },
  {
    id: 'beb-cerveja-lata',
    name: 'Cerveja Puro Malte Lata (350ml)',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7.00,
    costEstimate: 3.80,
    description: 'Amstel, Heineken ou Eisenbahn geladas no ponto de trincar. Ideal para acompanhar o churrasco.',
    portionNote: 'Lata 350ml - Venda proibida para menores de 18 anos',
    isPopular: true,
  },
  {
    id: 'beb-agua',
    name: 'Água Mineral (500ml)',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 4.00,
    costEstimate: 1.20,
    description: 'Água mineral natural, disponível com gás ou sem gás. Bem gelada.',
    portionNote: 'Garrafa 500ml',
    isPopular: false,
  },
  {
    id: 'beb-suco',
    name: 'Suco Natural de Polpa (300ml)',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    price: 7.00,
    costEstimate: 2.30,
    description: 'Suco batido na hora com polpa selecionada (Maracujá, Acerola ou Caju). Refrescante e saboroso.',
    portionNote: 'Copo selado 300ml',
    isPopular: false,
  },
];

export const ECONOMIC_COMBOS: SpecialComboOffer[] = [
  {
    id: 'eco-1',
    title: 'Combo Econômico do Bairro',
    subtitle: 'O combo porta de entrada para atrair clientes vizinhos com alta margem',
    items: [
      '1x Espetinho de Carne ou Frango',
      '1x Espetinho de Linguiça Toscana',
      '1x Farofa Artesanal Torrada',
      '1x Vinagrete Fresco',
    ],
    regularPrice: 24.00,
    promoPrice: 19.90,
    savings: 4.10,
    targetAudience: 'Clientes do dia a dia, almoço rápido ou janta despretensiosa.',
    marginAdvice: 'Custo estimado de produção: R$ 8,60. Margem bruta superior a 56%, mesmo no preço promocional.',
    tag: 'Preço Imbatível',
  },
  {
    id: 'eco-2',
    title: 'Combo Almoço/Janta Express',
    subtitle: 'Substitui uma refeição de marmita com a qualidade da carne na brasa',
    items: [
      '2x Espetinhos Tradicionais à escolha',
      '1x Arroz Branco Soltinho',
      '1x Mandioca na Manteiga',
      '1x Farofa Crocante',
    ],
    regularPrice: 34.00,
    promoPrice: 27.90,
    savings: 6.10,
    targetAudience: 'Pessoas trabalhando, quem não quer cozinhar à noite ou quer prato farto.',
    marginAdvice: 'Arroz e mandioca têm baixíssimo custo de matéria-prima, elevando a percepção de fartura sem pesar no seu bolso.',
    tag: 'Fartura Econômica',
  },
  {
    id: 'eco-3',
    title: 'Dueto Econômico de Espetos',
    subtitle: 'Perfeito para o casal economizar e jantar espetinho quentinho',
    items: [
      '2x Espetinhos de Frango ou Linguiça',
      '2x Espetinhos de Carne Bovina',
      '1x Mandioca Grande na Manteiga',
      '1x Farofa da Casa',
      '1x Vinagrete',
    ],
    regularPrice: 56.00,
    promoPrice: 46.90,
    savings: 9.10,
    targetAudience: 'Casais e duplas que buscam jantar completo por menos de R$ 25 por pessoa.',
    marginAdvice: 'Estimula ticket médio alto logo no início do negócio, gerando caixa rápido nos dias de semana.',
    tag: 'Campeão para 2 Pessoas',
  },
];

export const SPECIAL_OFFERS = [
  {
    day: 'Terça e Quarta',
    title: 'Dia do Espeto Tradicional em Dobro no Combo',
    rule: 'Na compra de qualquer Combo Dupla, ganhe 1 Pão de Alho Especial Recheado.',
    objective: 'Girar o estoque no meio da semana e aumentar movimento em dias tradicionalmente mais calmos.',
    copyText: '🔥 TERÇA & QUARTA NA BRASA! Peça qualquer Combo Dupla e leve 1 Pão de Alho Especial de brinde! Vem aproveitar!',
  },
  {
    day: 'Quinta do Happy Hour',
    title: 'Combo Espeto + Cerveja Puro Malte',
    rule: '1 Espetinho de Carne ou Medalhão + 1 Cerveja Puro Malte gelada por apenas R$ 15,90.',
    objective: 'Captar o público pós-trabalho que quer relaxar sem gastar muito.',
    copyText: '🍻 QUINTA DO HAPPY HOUR: Espetinho no ponto + Cerveja Puro Malte geladíssima por R$ 15,90! Peça agora pelo WhatsApp.',
  },
  {
    day: 'Sexta e Sábado',
    title: 'Fim de Semana em Família',
    rule: 'Combo Petisco 6 Espetos + Refrigerante 2L por R$ 74,90 (Economia de R$ 14,10).',
    objective: 'Aumentar o valor total da comanda quando as famílias e amigos se reúnem em casa.',
    copyText: '🥩 SEXTOU COM ESPETINHO! Combo 6 Espetos + Pão de Alho + Acompanhamentos + Refri 2L com R$ 14 OFF. Garanta o seu!',
  },
];

export const WELCOME_MESSAGES = [
  {
    channel: 'Cardápio Digital (Topo da Página)',
    title: 'Boas-Vindas no Cardápio',
    text: 'Olá, seja muito bem-vindo ao nosso espetinho! Aqui a carne é selecionada, o tempero é caseiro e a brasa está sempre acesa para você. Escolha seus espetinhos favoritos, monte seu prato e envie seu pedido direto para o nosso WhatsApp sem burocracia.',
    note: 'Transmite acolhimento, transparência e simplicidade imediata.',
  },
  {
    channel: 'WhatsApp Business (Resposta Automática Gratuita)',
    title: 'Mensagem de Saudação Automática (Configuração gratuita)',
    text: `Olá! Que bom ter você aqui no Espetinho na Brasa! 🥩🔥

Nosso braseiro já está a todo vapor! 
Para ver nosso cardápio completo com preços e fotos, acesse:
👉 [LINK_DO_SEU_CARDAPIO]

Horário de Funcionamento:
Terça a Domingo, das 18h às 23h.
Aceitamos Pix, Cartão e Dinheiro.

Já escolheu o que vai pedir? Pode mandar por aqui que já colocamos na grelha para você!`,
    note: 'Cole direto nas "Mensagens de Saudação" do WhatsApp Business (função 100% gratuita).',
  },
  {
    channel: 'Bio do Instagram & WhatsApp Recado',
    title: 'Texto de Bio / Descrição de Perfil',
    text: '🔥 Espetinhos artesanais assados na brasa viva | Combos individuais e para 2 | Mandioca na manteiga & farofa da casa | 📲 Peça pelo WhatsApp:',
    note: 'Direto ao ponto, com palavras que dão fome e link visível.',
  },
];

export const WHATSAPP_COPY_SCRIPTS = [
  {
    id: 'script-divulgacao-bairro',
    title: '1. Divulgação de Inauguração / Novo Cardápio no Bairro',
    occasion: 'Grupos de moradores de bairro, condomínio e lista de transmissão',
    text: `Boa noite, vizinhos! Tudo bem? 👋

Passando para apresentar o nosso Espetinho na Brasa! 🔥🥩
Trabalhamos com carnes selecionadas, assadas na hora no carvão, acompanhadas de mandioca na manteiga derretendo e farofa torradinha da casa.

Para inaugurar nosso cardápio digital, preparamos combos econômicos a partir de R$ 19,90!

Confira nosso cardápio completo com fotos e preços:
👉 [COLE_AQUI_O_LINK_DO_CARDAPIO]

Entregamos no bairro ou você pode retirar quentinho no balcão.
Basta responder essa mensagem para fazer seu pedido! 📲`,
  },
  {
    id: 'script-sexta-happyhour',
    title: '2. Disparo de Sexta / Sábado à Noite (Gera pedidos na hora)',
    occasion: 'Enviar entre 17h30 e 18h30 nas sextas e sábados',
    text: `Sextou com cheirinho de churrasco no ar! 🍻🥩🔥

A brasa já tá quente por aqui! Hoje tem:
✅ Medalhão de alcatra com bacon crocante
✅ Espetinhos tradicionais macios e suculentos
✅ Pão de alho recheado tostadinho
✅ Cerveja gelada e combos econômicos para você e sua família

Evite filas: faça seu pedido antecipado pelo nosso cardápio:
👉 [COLE_AQUI_O_LINK_DO_CARDAPIO]

Chame aqui no WhatsApp que separamos seu pedido na hora! 📲`,
  },
  {
    id: 'script-confirmacao-pedido',
    title: '3. Resposta Rápida: Confirmação Padronizada de Pedido',
    occasion: 'Quando o cliente manda o pedido, responda em 1 minuto',
    text: `Pedido recebido e já encaminhado para a churrasqueira! 🥩🔥

Resumo:
[ITENS_DO_PEDIDO]
Total: R$ [VALOR_TOTAL]
Forma de Pagamento: [PIX / CARTÃO / DINHEIRO]
Tempo estimado: 25 a 40 minutos

Chave Pix (sem taxas): [SUA_CHAVE_PIX]
Assim que fizer o Pix, por favor envie o comprovante por aqui. Muito obrigado pela preferência!`,
  },
  {
    id: 'script-pos-venda',
    title: '4. Fidelização Pós-Venda (No dia seguinte)',
    occasion: 'Enviado no dia seguinte para transformar cliente em freguês fiel',
    text: `Olá! Passando rapidinho para saber: como estava o seu espetinho ontem? 🥩✨
Esperamos que a carne estivesse macia e no ponto que você gosta!

Seu feedback é muito importante para nós que estamos começando. Se puder indicar para um amigo ou vizinho, nos ajuda demais! Conte sempre com a gente para quando bater aquela vontade de churrasco. Abraço! 🙌`,
  },
];

export const OPERATIONAL_GUIDELINES = [
  {
    step: '1',
    title: 'Padronize as Comandas Sem Gastar com Sistemas Pagos',
    summary: 'Use um bloco de comandas de papel numerado de R$ 3,00 ou um grupo privado de WhatsApp.',
    details: [
      'Tenha um grupo no WhatsApp com você mesmo e quem cuida da grelha (ex: "Churrasqueira - Pedidos").',
      'Quando o pedido chegar, cole o texto formatado no grupo com o horário de entrada.',
      'Marque com check quando for para a brasa e quando for embalado para entrega.',
      'Evita perder pedidos, confusão de ponto da carne e demora desnecessária.',
    ],
  },
  {
    step: '2',
    title: 'Mise en Place (Pré-Preparo) Inteligente',
    summary: '90% do sucesso de um espetinho é a velocidade entre o pedido e a entrega.',
    details: [
      'Pese os espetinhos no espeto de bambu padronizado (100g a 110g para tradicionais; 120g a 130g para medalhões).',
      'Mantenha vinagrete já porcionado em potinhos descartáveis na geladeira.',
      'Mandioca já cozida em água e sal; aqueça com um fio de manteiga na hora de servir ou em banho-maria térmico.',
      'Farofa pronta em pote fechado seco. Isso reduz o tempo de montagem para menos de 4 minutos.',
    ],
  },
  {
    step: '3',
    title: 'Gestão Gratuita de Pedidos com WhatsApp Business',
    summary: 'O WhatsApp Business é 100% gratuito e substitui plataformas que cobram R$ 150 a R$ 300 por mês.',
    details: [
      'Use o recurso de ETIQUETAS coloridas nativas:',
      '• Amarela: "Novo Pedido"',
      '• Laranja: "Na Brasa"',
      '• Azul: "Saiu para Entrega"',
      '• Verde: "Pago e Finalizado"',
      'Cadastre as "Respostas Rápidas" (atalhos com a barra "/") para enviar o Pix, o Cardápio e o Endereço com 2 toques.',
    ],
  },
  {
    step: '4',
    title: 'Foco no Pix Direto (Zero Taxa de Intermediação)',
    summary: 'Elimine taxas de 12% a 27% dos grandes marketplaces e 2% a 5% das maquininhas.',
    details: [
      'Cadastre uma chave Pix simples (como telefone ou e-mail da sua conta jurídica MEI ou física inicial).',
      'Imprima uma plaquinha com o QR Code Pix no balcão e no saquinho de entrega.',
      'O dinheiro cai na hora na sua conta, fornecendo capital de giro diário para repor carvão e carnes frescas no dia seguinte.',
    ],
  },
  {
    step: '5',
    title: 'Estratégia de Precificação dos Combos',
    summary: 'Os acompanhamentos baratos aumentam a margem de lucro e a percepção de valor do cliente.',
    details: [
      'A carne é o item de maior custo (40% a 50% do preço de venda).',
      'Mandioca, farofa e vinagrete têm custo baixíssimo (menos de R$ 2,50 somados), mas agregam R$ 10 a R$ 14 de valor percebido no combo.',
      'Sempre estimule a venda de Combos em vez de espetos avulsos. Isso eleva o ticket médio de R$ 10 para R$ 25 - R$ 50.',
    ],
  },
];
