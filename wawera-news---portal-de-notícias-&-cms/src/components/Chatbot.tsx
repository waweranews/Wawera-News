import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { SiteContent, Project } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export default function Chatbot({ content, projects }: { content: SiteContent, projects: Project[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! 👋 Sou o assistente da Wawera News. Como posso ajudar hoje?', sender: 'bot' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{
              text: `Você é o assistente virtual da Wawera News, uma agência de mídia e publicidade premium.
              Seu objetivo é ser um guia especializado para o usuário, tirando todas as dúvidas sobre a empresa, nossos serviços e portfólio ANTES de sugerir o contato via WhatsApp.
              
              Informações da Empresa:
              - Título: ${content.heroTitle}
              - Subtítulo: ${content.heroSub}
              - Sobre: ${content.aboutText}
              - Missão: ${content.mission}
              - Visão: ${content.vision}
              - Endereço: ${content.address}
              - Email: ${content.email}
              - Telefone: ${content.phone}
              - WhatsApp: ${content.whatsapp}
              
              Projetos Recentes:
              ${projects.map(p => `- ${p.name}: ${p.work}${p.description ? ` (${p.description})` : ''}${p.photos ? `. Inclui galeria com ${p.photos.length} fotos.` : ''}${p.reels ? `. Possui ${p.reels.length} reels/campanhas.` : ''}`).join('\n')}
              
              Diretrizes de Resposta:
              1. Seja extremamente profissional, acolhedor e criativo.
              2. Responda em Português de Angola/Portugal.
              3. Guie a conversa: se o usuário perguntar sobre um serviço, explique como trabalhamos e dê exemplos de projetos (como o Giovanni Gally).
              4. Só sugira o WhatsApp (${content.whatsapp}) após responder à dúvida principal ou se o usuário demonstrar intenção clara de contratação/orçamento.
              5. Mantenha as respostas curtas, mas informativas e elegantes.
              
              Pergunta do Usuário: ${text}`
            }]
          }
        ]
      });

      const result = await model;
      const botResponse = result.text || "Desculpe, tive um pequeno problema. Pode repetir?";
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: "Estou com dificuldades técnicas, mas pode falar connosco diretamente no WhatsApp!", sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickOptions = [
    "Quais são os vossos serviços?",
    "Fale-me do projeto Giovanni Gally",
    "Como funciona a produção de reels?",
    "Onde estão localizados?",
    "Quero um orçamento"
  ];

  return (
    <>
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-[90] w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-accent transition-all border-4 border-white"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="close" 
              initial={{ opacity: 0, rotate: -90 }} 
              animate={{ opacity: 1, rotate: 0 }} 
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div 
              key="chat" 
              initial={{ opacity: 0, rotate: 90 }} 
              animate={{ opacity: 1, rotate: 0 }} 
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: -50, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-28 left-8 z-[90] w-[400px] max-w-[calc(100vw-40px)] bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
                    <Bot size={28} className="-rotate-3" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xl tracking-tight">Wawera Assistant</h4>
                  <p className="text-xs text-accent/90 font-medium uppercase tracking-widest">Online agora</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="h-[450px] overflow-y-auto p-8 space-y-8 bg-[#F8FAFC] scroll-smooth no-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                  className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-4 max-w-[85%] ${msg.sender === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md ${msg.sender === 'bot' ? 'bg-white text-primary' : 'bg-accent text-white'}`}>
                      {msg.sender === 'bot' ? <Bot size={20} /> : <User size={20} />}
                    </div>
                    <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'bot' 
                        ? 'bg-white text-primary rounded-tl-none border border-gray-50' 
                        : 'bg-primary text-white rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-md text-primary flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                    <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1.5 items-center border border-gray-50">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-accent rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-accent rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                {quickOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSend(opt)}
                    className="whitespace-nowrap text-[10px] uppercase tracking-widest font-black bg-gray-50 text-gray-400 hover:bg-accent hover:text-white px-5 py-2.5 rounded-full transition-all border border-gray-100 hover:border-accent hover:shadow-lg hover:shadow-accent/20"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva a sua mensagem..."
                  className="w-full bg-gray-50 rounded-[1.5rem] pl-6 pr-16 py-5 text-sm outline-none focus:ring-4 focus:ring-accent/10 transition-all border border-gray-100 font-medium"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2.5 w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-accent/30"
                >
                  {isTyping ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
