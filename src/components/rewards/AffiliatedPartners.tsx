
import React from 'react';
import { motion } from 'framer-motion';

const AffiliatedPartners: React.FC = () => {
  const partnerLogos = [
    {
      name: 'TEMU',
      url: 'https://sf16-scmcdn-sg.ibytedtos.com/goofy/tiktok-shop-ph/order_manager/74a0c6d2/1694423768/c5f2f42c/TEMU-logo.png'
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
      url: 'https://logos-world.net/wp-content/uploads/2022/05/Shein-Logo.png'
    },
    {
      name: 'LEGO',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg'
    }
  ];

  return (
    <div className="bg-[#e8f0fe] py-8 mb-12 overflow-hidden">
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
