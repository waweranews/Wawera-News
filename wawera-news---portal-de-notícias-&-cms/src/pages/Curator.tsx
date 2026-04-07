import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ExternalLink, RefreshCw, AlertTriangle, Newspaper } from 'lucide-react';
import { toast } from 'sonner';

interface RawNews {
  id: string;
  title: string;
  link: string;
  excerpt: string;
  date: string;
  source: string;
  category: string;
  image: string;
}

export default function Curator() {
  const [news, setNews] = useState<RawNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await fetch('/.netlify/functions/curator-api');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching raw news:', error);
      toast.error('Erro ao carregar notícias brutas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject', newsData?: RawNews) => {
    try {
      const response = await fetch('/.netlify/functions/curator-api', {
        method: 'POST',
        body: JSON.stringify({ id, action, newsData }),
      });
      
      if (response.ok) {
        setNews(prev => prev.filter(item => item.id !== id));
        toast.success(action === 'approve' ? 'Notícia aprovada e publicada!' : 'Notícia rejeitada');
      } else {
        throw new Error('Falha na operação');
      }
    } catch (error) {
      console.error('Error in curator action:', error);
      toast.error('Erro ao processar notícia');
    }
  };

  const handleFetchNew = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/.netlify/functions/fetch-news');
      const data = await response.json();
      toast.success(data.message);
      fetchNews();
    } catch (error) {
      console.error('Error fetching new news:', error);
      toast.error('Erro ao buscar novas notícias');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Carregando Fila de Curadoria...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-black text-primary mb-2 flex items-center gap-4">
              Curadoria Virtual
              <span className="text-sm bg-accent/10 text-accent px-4 py-1 rounded-full uppercase tracking-widest">
                Redator-Chefe AI
              </span>
            </h1>
            <p className="text-gray-500 font-medium">
              Analise, edite e aprove as notícias recolhidas automaticamente de fontes credenciadas.
            </p>
          </div>
          
          <button 
            onClick={handleFetchNew}
            disabled={refreshing}
            className="btn-primary flex items-center gap-3 disabled:opacity-50"
          >
            {refreshing ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
            Sincronizar Fontes
          </button>
        </div>

        {news.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Newspaper size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Fila de Curadoria Vazia</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10">
              Não há notícias pendentes no momento. Clique em "Sincronizar Fontes" para buscar novos conteúdos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {news.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row h-full group hover:shadow-xl transition-all duration-500"
                >
                  <div className="md:w-1/3 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-primary shadow-sm">
                        {item.source}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                        {item.category}
                      </span>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center gap-4">
                      <button 
                        onClick={() => handleAction(item.id, 'approve', item)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                      >
                        <Check size={18} />
                        Aprovar
                      </button>
                      <button 
                        onClick={() => handleAction(item.id, 'reject')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                      >
                        <X size={18} />
                        Rejeitar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-20 p-10 bg-primary rounded-[40px] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-accent" />
                <h4 className="text-xl font-bold uppercase tracking-widest">Alertas de Sensibilidade</h4>
              </div>
              <p className="text-zinc-400 font-medium">
                O sistema monitora automaticamente palavras-chave sensíveis. Se detectado, um alerta será enviado para o e-mail e SMS configurados no CMS.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest">
                E-mail: Ativo
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest">
                SMS: Inativo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
