
import React from 'react';
import ChildAccountForm from '@/components/ChildAccountForm';

const DashboardHeader: React.FC = () => {
  return (
    <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-goodchild-text-primary mb-2">
          Parent Dashboard
        </h1>
        <p className="text-goodchild-text-secondary">
          Manage your children's activities, rewards, and progress.
        </p>
      </div>
      
      <ChildAccountForm />
    </header>
  );
};

export default DashboardHeader;
