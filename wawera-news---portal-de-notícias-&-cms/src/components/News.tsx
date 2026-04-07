import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, MessageCircle, ArrowRight, Filter } from 'lucide-react';
import { NewsItem } from '../types';
import { format } from 'date-fns';

interface NewsProps {
  news: NewsItem[];
}

const CATEGORIES = ['Todos', 'Entretenimento', 'Cultura', 'Sociedade', 'Sustentabilidade', 'Mundo'];

export default function News({ news }: NewsProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Use provided news or fallback to mock data
  const newsItems = news.length > 0 ? news : [
    {
      id: '1',
      title: 'Cobertura Exclusiva: Lunabril Palace 2026',
      date: '2026-03-28',
      category: 'Entretenimento',
      image: 'https://i.imgur.com/7vlEOrZ.png',
      excerpt: 'Confira os melhores momentos da cobertura realizada pela Wawera News no espetáculo mais aguardado do ano.',
      author: 'Redação'
    },
    {
      id: '2',
      title: 'Tendências de Moda: A Nova Coleção Dumagui',
      date: '2026-03-25',
      category: 'Cultura',
      image: 'https://i.imgur.com/6v32RsV.png',
      excerpt: 'Exploramos os bastidores da produção de conteúdo para a nova linha de roupas que está dominando o mercado angolano.',
      author: 'Redação'
    },
    {
      id: '3',
      title: 'Gastronomia em Foco: Churrex & Sushirrex',
      date: '2026-03-20',
      category: 'Sociedade',
      image: 'https://i.imgur.com/0ZjO9Xk.png',
      excerpt: 'Como o marketing digital e a produção de conteúdo visual estão transformando a experiência gastronômica.',
      author: 'Redação'
    }
  ];

  const filteredNews = activeCategory === 'Todos' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const displayedNews = filteredNews.slice(0, visibleCount);

  return (
    <section id="news" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-left mb-4"
            >
              Últimas Notícias
            </motion.h2>
            <p className="text-gray-600 text-lg">
              Fique por dentro de tudo o que acontece em Angola e no mundo com a nossa curadoria especializada.
            </p>
          </div>

          <div className="flex flex-col items-end gap-6">
            <button 
              onClick={() => {
                const element = document.getElementById('news-grid');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline hidden md:flex"
            >
              Explorar Todas
            </button>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(12);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div id="news-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedNews.map((item, idx) => (
              <motion.article
                key={item.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" />
                      {format(new Date(item.date), 'dd/MM/yyyy')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} className="text-accent" />
                      {item.author || 'Redação'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4 line-clamp-2 group-hover:text-accent transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MessageCircle size={14} />
                      <span className="text-[10px] font-bold">0</span>
                    </div>
                    <button 
                      onClick={() => setSelectedNews(item)}
                      className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest group/btn"
                    >
                      Ler Mais
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredNews.length > visibleCount && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setVisibleCount(prev => Math.min(prev + 12, 36))}
              className="btn-primary"
            >
              Carregar Mais Notícias
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter size={32} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-500">Tente selecionar outra categoria ou volte mais tarde.</p>
          </div>
        )}
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl max-h-full flex flex-col"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ArrowRight className="rotate-180" />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="relative h-[40vh] md:h-[50vh]">
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="inline-block px-4 py-1.5 bg-accent rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-6">
                      {selectedNews.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                      {selectedNews.title}
                    </h2>
                  </div>
                </div>

                <div className="p-10 md:p-16">
                  <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Autor</p>
                        <p className="text-sm font-bold text-primary">{selectedNews.author || 'Redação'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Data</p>
                        <p className="text-sm font-bold text-primary">{format(new Date(selectedNews.date), 'dd/MM/yyyy')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                    {selectedNews.content ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
                    ) : (
                      <p>{selectedNews.excerpt}</p>
                    )}
                  </div>

                  {/* Comments Section Placeholder */}
                  <div className="mt-20 pt-20 border-t border-gray-100">
                    <h4 className="text-2xl font-black text-primary mb-10 flex items-center gap-4">
                      Comentários
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-400">0</span>
                    </h4>
                    <div className="bg-gray-50 p-10 rounded-3xl text-center">
                      <p className="text-gray-500 font-medium">Os comentários estão desativados para esta notícia.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
