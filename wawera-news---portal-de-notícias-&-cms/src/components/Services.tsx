import { motion } from 'motion/react';
import { Video, BarChart3, Calendar, Users, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    { 
      icon: <Video size={32} />, 
      title: 'PRODUÇÃO DE CONTEÚDO', 
      text: 'Criação de vídeos, reels e fotografias profissionais de alto impacto visual.' 
    },
    { 
      icon: <BarChart3 size={32} />, 
      title: 'CONSULTORIA E GESTÃO DE MARKETING DIGITAL', 
      text: 'Estratégias personalizadas para fortalecer a sua presença online e atrair clientes.' 
    },
    { 
      icon: <Calendar size={32} />, 
      title: 'COBERTURA DE EVENTO', 
      text: 'Registo completo e profissional de eventos corporativos, sociais e institucionais.' 
    },
    { 
      icon: <Users size={32} />, 
      title: 'TREINAMENTO CORPORATIVO EM COMUNICAÇÃO, MARKETING E VENDA', 
      text: 'Capacitação especializada para equipas focada em resultados e comunicação eficaz.' 
    },
  ];

  return (
    <section id="services" className="py-32 bg-zinc-50 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Nossas Soluções
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-zinc-900"
          >
            Excelência em Cada Detalhe
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto !text-zinc-500"
          >
            Oferecemos soluções estratégicas em comunicação, marketing e produção para elevar a sua marca ao próximo nível.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-[3rem] bg-white border border-zinc-100 shadow-2xl shadow-primary/5 hover:shadow-accent/10 transition-smooth flex flex-col h-full"
            >
              <div className="w-20 h-20 bg-zinc-50 text-accent rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 transition-smooth shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-primary mb-4 tracking-tight leading-tight uppercase">{service.title}</h3>
              <p className="text-text-secondary text-base mb-10 leading-relaxed font-medium">{service.text}</p>
              
              <div className="mt-auto">
                <a
                  href={`https://wa.me/244942454003?text=Olá, quero solicitar um orçamento para ${service.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-accent font-black text-xs uppercase tracking-[0.2em] group/link"
                >
                  Solicitar orçamento
                  <div className="w-10 h-10 rounded-full border-2 border-accent/20 flex items-center justify-center group-hover/link:bg-accent group-hover/link:border-accent group-hover/link:text-white transition-smooth">
                    <ArrowRight size={16} />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
