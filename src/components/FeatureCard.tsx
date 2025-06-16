
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: string;
}

const FeatureCard = ({ icon: Icon, title, description, delay = "0s" }: FeatureCardProps) => {
  return (
    <div 
      className="bg-card rounded-2xl p-6 shadow-sm border border-gray-100 card-hover animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-budget-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
