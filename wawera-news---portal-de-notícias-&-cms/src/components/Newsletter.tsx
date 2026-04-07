import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-surface border-y border-zinc-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-zinc-200/50 border border-zinc-100 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-primary mb-4 tracking-tighter leading-tight">
              Fique por dentro das <span className="text-accent">novidades</span>.
            </h3>
            <p className="text-zinc-500 font-medium text-sm leading-relaxed">
              Assine nossa newsletter e receba conteúdos exclusivos, coberturas e as principais notícias do entretenimento diretamente no seu e-mail.
            </p>
          </div>

          <div className="w-full md:w-[400px]">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-6 py-5 text-sm font-bold text-primary placeholder:text-zinc-400 focus:outline-none focus:border-accent transition-smooth"
              />
              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-black uppercase tracking-widest text-[10px] transition-smooth flex items-center gap-2 ${
                  status === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-white hover:bg-accent'
                }`}
              >
                {status === 'loading' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={16} />
                    Sucesso
                  </>
                ) : (
                  <>
                    Assinar
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-600 text-[10px] font-black uppercase tracking-widest text-center"
              >
                Obrigado por assinar! Verifique seu e-mail.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
