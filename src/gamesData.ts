/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Game } from './types';

export const GAMES_DATA: Game[] = [
  // Top 10 Blockbuster Games ordered strictly at the beginning
  {
    id: 'gta-san-andreas-mobile',
    title: 'Grand Theft Auto: San Andreas',
    category: 'Mundo Aberto / Ação',
    genre: 'Ação',
    rating: 4.9,
    description: 'Cinco anos atrás, Carl Johnson escapou da pressão da vida em Los Santos, San Andreas... uma cidade que se despedaçava com problemas de gangues, drogas e corrupção. Agora, CJ precisa voltar para casa com gráficos móveis renovados e total estabilidade de controles.',
    coverUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Remaster 5play Classic',
    platforms: ['android'],
    fileSize: '2.4 GB',
    releaseYear: 2024,
    downloadsCount: 15931000,
    specifications: {
      androidMin: 'Android 9.0+ (Snapdragon 720G+)',
      iosMin: 'Não disponível oficialmente',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Grand+Theft+Auto&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'subway-surfers-mod',
    title: 'Subway Surfers (MOD Menu)',
    category: 'Endless Runner / Arcade',
    genre: 'Corrida',
    rating: 4.7,
    description: 'CORRA o mais rápido que puder! DESVIE dos trens que se aproximam! Ajude Jake, Tricky e Fresh a escaparem do Inspetor rabugento em um MOD Menu exclusivo com moedas infinitas, chaves ilimitadas e todos os skins desbloqueados.',
    coverUrl: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '154 MB',
    releaseYear: 2026,
    downloadsCount: 142095000,
    specifications: {
      androidMin: 'Android 6.0 ou superior',
      iosMin: 'iOS 12.0 ou superior',
      ramMin: '2 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Subway+Surfers&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Subway+Surfers&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'minecraft-pocket-edition',
    title: 'Minecraft Pocket Edition',
    category: 'Sobrevivência / Sandbox',
    genre: 'RPG',
    rating: 4.8,
    description: 'Explore mundos infinitos e construa de tudo, desde a mais simples das casas até o mais grandioso dos castelos. Jogue no modo criativo com recursos ilimitados ou minere as profundezas no modo sobrevivência.',
    coverUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '620 MB',
    releaseYear: 2026,
    downloadsCount: 54120900,
    specifications: {
      androidMin: 'Android 8.0 o posterior (Snapdragon 665+)',
      iosMin: 'iOS 14.0 o posterior (iPhone XR+)',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Minecraft&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Minecraft&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'roblox-mod-menu',
    title: 'Roblox (Mod Menu Completo)',
    category: 'Sandbox / Cooperativo',
    genre: 'Estratégia',
    rating: 4.6,
    description: 'Roblox é o universo virtual definitivo que permite que você crie, compartilhe experiências com amigos e seja qualquer coisa que puder imaginar. A versão MOD carrega múltiplos truques integrados na interface.',
    coverUrl: 'https://images.unsplash.com/photo-1608111283390-2e333b9b279c?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '172 MB',
    releaseYear: 2026,
    downloadsCount: 88402100,
    specifications: {
      androidMin: 'Android 7.0+ (Qualcomm Octa-Core)',
      iosMin: 'Não disponível',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Roblox&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'brawl-stars-unlimited',
    title: 'Brawl Stars (Moedas/Gemas Infinitas)',
    category: 'Moba / Combate Rápido',
    genre: 'Ação',
    rating: 4.8,
    description: 'Combates de 3 contra 3 rápidos em equipe e modo de sobrevivência Battle Royale no celular com brawlers modificados e gemas ilimitadas para abrir caixas infinitamente no servidor privado associado 5play.',
    coverUrl: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Exclusivo MOD Menu',
    platforms: ['android'],
    fileSize: '240 MB',
    releaseYear: 2026,
    downloadsCount: 198300000,
    specifications: {
      androidMin: 'Android 7.0 o superior (GPU Mali-G52+)',
      iosMin: 'Não disponível',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Brawl+Stars&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'free-fire-mod-menu',
    title: 'Garena Free Fire (Mod Auto-Aim)',
    category: 'Shooter / Battle Royale',
    genre: 'Ação',
    rating: 4.8,
    description: 'O mundialmente famoso jogo de tiro de sobrevivência disponível no celular. Cada partida de 10 minutos coloca você em uma ilha remota onde você luta contra outros 49 jogadores com estabilidade 5play incrível.',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '390 MB',
    releaseYear: 2026,
    downloadsCount: 312500000,
    specifications: {
      androidMin: 'Android 5.0 ou superior',
      iosMin: 'Não disponível',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Free+Fire&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'efootball-mobile-unlocked',
    title: 'eFootball PES Mobile 2026',
    category: 'Simulação / Esportes',
    genre: 'Corrida',
    rating: 4.7,
    description: 'Uma nova era de futebol digital. O clássico simulador de futebol PES da Konami reinventado para controle tátil de precisão excepcional. Licenciamentos reais de grandes times.',
    coverUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '1.9 GB',
    releaseYear: 2026,
    downloadsCount: 121400000,
    specifications: {
      androidMin: 'Android 8.0+ (Snpadragon 730G+)',
      iosMin: 'iOS 15.0+ (iPhone 11+)',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=eFootball&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=eFootball&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'pubg-mobile-mod',
    title: 'PUBG Mobile (No Recoil)',
    category: 'Shooter / Battle Royale',
    genre: 'Sobrevivência',
    rating: 4.8,
    description: 'O Battle Royale original para celulares com controle balístico otimizado. Jogue batalhas intensas de sobrevivência em mapas gigantescos de 8km x 8km de graficos hiper-realistas.',
    coverUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '820 MB',
    releaseYear: 2026,
    downloadsCount: 412000000,
    specifications: {
      androidMin: 'Android 6.0 ou superior',
      iosMin: 'Não disponível',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=PUBG+Mobile&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'dead-cells-unlocked',
    title: 'Dead Cells Mobile (Premium)',
    category: 'Rogue-like / Metroidvania',
    genre: 'RPG',
    rating: 4.9,
    description: 'Explore um castelo em constante mudança no estilo Metroid Roguelike 2D de alta velocidade. Sem pontos de salvamento intermediários: mate, morra, aprenda e repita.',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Premium Desbloqueado',
    platforms: ['android', 'ios'],
    fileSize: '1.2 GB',
    releaseYear: 2025,
    downloadsCount: 2450000,
    specifications: {
      androidMin: 'Android 9.0+ (Helio G80 ou snapdragon 660+)',
      iosMin: 'iOS 15.0+ (iPhone SE+)',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Dead+Cells&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Dead+Cells&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'stardew-valley-mod',
    title: 'Stardew Valley (Full Version)',
    category: 'Simulação / Fazenda',
    genre: 'Estratégia',
    rating: 4.8,
    description: 'Mude-se para os campos e cultive uma nova vida no premiado RPG de simulação de fazendas. Com mais de 50 horas de conteúdo de jogo, suporte para controles, salvamento automático.',
    coverUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '360 MB',
    releaseYear: 2025,
    downloadsCount: 12400000,
    specifications: {
      androidMin: 'Android 6.0 ou superior',
      iosMin: 'iOS 13.0 ou superior',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Stardew+Valley&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Stardew+Valley&lang=en&do=search&subaction=search&titleonly=0'
  },

  // Remaining catalog items in the system
  {
    id: 'shadow-fight-2-special',
    title: 'Shadow Fight 2 (Special Edition)',
    category: 'Luta / RPG de Ação',
    genre: 'Ação',
    rating: 4.8,
    description: 'A melhor mistura de RPG e Luta Clássica. Este jogo permite equipar seu personagem com inúmeras armas letais e conjuntos de armaduras raras.',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '142 MB',
    releaseYear: 2025,
    downloadsCount: 31050000,
    specifications: {
      androidMin: 'Android 5.0 ou superior',
      iosMin: 'iOS 11.0 ou superior',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Shadow+Fight&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Shadow+Fight&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'toca-life-world-mod',
    title: 'Toca Life World (Tudo Desbloqueado)',
    category: 'Infantil / Simulador',
    genre: 'Estratégia',
    rating: 4.7,
    description: 'Crie histórias e construa seu próprio mundo com todos os personagens, locais, móveis e acessórios premium liberados de fábrica da loja 5play.',
    coverUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '512 MB',
    releaseYear: 2026,
    downloadsCount: 45000000,
    specifications: {
      androidMin: 'Android 7.0 ou superior',
      iosMin: 'Não disponível',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Toca+Life&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'plants-vs-zombies-2-mod',
    title: 'Plants vs. Zombies 2 (MOD Sun)',
    category: 'Estratégia / Defesa de Torre',
    genre: 'Estratégia',
    rating: 4.6,
    description: 'Jogue o clássico estrondoso de defender seu quintal através das eras temporais mais louca com o MOD especial para sóis e moedas ilimitadas.',
    coverUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '710 MB',
    releaseYear: 2025,
    downloadsCount: 68120000,
    specifications: {
      androidMin: 'Android 5.0 ou superior',
      iosMin: 'iOS 11.0 ou superior',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Plants+vs+Zombies&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Plants+vs+Zombies&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'ea-fc-mobile-patch',
    title: 'EA SPORTS FC Mobile',
    category: 'Esporte / Futebol',
    genre: 'Corrida',
    rating: 4.8,
    description: 'Monte seu Ultimate Team dos sonhos de astros globais do futebol. Treine seus ídolos lendários, use novos chutes de efeito refinados e dispute partidas.',
    coverUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android', 'ios'],
    fileSize: '890 MB',
    releaseYear: 2026,
    downloadsCount: 110900000,
    specifications: {
      androidMin: 'Android 8.0+ (CPU de alto desempenho)',
      iosMin: 'iOS 14.0+ (iPhone X+)',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=FC+Mobile&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=FC+Mobile&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'terraria-unlocked',
    title: 'Terraria (Full Unlocked)',
    category: 'Mundo Aberto / Ação',
    genre: 'RPG',
    rating: 4.7,
    description: 'O mundo está na ponta dos seus dedos enquanto você luta pela sobrevivência, fortuna e glória. Cave fundo em extensões cavernosas, procure inimigos.',
    coverUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Clássico 5play',
    platforms: ['android', 'ios'],
    fileSize: '310 MB',
    releaseYear: 2025,
    downloadsCount: 9120000,
    specifications: {
      androidMin: 'Android 6.0+',
      iosMin: 'iOS 12.0+',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Terraria&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Terraria&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'angry-birds-unlocked',
    title: 'Angry Birds Classic (Retro)',
    category: 'Casual / Física',
    genre: 'Estratégia',
    rating: 4.5,
    description: 'Use os poderes exclusivos dos Angry Birds para detonar as defesas dos porcos gananciosos! Um clássico atemporal resgatado e empacotado para compatibilidade.',
    coverUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Preservação Digital',
    platforms: ['android', 'ios'],
    fileSize: '95 MB',
    releaseYear: 2024,
    downloadsCount: 7850000,
    specifications: {
      androidMin: 'Android 5.0 ou superior',
      iosMin: 'iOS 10.0 ou superior',
      ramMin: '2 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Angry+Birds&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: 'https://5play.org/index.php?story=Angry+Birds&lang=en&do=search&subaction=search&titleonly=0'
  },
  {
    id: 'spotify-premium-mod',
    title: 'Spotify Music (Premium Unlocked)',
    category: 'Música / Streaming',
    genre: 'Apps',
    rating: 4.9,
    description: 'Com o Spotify Premium Modded, você tem acesso ao catálogo mundial de músicas sem anúncios, com a possibilidade de pular faixas ilimitadamente.',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '78 MB',
    releaseYear: 2026,
    downloadsCount: 195200000,
    specifications: {
      androidMin: 'Android 6.0 ou superior',
      iosMin: 'Não disponível em sideload direto',
      ramMin: '2 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Spotify&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'capcut-pro-mod',
    title: 'CapCut Video Editor (Pro Desbloqueado)',
    category: 'Edição de Vídeo / Utilidade',
    genre: 'Apps',
    rating: 4.8,
    description: 'Crie vídeos cinemáticos impressionantes com o editor premium desbloqueado do CapCut. Filtros pro, transições de fluxo livre, chroma key e remoção automática.',
    coverUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'VIP Desbloqueado',
    platforms: ['android'],
    fileSize: '185 MB',
    releaseYear: 2026,
    downloadsCount: 147800000,
    specifications: {
      androidMin: 'Android 8.0+ (Processamento 64-bit)',
      iosMin: 'Não disponível',
      ramMin: '4 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=CapCut&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'picsart-gold-unlocked',
    title: 'Picsart AI Photo Editor (Gold)',
    category: 'Fotografia / Criativo',
    genre: 'Apps',
    rating: 4.7,
    description: 'Acesse o estúdio definitivo de edição com todas as ferramentas Gold, fontes estilizadas premium, stickers de alta resolução e filtros artísticos de IA.',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    isRare: false,
    platforms: ['android'],
    fileSize: '112 MB',
    releaseYear: 2025,
    downloadsCount: 56900000,
    specifications: {
      androidMin: 'Android 7.0 ou superior',
      iosMin: 'Não disponível',
      ramMin: '3 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Picsart&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  },
  {
    id: 'netflix-no-ads',
    title: 'Netflix Premium Client (No Ads)',
    category: 'Entretenimento / Vídeo',
    genre: 'Apps',
    rating: 4.7,
    description: 'Cliente otimizado de reprodução com servidor de alta velocidade, desfrute de catálogos e previews livres de publicidades irritantes em resoluções máximas.',
    coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd85?w=800&auto=format&fit=crop&q=80',
    isRare: true,
    rareBadgeText: 'Portabilidade 5play',
    platforms: ['android'],
    fileSize: '54 MB',
    releaseYear: 2025,
    downloadsCount: 38200000,
    specifications: {
      androidMin: 'Android 7.0 ou superior',
      iosMin: 'Não disponível',
      ramMin: '2 GB RAM'
    },
    dlUrlAndroid: 'https://5play.org/index.php?story=Netflix&lang=en&do=search&subaction=search&titleonly=0',
    dlUrlIos: '#'
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'c1',
    gameId: 'minecraft-pocket-edition',
    author: 'MinecraftFan_BR',
    rating: 5,
    content: 'O download foi super veloz e veio 100% atualizado com as últimas novidades de 2026. Melhor parceiro do 5play para portais nacionais!',
    date: '30/05/2026'
  },
  {
    id: 'c2',
    gameId: 'gta-san-andreas-mobile',
    author: 'CarlJohnson_LAPS',
    rating: 5,
    content: 'Sensacional! O jogo salvou o meu progresso offline perfeitamente. O 5play oficial nunca decepciona e o espelho do Leandro facilita tudo.',
    date: '29/05/2026'
  }
];
