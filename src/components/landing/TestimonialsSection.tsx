
import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    quote: "GoodChild transformed how we motivate our kids. They're excited to earn rewards!",
    name: "Dr. Rubina",
    role: "Mom of Arfaan & Namir"
  },
  {
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=1740&auto=format&fit=crop",
    quote: "The activity suggestions have helped my daughter develop amazing new skills.",
    name: "Amrit",
    role: "Kabir's Dad"
  },
  {
    image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1752&auto=format&fit=crop",
    quote: "GoodChild gives us quality family time while teaching responsibility.",
    name: "Japnith Kaur",
    role: "Myra's Mom"
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1740&auto=format&fit=crop",
    quote: "The rewards system has really motivated my kids to help around the house.",
    name: "Sarah Johnson",
    role: "Mother of Two"
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1740&auto=format&fit=crop",
    quote: "Our weekends are now filled with fun activities from the app. Highly recommend!",
    name: "Michael Chen",
    role: "Dad of Lily & James"
  }
];

const TestimonialsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    let scrollInterval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            // Reset to start when we reach the end
            scrollContainer.scrollLeft = 0;
          } else {
            // Smooth scroll to the right
            scrollContainer.scrollLeft += 1;
          }
        }
      }, 20);
    };
    
    startAutoScroll();
    
    // Pause scrolling when mouse enters
    const handleMouseEnter = () => {
      clearInterval(scrollInterval);
    };
    
    // Resume scrolling when mouse leaves
    const handleMouseLeave = () => {
      startAutoScroll();
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <section className="py-24 bg-white font-nunito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            What Do Parents Love About Us?
          </h2>
          <p className="text-3xl text-gray-700 max-w-3xl mx-auto">
            See how families are using GoodChild to create positive habits
          </p>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none gap-6 pb-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name}'s testimonial`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex flex-col">
                <div className="text-4xl text-gray-300 font-serif mb-4">"</div>
                <p className="text-2xl text-gray-700 mb-6 flex-grow">
                  {testimonial.quote}
                </p>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                  <p className="text-xl text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
