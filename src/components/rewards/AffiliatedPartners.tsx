
import React from 'react';
import { motion } from 'framer-motion';

const AffiliatedPartners: React.FC = () => {
  const partnerLogos = [
    {
      name: 'TEMU',
      url: 'https://cdn.icon-icons.com/icons2/3914/PNG/512/temu_logo_icon_248729.png'
    },
    {
      name: 'AMAZON',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    },
    {
      name: 'THALIA',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Thalia_Logo_2021.svg'
    },
    {
      name: 'SHEIN',
      url: 'https://cdn.worldvectorlogo.com/logos/shein-logo.svg'
    },
    {
      name: 'LEGO',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg'
    }
  ];

  return (
    <div className="bg-[#C1E8F7] py-8 mb-12 overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-[#4a6fa1] mb-8">Our Affiliated Partners</h2>
      <motion.div 
        className="flex space-x-12"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
      >
        {[...partnerLogos, ...partnerLogos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={logo.url} 
              alt={logo.name}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AffiliatedPartners;
