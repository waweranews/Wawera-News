import { Instagram, Facebook, Youtube, Linkedin, Music2 as Tiktok, MapPin, Mail, Phone } from 'lucide-react';
import { SiteContent } from '../types';

export default function Footer({ content }: { content: SiteContent }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20">
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-10 group" translate="no">
              <img 
                src="https://i.imgur.com/11DEIk7.jpeg" 
                alt="Wawera News" 
                className="h-24 w-auto object-contain grayscale invert brightness-200 contrast-200 mix-blend-screen group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer" 
              />
            </a>
            <p className="text-zinc-400 text-base leading-relaxed font-medium mb-8 max-w-xs">
              {content.heroSub}. Elevamos a sua marca através de conteúdos criativos e profissionais de alto impacto.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={20} />, href: "https://www.instagram.com/wawera.news/", label: "Instagram" },
                { icon: <Facebook size={20} />, href: "https://www.facebook.com/portal.waweranews/", label: "Facebook" },
                { icon: <Youtube size={20} />, href: "https://www.youtube.com/@waweranews6667/", label: "YouTube" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/wawera-news/", label: "LinkedIn" },
                { icon: <Tiktok size={20} />, href: "https://www.tiktok.com/waewera_news/", label: "TikTok" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-accent hover:border-accent hover:-translate-y-1 transition-smooth"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Explorar</h4>
            <ul className="space-y-5 text-zinc-400 text-sm font-bold uppercase tracking-wider">
              <li><a href="#home" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Início</a></li>
              <li><a href="#about" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Sobre Nós</a></li>
              <li><a href="#services" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Serviços</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Portfólio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Serviços</h4>
            <ul className="space-y-5 text-zinc-400 text-sm font-bold uppercase tracking-wider">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> Produção de Conteúdo</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> Marketing Digital</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> Cobertura de Evento</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-white/20 rounded-full" /> Treinamento</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-accent mb-10">Contacto</h4>
            <div className="space-y-6 text-zinc-400 text-sm font-medium">
              <div className="flex gap-4">
                <MapPin size={20} className="text-accent shrink-0" />
                <p>{content.address}</p>
              </div>
              <div className="flex gap-4">
                <Mail size={20} className="text-accent shrink-0" />
                <p>{content.email}</p>
              </div>
              <div className="flex gap-4">
                <Phone size={20} className="text-accent shrink-0" />
                <p>{content.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} Wawera News. Todos os direitos reservados.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
