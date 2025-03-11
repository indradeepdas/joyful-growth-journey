
import React from 'react';
import { TestimonialItem } from './types';

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
  return (
    <section className="w-full py-16 px-4 bg-goodchild-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
            What Parents Are Saying
          </h2>
          <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
            Discover how the Good Child Project is transforming families around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
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
              <p className="text-goodchild-text-secondary italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
