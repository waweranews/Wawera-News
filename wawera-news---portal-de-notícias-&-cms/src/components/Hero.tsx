import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SiteContent } from '../types';

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary -z-20" />
      
      {/* Animated Dot Pattern */}
      <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] mb-12 border border-white/10"
          >
            Líder em Média & Entretenimento
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-clamp-6xl md:text-clamp-8xl lg:text-clamp-9xl font-black text-white leading-[0.9] mb-12 tracking-tighter uppercase"
          >
            {content.heroTitle}
            <span className="block text-secondary mt-6">{content.heroSub}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-16 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            {content.heroText}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a href="#portfolio" className="bg-white text-primary px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-smooth hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-3">
              Explorar Conteúdo
              <ArrowRight size={20} />
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-smooth hover:bg-white/20 active:scale-95">
              Falar Conosco
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent" />
        <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
}
