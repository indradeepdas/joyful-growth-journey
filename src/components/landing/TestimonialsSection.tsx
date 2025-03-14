
import React from 'react';

const testimonials = [
  {
    quote: "GoodChild transformed how we motivate our kids. They're excited to earn rewards!",
    name: "Dr. Rubina",
    role: "Mom of Arfaan & Namir",
    bgColor: "bg-[#B06A8D]", // Pink/purple
    textColor: "text-white"
  },
  {
    quote: "The activity suggestions have helped my daughter develop amazing new skills.",
    name: "Amrit",
    role: "Kabir's Dad",
    bgColor: "bg-[#8274B5]", // Purple
    textColor: "text-white"
  },
  {
    quote: "GoodChild gives us quality family time while teaching responsibility.",
    name: "Japnith Kaur",
    role: "Myra's Mom",
    bgColor: "bg-[#F0AA33]", // Yellow/gold
    textColor: "text-white"
  },
  {
    quote: "My kids love GoodChild for homework time! Takes the edge off studying with its vibrant and varied content.",
    name: "Dr. Shweta",
    role: "Aharva, Sikander's Mom",
    bgColor: "bg-[#23B5A0]", // Teal
    textColor: "text-white"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden font-nunito">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            What Do Parents Love About Us?
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            See how families are using GoodChild to create positive habits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6">
              {index % 2 === 0 && (
                <div className="md:w-1/2 h-64 bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${index + 1550000000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt="Parent and child"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className={`md:w-1/2 p-8 rounded-xl ${testimonial.bgColor} ${testimonial.textColor} flex flex-col justify-center`}>
                <h3 className="text-2xl font-bold mb-1">{testimonial.name}</h3>
                <p className="text-lg mb-4 opacity-90">{testimonial.role}</p>
                
                <div className="text-5xl font-serif mb-4">"</div>
                <p className="text-xl leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
              </div>
              
              {index % 2 !== 0 && (
                <div className="md:w-1/2 h-64 bg-gray-200 rounded-xl overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${index + 1550000000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt="Parent and child"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
