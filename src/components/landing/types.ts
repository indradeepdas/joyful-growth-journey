
import { ReactNode } from 'react';

export interface DevelopmentAreaItem {
  name: string;
  icon: ReactNode;
  smallIcon: ReactNode;
  description: string;
  examples: string[];
  color: string;
  bgColor: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface RewardItem {
  name: string;
  imageUrl: string;
  goodCoins: number;
  originalPrice: string;
  discountedPrice: string;
}
