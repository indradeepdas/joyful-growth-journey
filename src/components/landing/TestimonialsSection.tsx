
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "GoodChild transformed how we motivate our kids. They're excited to earn rewards!",
    name: "Maria Chen",
    role: "Mother of two",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    quote: "The activity suggestions have helped my daughter develop amazing new skills.",
    name: "James Wilson",
    role: "Father of three",
    image: "https://images.unsplash.com/photo-1542909192-2f2241a99c9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    quote: "GoodChild gives us quality family time while teaching responsibility.",
    name: "Sarah Johnson",
    role: "Mother of one",
    image: "https://images.unsplash.com/photo-1559690849-91f82bfad446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    quote: "My son loves tracking his progress. It's made parenting so much easier!",
    name: "Michael Nguyen",
    role: "Father of two",
    image: "https://images.unsplash.com/photo-1625216625091-f4e9bc3d575e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    quote: "The reward system has completely changed our family dynamics for the better.",
    name: "Lisa Garcia",
    role: "Mother of four",
    image: "https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    quote: "GoodChild helped us establish a routine that works for everyone in our home.",
    name: "David Cohen",
    role: "Father of one",
    image: "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Parents Love GoodChild
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            See how families are using GoodChild to create positive habits
          </p>
        </div>
        
        <div className="relative">
          <motion.div 
            className="flex space-x-6 py-4"
            animate={{ x: [0, -2000] }}
            transition={{ 
              repeat: Infinity,
              duration: 40,
              ease: "linear"
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xl font-semibold mb-4 text-gray-800">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-gray-700">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
