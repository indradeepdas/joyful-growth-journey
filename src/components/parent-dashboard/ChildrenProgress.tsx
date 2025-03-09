
import React from 'react';
import { ArrowRight, MinusCircle, User } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import { SupabaseChild } from '@/services/types';
import { useToast } from '@/hooks/use-toast';
import ChildAccountForm from '@/components/ChildAccountForm';
import { supabase } from '@/integrations/supabase/client';

interface ChildrenProgressProps {
  childAccounts: SupabaseChild[];
  user?: { id: string } | null;
  handleAddGoodCoin: (childId: string) => Promise<void>;
  handleAddPenalty: (childId: string) => Promise<void>;
}

const ChildrenProgress: React.FC<ChildrenProgressProps> = ({ 
  childAccounts, 
  user,
  handleAddGoodCoin,
  handleAddPenalty
}) => {
  const { toast } = useToast();
  
  const getAreaIcon = (area: string) => {
    switch (area) {
      case 'Health & Mind': return <div className="text-goodchild-blue">🧠</div>;
      case 'Creativity': return <div className="text-goodchild-yellow">💡</div>;
      case 'Social Skills': return <div className="text-goodchild-green">👥</div>;
      default: return <div className="text-goodchild-blue">📚</div>;
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8">👥</span>
          <span>Children's Progress</span>
        </h2>
        <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
          <span>View All</span>
          <ArrowRight size={16} />
        </button>
      </div>
      
      {childAccounts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          <p className="text-goodchild-text-secondary mb-4">
            You haven't added any children yet.
          </p>
          <ChildAccountForm />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {childAccounts.map((child) => (
            <div key={child.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-goodchild-blue/20 rounded-full flex items-center justify-center">
                      <User size={24} className="text-goodchild-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-goodchild-text-primary">{child.name}</h3>
                      <p className="text-sm text-goodchild-text-secondary">{child.nickname || child.surname}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="good-coin">
                      <GoodCoinIcon className="w-5 h-5" />
                      <span>{child.good_coins}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {['Health & Mind', 'Creativity', 'Social Skills'].map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <div className="flex items-center gap-2 flex-shrink-0 w-48">
                        {getAreaIcon(area)}
                        <span className="text-sm text-goodchild-text-secondary">{area}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-goodchild-blue rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => handleAddGoodCoin(child.id)}
                    className="bg-goodchild-green/10 text-goodchild-green px-3 py-1 rounded-lg text-sm hover:bg-goodchild-green/20 transition-colors"
                  >
                    Add GoodCoins
                  </button>
                  <button 
                    onClick={() => handleAddPenalty(child.id)}
                    className="bg-goodchild-red/10 text-goodchild-red px-3 py-1 rounded-lg text-sm hover:bg-goodchild-red/20 transition-colors"
                  >
                    Apply Penalty
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-goodchild-blue/5 flex justify-end">
                <button className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm">
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ChildrenProgress;
