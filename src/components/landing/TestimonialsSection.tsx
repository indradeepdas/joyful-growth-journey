
import React, { useEffect, useRef } from 'react';
import { TestimonialItem } from './types';
import { cn } from '@/lib/utils';

const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Johnson",
    role: "Mother of two",
    location: "United States",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "The Good Child Project has completely transformed our household dynamics. My children are excited to complete their activities and earn GoodCoins. It's made parenting so much more enjoyable!"
  },
  {
    name: "Michael Chen",
    role: "Father of three",
    location: "Singapore",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    quote: "My kids used to argue about chores constantly. Now they eagerly check the app to see what activities they can complete. The rewards system has been a game-changer for our family."
  },
  {
    name: "Emily Rodriguez",
    role: "Mother of four",
    location: "Canada",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "I was skeptical at first, but the positive reinforcement approach really works. My children have developed better habits and our home is much more peaceful now."
  },
  {
    name: "Sophie Dubois",
    role: "Mother of twins",
    location: "France",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    quote: "Magnifique! My twins have always been competitive, and this platform channels that energy in a positive way. They're learning responsibility while having fun."
  },
  {
    name: "David Thompson",
    role: "Single father",
    location: "United Kingdom",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    quote: "As a single dad, I was looking for ways to better organize our household routines. This platform has been invaluable - it's like having a co-parent to help manage responsibilities."
  },
  {
    name: "Akiko Tanaka",
    role: "Mother of one",
    location: "Japan",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    quote: "The structured approach aligns perfectly with our values. My daughter takes pride in completing her tasks and has become more independent. I highly recommend it!"
  },
  {
    name: "James Wilson",
    role: "Father of two",
    location: "Australia",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "The reward system has been incredibly motivating for my children. They're learning the value of hard work and delayed gratification in a fun, engaging way."
  },
  {
    name: "Lian Wei",
    role: "Mother of three",
    location: "Singapore",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    quote: "This platform has helped my children develop self-discipline and responsibility. The variety of activities keeps them engaged and excited about personal growth."
  },
  {
    name: "Thomas Petit",
    role: "Father of one",
    location: "France",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    quote: "After trying many different parenting techniques, I finally found something that works. My son is thriving with this positive reinforcement system."
  },
  {
    name: "Haruki Nakamura",
    role: "Father of two",
    location: "Japan",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote: "The balance of structure and fun is perfect. My children eagerly complete their responsibilities and take pride in earning rewards. Excellent platform!"
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
                className={cn(
                  "testimonial-item glass-card p-6 rounded-xl hover:shadow-md transition-all inline-block whitespace-normal",
                  "w-80 flex-shrink-0"
                )}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-goodchild-accent" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-goodchild-text-primary">{testimonial.name}</h3>
                    <p className="text-goodchild-text-secondary text-sm">{testimonial.role}</p>
                    {testimonial.location && (
                      <p className="text-goodchild-accent text-xs font-medium mt-1">{testimonial.location}</p>
                    )}
                  </div>
                </div>
                <p className="text-goodchild-text-secondary italic">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
