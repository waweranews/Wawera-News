import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Project } from '../types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-32 bg-zinc-50 text-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title !text-zinc-900 after:bg-accent"
          >
            Portfólio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto !text-zinc-500"
          >
            Uma seleção curada dos nossos melhores trabalhos e cases de sucesso.
          </motion.p>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-smooth border-2 ${
                  filter === cat 
                    ? 'bg-accent border-accent text-white shadow-xl shadow-accent/30' 
                    : 'bg-white border-zinc-200 text-zinc-400 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-accent/20 transition-smooth hover:-translate-y-3 border border-zinc-100 flex flex-col h-full"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-zinc-100 flex items-center justify-center p-12">
                    {/* Background Visuals */}
                    {project.videoUrl && !project.videoUrl.includes('youtube.com') && !project.videoUrl.includes('youtu.be') && !project.videoUrl.includes('vimeo.com') ? (
                      <video
                        src={project.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-smooth grayscale group-hover:grayscale-0"
                      />
                    ) : project.reels?.length > 0 && project.reels[0].url.includes('.mp4') ? (
                      <video
                        src={project.reels[0].url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-smooth grayscale group-hover:grayscale-0"
                      />
                    ) : project.photos?.length > 0 ? (
                      <img
                        src={project.photos[0]}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-smooth grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : null}

                    {/* Logo Overlay */}
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: (idx * 0.1) + 0.3 }}
                      src={project.logo}
                      alt={project.name}
                      loading="lazy"
                      className="relative z-10 max-w-[85%] max-h-[70%] object-contain transition-smooth group-hover:scale-110 drop-shadow-2xl"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=0D1B2A&color=fff&size=512&bold=true`;
                      }}
                    />

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-6 backdrop-blur-md z-20">
                      <div className="flex gap-4">
                        <a
                          href={project.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-5 bg-accent text-white rounded-2xl hover:bg-white hover:text-accent transition-smooth shadow-2xl hover:scale-110"
                          title="QUERO O MESMO SERVIÇO"
                        >
                          <ExternalLink size={28} />
                        </a>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-smooth"
                      >
                        Explorar Case
                      </button>
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-black text-zinc-900 tracking-tighter text-3xl">
                            {project.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-accent/10 text-accent text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                            {project.category}
                          </span>
                          <span className="text-zinc-300 text-[9px] font-black uppercase tracking-widest">
                            {project.work.split('-')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-zinc-500 text-sm line-clamp-3 font-medium leading-relaxed mb-8">
                        {project.description}
                      </p>
                    )}
                    <a 
                      href={project.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-accent text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-smooth group/btn"
                    >
                      QUERO O MESMO SERVIÇO
                      <ChevronRight size={16} className="transition-smooth" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-primary/95 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100/80 backdrop-blur text-primary rounded-full hover:bg-accent hover:text-white transition-all z-30 shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="flex-1 bg-black relative flex flex-col min-h-[350px] md:min-h-[500px]">
                {(!selectedProject.videoUrl && !selectedProject.photos?.length && !selectedProject.reels?.length) ? (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center text-gray-500">
                    <img src={selectedProject.logo} alt={selectedProject.name} loading="lazy" className="h-24 opacity-20 mb-6 grayscale" />
                    <p className="text-sm font-medium">Galeria de média em processamento.</p>
                  </div>
                ) : (
                  <div className="flex-1 relative group/carousel h-full">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay, EffectFade]}
                      onSlideChange={(swiper) => {
                        // Stop all videos and reset iframes on slide change
                        const slides = swiper.el.querySelectorAll('video');
                        slides.forEach(v => {
                          v.pause();
                          v.currentTime = 0;
                        });
                        const iframes = swiper.el.querySelectorAll('iframe');
                        iframes.forEach(f => {
                          const src = f.src;
                          f.src = '';
                          f.src = src;
                        });
                      }}
                      navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                      }}
                      pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                        renderBullet: function (_index, className) {
                          return '<span class="' + className + ' !bg-accent"></span>';
                        },
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true
                      }}
                      loop={true}
                      className="h-full w-full"
                    >
                      {/* Reels */}
                      {selectedProject.reels?.map((reel, i) => (
                        <SwiperSlide key={`reel-${i}`} className="flex items-center justify-center bg-black">
                          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                            <div className={`w-full h-full ${['churrex', 'casa-luz', 'geovany-galli', 'dumagui'].includes(selectedProject.id) ? 'max-w-[320px] aspect-[9/16]' : 'max-w-4xl aspect-video'} bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10`}>
                              {reel.url.includes('youtube.com') || reel.url.includes('youtu.be') || reel.url.includes('vimeo.com') ? (
                                <iframe
                                  className="w-full h-full"
                                  src={`${reel.url}${reel.url.includes('?') ? '&' : '?'}enablejsapi=1&version=3&playerapiid=ytplayer`}
                                  title={reel.title}
                                  frameBorder="0"
                                  allowFullScreen
                                />
                              ) : (
                                <video 
                                  src={reel.url} 
                                  controls 
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-contain"
                                  onPlay={(e) => {
                                    const swiper = ((e.target as HTMLElement).closest('.swiper') as unknown as { swiper: { autoplay: { stop: () => void } } })?.swiper;
                                    if (swiper?.autoplay) swiper.autoplay.stop();
                                  }}
                                />
                              )}
                            </div>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur px-6 py-2 rounded-2xl border border-white/10 text-center">
                              <p className="text-accent text-[8px] font-black uppercase tracking-[0.2em] mb-0.5">{reel.campaign || 'Campanha'}</p>
                              <h5 className="text-white text-sm font-bold truncate max-w-[200px]">{reel.title}</h5>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}

                      {/* Main Video (videoUrl) */}
                      {selectedProject.videoUrl && (
                        <SwiperSlide className="flex items-center justify-center bg-black">
                          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                            <div className="w-full h-full max-w-4xl aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10">
                              {selectedProject.videoUrl.includes('youtube.com') || selectedProject.videoUrl.includes('youtu.be') || selectedProject.videoUrl.includes('vimeo.com') ? (
                                <iframe
                                  className="w-full h-full"
                                  src={selectedProject.videoUrl}
                                  title={selectedProject.name}
                                  frameBorder="0"
                                  allowFullScreen
                                />
                              ) : (
                                <video src={selectedProject.videoUrl} controls playsInline preload="metadata" className="w-full h-full object-contain" />
                              )}
                            </div>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur px-4 py-1 rounded-full border border-white/10">
                              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Vídeo Principal</span>
                            </div>
                          </div>
                        </SwiperSlide>
                      )}

                      {/* Photos */}
                      {selectedProject.photos?.map((photo, i) => (
                        <SwiperSlide key={`photo-${i}`} className="flex items-center justify-center bg-black">
                          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                            <img
                              src={photo}
                              alt={`${selectedProject.name} photo ${i + 1}`}
                              loading="lazy"
                              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur px-4 py-1 rounded-full border border-white/10">
                              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Fotografia {i + 1}</span>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur text-white rounded-full hover:bg-accent hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 border border-white/10">
                      <ChevronLeft size={24} />
                    </button>
                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur text-white rounded-full hover:bg-accent hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 border border-white/10">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="w-full lg:w-[400px] p-8 md:p-12 flex flex-col bg-zinc-50 border-l border-zinc-200 overflow-y-auto">
                <div className="mb-auto">
                  <img
                    src={selectedProject.logo}
                    alt={selectedProject.name}
                    loading="lazy"
                    className="h-24 w-auto object-contain mb-10 mr-auto"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProject.name)}&background=0D1B2A&color=fff&size=512&bold=true`;
                    }}
                  />
                  <h3 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">{selectedProject.name}</h3>
                  <p className="text-accent font-black text-sm uppercase tracking-widest mb-8">{selectedProject.work}</p>
                  <div className="space-y-6 text-zinc-600 leading-relaxed font-medium">
                    <p>{selectedProject.description || 'Trabalho realizado com foco em excelência e resultados. A Wawera News orgulha-se de ter contribuído para o sucesso deste projeto através de soluções criativas e profissionais.'}</p>
                  </div>
                </div>
                
                <div className="mt-12 space-y-4">
                  <a
                    href={selectedProject.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary flex items-center justify-center gap-3 py-5 rounded-2xl shadow-xl shadow-primary/20"
                  >
                    QUERO O MESMO SERVIÇO
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
