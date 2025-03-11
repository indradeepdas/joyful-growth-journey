
import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { TestimonialItem } from './types';

const TestimonialsSection = () => {
  const testimonials: TestimonialItem[] = [
    {
      name: "Sarah Johnson",
      role: "Parent of two",
      location: "United States",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "The Good Child Project has transformed our family dynamics! My children are motivated to help around the house and complete their homework because they're earning rewards they're excited about."
    },
    {
      name: "Michael Thompson",
      role: "Father of three",
      location: "Australia",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      quote: "As a busy dad, I was looking for a way to encourage positive behavior without constant reminders. This platform has made parenting much more enjoyable - less nagging, more celebrating achievements!"
    },
    {
      name: "Lisa Rodriguez",
      role: "Single mom",
      location: "Canada",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "The development areas have helped me identify where my daughter needs more support. I've seen tremendous growth in her emotional intelligence since we started using the platform."
    },
    {
      name: "David Chen",
      role: "Father of twins",
      location: "United States",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      quote: "The activity suggestions are so creative! It's given me fresh ideas for engaging with my kids beyond screen time. We've created some amazing memories through these activities."
    },
    {
      name: "Emily Williams",
      role: "Parent of a teenager",
      location: "United Kingdom",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      quote: "I was skeptical about whether this would work for my teenager, but she loves earning GoodCoins for bigger rewards. It's teaching her valuable lessons about setting goals and delayed gratification."
    },
    // New testimonials from Singapore, France, and Japan
    {
      name: "Lin Wei Ling",
      role: "Mother of two",
      location: "Singapore",
      image: "https://randomuser.me/api/portraits/women/79.jpg",
      quote: "The educational approach aligns perfectly with our values. My children's academic performance has improved, and they're developing valuable skills that will serve them throughout life."
    },
    {
      name: "Sophie Dubois",
      role: "Parent of three",
      location: "France",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      quote: "Mes enfants adorent ce système de récompenses! The structured approach helps maintain a balanced home environment while still allowing kids to be kids. C'est magnifique!"
    },
    {
      name: "Takashi Yamamoto",
      role: "Father of two",
      location: "Japan",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      quote: "This platform encourages discipline and responsibility in a way that resonates with children. My kids are developing habits that will serve them well into adulthood."
    },
    {
      name: "Hiroko Tanaka",
      role: "Mother of an only child",
      location: "Japan",
      image: "https://randomuser.me/api/portraits/women/34.jpg",
      quote: "The Good Child Project provides the perfect structure for encouraging independence while maintaining parental oversight. The balance is just right for modern parenting."
    },
    {
      name: "Lian Tan",
      role: "Parent of twins",
      location: "Singapore",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
      quote: "In our busy household, this system helps maintain consistency and fairness. The children understand expectations clearly, and rewards feel earned rather than given."
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the testimonials for a seamless loop
    const cloneElements = () => {
      const elements = Array.from(scrollContainer.children);
      elements.forEach(el => {
        const clone = el.cloneNode(true);
        scrollContainer.appendChild(clone);
      });
    };

    cloneElements();

    // Set the animation
    const animateScroll = () => {
      if (!scrollContainer) return;

      // Get the width of a single element + margin
      const firstEl = scrollContainer.children[0] as HTMLElement;
      const itemWidth = firstEl.offsetWidth + parseInt(window.getComputedStyle(firstEl).marginRight);
      
      let currentScroll = 0;
      const maxScroll = itemWidth * testimonials.length;
      
      // Animation frame
      const scroll = () => {
        currentScroll += 0.5; // Adjust speed here
        
        // Reset when we've scrolled through all original elements
        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${currentScroll}px)`;
        requestAnimationFrame(scroll);
      };
      
      requestAnimationFrame(scroll);
    };

    const scrollTimeout = setTimeout(animateScroll, 1000);
    
    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [testimonials.length]);

  return (
    <section className="w-full py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
            Hear from families around the world who have transformed their parenting experience with The Good Child Project.
          </p>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-visible whitespace-nowrap" ref={scrollRef}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card inline-block min-w-[320px] max-w-[320px] mr-6 whitespace-normal"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-goodchild-text-primary">{testimonial.name}</h3>
                    <p className="text-sm text-goodchild-text-secondary">{testimonial.role}</p>
                    {testimonial.location && (
                      <p className="text-xs text-goodchild-blue font-medium mt-1">{testimonial.location}</p>
                    )}
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-goodchild-yellow fill-current" />
                  ))}
                </div>
                <p className="text-goodchild-text-primary italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
          
          {/* Add gradient fade effects on sides */}
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
