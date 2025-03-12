
import React from 'react';
import { motion } from 'framer-motion';

const AffiliatedPartners: React.FC = () => {
  const partners = [
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'
    },
    {
      name: 'TEMU',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Temu_Logo.svg/1200px-Temu_Logo.svg.png'
    },
    {
      name: 'THALIA.DE',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Thalia_Logo_2022.svg/2560px-Thalia_Logo_2022.svg.png'
    },
    {
      name: 'SHEIN',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/SHEIN_logo.svg/2560px-SHEIN_logo.svg.png'
    },
    {
      name: 'LEGO',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/1200px-LEGO_logo.svg.png'
    }
  ];

  return (
    <div className="py-8 bg-[#e8f0fe] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-center text-[#4a6fa1] mb-6">Our Affiliated Partners</h2>
        <div className="relative">
          <motion.div
            className="flex space-x-12 items-center"
            animate={{ x: [0, -1500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={`partner-1-${index}`} className="flex-shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain"
                />
              </div>
            ))}
            
            {/* Duplicated set of logos for continuous scrolling */}
            {partners.map((partner, index) => (
              <div key={`partner-2-${index}`} className="flex-shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatedPartners;
