import { motion } from 'motion/react';
import { Target, Eye, Heart, Zap, Palette, ShieldCheck } from 'lucide-react';
import { SiteContent } from '../types';

export default function About({ content }: { content: SiteContent }) {
  const values = [
    { icon: <ShieldCheck size={24} />, title: 'Credibilidade', text: 'Informação verídica e confiável.' },
    { icon: <Zap size={24} />, title: 'Agilidade', text: 'Rapidez na entrega e execução.' },
    { icon: <Palette size={24} />, title: 'Criatividade', text: 'Inovação em cada projeto.' },
    { icon: <Heart size={24} />, title: 'Responsabilidade', text: 'Compromisso com o cliente.' },
    { icon: <Target size={24} />, title: 'Cultura', text: 'Foco em resultados e impacto.' },
    { icon: <Zap size={24} />, title: 'Inovação', text: 'Sempre à frente das tendências.' },
  ];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              Nossa Essência
            </div>
            <h2 className="section-title">A Força por Trás da Notícia</h2>
            <p className="text-xl text-text-secondary mb-12 leading-relaxed font-medium">
              {content.aboutText.split('Wawera News').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span translate="no" className="font-black text-primary">Wawera News</span>}
                </span>
              ))}
            </p>

            <div className="grid sm:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 transition-smooth"
              >
                <div className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/30">
                  <Target size={28} />
                </div>
                <h3 className="font-black text-2xl mb-3 tracking-tight">Missão</h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed">{content.mission}</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 transition-smooth"
              >
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                  <Eye size={28} />
                </div>
                <h3 className="font-black text-2xl mb-3 tracking-tight">Visão</h3>
                <p className="text-text-secondary text-sm font-medium leading-relaxed">{content.vision}</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((val, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: '#F8FAFC' }}
                  className="bg-white p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-zinc-50 flex flex-col items-center text-center transition-smooth group"
                >
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-500">{val.icon}</div>
                  <h4 className="font-black text-primary text-sm mb-2 uppercase tracking-widest">{val.title}</h4>
                  <p className="text-xs text-text-secondary font-medium leading-relaxed">{val.text}</p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Background Accent */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
