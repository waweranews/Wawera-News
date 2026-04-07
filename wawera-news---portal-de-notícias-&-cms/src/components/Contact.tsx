import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { SiteContent } from '../types';

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export default function Contact({ content }: { content: SiteContent }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log('Form Data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: <MapPin size={24} />, title: 'Endereço', text: content.address, link: '#' },
    { icon: <Mail size={24} />, title: 'Email', text: content.email, link: `mailto:${content.email}` },
    { icon: <Phone size={24} />, title: 'Telefone', text: content.phone, link: `tel:${content.phone.replace(/\s/g, '')}` },
  ];

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              Vamos Conversar
            </div>
            <h2 className="section-title">Impulsione Sua Marca Hoje</h2>
            <p className="text-xl text-text-secondary mb-16 leading-relaxed font-medium">
              Estamos prontos para transformar a sua visão em realidade. Preencha o formulário ou utilize os nossos canais directos para solicitar um orçamento ou tirar as suas dúvidas.
            </p>

            <div className="space-y-10">
              {contactInfo.map((info, idx) => (
                <motion.a 
                  key={idx} 
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-8 group p-6 rounded-3xl hover:bg-zinc-50 transition-smooth border border-transparent hover:border-zinc-100"
                >
                  <div className="w-16 h-16 bg-white shadow-xl shadow-primary/5 text-accent rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-smooth">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-primary text-sm uppercase tracking-widest mb-1">{info.title}</h4>
                    <p className="text-text-secondary font-medium text-lg group-hover:text-accent transition-colors">{info.text}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-10 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(10,26,47,0.1)] border border-white/50"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">Mensagem Enviada!</h3>
                <p className="text-text-secondary mb-10 font-medium">Obrigado pelo seu contacto. A nossa equipa irá responder o mais breve possível.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline !rounded-2xl"
                >
                  Enviar nova mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                      {...register('name', { required: 'Nome é obrigatório' })}
                      className={`w-full px-6 py-4 rounded-2xl bg-white/50 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-smooth font-medium`}
                      placeholder="Seu nome"
                    />
                    {errors.name && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.name.message}</span>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Email Profissional</label>
                    <input
                      {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                      className={`w-full px-6 py-4 rounded-2xl bg-white/50 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-smooth font-medium`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                    <input
                      {...register('phone', { required: 'Telefone é obrigatório' })}
                      className={`w-full px-6 py-4 rounded-2xl bg-white/50 border ${errors.phone ? 'border-red-500' : 'border-zinc-200'} focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-smooth font-medium`}
                      placeholder="+244 000 000 000"
                    />
                    {errors.phone && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.phone.message}</span>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Serviço de Interesse</label>
                    <select
                      {...register('service', { required: 'Seleccione um serviço' })}
                      className={`w-full px-6 py-4 rounded-2xl bg-white/50 border ${errors.service ? 'border-red-500' : 'border-zinc-200'} focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-smooth font-medium appearance-none`}
                    >
                      <option value="">Seleccione...</option>
                      <option value="Produção de Conteúdos">Produção de Conteúdos</option>
                      <option value="Fotografia">Fotografia Profissional</option>
                      <option value="Reels">Reels</option>
                      <option value="Eventos">Cobertura de Eventos</option>
                      <option value="Redes Sociais">Gestão de Redes Sociais</option>
                      <option value="Branding">Branding</option>
                      <option value="Websites">Criação de Websites</option>
                    </select>
                    {errors.service && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.service.message}</span>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-primary uppercase tracking-widest ml-1">Mensagem</label>
                  <textarea
                    {...register('message', { required: 'Mensagem é obrigatória' })}
                    rows={4}
                    className={`w-full px-6 py-4 rounded-2xl bg-white/50 border ${errors.message ? 'border-red-500' : 'border-zinc-200'} focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-smooth font-medium resize-none`}
                    placeholder="Como podemos ajudar?"
                  />
                  {errors.message && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">{errors.message.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-5 flex items-center justify-center gap-4 disabled:opacity-70 !rounded-2xl shadow-xl shadow-accent/20"
                >
                  {isSubmitting ? 'Enviando...' : (
                    <>
                      Enviar Mensagem
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
