
import React, { useEffect, useRef } from 'react';
import { TestimonialItem } from './types';

const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Johnson",
    role: "Mother of two",
    location: "United States",
    image: "https://images.unsplash.com/photo-1631018971179-5c5b21ebe31a?q=80&w=1287&auto=format&fit=crop",
    quote: "Our kids are excited about earning GoodCoins!"
  },
  {
    name: "Michael Chen",
    role: "Father of three",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1603217040250-86a9698f9d80?q=80&w=1366&auto=format&fit=crop",
    quote: "It transformed our family dynamics completely!"
  },
  {
    name: "Emily Rodriguez",
    role: "Mother of four",
    location: "Canada",
    image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=1370&auto=format&fit=crop",
    quote: "Positive reinforcement really works with my children."
  },
  {
    name: "Sophie Dubois",
    role: "Mother of twins",
    location: "France",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    quote: "My twins love competing for GoodCoins!"
  },
  {
    name: "David Thompson",
    role: "Single father",
    location: "United Kingdom",
    image: "https://images.unsplash.com/photo-1608681299041-cc19878f79f1?q=80&w=1287&auto=format&fit=crop",
    quote: "It's like having a co-parent to help manage responsibilities."
  },
  {
    name: "Akiko Tanaka",
    role: "Mother of one",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1648737966769-98fa88fe66bb?q=80&w=1170&auto=format&fit=crop",
    quote: "My daughter takes pride in earning rewards!"
  },
  {
    name: "James Wilson",
    role: "Father of two",
    location: "Australia",
    image: "https://images.unsplash.com/photo-1623834574145-77dc07e1b2c6?q=80&w=1287&auto=format&fit=crop",
    quote: "The reward system has been incredibly motivating."
  },
  {
    name: "Lian Wei",
    role: "Mother of three",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1287&auto=format&fit=crop",
    quote: "This platform helps develop self-discipline."
  },
  {
    name: "Thomas Petit",
    role: "Father of one",
    location: "France",
    image: "https://images.unsplash.com/photo-1605923156812-42169b761bd6?q=80&w=1287&auto=format&fit=crop",
    quote: "My son is thriving with this positive reinforcement system."
  },
  {
    name: "Haruki Nakamura",
    role: "Father of two",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1578426720323-6d3b67133446?q=80&w=1305&auto=format&fit=crop",
    quote: "My children eagerly complete their responsibilities!"
  }
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Clone testimonials to create infinite scroll effect
    const cloneTestimonials = () => {
      const items = scrollContainer.querySelectorAll('.testimonial-item');
      const clonedItems = Array.from(items).map(item => item.cloneNode(true));
      clonedItems.forEach(item => {
        scrollContainer.appendChild(item);
      });
    };
    
    cloneTestimonials();
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled past half the original items
      if (scrollPosition >= scrollContainer.children[0].clientWidth * (testimonials.length / 2)) {
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
    <section className="w-full py-16 px-4 bg-goodchild-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
            Discover how the Good Child Project is transforming families around the world
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={scrollRef} 
            className="flex items-stretch gap-6 whitespace-nowrap will-change-transform"
            style={{ transform: 'translateX(0)' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-item inline-block whitespace-normal w-72 flex-shrink-0"
              >
                <div className="rounded-2xl overflow-hidden glass-card hover:shadow-lg transition-all">
                  <div className="h-64 w-full">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-goodchild-text-primary font-medium text-lg mb-3">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-goodchild-text-primary">{testimonial.name}</h3>
                        <p className="text-goodchild-text-secondary text-sm">{testimonial.role}</p>
                      </div>
                      <p className="text-goodchild-accent text-xs font-medium">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
