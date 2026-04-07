export interface Reel {
  title: string;
  url: string;
  campaign?: string;
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  work: string;
  driveLink: string;
  category: string;
  videoUrl?: string; // YouTube embed URL
  description?: string;
  order: number;
  photos?: string[];
  reels?: Reel[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSub: string;
  heroText: string;
  aboutText: string;
  mission: string;
  vision: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
}
