
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = React.forwardRef<HTMLElement>((props, ref) => {
  const features = [
    {
      title: 'Gamified Task System',
      description: 'Assign activities, reward progress with GoodCoins, and build positive habits.',
      icon: '🎮',
      link: '/public/activities'
    },
    {
      title: 'Developmental Areas',
      description: 'Focus on 7 critical areas: Health & Mind, Communication, Creativity, and more.',
      icon: '🧠',
      link: '/public/activities'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your child\'s progress and identify areas for growth.',
      icon: '📈',
      link: '/public/dashboard'
    },
    {
      title: 'Customizable Activities',
      description: 'Create personalized activities tailored to your child\'s interests.',
      icon: '✏️',
      link: '/public/activities?section=create'
    },
  ];

  return (
    <section id="features" ref={ref} className="w-full py-16 px-4 bg-[#B8A9FA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Key Features
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our platform is designed to make parenting more effective and enjoyable for both you and your children.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link 
              to={feature.link} 
              key={index} 
              className="bg-white p-6 rounded-xl hover:shadow-md transition-all hover:translate-y-[-5px] cursor-pointer border-2 border-transparent"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
