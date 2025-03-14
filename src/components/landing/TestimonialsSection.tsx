
import React from 'react';

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
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden font-nunito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            What Do Parents Love About Us?
          </h2>
          <p className="text-3xl text-gray-700 max-w-3xl mx-auto">
            See how families are using GoodChild to create positive habits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={testimonial.image}
                  alt={`${testimonial.name}'s testimonial`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
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
