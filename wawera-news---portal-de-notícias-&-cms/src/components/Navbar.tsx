import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-smooth ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-primary/5 py-4' 
        : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="flex items-center group" 
          translate="no"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative h-14 w-14 flex items-center justify-center p-1 bg-white rounded-2xl shadow-xl border border-zinc-100">
            <img 
              src="https://i.imgur.com/fAZ6NKn.png" 
              alt="Wawera News" 
              className="h-full w-full object-contain" 
              referrerPolicy="no-referrer" 
            />
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary !py-3 !px-6 text-xs uppercase tracking-widest"
          >
            Contactar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 p-2 text-primary hover:bg-zinc-100 rounded-xl transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-0.5 bg-current rounded-full"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, width: '70%' }}
              className="h-0.5 bg-current rounded-full"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -10, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
              className="h-0.5 bg-current rounded-full"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-50 md:hidden p-10 flex flex-col"
            >
              <div className="mb-16">
                <img 
                  src="https://i.imgur.com/fAZ6NKn.png" 
                  alt="Wawera News" 
                  className="h-16 w-auto object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    className="text-3xl font-black text-primary hover:text-accent transition-colors tracking-tighter"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto">
                <motion.a 
                  href="#contact" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="btn-primary w-full text-center" 
                  onClick={() => setIsOpen(false)}
                >
                  Contactar Agora
                </motion.a>
                <div className="mt-10 pt-10 border-t border-zinc-100 flex gap-6">
                  {/* Social placeholders if needed */}
                  <div className="w-10 h-10 rounded-full bg-zinc-100" />
                  <div className="w-10 h-10 rounded-full bg-zinc-100" />
                  <div className="w-10 h-10 rounded-full bg-zinc-100" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
