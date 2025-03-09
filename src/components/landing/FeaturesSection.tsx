
import React from 'react';

const FeaturesSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="features" ref={ref} className="w-full py-16 px-4 bg-goodchild-background-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-goodchild-text-primary mb-4">
            Key Features
          </h2>
          <p className="text-goodchild-text-secondary max-w-2xl mx-auto">
            Our platform is designed to make parenting more effective and enjoyable for both you and your children.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Gamified Task System',
              description: 'Assign activities, reward progress with GoodCoins, and build positive habits.',
              icon: '🎮',
            },
            {
              title: 'Developmental Areas',
              description: 'Focus on 7 critical areas: Health & Mind, Communication, Creativity, and more.',
              icon: '🧠',
            },
            {
              title: 'Progress Tracking',
              description: 'Monitor your child\'s progress and identify areas for growth.',
              icon: '📈',
            },
            {
              title: 'Customizable Activities',
              description: 'Create personalized activities tailored to your child\'s interests.',
              icon: '✏️',
            },
          ].map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-xl hover:shadow-md transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-goodchild-text-primary">{feature.title}</h3>
              <p className="text-goodchild-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
