import { motion } from 'motion/react';
import { ArrowRight, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary -z-20" />
      
      {/* Animated Dot Pattern */}
      <div className="absolute inset-0 opacity-10 -z-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-white/10">
              Pronto para começar?
            </span>
            <h2 className="text-clamp-5xl md:text-clamp-6xl font-black mb-8 tracking-tighter leading-tight">
              Transforme sua visão em <span className="text-secondary">realidade</span> com a Wawera News.
            </h2>
            <p className="text-white/70 text-lg font-medium mb-12 max-w-xl">
              Nossa equipe está pronta para elevar o nível do seu conteúdo e garantir que sua marca se destaque no mercado.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-smooth hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center gap-3">
                Explorar Conteúdo
                <ArrowRight size={18} />
              </button>
              <Link to="/admin" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-smooth hover:bg-white/20 active:scale-95 flex items-center gap-3">
                Área Administrativa
                <Layout size={18} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl animate-bounce [animation-duration:3s]">
                <img src="/logo.png" alt="Wawera" className="w-16 h-16 object-contain" />
              </div>
              <div className="text-white">
                <h3 className="text-4xl font-black tracking-tighter">Wawera</h3>
                <p className="text-secondary font-black uppercase tracking-widest text-xs">News Portal</p>
              </div>
            </div>
            
            {/* Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
