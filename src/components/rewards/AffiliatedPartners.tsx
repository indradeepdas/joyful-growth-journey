
import React, { useEffect, useRef } from 'react';

const partnerLogos = [
  {
    name: 'TEMU',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Temu_Logo.png'
  },
  {
    name: 'AMAZON',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    name: 'THALIA.DE',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Thalia_Logo.svg'
  },
  {
    name: 'SHEIN',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/SHEIN_%28logo%29.svg'
  },
  {
    name: 'LEGO',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg'
  }
];

const AffiliatedPartners = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Clone logos to create infinite scroll effect
    const cloneLogos = () => {
      const items = scrollContainer.querySelectorAll('.partner-logo');
      const clonedItems = Array.from(items).map(item => item.cloneNode(true));
      clonedItems.forEach(item => {
        scrollContainer.appendChild(item);
      });
    };
    
    cloneLogos();
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled past half the original items
      if (scrollPosition >= scrollContainer.children[0].clientWidth * (partnerLogos.length / 2)) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(${-scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="bg-[#f0f3f8] py-8 overflow-hidden"> {/* Dreamy skies background */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[#4a6fa1] text-2xl font-bold text-center mb-6">Our Affiliated Partners</h2>
        <div className="relative py-4">
          <div 
            ref={scrollRef} 
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
            style={{ transform: 'translateX(0)' }}
          >
            {partnerLogos.map((partner, index) => (
              <div 
                key={index}
                className="partner-logo inline-block flex-shrink-0"
              >
                <img 
                  src={partner.logoUrl} 
                  alt={partner.name} 
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliatedPartners;
