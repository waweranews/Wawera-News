import { Project, Service, SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  heroTitle: "Wawera News",
  heroSub: "COBERTURA ÚNICA | PUBLICIDADE CERTEIRA",
  heroText: "Transformamos o seu evento em notícia. O teu mundo de entretenimento.",
  aboutText: "Wawera News é uma empresa de média focada em execução real, jovem e profissional. Nossa missão é transformar a visão dos nossos clientes em realidade através de conteúdos impactantes e criativos.",
  mission: "Transformar a visão dos nossos clientes em realidade através de conteúdos impactantes e criativos.",
  vision: "Ser a principal autoridade em média e entretenimento, reconhecida pela inovação e excelência na execução.",
  address: "Luanda, Camama, Condomínio Vila Nostra, Lote 175",
  email: "comercial0waweranews@gmail.com",
  phone: "+244 942 454 003",
  whatsapp: "https://wa.me/244942454003"
};

export const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Produção de conteúdos', description: 'Criação de vídeos e textos impactantes.', icon: 'Video' },
  { id: '2', title: 'Fotografia profissional', description: 'Captura de momentos com alta qualidade.', icon: 'Camera' },
  { id: '3', title: 'Reels', description: 'Vídeos curtos e dinâmicos para redes sociais.', icon: 'Smartphone' },
  { id: '4', title: 'Cobertura de eventos', description: 'Registo completo do seu evento.', icon: 'Calendar' },
  { id: '5', title: 'Gestão de redes sociais', description: 'Estratégia e gestão de perfis digitais.', icon: 'Share2' },
  { id: '6', title: 'Branding', description: 'Criação e gestão de identidade de marca.', icon: 'Palette' },
  { id: '7', title: 'Criação de websites', description: 'Desenvolvimento de sites modernos e funcionais.', icon: 'Globe' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'lunabril',
    name: 'LUNABRIL',
    logo: 'https://i.imgur.com/7vlEOrZ.png',
    work: 'Eventos / Entretenimento',
    driveLink: 'https://wa.me/244942454003',
    category: 'Eventos',
    order: 1,
    description: 'Cobertura de eventos e espetáculos com produção de reportagens and fotografia profissional, focado em experiências ao vivo e entretenimento.',
    photos: [],
    reels: [
      { title: 'Lunabril Palace - Destaque 01', url: 'https://www.youtube.com/embed/rzXmAnJRnus', campaign: 'Evento' },
      { title: 'Lunabril Palace - Destaque 02', url: 'https://www.youtube.com/embed/xaBQb75b4so', campaign: 'Evento' },
      { title: 'Lunabril Palace - Destaque 03', url: 'https://www.youtube.com/embed/Q6L8iqXJbPA', campaign: 'Evento' },
      { title: 'Lunabril Palace - Destaque 04', url: 'https://www.youtube.com/embed/4y-bpVsdoes', campaign: 'Evento' },
      { title: 'Lunabril Palace - Destaque 05', url: 'https://www.youtube.com/embed/MXZAW_qYTtE', campaign: 'Evento' }
    ]
  },
  {
    id: 'inej',
    name: 'Inej',
    logo: 'https://i.imgur.com/7lpSroz.png',
    work: 'Cobertura de Evento - Reportagem e Fotografias Profissional',
    driveLink: 'https://wa.me/244942454003',
    category: 'Eventos',
    order: 2,
    description: 'Cobertura de eventos institucionais com produção de reportagens and fotografia profissional for comunicação oficial e institucional.',
    videoUrl: 'https://www.youtube.com/embed/bwGbfb8ujaM',
    photos: [],
    reels: []
  },
  {
    id: 'churrex',
    name: 'Churrex / Sushirrx',
    logo: 'https://i.imgur.com/0ZjO9Xk.png',
    work: 'Marketing Digital Completo',
    driveLink: 'https://wa.me/244942454003',
    category: 'Gastronomia',
    order: 3,
    description: 'Estratégias personalizadas para fortalecer sua presença online e atrair clientes. Criação de vídeos, reels e fotografias profissionais de alto impacto visual. Capacitação especializada para equipes focadas em resultados e comunicação eficaz.',
    photos: [],
    reels: [
      { title: 'Churrex - Reel 01', url: 'https://www.youtube.com/embed/RKyT9Oh19mw', campaign: 'Marketing' },
      { title: 'Churrex - Reel 02', url: 'https://www.youtube.com/embed/85J5qaMlbJM', campaign: 'Marketing' }
    ]
  },
  {
    id: 'casa-luz',
    name: 'Casa Luz',
    logo: 'https://i.imgur.com/nhjtKJf.png',
    work: 'Produção de Conteúdos',
    driveLink: 'https://wa.me/244942454003',
    category: 'Institucional',
    order: 4,
    description: 'Criação de vídeos, reels e fotografias profissionais de alto impacto visual.',
    photos: [],
    reels: [
      { title: 'Casa Luz - Reel 01', url: 'https://www.youtube.com/embed/8JZ7eyOgxv0', campaign: 'Marketing' },
      { title: 'Casa Luz - Reel 02', url: 'https://www.youtube.com/embed/Z3YT6l6oTos', campaign: 'Marketing' }
    ]
  },
  {
    id: 'geovany-galli',
    name: 'Geovanni Galli',
    logo: 'https://i.imgur.com/rE5GRd1.png',
    work: 'Produção de Conteúdos - Vídeos Reels e Secção Fotográfica Profissional',
    driveLink: 'https://wa.me/244942454003',
    category: 'Moda',
    order: 5,
    description: 'Produção de conteúdos - Vídeos Reels e secção fotográfica profissional para novas linhas de roupas e acessórios da marca Geovanni Galli.',
    photos: [
      'https://i.imgur.com/HBHAtuV.jpeg',
      'https://i.imgur.com/H0ZhTYx.jpeg',
      'https://i.imgur.com/rtPZDG4.jpeg',
      'https://i.imgur.com/fdlOn8M.jpeg',
      'https://i.imgur.com/UEtbwu3.jpeg',
      'https://i.imgur.com/OVpE3ct.jpeg',
      'https://i.imgur.com/scqc2w9.jpeg',
      'https://i.imgur.com/gtE32Bn.jpeg',
      'https://i.imgur.com/2DbxDTa.jpeg',
      'https://i.imgur.com/6rkC2NA.jpeg',
      'https://i.imgur.com/UQy1cZ5.jpeg',
      'https://i.imgur.com/gGINtcW.jpeg',
      'https://i.imgur.com/zOnuhJb.jpeg',
      'https://i.imgur.com/slmTkYH.jpeg',
      'https://i.imgur.com/dcrRB2V.jpeg',
      'https://i.imgur.com/2z2sChd.jpeg',
      'https://i.imgur.com/8qDbdAB.jpeg',
      'https://i.imgur.com/SUsQ1Wk.jpeg',
      'https://i.imgur.com/ILwYPEj.jpeg',
      'https://i.imgur.com/yqYcKAs.jpeg'
    ],
    reels: [
      { title: 'Geovany Galli - Reel 01', url: 'https://www.youtube.com/embed/0DJjCvFAZK4', campaign: 'Campanha' },
      { title: 'Geovany Galli - Reel 02', url: 'https://www.youtube.com/embed/OZN7uU4f9d0', campaign: 'Campanha' },
      { title: 'Geovany Galli - Reel 03', url: 'https://www.youtube.com/embed/T2bfMfalqAE', campaign: 'Campanha' },
      { title: 'Geovany Galli - Reel 04', url: 'https://www.youtube.com/embed/e1jsTK1blgk', campaign: 'Campanha' }
    ]
  },
  {
    id: 'dumagui',
    name: 'Dumagui',
    logo: 'https://i.imgur.com/6v32RsV.png',
    work: 'Produção de Conteúdos - Vídeos Reels e Seção Fotográfica Profissional',
    driveLink: 'https://wa.me/244942454003',
    category: 'Moda',
    order: 6,
    description: 'Produção de conteúdos - Vídeos Reels e seção fotográfica profissional para novas linhas de roupas e acessórios da marca Dumagui.',
    photos: [
      'https://i.imgur.com/UEtbwu3.jpeg',
      'https://i.imgur.com/H0ZhTYx.jpeg',
      'https://i.imgur.com/rtPZDG4.jpeg',
      'https://i.imgur.com/fdlOn8M.jpeg',
      'https://i.imgur.com/OVpE3ct.jpeg',
      'https://i.imgur.com/scqc2w9.jpeg',
      'https://i.imgur.com/gtE32Bn.jpeg',
      'https://i.imgur.com/2DbxDTa.jpeg',
      'https://i.imgur.com/6rkC2NA.jpeg',
      'https://i.imgur.com/UQy1cZ5.jpeg',
      'https://i.imgur.com/gGINtcW.jpeg',
      'https://i.imgur.com/zOnuhJb.jpeg',
      'https://i.imgur.com/dcrRB2V.jpeg',
      'https://i.imgur.com/2z2sChd.jpeg',
      'https://i.imgur.com/SUsQ1Wk.jpeg',
      'https://i.imgur.com/ILwYPEj.jpeg',
      'https://i.imgur.com/yqYcKAs.jpeg'
    ],
    reels: [
      { title: 'Dumagui - Reel 01', url: 'https://www.youtube.com/embed/tDFy35mJy3g', campaign: 'Nova Linha' }
    ]
  },
  {
    id: 'cawdo',
    name: 'Cawdo Park Group',
    logo: 'https://i.imgur.com/tR5LWG2.png',
    work: 'Cobertura de Evento - Reportagem e Fotografias Profissional e Resenha no Formato Reels',
    driveLink: 'https://wa.me/244942454003',
    category: 'Eventos',
    order: 7,
    description: 'Cobertura de eventos corporativos com produção de reportagens, captação de imagens profissionais e criação de reels de resenha para comunicação institucional.',
    photos: [
      'https://ais-pre-2eqegiuqjkzj3bgpgm2pfl-724921264681.europe-west2.run.app/input_file_46.png'
    ],
    reels: []
  },
  {
    id: 'dinaco',
    name: 'Dinaco Comercial Geral Lda',
    logo: 'https://i.imgur.com/Mx99N7t.png',
    work: 'Produção de Conteúdos',
    driveLink: 'https://wa.me/244942454003',
    category: 'Institucional',
    order: 8,
    description: 'Desenvolvimento de conteúdos visuais estratégicos com fotografia profissional e reels para reforço da identidade e comunicação digital da marca.',
    photos: [],
    reels: []
  },
  {
    id: 'vida',
    name: '+ Vida',
    logo: 'https://i.imgur.com/NH9G2DM.png',
    work: 'Produção Institucional',
    driveLink: 'https://wa.me/244942454003',
    category: 'Saúde',
    order: 9,
    description: 'Produção de spot institucional para campanha de saúde (Novembro Azul), incluindo fotografia profissional e criação de conteúdos em vídeo para redes sociais.',
    photos: [],
    reels: []
  }
];

