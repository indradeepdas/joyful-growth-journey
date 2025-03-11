
export interface TestimonialItem {
  name: string;
  role: string;
  location?: string;
  image: string;
  quote: string;
}

export interface DevelopmentAreaItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  smallIcon: React.ReactNode;
  color: string;
  bgColor: string;
  examples: string[];
}
