
import React from 'react';
import { motion } from 'framer-motion';

const AffiliatedPartners: React.FC = () => {
  const partnerLogos = [
    {
      name: 'TEMU',
      url: 'https://logodownload.org/wp-content/uploads/2023/04/temu-logo-0-1.png'
    },
    {
      name: 'AMAZON',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
    },
    {
      name: 'THALIA',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Thalia_Logo_2021.svg/2560px-Thalia_Logo_2021.svg.png'
    },
    {
      name: 'LEGO',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png'
    },
    {
      name: 'TARGET',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/1200px-Target_Corporation_logo_%28vector%29.svg.png'
    }
  ];

  return (
    <div className="bg-[#C1E8F7] py-8 mb-12 overflow-hidden">
      <h2 className="text-2xl font-bold text-center text-[#4a6fa1] mb-8">Our Affiliated Partners</h2>
      <motion.div 
        className="flex space-x-16"
        animate={{ x: [0, -1200] }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
      >
        {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <img 
              src={logo.url} 
              alt={logo.name}
              className="h-12 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/200x80/e8eef8/4a6fa1?text=Partner';
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AffiliatedPartners;
