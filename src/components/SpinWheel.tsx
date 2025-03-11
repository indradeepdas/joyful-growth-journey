import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Star, Sparkles, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GoodCoinIcon from '@/components/GoodCoinIcon';
import confetti from 'canvas-confetti';

const PRIZES = [
  { value: 5, color: '#FF719A', probability: 0.25 },
  { value: 10, color: '#FFA99F', probability: 0.25 },
  { value: 25, color: '#FFE29F', probability: 0.20 },
  { value: 30, color: '#9b87f5', probability: 0.15 },
  { value: 50, color: '#7E69AB', probability: 0.08 },
  { value: 75, color: '#6E59A5', probability: 0.05 },
  { value: 100, color: '#D946EF', probability: 0.02 },
];

interface SpinWheelProps {
  onWin?: (amount: number) => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const segmentAngle = (2 * Math.PI) / PRIZES.length;
    for (let i = 0; i < PRIZES.length; i++) {
      const startAngle = i * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = PRIZES[i].color;
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`${PRIZES[i].value}`, radius - 20, 5);
      ctx.restore();
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [rotation]);

  const launchConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF719A', '#FFA99F', '#FFE29F', '#9b87f5', '#7E69AB', '#6E59A5', '#D946EF'],
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF719A', '#FFA99F', '#FFE29F', '#9b87f5', '#7E69AB', '#6E59A5', '#D946EF'],
      });
    }, 250);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedPrize(null);
    
    const random = Math.random();
    let cumulativeProbability = 0;
    let winningIndex = 0;
    
    for (let i = 0; i < PRIZES.length; i++) {
      cumulativeProbability += PRIZES[i].probability;
      if (random < cumulativeProbability) {
        winningIndex = i;
        break;
      }
    }
    
    const prize = PRIZES[winningIndex].value;
    
    const prizeAngle = 360 / PRIZES.length;
    
    const destinationAngle = 270 - (winningIndex * prizeAngle) - (prizeAngle / 2);
    
    const spins = 5;
    const newRotation = (spins * 360) + destinationAngle;
    
    let currentRotation = rotation;
    const spinDuration = 5000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOut(progress);
      
      currentRotation = rotation + (newRotation - rotation) * easedProgress;
      setRotation(currentRotation % 360);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setHasSpun(true);
        setSelectedPrize(prize);
        
        launchConfetti();
        
        if (onWin) {
          onWin(prize);
        }
        
        toast({
          title: "Congratulations! 🎉",
          description: `You won ${prize} GoodCoins!`,
        });
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gradient mb-2">Spin the Wheel & Win!</h2>
        <p className="text-goodchild-text-secondary">
          Try your luck and spin the wheel to win GoodCoins!
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="relative my-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[90%] z-10">
            <div className="w-12 h-16 bg-goodchild-primary flex items-center justify-center rounded-t-xl shadow-lg">
              <div className="w-0 h-0 
                border-l-[20px] border-l-transparent 
                border-r-[20px] border-r-transparent 
                border-b-[30px] border-b-white"
              ></div>
            </div>
          </div>
          
          <div 
            style={{ 
              transform: `rotate(${rotation}deg)`, 
              transition: isSpinning ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={300} 
              className="rounded-full shadow-xl"
            ></canvas>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white rounded-full p-2 shadow-inner">
                <GoodCoinIcon size="lg" animated={isSpinning} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-md">
          <Button 
            onClick={spinWheel} 
            disabled={isSpinning}
            className={`w-full py-6 text-xl font-bold ${isSpinning ? 'bg-gray-400' : 'bg-gradient-to-r from-[#FFA500] to-[#FF719A] hover:from-[#FF8C00] hover:to-[#FF5A87]'}`}
          >
            {isSpinning ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2"><Star className="h-5 w-5" /></span>
                Spinning...
              </span>
            ) : hasSpun ? (
              <span className="flex items-center justify-center">
                <Sparkles className="h-6 w-6 mr-2" />
                Spin Again!
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Gift className="h-6 w-6 mr-2" />
                Spin the Wheel!
              </span>
            )}
          </Button>
          
          {selectedPrize !== null && (
            <div className="mt-6 text-center animate-bounce">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-xl font-bold">
                <span className="flex items-center">
                  <PartyPopper className="mr-2 h-6 w-6" /> 
                  You won {selectedPrize} GoodCoins!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
