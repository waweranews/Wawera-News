import { motion } from 'motion/react';

export default function VideoShowcase() {
  const featuredVideos = [
    { id: '1', title: 'Wawera News - Cobertura 01', url: 'https://www.youtube.com/embed/bwGbfb8ujaM' },
    { id: '2', title: 'Wawera News - Cobertura 02', url: 'https://www.youtube.com/embed/f9vxrOljd2k' },
    { id: '3', title: 'Wawera News - Cobertura 03', url: 'https://www.youtube.com/embed/rzXmAnJRnus' },
  ];

  return (
    <section id="videos" className="py-32 bg-primary relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Showcase de Vídeo
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase"
          >
            Vídeos em Destaque
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg font-medium"
          >
            Confira as nossas produções mais recentes e sinta a qualidade do entretenimento Wawera News.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {featuredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative aspect-video rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 transition-smooth"
            >
              <iframe
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors pointer-events-none" />
              
              {/* Video Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-white font-black text-xs uppercase tracking-widest">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
