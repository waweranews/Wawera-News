import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteContent } from '../types';

export default function WhatsAppButton({ content }: { content: SiteContent }) {
  const whatsappLink = `https://wa.me/${content.whatsapp.replace(/\s+/g, '')}?text=Olá, vi o site da Wawera News e quero mais informações.`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
    </motion.a>
  );
}
