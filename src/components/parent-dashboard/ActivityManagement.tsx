
import React from 'react';
import { ArrowRight, Calendar, Plus } from 'lucide-react';
import { Activity } from '@/types';
import { SupabaseChild } from '@/services/types';
import { useNavigate } from 'react-router-dom';
import GoodCoinIcon from '@/components/GoodCoinIcon';

interface ActivityManagementProps {
  activities: Activity[];
  childAccounts: SupabaseChild[];
  getAreaIcon: (area: string) => JSX.Element;
}

const ActivityManagement: React.FC<ActivityManagementProps> = ({ 
  activities, 
  childAccounts,
  getAreaIcon 
}) => {
  const navigate = useNavigate();
  
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-goodchild-text-primary flex items-center gap-2">
          <Calendar size={24} />
          <span>Activity Management</span>
        </h2>
        <button 
          onClick={() => navigate('/activities')}
          className="text-goodchild-blue hover:underline inline-flex items-center gap-1 text-sm"
        >
          <span>Manage Activities</span>
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => navigate('/activities')}
            className="btn-outline text-sm px-4 py-2 inline-flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Create Activity</span>
          </button>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-goodchild-text-secondary mb-2">No scheduled activities yet.</p>
            <p className="text-sm text-goodchild-text-secondary">
              Create activities to help your children develop and earn GoodCoins.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const childName = childAccounts.find(c => c.id === activity.childId)?.name || 'Unknown Child';
              return (
                <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-goodchild-blue/10 flex items-center justify-center">
                      {getAreaIcon(activity.developmentArea)}
                    </div>
                    <div>
                      <h4 className="font-medium text-goodchild-text-primary">{activity.title}</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-goodchild-text-secondary">Assigned to:</span>
                        <span className="font-medium">{childName}</span>
                        <span className="text-goodchild-blue">
                          <div className="good-coin text-sm">
                            <GoodCoinIcon className="w-4 h-4" />
                            <span>{activity.goodCoins}</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {activity.status === 'pending' ? (
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'Pending'}
                      </span>
                    ) : (
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivityManagement;
