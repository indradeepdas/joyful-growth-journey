
import React from 'react';
import { Activity } from '@/services/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import GoodCoinIcon from '@/components/GoodCoinIcon';

interface TaskCardProps {
  activity: Activity;
  isPending: boolean;
  onComplete?: (activityId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ activity, isPending, onComplete }) => {
  return (
    <Card className={`task-card ${isPending ? 'hover:shadow-md transition-all' : 'opacity-80'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {!isPending && <CheckCircle className="h-5 w-5 text-green-500" />}
              {activity.title}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {activity.description}
            </CardDescription>
          </div>
          {isPending && (
            <div className="text-goodchild-secondary flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Due: {activity.dueDate}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-goodchild-text-secondary">
          <span className="bg-goodchild-accent/20 px-3 py-1 rounded-full text-sm">
            {activity.developmentArea}
          </span>
        </div>
      </CardContent>
      <CardFooter className={`${isPending ? 'flex justify-between' : ''} pt-2`}>
        <div className="flex items-center gap-2">
          <GoodCoinIcon className="w-5 h-5" />
          <span className="font-bold">
            {activity.goodCoins} {!isPending ? 'GoodCoins earned' : 'GoodCoins'}
          </span>
        </div>
        {isPending && onComplete && (
          <Button 
            onClick={() => onComplete(activity.id)}
            className="bg-goodchild-primary hover:bg-goodchild-primary/80"
          >
            Mark as Complete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
