import { motion } from 'motion/react';

export default function Clients() {
  const clients = [
    { name: 'Lunabril Palace', logo: 'https://i.imgur.com/7vlEOrZ.png', featured: true },
    { name: 'Dumagui', logo: 'https://i.imgur.com/6v32RsV.png', featured: true, subtitle: 'Fashion • Content Production • Videos' },
    { name: 'Churex', logo: 'https://i.imgur.com/0ZjO9Xk.png' },
    { name: 'INEJ', logo: 'https://i.imgur.com/7lpSroz.png' },
    { name: 'Cawdo', logo: 'https://i.imgur.com/tR5LWG2.png' },
    { name: 'Geovanni Galli', logo: 'https://i.imgur.com/rE5GRd1.png' },
    { name: 'Dinaco', logo: 'https://i.imgur.com/Mx99N7t.png' },
    { name: 'Saluz', logo: 'https://i.imgur.com/nhjtKJf.png' },
  ];

  return (
    <section className="py-32 bg-white border-y border-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Instituições que confiam no nosso trabalho e excelência
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 items-center justify-items-center max-w-6xl mx-auto">
          {clients.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10, opacity: 1 }}
              className={`w-full flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                client.featured 
                  ? 'opacity-100 scale-110 relative' 
                  : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
            >
              {client.featured && (
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl -z-10 blur-xl opacity-50" />
              )}
              <img 
                src={client.logo} 
                alt={client.name} 
                className={`max-w-[160px] w-auto h-auto object-contain drop-shadow-sm ${client.featured ? 'max-h-[80px]' : 'max-h-[60px]'}`}
                referrerPolicy="no-referrer"
              />
              {client.featured && client.subtitle && (
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-accent text-center">
                  {client.subtitle}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
